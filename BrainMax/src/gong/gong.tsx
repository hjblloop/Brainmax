import './Gong.css'
import {useState} from 'react';
import Subject from './Subject.tsx';
//import AskAI from './AI.tsx';
import 'tailwindcss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
        {/* Top Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow z-50 flex items-center px-8 h-16">
            <div className="flex space-x-8">
                <Link to="/" className="hover:underline font-bold">Home</Link>
                <Link to="/LessonPlan" className="hover:underline">Lesson Plan</Link>
                <Link to="/LEARN" className="hover:underline">Learn</Link>
                <Link to="/gong" className="hover:underline">Gong</Link>
            </div>
        </nav>
        <header className="pt-20">
            <button 
              onClick={handleBackToHome}
              className="border-2 rounded bg-orange-100 cursor-pointer">
              Back to Home
            </button>
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