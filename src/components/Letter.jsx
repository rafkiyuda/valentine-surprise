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
        }, 800); // Wait for animation
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] w-full px-4 overflow-hidden">

            {!isFullView ? (
                <div className="relative w-72 h-48 cursor-pointer group" onClick={handleOpen}>

                    {/* Envelope Body */}
                    <motion.div
                        layoutId="envelope-body"
                        className="absolute inset-0 bg-pink-500 rounded-lg shadow-xl z-20 flex items-end justify-center overflow-hidden"
                    >
                        {/* Envelope V-shape fold */}
                        <div className="w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-b-[96px] border-b-pink-600/50 absolute bottom-0"></div>
                    </motion.div>

                    {/* Envelope Flap */}
                    <motion.div
                        initial={{ rotateX: 0 }}
                        animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 origin-top z-30"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="absolute inset-0 bg-pink-600 rounded-t-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
                    </motion.div>

                    {/* Seal / Heart */}
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-red-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-red-400"
                        >
                            <span className="text-xl">💌</span>
                        </motion.div>
                    )}

                    {/* The Letter Inside (Preview) */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={isOpen ? { y: -100 } : { y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute inset-x-4 top-2 bottom-2 bg-white rounded-sm shadow-sm z-10 p-4 flex flex-col items-center justify-start text-xs text-gray-400"
                    >
                        <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                    </motion.div>

                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-pink-400 font-handwriting text-lg animate-bounce whitespace-nowrap">
                        Click to open
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 md:p-12 rounded-lg shadow-2xl relative border-4 border-pink-100 max-w-2xl w-full"
                >
                    <button
                        onClick={() => setIsFullView(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-pink-500"
                    >
                        <span className="text-xs uppercase font-bold tracking-widest">Close</span>
                    </button>

                    <MailOpen className="text-pink-300 mx-auto mb-6" size={48} />

                    <div className="prose prose-pink mx-auto font-serif text-lg leading-relaxed text-gray-700">
                        <p>My Dearest Valentine,</p>
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
                        <p className="text-right font-bold text-pink-600">
                            — With all my love
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-center gap-4">
                        <button
                            onClick={onOpenMemories}
                            className="w-full py-4 bg-pink-500 text-white rounded-full font-bold shadow-md hover:bg-pink-600 transition-colors animate-pulse mb-4"
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
