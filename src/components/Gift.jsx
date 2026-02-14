import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift as GiftIcon, Heart, Coffee, Smile } from 'lucide-react';

const Gift = () => {
    const [openedGifts, setOpenedGifts] = useState([]);

    const gifts = [
        { id: 1, label: 'Running low on energy? 🔋', icon: <Coffee size={48} className="text-amber-600" />, content: 'Unlimited Coffee Dates ☕', sub: '(Valid whenever you need a boost!)' },
        { id: 2, label: 'Feeling overwhelmed? 🌧️', icon: <Heart size={48} className="text-rose-500" />, content: 'Warm Hugs & Cuddles 🐻', sub: '(Redeemable 24/7, No Expiration)' },
        { id: 3, label: 'Need a distraction? 🎬', icon: <Smile size={48} className="text-yellow-500" />, content: 'Movie Night Ticket 🍿', sub: '(You pick the movie & snacks!)' },
    ];

    const handleOpen = (id) => {
        if (!openedGifts.includes(id)) {
            setOpenedGifts([...openedGifts, id]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-5xl mx-auto p-4 py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 font-custom text-center drop-shadow-sm">
                My Promises to You 💖
            </h2>
            <p className="text-gray-500 mb-12 text-center font-handwriting text-xl">
                Tap to reveal your special coupons...
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full place-items-center">
                {gifts.map((gift, index) => (
                    <div key={gift.id} className="flex flex-col items-center gap-6 w-full max-w-[280px]">
                        {/* Question / Label FIRST */}
                        <p className="text-pink-500 font-bold font-custom text-2xl text-center min-h-[3rem] flex items-end">
                            {gift.label}
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOpen(gift.id)}
                            className="relative cursor-pointer w-full aspect-square"
                        >
                            {!openedGifts.includes(gift.id) ? (
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.3 }}
                                    className="h-full bg-gradient-to-br from-pink-400 to-rose-400 p-8 rounded-3xl shadow-xl border-4 border-white flex flex-col items-center justify-center relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <GiftIcon size={80} className="text-white mb-4 drop-shadow-md group-hover:rotate-12 transition-transform" />
                                    <span className="text-white font-bold text-lg uppercase tracking-widest bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">
                                        Tap to Open
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0, rotateY: 180 }}
                                    animate={{ scale: 1, rotateY: 0 }}
                                    className="h-full bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-pink-100 flex flex-col items-center justify-center text-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-pink-300 to-rose-300"></div>
                                    <div className="mb-4 animate-bounce-slow bg-pink-50 p-4 rounded-full">
                                        {gift.icon}
                                    </div>
                                    <h3 className="text-pink-600 font-bold text-xl mb-2 font-custom leading-tight">
                                        {gift.content}
                                    </h3>
                                    <p className="text-gray-400 font-handwriting text-sm">
                                        {gift.sub}
                                    </p>
                                    <div className="absolute bottom-4 text-xs font-mono text-gray-300 tracking-widest">
                                        VALID: FOREVER
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                ))}
            </div>

            {openedGifts.length === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center bg-white/80 backdrop-blur px-8 py-6 rounded-2xl shadow-sm border border-pink-100 max-w-lg"
                >
                    <p className="text-3xl text-pink-600 font-custom mb-3">One Last Thing... ❤️</p>
                    <p className="text-gray-600 text-lg leading-relaxed font-serif">
                        No matter clearly how many coupons you use, <br />
                        <span className="font-bold text-pink-500">my love for you is unlimited.</span>
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Gift;
