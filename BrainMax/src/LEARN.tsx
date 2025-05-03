import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LEARNBlocks from './basic_materials/LEARNBlocks';
import './LEARN.css';

const LEARN = () => {
    const [LEARN, setLEARN] = useState({
        L: '',
        E: '',
        A: '',
        R: '',
        N: ''
    });
    const [animate, setAnimate] = useState(false);

    const handleMoveLine = () => {
        setAnimate(true);

        setTimeout(() => {
            setAnimate(false);
        }, 5000);
    };

    const handleLEARNChange = (letter: string, value: string) => {
        setLEARN((prev) => ({
            ...prev,
            [letter]: value,
        }));
    };

    const today = new Date().toISOString().split('T')[0];

    const handleLEARNClick = async () => {
        const LEARNData = {
            ...LEARN,
            date: today,
        };

        try {
            const response = await fetch('http://localhost:5001/api/learn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(LEARNData),
            });

            if (response.ok) {
                alert('Thanks for learning!');
            } else {
                alert('Oops!!!!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('couldnt connect to server');
        }
    };

    const navigateToHome = useNavigate();
    const handleHome = () => {
        navigateToHome('/');
    };

    return (
        <div className="LEARN">
            <div className="date-box">{today}</div>
            <button onClick={handleHome}>Back To Home</button>
            <LEARNBlocks 
                letter="L" 
                explanation="What did you learn?" 
                onChange={(value: string) => handleLEARNChange('L', value)}/>
            <LEARNBlocks 
                letter="E" 
                explanation="What did you enjoy?"
                onChange={(value: string) => handleLEARNChange('E', value)} />
            <LEARNBlocks 
                letter="A" 
                explanation="What did you appreciate?"
                onChange={(value: string) => handleLEARNChange('A', value)} />
            <LEARNBlocks 
                letter="R" 
                explanation="What will you remember from today?"
                onChange={(value: string) => handleLEARNChange('R', value)} />
            <LEARNBlocks 
                letter="N" 
                explanation="What will you do next?"
                onChange={(value: string) => handleLEARNChange('N', value)} />
            <button className="LEARN-button" onClick={handleLEARNClick}>Learned</button>
        </div>
    );
}

export default LEARN;