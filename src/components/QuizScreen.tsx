// QuizScreen.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchQuestions from '../hooks/useFetchQuestions';
import QuestionCard from './QuestionCard';
import { UserAnswer } from '../types/types';

const QuizScreen = () => {
    const { questions, loading, error } = useFetchQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentSelectedWords, setCurrentSelectedWords] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeLeft(30);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleNextQuestion(); // use currentSelectedWords
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex]);

    const handleNextQuestion = (answers?: string[]) => {
        const submittedAnswers = answers ?? currentSelectedWords;

        const newAnswer = {
            questionId: questions[currentQuestionIndex].questionId,
            answers: submittedAnswers,
            isCorrect: JSON.stringify(submittedAnswers) === JSON.stringify(questions[currentQuestionIndex].correctAnswer)
        };

        const updatedAnswers = [...userAnswers, newAnswer];
        setUserAnswers(updatedAnswers);
        setCurrentSelectedWords([]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/results', { state: { questions, userAnswers: updatedAnswers } });
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div className={`font-medium ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                        0:{timeLeft.toString().padStart(2, '0')}
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Quit
                    </button>
                </div>

                {/* Progress indicators */}
                <div className="flex gap-1 mb-6">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${index < currentQuestionIndex
                                ? 'bg-yellow-400'
                                : index === currentQuestionIndex
                                    ? 'bg-blue-500'
                                    : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    onNext={handleNextQuestion}
                    onSelectionChange={setCurrentSelectedWords}
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                />
            </div>
        </div>
    );
};

export default QuizScreen;
