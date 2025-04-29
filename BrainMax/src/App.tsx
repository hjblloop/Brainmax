import './App.css'
import 'tailwindcss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.tsx';
import Gong from './gong.tsx';
import LEARN from './LEARN.tsx';


function App() {
  console.log("App component rendered");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/gong" element={<Gong />} />  {/* Gong page */}
        <Route path="/LEARN" element={<LEARN />} /> {/* LEARN page */}
      </Routes>
    </Router>
  );
}

export default App;
