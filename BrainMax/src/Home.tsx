import React from 'react';
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleGong = () => {
        navigate('/gong');
    }

    const handleLearn =() => {
        navigate('/LEARN');
    }

    return (
        <div className="Home">
            <div className="Home-header">
                <h1>The world is complicated. Let's make it simpler one lesson at a time.</h1>
                <div className="Home-Content">
                    <button className="GongButton" onClick={handleGong}>Let's start Learning</button>
                </div>
                <div className="Learn-Content">
                    <button className="Learnbutton" onClick={handleLearn}>What did you LEARN</button>
                </div>
            </div>
        </div>
    )
}

export default Home;