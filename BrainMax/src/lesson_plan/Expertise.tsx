import React, {useState} from 'react';
import {ExpertiseLevels, ExpertiseLevelsType, ExpertiseLevelProps} from './types.ts';

const Expertise: React.FC<ExpertiseLevelProps> = ({onChange, initialValue = null}) => {
    const [expertise, setExpertise] = useState<ExpertiseLevelsType | null>(initialValue);

    const handleExpertiseClick = (level: ExpertiseLevelsType) => {
        setExpertise(level);
        if (onChange) {
            onChange(level);
        }
    }

    const expertiseOptions = [
        { value: ExpertiseLevels.elementary, label: 'Beginner', color: 'bg-yellow-100 border-yellow-500' },
        { value: ExpertiseLevels.middle, label: 'Novice', color: 'bg-red-100 border-red-500'},
        { value: ExpertiseLevels.high, label: 'Intermediate', color: 'bg-green-100 border-green-500'},
        { value: ExpertiseLevels.undergrad, label: 'Advanced', color: 'bg-blue-100 border-blue-500'},
        { value: ExpertiseLevels.grad, label: 'Graduate', color: 'bg-purple-100 border-purple-500'},
      ];
    
      return (
        <div>
            <p>
                What is your level of expertise? 
            </p>
            <div className="flex flex-row space-x-4 my-4">
            {expertiseOptions.map((expertiseOption) => (
                <div 
                key={expertiseOption.value}
                onClick={() => handleExpertiseClick(expertiseOption.value)}
                className={`
                    flex items-center justify-center
                    w-40 h-16 rounded-md cursor-pointer
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