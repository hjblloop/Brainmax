//import {ExpertiseLevelsType} from '../basic_materials/types.ts';
import SERVER_URL from '../../config.ts';

const AskAI = async (subject: string, expertise: string, topic: string) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'subject': subject,
                'expertise': expertise,
                'topic': topic
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