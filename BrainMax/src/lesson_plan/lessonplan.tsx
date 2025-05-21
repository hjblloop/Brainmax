import {useState, useEffect} from 'react';
import './lessonplan.css';
import SERVER_URL from '../../config.ts';
import { Link } from 'react-router-dom';
import LessonPlanPage from './LessonPlanPage.tsx';
import CreateLessonPage from './CreateLessonPage.tsx';
import ViewLessonPlan from './ViewLessonPlan.tsx';
import ViewQuestions from './ViewQuestions.tsx';
import AskAI from '../AI/AI.tsx';

const LessonPlan = () => {
    const [view, setView] = useState("lessonPlanPage");
    const [fetchedSubjects, setFetchedSubjects] = useState<{ name: string; id: number}[]>([]);
    const [topics, setTopics] = useState<{id: number; name: string; expertise: string}[]>([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [fetchedQuestions, setFetchedQuestions] = useState([]);
    const [topicName, setTopicName] = useState<string>("");
    const [topicExpertise, setTopicExpertise] = useState<string>("");

    const username = localStorage.getItem('username');

    const handleBackToLessonPlan = () => {
        setView("lessonPlanPage");
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            const res = await fetch(`${SERVER_URL}/api/getsubjects?username=${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const subjects: { name: string; id: number}[] = await res.json();
            console.log("subjects: ", subjects);
            setFetchedSubjects(subjects);
        }
        fetchSubjects();
        console.log("Fetched lesson plan: ", fetchedSubjects);
    }, []);

    const handleGoToLessonPlan = () => {
        setView("createLessonPlan");
    };

    const handleSubjectClick = async (subjectId: number, subject: string) => {
        const response = await fetch(`${SERVER_URL}/api/gettopics?subjectId=${subjectId}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        });
        const fetchedTopics = await response.json();
        if (response.ok){
            setTopics(fetchedTopics);
            setSelectedSubject(subject);
            setView("viewLessonPlan");
        }
    };

    const handleViewQuestions = async (topicId: number, topicName: string, topicExpertise: string) => {
        const response = await fetch(`${SERVER_URL}/api/getquestions?topicId=${topicId}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok){
            setTopicName(topicName);
            setTopicExpertise(topicExpertise);
            setFetchedQuestions(await response.json());
            setView("viewQuestions");
        }
    };

    const handleGenerateQuestions = async (topic: string, expertise: string, subject: string) => {
        try {
            const generatedQuestions = await AskAI(subject, expertise, topic);
            const questionsList = generatedQuestions.split('\n');
            saveQuestions(questionsList, subject, topic, expertise);
        } catch (err: any) {
            console.log("Error generating questions: ", err)
        }
    };

    async function saveQuestions(questionsList: string[], subject: string, topic: string, expertise: string) {
        try {
            await fetch(`${SERVER_URL}/api/savequestions`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "questionsList": questionsList,
                    "expertise": expertise,
                    "subject": subject,
                    "topic": topic,
                    "username": username
                }),
            });
        } catch (err: any){
            console.log("Error saving questions: ", err)
        }
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

            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-2xl w-full rounded-2xl bg-[#fcd9bd] max-w-screen-xl flex flex-col items-center p-6 relative">
                    {view === "lessonPlanPage" && <LessonPlanPage 
                        onCreateLessonPlan={handleGoToLessonPlan} 
                        onSubjectClick={handleSubjectClick} 
                        fetchedSubjects={fetchedSubjects} />}
                    {view === "createLessonPlan" && <CreateLessonPage 
                        handleBackToLessonPlan={handleBackToLessonPlan}/>}
                    {view === "viewLessonPlan" && <ViewLessonPlan 
                        subject={selectedSubject} 
                        topics={topics}
                        handleBackToLessonPlan={handleBackToLessonPlan}
                        handleViewQuestions={handleViewQuestions}/>}
                    {view === "viewQuestions" && <ViewQuestions 
                        fetchedQuestions={fetchedQuestions}
                        subject={selectedSubject}
                        expertise={topicExpertise}
                        topicName={topicName}
                        handleGenerateQuestions={handleGenerateQuestions}
                        handleBackToLessonPlan={handleBackToLessonPlan}/>}
                </div>
            </div>
        </>
    )
};

export default LessonPlan;