import { useNavigate, useLocation } from 'react-router-dom';
import { Question, UserAnswer } from '../types/types';
import { FiArrowLeft, FiMoreVertical } from 'react-icons/fi';

const ResultsScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { questions = [], userAnswers = [] } = (location.state as {
        questions: Question[];
        userAnswers: UserAnswer[];
    }) || {};

    const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
    const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 10) : 0;

    return (
        <div className="relative min-h-screen bg-white text-gray-800">
            {/* Header with left arrow, title, and menu icon */}
            <header className="w-full h-[72px] flex items-center justify-between px-10 fixed top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur-[50px] shadow-[0_2px_36px_rgba(0,0,0,0.08)]">
                {/* Back Arrow */}
                <button onClick={() => navigate(-1)} className="text-[20px] text-[#333333]">
                    <FiArrowLeft />
                </button>

                {/* Centered Title */}
                <h1 className="text-[18px] font-semibold text-[#333333]">
                    Sentence Construction
                </h1>

                {/* Three-dot Menu Icon */}
                <FiMoreVertical className="text-[20px] text-[#333333]" />
            </header>

            {/* Main content */}
            <main className="pt-[96px] pb-10 px-4 flex flex-col items-center">
                {/* Score Section */}
                <div className="text-center mb-10 max-w-2xl">
                    <div className="text-green-600 text-5xl font-bold mb-2">{score}</div>
                    <div className="text-md font-medium text-gray-700 mb-4">Overall Score</div>
                    <p className="text-gray-600 max-w-xl mx-auto mb-6">
                        While you correctly formed several sentences, there are a couple of areas where
                        improvement is needed. Pay close attention to sentence structure and word placement
                        to ensure clarity and correctness. Review your responses below for more details.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50"
                    >
                        Go to Dashboard
                    </button>
                </div>

                {/* Result Cards */}
                <div className="space-y-6 w-full max-w-2xl">
                    {questions.map((question, index) => {
                        const userAnswer = userAnswers[index] || { answers: [], isCorrect: false };
                        const correctAnswer = question.correctAnswer;

                        return (
                            <div key={question.questionId} className="bg-white shadow rounded-xl p-6">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-semibold text-gray-500">Prompt</span>
                                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${userAnswer.isCorrect
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {userAnswer.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>

                                {/* User Answer */}
                                <p className="text-gray-800 font-medium mb-2">Your Answer:</p>
                                <div className="bg-gray-50 p-4 rounded-md text-gray-800">
                                    {question.question.split('_____________').map((part, i) => (
                                        <span key={i}>
                                            {part}
                                            {i < userAnswer.answers.length && (
                                                <span className={`font-semibold mx-1 ${userAnswer.answers[i] === correctAnswer[i]
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                    }`}>
                                                    {userAnswer.answers[i] || '_____'}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>

                                {/* Correct Answer (if needed) */}
                                {!userAnswer.isCorrect && (
                                    <>
                                        <p className="text-gray-800 font-medium mt-4 mb-2">Correct Answer:</p>
                                        <div className="bg-green-50 p-4 rounded-md text-green-800">
                                            {question.question.split('_____________').map((part, i) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < correctAnswer.length && (
                                                        <span className="font-semibold mx-1 text-green-700">
                                                            {correctAnswer[i]}
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default ResultsScreen;
