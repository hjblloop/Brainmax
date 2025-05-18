import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import LEARNBlocks from './basic_materials/LEARNBlocks';
import { Link } from 'react-router-dom';
import SERVER_URL from '../config.ts';

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
        const recordedDates = await fetch(`${SERVER_URL}/api/getdates`);
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
            const response = await fetch(`${SERVER_URL}/api/learn/${formattedDate}`);
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
            const response = await fetch(`${SERVER_URL}/api/learn`, {
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
        <>
            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow z-50 flex items-center px-8 h-16">
                <div className="flex space-x-8">
                    <Link to="/" className="hover:underline font-bold">Home</Link>
                    <Link to="/LessonPlan" className="hover:underline">Lesson Plan</Link>
                    <Link to="/LEARN" className="hover:underline">Learn</Link>
                    <Link to="/gong" className="hover:underline">Gong</Link>
                </div>
            </nav>
            <div className="flex w-full min-h-screen">
                <div className="flex flex-row flex-1 items-stretch justify-center w-full bg-orange-200 text-black relative">
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        {!dateClicked ? (
                            <div className="flex flex-col justify center">
                                <h3 className="text-4xl bold justify-center">Select a Date:</h3>
                                {dates.map((date, index) => ( date ? (
                                    <button 
                                    key={index} 
                                    onClick={() => handleDateClicked(date)} 
                                    className="bg-blue-300 border-blue-700 text-xl font-bold border rounded-2 cursor-pointer"
                                    >
                                        {date}
                                    </button>
                                ) : (
                                    <div>Did not learn</div>
                                )
                                ))}
                            </div>
                        ) : (
                            <div className="text-3xl">
                                <h3>What I learned on {selectedDate}:</h3>
                                {retrievedLEARNData ? (
                                <div className="flex flex-col items-start">
                                    <p>L: {retrievedLEARNData.l}</p>
                                    <p>E: {retrievedLEARNData.e}</p>
                                    <p>A: {retrievedLEARNData.a}</p>
                                    <p>R: {retrievedLEARNData.r}</p>
                                    <p>N: {retrievedLEARNData.n}</p>
                                    <button 
                                        onClick={handleBackToDates} 
                                        className="rounded border-2 bg-blue-300 items-center cursor-pointer">
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
                    {/*Vertical divider */}
                    <div className="w-px bg-gray-400 mx-4 my-8"></div>
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        <div className="text-xl border-2 p-1 border-orange-300 bg-orange-300">{today}</div>
                        <div className="text-4xl">My LEARN</div>
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
                            <button 
                                className="rounded border border-blue-500 bg-blue-300 mt-3 text-2xl cursor-pointer" 
                                onClick={handleLEARNClick}>
                                Learned
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LEARN;