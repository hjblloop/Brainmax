import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // Add `.js` extension
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.post('/api/ask', async (req, res) => {
    // try {
    //     const { messages } = req.body;
    //     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    //         model: 'gpt-4',
    //         messages: messages,
    //     }, {
    //         headers: {
    //             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    //         }
    //     });

    //     res.json(response.data);
    // } catch (error: any) {
    //     res.status(500).json( { error: error.message });
    // }
    const messages = req.body;
    return messages;
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});