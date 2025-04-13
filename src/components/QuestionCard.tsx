// QuestionCard.tsx
import { useState, useEffect } from 'react';
import { Question } from '../types/types';
import { FiArrowRight } from 'react-icons/fi';

interface QuestionCardProps {
    question: Question;
    onNext: (answers?: string[]) => void;
    onSelectionChange: (selected: string[]) => void;
    currentQuestion: number;
    totalQuestions: number;
}

const QuestionCard = ({
    question,
    onNext,
    onSelectionChange,
    currentQuestion: _currentQuestion,
    totalQuestions: _totalQuestions
}: QuestionCardProps) => {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [availableWords, setAvailableWords] = useState<string[]>(question.options);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setSelectedWords([]);
        setAvailableWords(question.options);
        setIsComplete(false);
        onSelectionChange([]);
    }, [question]);

    const handleWordSelect = (word: string) => {
        const newSelectedWords = [...selectedWords, word];
        setSelectedWords(newSelectedWords);
        setAvailableWords(availableWords.filter(w => w !== word));
        setIsComplete(newSelectedWords.length === (question.question.match(/______+/g)?.length || 0));
        onSelectionChange(newSelectedWords);
    };

    const handleWordRemove = (index: number) => {
        const removedWord = selectedWords[index];
        const newSelectedWords = selectedWords.filter((_, i) => i !== index);
        setSelectedWords(newSelectedWords);
        setAvailableWords([...availableWords, removedWord]);
        setIsComplete(false);
        onSelectionChange(newSelectedWords);
    };

    const handleNext = () => onNext(selectedWords);

    const renderQuestionWithBlanks = () => {
        const parts = question.question.split(/(______+)/g);
        let blankCounter = 0;

        return parts.map((part, index) => {
            if (/^_+$/.test(part)) {
                const word = selectedWords[blankCounter];
                const element = word ? (
                    <button
                        onClick={() => handleWordRemove(blankCounter)}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 mx-1"
                    >
                        {word}
                    </button>
                ) : (
                    <span className="inline-block w-20 h-6 border-b-2 border-gray-300 mx-1"></span>
                );
                blankCounter++;
                return <span key={index}>{element}</span>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-lg mb-6">Select the missing words in the correct order</p>

            <div className="text-lg leading-8 mb-8">{renderQuestionWithBlanks()}</div>

            <div className="flex flex-wrap gap-2 mb-8">
                {availableWords.map(word => (
                    <button
                        key={word}
                        onClick={() => handleWordSelect(word)}
                        className="px-3 py-1 border border-blue-300 rounded hover:bg-blue-50"
                    >
                        {word}
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!isComplete}
                    className={`p-2 rounded-full ${isComplete
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <FiArrowRight className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default QuestionCard;
