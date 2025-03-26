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

  const handleSubmit = () => {
    if (!subject || !expertise){
      alert("Please select a subject and expertise level");
      return;
    }
    alert(`You have selected ${expertise} and ${subject}`);
    AskAI(subject, expertise).then((response) =>{
      for (const response1 of response){
        alert(response1);
      }
    });
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
      </header>
    </div>
  );
};

export default App;
