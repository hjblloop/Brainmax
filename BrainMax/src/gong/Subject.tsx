//import tailwindcss from '@tailwindcss/vite';
import {useState} from 'react';

interface SubjectProps {
    onChange?: (value: string) => void;
    initialValue?: string;
}

const Subject: React.FC<SubjectProps> = ({onChange, initialValue=""}) => {
    const [subject, setSubject] = useState(initialValue);

    const handleChange = (event: any) => {
        setSubject(event.target.value);
        if (onChange){
            onChange(event.target.value);
        }
    }

    return (
        <div>
            <p>What subject would you like to learn?</p>
            <input type="text" placeholder="Enter subject" value={subject} onChange={handleChange} className="border-2 border-gray-300 rounded-md p-2"/>
        </div>
    );
};

export default Subject;