import './App.css'
import 'tailwindcss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import Gong from './gong/gong.tsx';
import LEARN from './LEARN.tsx';
import LessonPlan from './lesson_plan/lessonplan.tsx';


function App() {
  console.log("App component rendered");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/gong" element={<Gong />} />  {/* Gong page */}
        <Route path="/LEARN" element={<LEARN />} /> {/* LEARN page */}
        <Route path="/LessonPlan" element={<LessonPlan />} /> {/* Lesson Plan page */}
      </Routes>
    </Router>
  );
}

export default App;
