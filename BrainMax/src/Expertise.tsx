import React, {useState} from 'react';
import {ExpertiseLevels, ExpertiseLevelsType, ExpertiseLevelProps} from './types.ts';
import 'tailwindcss';

const Expertise: React.FC<ExpertiseLevelProps> = ({onChange, initialValue = null}) => {
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(initialValue);

    const handleExpertiseClick = (level: ExpertiseLevelsType) => {
        setExpertise(level);
        if (onChange) {
            onChange(level);
        }
    }

    const expertiseOptions = [
        { value: ExpertiseLevels.Beginner, label: 'Beginner', color: 'bg-green-100 border-green-500' },
        { value: ExpertiseLevels.Intermediate, label: 'Intermediate', color: 'bg-blue-100 border-blue-500'},
        { value: ExpertiseLevels.Advanced, label: 'Advanced', color: 'bg-red-100 border-red-500'},
      ];
    
      return (
        <div>
            <p>
                What is you level of expertise? 
            </p>
            <div className="flex flex-row space-x-4 my-4">
            {expertiseOptions.map((expertiseOption) => (
                <div 
                key={expertiseOption.value}
                onClick={() => handleExpertiseClick(expertiseOption.value)}
                className={`
                    flex items-center justify-center
                    w-24 h-16 rounded-md cursor-pointer
                    border-2 transition-all duration-200
                    ${expertise === expertiseOption.value
                        ? `${expertiseOption.color} border-opacity-100 font-medium`
                        : 'bg-gray-50 border-gray-300 border-opacity-50'
                    }
                    hover:shadow-md
                `}
                >
                {expertiseOption.label}
                </div>
                ))}
            </div>
        </div>
      )
}

export default Expertise;