import './Gong.css'
import {useState} from 'react';
import Subject from './Subject.tsx';
//import AskAI from './AI.tsx';
import 'tailwindcss';
import { useNavigate } from 'react-router-dom';
//import SERVER_URL from '../../config.ts';

const Gong = () => {
    const [subject, setSubject] = useState<string>("");
    //const [firstMessage, setFirstMessage] = useState<string>("");

    const navigateToHome = useNavigate();

    // useEffect(() => {
    //   const fetchLessonPlan = async () => {
    //     const response = await fetch(`${SERVER_URL}/api/lessonplan`);
    //     if (response.ok) {
    //       const data = await response.json();

    //     }
    //   }
    // },[]);

    const handleBackToHome = () => {
        navigateToHome('/');
    };
  
    // const handleCreateLessonPlan = async () => {
    //   const response = await 
    // };
    
    return (
      <div className="Gong">
        <header className="Gong-header">
            <button onClick={handleBackToHome}>Back to Home</button>
          <p>
            Hello. I'm Gong. 
          </p>
          <Subject onChange={setSubject} initialValue={subject}/>
          {/* <button onClick={handleCreateLessonPlan}>Create a Lesson Plan</button> */}
          {/* <button onClick={handleSubmit}>Submit</button> */}
          {/* <div className="First-Message">
            {firstMessage}   
          </div> */}
        </header>
      </div>
    );
}

export default Gong;