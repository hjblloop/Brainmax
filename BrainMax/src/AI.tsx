//import OpenAI from 'openai';
import {ExpertiseLevelsType} from './types.ts';


//const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//const client = new OpenAI({apiKey});

const AskAI = async (subject: string, expertise: ExpertiseLevelsType | null) => {
    try {
        const response = await fetch('http://localhost:5001/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'subject': subject,
                'expertise': expertise
            }),
        });
        const data = await response.text();
        return data;
    }
    catch (error: any) {
        return `Error: ${error.message}`;
    }
};

// const AskAI = async (subject: string, expertise: ExpertiseLevelsType | null) =>{
//     try {
//         const completion = await client.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//                 {
//                     role: "system",
//                     content: `You are a curious student who is a ${expertise} in ${subject}. Generate 5 questions to test your knowledge.`
//                 },
//                 {
//                     role: "user",
//                     content: `I am a teacher. I want to answer your questions.`
//                 },
//             ],
//         });
//         return completion.choices[0].message.content;
//     } catch (error: any) {
//         return `Error: ${error.message}`;
//     }
// }

export default AskAI;