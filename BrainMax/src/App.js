import './App.css';
import React, { useState } from 'react';
import Expertise from './Expertise.tsx';
import Subject from './Subject.tsx';
import AskAI from './AI.tsx';
import 'tailwindcss';
const App = () => {
    const [subject, setSubject] = useState("");
    const [expertise, setExpertise] = useState(null);
    const handleSubmit = () => {
        if (!subject || !expertise) {
            alert("Please select a subject and expertise level");
            return;
        }
        alert(`You have selected ${expertise} and ${subject}`);
        AskAI(subject, expertise).then((response) => {
            alert(response);
        });
    };
    return (<div className="App">
      <header className="App-header">
        <p>
          Hi. I'm Brain Max. Your personal AI student 
        </p>
        <Subject onChange={setSubject} initialValue={subject}/>
        <Expertise onChange={setExpertise} initialValue={expertise}/>
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div>);
};
export default App;
