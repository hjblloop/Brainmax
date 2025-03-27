import './App.css'
import React, {useState} from 'react';
import Expertise from './Expertise.tsx';
import Subject from './Subject.tsx';
import {ExpertiseLevelsType} from './types.ts';
import AskAI from './AI.tsx';
import 'tailwindcss';


const App: React.FC = () =>{
  const [subject, setSubject] = useState<string>("");
  const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(null);
  const [firstMessage, setFirstMessage] = useState<string>("");

  async function handleSubmit() {
    if (!subject || !expertise){
      alert("Please select a subject and expertise level");
      return;
    }
    const response = await AskAI(subject, expertise);
    setFirstMessage(response);
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hi. I'm Brain Max. Your personal AI student 
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
};

export default App;
