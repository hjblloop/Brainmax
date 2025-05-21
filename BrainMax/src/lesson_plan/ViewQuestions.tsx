const ViewQuestions = ({fetchedQuestions, topicName, expertise, subject, handleBackToLessonPlan, handleGenerateQuestions}: 
    {fetchedQuestions: string[], topicName: string, expertise: string, subject: string,
        handleBackToLessonPlan: () => void, handleGenerateQuestions: (topicName:string, expertise: string, subject: string) => void}) => {
    return (
        <div className="flex flex-col">
            <button
                onClick={handleBackToLessonPlan}
                className="border-2 rounded bg-blue-500 cursor-pointer">
                Back to Lesson Plan
            </button>
            List of questions for {topicName}
            <div>
                {fetchedQuestions.length > 0 ? (
                    fetchedQuestions.map((question) => (
                    <div key={question}>
                        question: {question}
                    </div>))
                ) : (
                    <div>
                        looks like you don't have any questions.
                    </div>
                )}
                <button 
                    onClick={() => handleGenerateQuestions(topicName, expertise, subject)}
                    className="border-2 rounded bg-blue-500 cursor-pointer">
                    Generate Questions
                </button>
            </div>
        </div>
    )
};

export default ViewQuestions;