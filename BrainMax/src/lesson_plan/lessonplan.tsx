import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './lessonplan.css';
import Expertise from './Expertise.tsx'
import {ExpertiseLevelsType} from './types.ts';
import SERVER_URL from '../../config.ts';
import { Link } from 'react-router-dom';

const LessonPlan = () => {
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(null);
    const [subject, setSubject] = useState<string>("");
    const [subjectButtonClicked, setSubjectButtonClicked] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>("");
    const [topicsList, setTopicsList] = useState<string[]>([]);
    const [addError, setAddError] = useState<boolean>(false);
    const [createLessonPlanClicked, setCreateLessonPlanClicked] = useState<boolean>(false);
    const [fetchedLessonPlan, setFetchedLessonPlan] = useState<any>(null);

    const navigateToHome = useNavigate();
    const handleBackToHome = () => {
        navigateToHome('/');
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleSubjectClick = () => {
        if (subject) {
            setSubjectButtonClicked(true);
            console.log("Subject selected:", subject);
        }
    };

    const handleAddClick = () => {
        if (topic) {
            setTopicsList([...topicsList, topic]);
            setTopic("");
            setAddError
        }
        else {
            setAddError(true);
        }
    }

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(event.target.value);
    };

    const handleCreateLessonPlan = async () => {
        if (topicsList.length > 0 ) {
            const response = await fetch(`${SERVER_URL}/api/createlessonplan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'subject': subject,
                    'topics': topicsList,
                    'expertise': expertise
                })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log("Lesson plan created successfully");
            }
        }
    }

    const handleBackToLessonPlan = () => {
        setCreateLessonPlanClicked(false);
        setSubjectButtonClicked(false);
        setSubject("");
        setTopicsList([]);
        setTopic("");
        setAddError(false);
    };

    const handleRemoveTopic = (index: number) => {
        const newTopicsList = [...topicsList];
        newTopicsList.splice(index, 1);
        setTopicsList(newTopicsList);
    };

    const handleCreateLessonPlanClicked = () => {
        setCreateLessonPlanClicked(true);
    };

    useEffect(() => {
        fetch(`${SERVER_URL}/api/getlessonplan`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => setFetchedLessonPlan(data))
        .catch(err => console.error('Failed to fetch lesson plan: ', err));
        console.log("Fetched lesson plan: ", fetchedLessonPlan);
    }, []);

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

            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-2xl w-full rounded-2xl bg-[#fcd9bd] max-w-screen-xl flex flex-col items-center p-6 relative">
                    {!createLessonPlanClicked ? (
                        <div className="w-full flex justify-center">
                            {fetchedLessonPlan && (
                                <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
                                    <h2 className="text-3xl font-bold mb-2">Fetched Lesson Plan</h2>
                                    <p><span className="font-semibold">Subject:</span> {fetchedLessonPlan.subject}</p>
                                    <p><span className="font-semibold">Expertise:</span> {fetchedLessonPlan.expertise}</p>
                                    <div>
                                    <span className="font-semibold">Topics:</span>
                                    <ul className="list-disc list-inside">
                                        {fetchedLessonPlan.topics && fetchedLessonPlan.topics.map((t: string, i: number) => (
                                            <li key={i}>{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            )}
                            <button
                                onClick={handleCreateLessonPlanClicked}
                                className="mb-6 mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                                Create a Lesson Plan
                            </button>
                        </div>
                    ) : (
                        <div className="text-2xl w-full rounded-2xl bg-[#fcd9bd] max-w-screen-xl flex flex-col items-center relative">
                            <button 
                                onClick={handleBackToLessonPlan}
                                className="text-sm absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                                Back to Lesson Plans
                            </button>
                            <h1 className="mt-6 text-7xl font-bold text-center">Creating Lesson Plan</h1>
                            <div className="w-full flex flex-col justify-center items-center">
                                {!subjectButtonClicked ? (
                                    <div>
                                        <p className="text-3xl">What subject are you studying?</p>
                                        <input type="text" 
                                            onChange={handleSubjectChange} 
                                            placeholder="e.g. Physics, Biology, Computer Science" 
                                            className="bg-white border-2 border-gray-300 rounded-md p-2 placeholder:text-sm"/>
                                        <button 
                                            onClick={handleSubjectClick} 
                                            className="ml-2 bg-blue-600 text-white rounded px-4 py-2 shadow hover:bg-blue-700 transition cursor-pointer">
                                            Select
                                            </button>
                                    </div>) : (
                                    <div>
                                        <div className="Topics">
                                        <p className="text-4xl">What <span className="font-bold text-blue-600">{subject}</span> topics are you learning?</p>
                                        <input type="text" value= {topic} onChange={handleTopicChange} 
                                            placeholder="e.g. Algebra, Quadratic Formula" 
                                            className="bg-white border-2 border-gray-300 rounded-md mt-2 p-2 placeholder:text-sm"/>
                                        <button onClick={handleAddClick} className="ml-2 bg-blue-600 text-white px-4 py-2 shadow hover:bg-blue-700 transition cursor-pointer">Add More</button>
                                        {addError && <div className="Error-Message">Please enter a topic</div>}
                                        </div>
                                        <div className="Topics-List">
                                            <h3 className="text-4xl font-bold">Topics:</h3>
                                            {topicsList.length > 0 ? (
                                                <ul>
                                                    {topicsList.map((topic, index) => (
                                                        <li key={index} className="flex items-center justify-center">
                                                            {topic}
                                                            <button 
                                                                title="Remove Topic"
                                                                onClick={() => {handleRemoveTopic(index)}} 
                                                                className="ml-2 w-6 h-6 border border-black rounded-none flex items-center justify-center cursor-pointer text-lg font-bold bg-white text-red-700 hover:bg-red-200 transition">
                                                                x
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ): (
                                                <></>
                                        )}
                                        </div>
                                    </div>
                                )}
                                <Expertise onChange={setExpertise} initialValue={expertise}/>
                                <button 
                                    onClick={handleCreateLessonPlan}
                                    className="mt-2 mb-6 bg-blue-600 text-white px-4 py-2 shadow hover:bg-blue-700 transition cursor-pointer">
                                    Create a Lesson Plan
                                    </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
};

export default LessonPlan;