const LessonPlanPage = ({ fetchedSubjects, onCreateLessonPlan, onSubjectClick }: 
    { fetchedSubjects: { name: string; id: number}[], onCreateLessonPlan: (goToLessonPlan: boolean) => void, onSubjectClick: (subjectId: number, subject:string) => void}) => {
    
    return(
        <div className="w-full flex flex-col items-center justify-center">
            {fetchedSubjects && (
                <div className="w-full max-w-lg">
                    <span className="font-semibold">Select a lesson plan:</span>
                        <div className="flex flex-col">
                            {fetchedSubjects.map((subject: { name: string; id: number }) => (
                                <button 
                                    className="rounded cursor-pointer bg-red-400 mt-2 shadow-sm text-4xl p-2"
                                    key={subject["id"]} onClick={() => onSubjectClick(subject["id"],subject["name"])}>{subject["name"]}
                                </button>
                            ))}
                        </div>
                    <div>
                </div>
            </div>
            )}
            <button
                onClick={() => onCreateLessonPlan(true)}
                className="mb-6 mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer">
                Create a Lesson Plan
            </button>
        </div>
    )
}

export default LessonPlanPage;