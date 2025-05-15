import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import 'tailwindcss';
//import '../index.css';
import Expertise from './Expertise.tsx'
import {ExpertiseLevelsType} from './types.ts';
import SERVER_URL from '../../config.ts';

const LessonPlan = () => {
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(null);
    const [subject, setSubject] = useState<string>("");
    const [subjectButtonClicked, setSubjectButtonClicked] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>("");
    const [topicsList, setTopicsList] = useState<string[]>([]);
    const [addError, setAddError] = useState<boolean>(false);

    const navigateToHome = useNavigate();
    const handleBackToHome = () => {
        navigateToHome('/');
    };

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleSubjectClick = () => {
        setSubjectButtonClicked(true);
        if (subject) {
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

    const handleSubmitTopics = async () => {
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

    const handleRemoveTopic = (index: number) => {
        const newTopicsList = [...topicsList];
        newTopicsList.splice(index, 1);
        setTopicsList(newTopicsList);
    };

    return (
        <div>
            <button 
                type="button"
                className="absolute top-6 left-6 bg-green-600 text-black px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                onClick={handleBackToHome}>Back to Home
            </button>
            <div className="text-2xl w-full max-w-screen-xl flex flex-col items-center justify-center h-screen relative">
                <h1 className="text-2xl font-bold text-center">Lesson Plan</h1>
                <div className="LessonPlan-Something">
                    {!subjectButtonClicked ? (
                        <div className="Subject">
                            <p>What subject are you studying?</p>
                            <input type="text" onChange={handleSubjectChange} placeholder="e.g. Algebra, Organic Chemistry, Anatomy" className="border-2 border-gray-300 rounded-md p-2"/>
                            <button onClick={handleSubjectClick} className="Subject-Button">Select</button>
                            <div className="Error-Message">
                            {subject && subjectButtonClicked ? "" : "Please select a subject"}
                        </div>
                    </div>) : (
                        <div>
                            <div className="Topics">
                            <p>What topics are you studying in {subject}</p>
                            <input type="text" value= {topic} onChange={handleTopicChange} placeholder="e.g. Quadratic Equations, Organic Reactions, Cell Biology" className="border-2 border-gray-300 rounded-md p-2"/>
                            <button onClick={handleAddClick} className="Add-Button">Add More</button>
                            {addError && <div className="Error-Message">Please enter a topic</div>}
                            <button onClick={handleSubmitTopics} className="Submit-Button">Submit</button>
                        </div>
                        <div className="Topics-List">
                            <h3>Topics:</h3>
                            {topicsList.length > 0 ? (
                                <ul>
                                    {topicsList.map((topic, index) => (
                                        <li key={index} className="Topic-Items">
                                            {topic}
                                            <button onClick={() => {handleRemoveTopic(index)}} className="Remove-Button">Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            ): (
                                <></>
                            )}
                        </div>
                        </div>
                    )}
                    
                </div>
                <Expertise onChange={setExpertise} initialValue={expertise}/>
                <button className="CreateLessonPlanButton">Create a Lesson Plan</button>
            </div>
        </div>
    )
};

export default LessonPlan;