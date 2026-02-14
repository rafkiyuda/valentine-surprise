import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartCrack, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Proposal = ({ onAccept }) => {
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPos({ x, y });
        setScale(prev => Math.max(0.5, prev - 0.1)); // Shrink button on each attempt
    };

    const handleYes = () => {
        // Trigger confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f43f5e', '#be185d'] // Pink/Rose theme
        });

        // Small delay before transition for effect
        setTimeout(onAccept, 500);
    };

    return (
        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-8 p-8 md:p-10 bg-white/90 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] shadow-2xl max-w-xl mx-auto text-center border-4 border-white/50 ring-4 ring-pink-100 overflow-hidden w-full max-w-[90vw]">

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0">
                <div className="absolute top-10 left-10 text-pink-300 animate-bounce delay-100">❤️</div>
                <div className="absolute bottom-10 right-10 text-pink-300 animate-bounce delay-700">💕</div>
                <div className="absolute top-1/2 right-5 text-pink-300 animate-pulse delay-300">💖</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-pink-600 font-custom leading-tight drop-shadow-sm z-10 px-4">
                Will you be my Valentine?
            </h1>

            <div className="my-6 md:my-8 relative z-10 group">
                <div className="absolute inset-0 bg-pink-200 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img
                    src="/assets/proposal.png"
                    alt="Me holding flowers for you"
                    className="w-60 h-60 md:w-72 md:h-72 object-cover rounded-3xl shadow-xl border-4 border-white transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-500"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="text-8xl md:text-9xl animate-pulse">💐🥺</div>';
                    }}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-center w-full justify-center min-h-[100px] z-10">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="px-10 py-4 md:px-14 md:py-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-2xl md:text-3xl font-bold rounded-full shadow-[0_10px_20px_rgba(236,72,153,0.3)] transition-all flex items-center gap-2"
                >
                    <span>Yes, I will!</span> 💖
                </motion.button>

                <motion.button
                    animate={{ x: noBtnPos.x, y: noBtnPos.y, scale }}
                    onHoverStart={moveNoButton}
                    onClick={moveNoButton}
                    className="px-8 py-3 md:px-10 md:py-5 bg-gray-200 text-gray-500 text-xl font-bold rounded-full shadow-inner hover:bg-gray-300 transition-colors"
                >
                    No way
                </motion.button>
            </div>

            <p className="text-pink-400 italic text-sm mt-3 md:mt-4 font-handwriting z-10 opacity-60">
                (There is only one right answer... 💘)
            </p>
        </div>
    );
};

export default Proposal;
