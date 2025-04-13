import { useNavigate } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { MdEditNote } from 'react-icons/md';


const LandingScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#F8F8F8]">
            {/* Header with centered title and right-aligned three-dot menu */}
            <header className="w-full h-[72px] flex items-center justify-between px-10 fixed top-0 left-0 z-10 bg-white bg-opacity-80 backdrop-blur-[50px] shadow-[0_2px_36px_rgba(0,0,0,0.08)]">

                {/* Empty div to balance the layout */}
                <div className="w-6"></div>

                {/* Centered title */}
                <h1 className="text-[18px] font-semibold text-[#333333]">
                    Sentence Construction
                </h1>

                {/* Three-dot menu icon (top right) */}
                <FiMoreVertical className="text-[20px] text-[#333333]" />
            </header>

            {/* Main Content (unchanged) */}
            <main className="pt-[136px] pb-10 flex justify-center px-4">
                <div className="w-full max-w-[627px] bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-12 flex flex-col">
                    {/* Title Section */}
                    <div className="flex justify-center mb-6">
                        <MdEditNote className="w-[72px] h-[72px] text-[#333333]" />
                    </div>
                    <div className="text-center mb-16">
                        <h1 className="text-[40px] font-bold text-[#333333] mb-6 leading-[48px]">Sentence Construction</h1>
                        <p className="text-[18px] text-[#666666] leading-[28px]">
                            Select the correct words to complete the sentence by arranging the provided options in the right order.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="flex justify-around mb-[72px]">
                        <div className="text-center">
                            <p className="text-[14px] text-[#666666] mb-2">Time Per Question</p>
                            <p className="text-[20px] font-medium text-[#333333]">30 sec</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[14px] text-[#666666] mb-2">Total Questions</p>
                            <p className="text-[20px] font-medium text-[#333333]">10</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[14px] text-[#666666] mb-2">Coins</p>
                            <p className="text-[20px] font-medium text-[#FFD700]">● 0</p>
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex justify-between gap-4">
                        <button className="flex-1 py-3 bg-[#F1F1F1] text-[#333333] rounded-[12px] hover:bg-[#E5E5E5] transition-colors text-[16px] font-medium">
                            Back
                        </button>
                        <button
                            onClick={() => navigate('/quiz')}
                            className="flex-1 py-3 bg-[#4c6bcb] text-white rounded-[12px] hover:bg-[#43A047] transition-colors text-[16px] font-medium"
                        >
                            Start
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingScreen;