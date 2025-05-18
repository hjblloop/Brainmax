const LEARNBlocks = ({letter, explanation, onChange}: { letter: string, explanation: string, onChange: (value:string) => void }) => {
    return(
        <div className="mt-2">
            <span 
                className="text-2xl bolded">
                {letter}
            </span>
            <input 
                type="text" 
                placeholder={explanation}
                onChange={(e) => onChange(e.target.value)}
                className="w-64 h-12 text-lg ml-2 border rounded"/>
        </div>
    )
}

export default LEARNBlocks;