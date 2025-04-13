import { useState, useEffect } from 'react';
import { Question, TestData } from '../types/types';
import sampleData from '../data/sample.json'; // Direct import

const useFetchQuestions = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            // Simulate API delay
            setTimeout(() => {
                const data: TestData = sampleData;
                if (data.status === "SUCCESS") {
                    setQuestions(data.data.questions);
                } else {
                    setError("Failed to load questions");
                }
                setLoading(false);
            }, 500);
        } catch (err) {
            setError('Failed to fetch questions');
            setLoading(false);
        }
    }, []);

    return { questions, loading, error };
};

export default useFetchQuestions;