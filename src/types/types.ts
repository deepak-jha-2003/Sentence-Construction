export interface Question {
    questionId: string;
    question: string;
    questionType: string;
    answerType: string;
    options: string[];
    correctAnswer: string[];
}

export interface TestData {
    status: string;
    data: {
        testId: string;
        questions: Question[];
    };
    message: string;
}

export interface UserAnswer {
    questionId: string;
    answers: string[];
    isCorrect: boolean;
}