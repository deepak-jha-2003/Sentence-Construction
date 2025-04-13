import { useEffect, useState } from 'react';

interface TimerProps {
    initialTime: number;
    onTimeUp: () => void;
    isActive: boolean;
}

const Timer = ({ initialTime, onTimeUp, isActive }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, onTimeUp]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={`text-lg font-medium ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'
            }`}>
            Time: {formatTime(timeLeft)}
        </div>
    );
};

export default Timer;