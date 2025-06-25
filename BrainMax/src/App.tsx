import './App.css'
import 'tailwindcss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import Gong from './gong/gong.tsx';
import LEARN from './LEARN.tsx';
import LessonPlan from './lesson_plan/lessonplan.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from './login/login.tsx';

function App() {
  console.log("App component rendered");
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />  {/* Home page */}
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/gong" element={<Gong />} />  {/* Gong page */}
        <Route path="/LEARN" element={<LEARN />} /> {/* LEARN page */}
        <Route path="/LessonPlan" element={<LessonPlan />} /> {/* Lesson Plan page */}
        <Route path="/Test" element={<LessonPlan />} /> {/*Test Page*/}
      </Routes>
    </Router>
  );
}

export default App;
