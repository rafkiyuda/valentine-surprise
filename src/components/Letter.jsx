import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';

const Letter = ({ onOpenMemories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullView, setIsFullView] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            setIsFullView(true);
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden relative">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-white pointer-events-none -z-10"></div>

            {!isFullView ? (
                <div className="transform scale-110 md:scale-125">
                    <div className="relative w-80 h-52 cursor-pointer group perspective-1000" onClick={handleOpen}>

                        {/* Envelope Shadow */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-md rounded-[100%]"></div>

                        {/* Envelope Body (Back) */}
                        <div className="absolute inset-0 bg-rose-500 rounded-lg shadow-2xl flex items-end justify-center overflow-hidden">
                            {/* Letter Inside (Hidden part) */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={isOpen ? { y: -120 } : { y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="absolute bottom-2 w-[90%] h-[90%] bg-white rounded-lg p-4 shadow-sm z-10 flex flex-col gap-2"
                            >
                                <div className="w-full h-3 bg-pink-100 rounded-full"></div>
                                <div className="w-full h-3 bg-pink-100 rounded-full"></div>
                                <div className="w-2/3 h-3 bg-pink-100 rounded-full"></div>
                            </motion.div>
                        </div>

                        {/* Envelope Front Folds (Left/Right/Bottom) */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute bottom-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[110px] border-b-rose-600"></div>
                            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-rose-400 border-b-[104px] border-b-transparent"></div>
                            <div className="absolute top-0 right-0 w-0 h-0 border-r-[160px] border-r-rose-400 border-b-[104px] border-b-transparent"></div>
                        </div>

                        {/* Envelope Flap (Top) - The animating part */}
                        <motion.div
                            initial={{ rotateX: 0 }}
                            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-1/2 origin-top z-30"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-rose-500 rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                        </motion.div>

                        {/* Seal / Heart */}
                        {!isOpen && (
                            <motion.div
                                layoutId="seal"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
                            >
                                <div className="w-14 h-14 bg-red-600 rounded-full border-4 border-red-700 shadow-lg flex items-center justify-center">
                                    <span className="text-2xl drop-shadow-md">💌</span>
                                </div>
                            </motion.div>
                        )}

                        <div className="absolute -bottom-20 left-0 right-0 text-center text-rose-500 font-custom text-xl animate-bounce">
                            ✨ Tap to Open ✨
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-2xl relative border-4 border-pink-200 max-w-2xl w-full mx-4"
                >
                    <button
                        onClick={() => setIsFullView(false)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors"
                    >
                        <span className="text-sm uppercase font-bold tracking-widest border-b-2 border-transparent hover:border-pink-300">Close</span>
                    </button>

                    <MailOpen className="text-pink-400 mx-auto mb-6 drop-shadow-sm" size={56} />

                    <div className="prose prose-pink mx-auto font-serif text-lg md:text-xl leading-relaxed text-gray-700 max-h-[60vh] overflow-y-auto custom-scrollbar px-2">
                        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-pink-500 first-letter:float-left first-letter:mr-2">
                            My Dearest Valentine,
                        </p>
                        <br />
                        <p>
                            As I put this digital letter together, I find myself thinking about all the little moments that make us, "us".
                            Even though we might be apart right now, or simply unable to see each other as much as we'd like,
                            I want you to know that you are always on my mind.
                        </p>
                        <br />
                        <p>
                            This website is just a small token of my appreciation for you. I hope the silly game made you smile
                            and the photos brought back some warm memories. I'm looking forward to the day we can celebrate
                            properly, face to face.
                        </p>
                        <br />
                        <p>
                            Until then, know that I'm cheering for you, missing you, and loving you.
                            Happy Valentine's Day!
                        </p>
                        <br />
                        <p className="text-right font-bold text-pink-600 font-handwriting text-2xl mt-8">
                            — With all my love ❤️
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-center gap-4">
                        <button
                            onClick={onOpenMemories}
                            className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-pulse"
                        >
                            See Our Memories 📸
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Letter;
