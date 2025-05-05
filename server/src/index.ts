import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // Add `.js` extension
import axios from 'axios';
import { OpenAI } from 'openai';

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({apiKey});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.post('/api/ask', async (req, res) => {
    // uncomment when you decide what ai api to use
    // try {
    //     const expertise = req.body.expertise;
    //     const subject = req.body.subject;
    //     const completion = await client.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [
    //             { 
    //                 role: "system",
    //                 content: `You are a curious student who is a ${expertise} in ${subject}. Generate 5 questions to test your knowledge.`
    //             },
    //             {
    //                 role: "user",
    //                 content: `I am a teacher. I want to answer your questions.`
    //             },
    //         ],
    //     });
    //     res.json(completion.choices[0].message.content);
    // } catch (error: any) {
    //     res.status(500).json( { error: error.message });
    // }
    res.json("this is a temp return json message for ai api");
    // try {
    //     console.log("this is server");
    //     const messages = req.body;
    //     const returnMessages = "Expertise: " + messages.expertise + " Subject: " + messages.subject;
    //     res.json(returnMessages);
    // }
    // catch (error: any) {
    //     console.log("this is server error");
    //     res.status(500).json( {error: error.message });
    // }
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

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
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