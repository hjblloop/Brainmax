import {useState, useEffect} from 'react';
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
    const [dateClicked, setDateClicked] = useState(false);

    const [dates, setDates] = useState(['']);
    const [selectedDate, setSelectedDate] = useState('');  

    const [retrievedLEARNData, setRetrievedLEARNData] = useState<{
        l: string;
        e: string;
        a: string;
        r: string;
        n: string;
    } | null>(null);

    const handleLEARNChange = (letter: string, value: string) => {
        setLEARN((prev) => ({
            ...prev,
            [letter]: value,
        }));
    };

    useEffect(() => {
        const fetchDates = async () => {
        const dateList = [];
        const recordedDates = await fetch('http://localhost:5001/api/getdates');
        const recordedDatesData = await recordedDates.json();
        for (let i=0; i < recordedDatesData.length; i++) {
                const date = new Date(recordedDatesData[i].date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                dateList.push(date);
            }
            setDates(dateList);
        };
        fetchDates();
    },[])

    const handleDateClicked = async (date: string) => {
        try {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            const response = await fetch(`http://localhost:5001/api/learn/${formattedDate}`);
            if (response.ok) {
                const data = await response.json();
                setRetrievedLEARNData(data);
                setLEARN({
                    L: data.l,
                    E: data.e,
                    A: data.a,
                    R: data.r,
                    N: data.n
                });
                setSelectedDate(date);
                setDateClicked(true);
            } else {
                alert('No data found');
            }
        } catch (error) {
            console.error('Error fetching LEARN data: ', error);
            alert('Error fetching LEARN data');
        }
    };

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const handleBackToDates = () => {
        setDateClicked(false);
        setRetrievedLEARNData(null);
    };

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
                alert('Error: ');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('couldnt connect to server');
        }
    };

    const navigateToHome = useNavigate();
    const handleHome = () => {
        navigateToHome('/');
    };

    return (
        <div className="LEARN-container">
            <div className="back-to-home">
                <button onClick={handleHome}>Back To Home</button>
            </div>
            <div className="LEARN">
                <div className="LEARN-left">
                    {!dateClicked ? (
                        <div className="date-list">
                        <h3>Select a Date:</h3>
                        {dates.map((date, index) => ( date ? (
                            <button 
                            key={index} 
                            onClick={() => handleDateClicked(date)} 
                            className="date-button"
                            >
                                {date}
                            </button>
                        ) : (
                            <div>Did not learn</div>
                        )
                        ))}
                    </div>
                    ) : (
                        <div className="retrieved-data">
                            <h3>What I learned on {selectedDate}:</h3>
                            {retrievedLEARNData ? (
                            <div className="retrieved-data">
                                <p>L: {retrievedLEARNData.l}</p>
                                <p>E: {retrievedLEARNData.e}</p>
                                <p>A: {retrievedLEARNData.a}</p>
                                <p>R: {retrievedLEARNData.r}</p>
                                <p>N: {retrievedLEARNData.n}</p>
                                <button onClick={handleBackToDates} className="back-button">
                                    Back to Dates
                                </button>
                            </div>
                            ) : (
                                <p>No data found</p>
                            )}
                        </div>
                    )

                    }
                </div>
                <div className="LEARN-divider"></div>
                <div className="LEARN-right">
                    <div className="LEARN-title">My LEARN</div>
                    <div className="date-box">{today}</div>
                    <div className="LEARN-blocks">
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
                            explanation="What will you remember?"
                            onChange={(value: string) => handleLEARNChange('R', value)} />
                        <LEARNBlocks 
                            letter="N" 
                            explanation="What will you do next?"
                            onChange={(value: string) => handleLEARNChange('N', value)} />
                        <button className="LEARN-button" onClick={handleLEARNClick}>Learned</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LEARN;