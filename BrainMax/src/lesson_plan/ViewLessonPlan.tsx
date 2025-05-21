const ViewLessonPlan = ({subject, topics, handleBackToLessonPlan, handleViewQuestions}: 
    {subject: string, topics: {id: number, name: string, expertise: string}[], 
    handleBackToLessonPlan: () => void, handleViewQuestions: (topicId: number, topicName: string, topicExpertise: string) => void}) => {
    
    return (
    <div>
        <button 
                onClick={handleBackToLessonPlan}
                className="text-sm absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                Back to Lesson Plans
            </button>
        <p 
            className="font-bold text-3xl text-blue-700">
            Subject: {subject}
        </p>
        {topics.map((topic) => (
            <div>
                <button
                    className="rounded cursor-pointer bg-red-400 mt-2 shadow-sm text-4xl p-2"
                    onClick={() => handleViewQuestions(topic["id"], topic["name"], topic["expertise"])}>
                    View questions for {topic["name"]}
                </button>
            </div>
        ))}
    </div>
    )
};

export default ViewLessonPlan;