const ViewQuestions = ({fetchedQuestions, topicName, topicId, expertise, subject, handleBackToLessonPlan, handleGenerateQuestionsLessonPlan}: 
    {fetchedQuestions: string[], topicName: string, topicId: number, expertise: string, subject: string,
        handleBackToLessonPlan: () => void, handleGenerateQuestionsLessonPlan: (topicId: number, topicName:string, expertise: string, subject: string) => void}) => {
        return (
        <div className="flex flex-col">
            <button 
                onClick={handleBackToLessonPlan}
                className="text-sm absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                Back to Lesson Plans
            </button>
            <div className="mt-8 flex flex-col">
                <span className="text-5xl text-blue-700 p-2 rounded">List of questions for {topicName}</span>
                <span className="text-3xl">Level: {expertise}</span>
                <div className="mt-4">
                    {fetchedQuestions[0] != null ? (
                        fetchedQuestions.map((question, index) => (
                        <div key={index} className="border mt-2 rounded bg-blue-200 border-blue-200 p-2">
                            {index + 1}: {question}
                        </div>))
                    ) : (
                        <div className="text-3xl">
                            Looks like you don't have any questions.
                        </div>
                    )}
                    <button 
                        onClick={() => handleGenerateQuestionsLessonPlan(topicId, topicName, expertise, subject)}
                        className="mb-6 mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                        Generate Questions
                    </button>
                </div>
            </div>
            
        </div>
    )
};

export default ViewQuestions;