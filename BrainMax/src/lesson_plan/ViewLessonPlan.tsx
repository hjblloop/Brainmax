const ViewLessonPlan = ({subject, topics, handleBackToLessonPlan, handleViewQuestions}: 
    {subject: string, topics: {id: number, name: string, expertise: string}[], 
    handleBackToLessonPlan: () => void, handleViewQuestions: (topicId: number, topicName: string, topicExpertise: string) => void}) => {
    
    return (
    <div>
        <button
            className="rounded border-2 bg-blue-700 cursor-pointer" 
            onClick={handleBackToLessonPlan}>
            Back To Lesson Plan
        </button>
        <p 
            className="font-bold text-3xl text-blue-700">
            Subject: {subject}
        </p>
        {topics.map((topic) => (
            <div>
                <button
                    className="border-2 cursor-pointer bg-blue-400 rounded-2 mt-2 p-2"
                    onClick={() => handleViewQuestions(topic["id"], topic["name"], topic["expertise"])}>
                    View questions for {topic["name"]}
                </button>
            </div>
        ))}
    </div>
    )
};

export default ViewLessonPlan;