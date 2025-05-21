import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {pool, generalPool} from './db.js'; // Add `.js` extension
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import * as operators from './operators';

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.post('/api/ask', async (req, res) => {
    // uncomment when you decide what ai api to use
    try {
        const expertise = req.body.expertise;
        const subject = req.body.subject;
        const topic = req.body.topic;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Generate five ${subject} questions, suitable for a ${expertise} student, presented as a non-numbered list:`,
            config: {
                systemInstruction: `Five ${subject} questions, suitable for a ${expertise} student, presented as a non-numbered list:`,
                maxOutputTokens: 200,
                temperature: 0.5,
            }
        });
        res.json(response.text);
    } catch (error: any) {
        res.status(500).json( { error: error.message });
    }
});

// uncomment when deciding to go public
// app.post('/api/create_account', async (req, res) => {
//     const {username, password, email} = req.body;

//     try {
//         const result = await pool.query(
//             `INSERT INTO users (username, password, email)
//             VALUES ($1, $2, $3)
//             `
//         )
//     }
// })

app.post('/api/login', async (req, res) => {
    const {username, password } = req.body;
    try {
        const result = await generalPool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length > 0) {
            res.json({ success: true, token: "fake-JWT-token" });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error:', err});
        console.error(err);
    }
});

app.post('/api/learn', async (req, res) => {
    const { L, E, A, R, N, date } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO learn_data (l, e, a, r, n, date) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            ON CONFLICT (date)
            DO UPDATE SET
                l = EXCLUDED.l,
                e = EXCLUDED.e,
                a = EXCLUDED.a,
                r = EXCLUDED.r,
                n = EXCLUDED.n
            RETURNING *;
            `,
            [L, E, A, R, N, date]
        );

        res.status(201).json({ message: 'Data saved successfully', data: result.rows[0]});
    } catch (err: any) {
        console.error('Error saving data to database:', err.message);
        res.status(500).json({ error: 'Error saving data to database' });
    }
});

app.get('/api/isquestionlimit', async (req, res): Promise<any> => {
    const username = req.query.username;
    try {
        const result = await generalPool.query(`
            SELECT questions_generated, questions_limit FROM users
            WHERE username=$1`,
            [username]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { questions_generated, questions_limit } = result.rows[0];
        const limitReached = questions_generated >= questions_limit;
        res.status(201).json({ limitReached });
    } catch (err: any) {
        console.error('Error checking limit: ', err);
        res.status(500).json({ error: 'Error checking question limit' });
    }
});

app.post('/api/savequestions', async (req, res) => {
    const {questionsList, expertise, subject, topic, username}: 
        {questionsList:string[], expertise: string, subject: string, topic: string, username: string} = req.body;

    try {
        await generalPool.query('BEGIN');

        await generalPool.query(`
            INSERT INTO topics (subject_id, name, expertise, questions)
            VALUES (
                (SELECT id FROM subjects WHERE userid=(SELECT id FROM users WHERE username=$1)
                AND name=$2),
                $3,
                $4,
                $5
            )
            ON CONFLICT (subject_id, name, expertise)
            DO UPDATE SET questions = topics.questions || EXCLUDED.questions;
        `,
        [username, subject, topic, expertise, questionsList]);

        await generalPool.query(`
            UPDATE users
            SET questions_generated = questions_generated + 5
            WHERE username=$1
            `,[username]);

        await generalPool.query('COMMIT');
        
        res.status(201).json({ success: true, message: 'Questions saved successfully.' });
    } catch (err: any){
        console.error("Error saving question: ", err);
        if (
            err.message.includes('index row size') &&
            err.message.includes('exceeds btree maximum')
        ) {
            res.status(400).json({
                success: false,
                errorCode: 'BTREE_INDEX_TOO_LARGE',
                message: 'Too many questions generated.'
            });
        } else {
            res.status(500).json({
                success: false,
                errorCode: 'UNKNOWN_DB_ERROR',
                message: 'An unexpected error occurred while saving your data.',
            });
        }
    }
});

app.post('/api/createlessonplan', async (req, res) => {
    let { subject, topics, expertise, username } = req.body;
    [subject, topics, expertise, username] = operators.toLowerCaseAll(subject, topics, expertise, username)

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        {/* Save subject */}
        const subjectsRes = await client.query(
            `WITH insert_result AS (
                INSERT INTO subjects (userid, name) 
                VALUES ((SELECT id FROM users WHERE username='${username}'), $1)
                ON CONFLICT (userid, name) DO NOTHING
                RETURNING id
            )
            SELECT id FROM insert_result
            UNION
            SELECT id FROM subjects WHERE (userid, name) = ((SELECT id FROM users WHERE username='${username}'), $1)`,
            [subject]
        );
        const userSubjectId = subjectsRes.rows[0].id;
        
        {/*Save topics */}
        for (const topic of topics) {
            await client.query(
                `INSERT INTO topics (subject_id, name, expertise) 
                VALUES ($1, $2, $3)
                ON CONFLICT (subject_id, name) DO NOTHING`,
                [userSubjectId, topic, expertise]
            );
        }
        
        await client.query('COMMIT');
        res.status(201).json({ message: 'Successfully created lesson plan'});
    } catch (err: any) {
        await client.query('ROLLBACK');
        console.error('Error creating lesson plan: ', err.message);
        res.status(500).json({ error: 'Error creating lesson plan' });
    } finally {
        client.release();
    }
});

app.get('/api/getquestions', async (req,res) => {
    const topicId = req.query.topicId;

    try {
        const response = await generalPool.query(`
            SELECT questions FROM topics
            WHERE id='${topicId}'`);
        let allParts: string[] = [];
        if (response.rows[0].questions != null) {
            const cleanedQuestions = operators.clean(response.rows[0].questions);
            allParts = cleanedQuestions.flatMap((s: string) => s.split(/\n\n/));
        }
        res.status(201).json(allParts);
    } catch (err: any) {
        console.error('Error retrieving questions for topic: ', err.message);
        res.status(500).json({ error: 'Error retrieving questions'});
    }
});

app.get('/api/getlessonplan', async (req, res) => {
    const { subject } = req.body;

    try {
        const result = await pool.query(`
            SELECT * FROM lesson_plan`, [subject]);
        res.status(201).json(result.rows);
    } catch (err: any) {
        console.error('Error retrieving lesson plan: ', err.message);
        res.status(500).json({ error: 'Error retrieving lesson plan' });
    }
});

app.get('/api/getsubjects', async (req, res) => {
    const username = req.query.username;

    try {
        const response = await generalPool.query(`
            SELECT name, id FROM subjects
            WHERE userid = (SELECT id FROM users WHERE username='${username}')`);
        res.status(201).json(response.rows);
    } catch (err: any) {
        console.error('Error retrieving subjects: ', err.message);
        res.status(500).json({error: 'Error retrieving subjects'});
    }
});

app.get('/api/gettopics', async (req, res) => {
    const subjectId = req.query.subjectId;

    try {
        const response = await generalPool.query(`
            SELECT id, name, expertise FROM topics
            WHERE subject_Id=${subjectId}`);
        res.status(201).json(response.rows);
    } catch (err: any) {
        console.error('Error retrieving topics for subject ID: ', subjectId, ' : ', err.message);
        res.status(500).json({error: 'Error retrieving topics'});
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/getdates', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT date
            FROM learn_data
            WHERE date>= CURRENT_DATE - INTERVAL '7 days'
            ORDER BY date DESC;`)
        res.status(201).json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/learn/:date', async (req, res) => {
    const {date} = req.params;

    try {
        const result = await pool.query('SELECT * FROM learn_data WHERE date = $1', [date]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'No data found for date' });
        }
        else {
            res.json(result.rows[0]);
        }

    } catch (err: any) {
        console.error('Error retrieving data: ', err.message);;
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});