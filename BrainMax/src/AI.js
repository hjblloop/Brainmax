import SERVER_URL from './config.ts';
const AskAI = async (subject, expertise) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'subject': subject,
                'expertise': expertise
            }),
        });
        return response.json();
    }
    catch (error) {
        return `Error: ${error.message}`;
    }
};
// Add multithreading to AI training
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
