import {ExpertiseLevelsType} from './types.ts';

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

export default AskAI;