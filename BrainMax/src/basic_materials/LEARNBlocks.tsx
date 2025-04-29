const LEARNBlocks = ({letter, explanation, onChange}: { letter: string, explanation: string, onChange: (value:string) => void }) => {
    return(
        <div className="LEARN-blocks">
            {letter}
            <input 
                type="text" 
                placeholder={explanation} 
                className="LEARN-input" 
                onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default LEARNBlocks;