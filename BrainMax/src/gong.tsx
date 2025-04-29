import './Gong.css'
import {useState} from 'react';
import Expertise from './Expertise.tsx';
import Subject from './Subject.tsx';
import {ExpertiseLevelsType} from './types.ts';
import AskAI from './AI.tsx';
import 'tailwindcss';
import { useNavigate } from 'react-router-dom';

const Gong = () => {
    const [subject, setSubject] = useState<string>("");
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(null);
    const [firstMessage, setFirstMessage] = useState<string>("");

    const navigateToHome = useNavigate();
  
    async function handleSubmit() {
      if (!subject || !expertise){
        alert("Please select a subject and expertise level");
        return;
      }
      const response = await AskAI(subject, expertise);
      setFirstMessage(response);
    };

    const handleBackToHome = () => {
        navigateToHome('/');
    }
  
    
    return (
      <div className="Gong">
        <header className="Gong-header">
            <button onClick={handleBackToHome}>Back to Home</button>
          <p>
            Hello. I'm Gong. 
          </p>
          <Subject onChange={setSubject} initialValue={subject}/>
          <Expertise onChange={setExpertise} initialValue={expertise}/>
          <button onClick={handleSubmit}>Submit</button>
          <div className="First-Message">
            {firstMessage}   
          </div>
        </header>
      </div>
    );
}

export default Gong;