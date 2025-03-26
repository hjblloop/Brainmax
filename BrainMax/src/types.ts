export const ExpertiseLevels = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Advanced: 'Advanced'
} as const; // Define the type for expertise levels

export type ExpertiseLevelsType = typeof ExpertiseLevels[keyof typeof ExpertiseLevels];

export interface ExpertiseLevelProps {
    onChange?: (value: ExpertiseLevelsType) => void;
    initialValue?: ExpertiseLevelsType | null;
}