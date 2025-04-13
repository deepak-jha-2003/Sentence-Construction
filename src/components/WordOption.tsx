interface WordOptionProps {
    word: string;
    onClick: (word: string) => void;
    isUsed: boolean;
}

const WordOption = ({ word, onClick, isUsed }: WordOptionProps) => {
    return (
        <button
            onClick={() => onClick(word)}
            disabled={isUsed}
            className={`px-4 py-2 rounded-lg border transition ${isUsed
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-blue-50 border-blue-300 cursor-pointer'
                }`}
        >
            {word}
        </button>
    );
};

export default WordOption;