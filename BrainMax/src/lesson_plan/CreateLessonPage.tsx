import {useState} from 'react';
import Expertise from './Expertise.tsx';
import {ExpertiseLevelsType} from './types.ts';
import SERVER_URL from '../config.ts';

const CreateLessonPage = ({handleBackToLessonPlan}: 
    {handleBackToLessonPlan: () => void}) => {
    const [subjectButtonClicked, setSubjectButtonClicked] = useState(false);
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [topicsList, setTopicsList] = useState<string[]>([]);
    const [addError, setAddError] = useState<boolean>(false);
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(null);

    const username = localStorage.getItem('username');

    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };

    const handleSubjectSubmit = () => {
        if (subject) {
            setSubjectButtonClicked(true);
            console.log("Subject selected:", subject);
        }
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(event.target.value);
    };

    const handleRemoveTopic = (index: number) => {
        const newTopicsList = [...topicsList];
        newTopicsList.splice(index, 1);
        setTopicsList(newTopicsList);
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

    const handleCreateLessonPlan = async () => {
        if (topicsList.length > 0 ) {
            const response = await fetch(`${SERVER_URL}/api/createlessonplan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'subject': subject,
                    'topics': topicsList,
                    'expertise': expertise,
                    'username': username
                })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                console.log("Lesson plan created successfully");
                handleBackToLessonPlan();
            }
        }
    };

    return (
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
                            onClick={handleSubjectSubmit} 
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
                        <button onClick={handleAddClick} className="ml-2 bg-blue-600 text-white px-4 py-2 shadow hover:bg-blue-700 transition cursor-pointer">Add Topic</button>
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
    )
};

export default CreateLessonPage;