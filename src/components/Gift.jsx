import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift as GiftIcon, Heart, Coffee, Smile } from 'lucide-react';

const Gift = () => {
    const [openedGifts, setOpenedGifts] = useState([]);

    const gifts = [
        { id: 1, label: 'Running Low?', icon: <Coffee size={48} className="text-amber-700" />, content: 'Here is unlimited Coffee! ☕' },
        { id: 2, label: 'Need a hug?', icon: <Heart size={48} className="text-red-500" />, content: 'Sending you a big warm Hug! 🤗' },
        { id: 3, label: 'Bad day?', icon: <Smile size={48} className="text-yellow-500" />, content: 'Remember to always Smile! 😊' },
    ];

    const handleOpen = (id) => {
        if (!openedGifts.includes(id)) {
            setOpenedGifts([...openedGifts, id]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto p-4">
            <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-12 font-custom text-center">
                A Little Gift For You 🎁
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full place-items-center">
                {gifts.map((gift, index) => (
                    <div key={gift.id} className="flex flex-col items-center gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOpen(gift.id)}
                            className="relative cursor-pointer"
                        >
                            {!openedGifts.includes(gift.id) ? (
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl border-4 border-pink-200 flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56"
                                >
                                    <GiftIcon size={64} className="text-pink-500 mb-2" />
                                    <span className="text-pink-400 font-bold text-sm uppercase tracking-wider">Tap to Open</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-inner border-2 border-pink-100 flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56 text-center"
                                >
                                    <div className="mb-4 animate-bounce">
                                        {gift.icon}
                                    </div>
                                    <p className="text-gray-700 font-medium font-handwriting text-lg leading-tight">
                                        {gift.content}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                        <p className="text-pink-400 font-bold font-handwriting text-xl">
                            {gift.label}
                        </p>
                    </div>
                ))}
            </div>

            {openedGifts.length === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-2xl text-pink-600 font-custom mb-4">Happy Valentine's Day! ❤️</p>
                    <p className="text-gray-500">I hope you liked your surprises!</p>
                </motion.div>
            )}
        </div>
    );
};

export default Gift;
