import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {pool, generalPool} from './db.js'; // Add `.js` extension
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

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
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `I am a teacher. Let me answer your questions.`,
            config: {
                systemInstruction: `You are a ${expertise} student who is studying ${subject}. Generate 5 questions to test your knowledge.`,
                maxOutputTokens: 500,
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

        console.log('Data saved:', result.rows[0]);

        res.status(201).json({ message: 'Data saved successfully', data: result.rows[0]});
    } catch (err: any) {
        console.error('Error saving data to database:', err.message);
        res.status(500).json({ error: 'Error saving data to database' });
    }
});

app.post('/api/createlessonplan', async (req, res) => {
    const { subject, topics, expertise } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO lesson_plan (subject, topics, expertise)
            VALUES ($1, $2, $3)`,
            [subject, topics, expertise]
        );
        console.log('subject: ', subject);
        console.log('topics: ', topics);
        console.log('expertise: ', expertise);
        console.log('Lesson plan created: ', result.rows[0]);
        res.status(201).json({ message: 'Lesson plan created successfully', data: result.rows[0]});
    } catch (err: any) {
        console.error('Error creating lesson plan: ', err.message);
        res.status(500).json({ error: 'Error creating lesson plan' });
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