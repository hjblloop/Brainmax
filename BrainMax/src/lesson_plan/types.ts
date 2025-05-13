export const ExpertiseLevels = {
    elementary: 'elementary school',
    middle: 'middle school',
    high: 'high school',
    undergrad: "undergraduate",
    grad: "graduate"
} as const; // Define the type for expertise levels

export type ExpertiseLevelsType = typeof ExpertiseLevels[keyof typeof ExpertiseLevels];

export interface ExpertiseLevelProps {
    onChange?: (value: ExpertiseLevelsType) => void;
    initialValue?: ExpertiseLevelsType | null;
}