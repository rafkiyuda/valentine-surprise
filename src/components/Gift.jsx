import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift as GiftIcon, Heart, Coffee, Smile } from 'lucide-react';

const Gift = ({ onComplete }) => {
    const [openedGifts, setOpenedGifts] = useState([]);

    const gifts = [
        { id: 1, label: 'Running low on energy? 🔋', src: '/assets/coupons/coupon1.png', alt: 'Unlimited Coffee Coupon' },
        { id: 2, label: 'Feeling overwhelmed? 🌧️', src: '/assets/coupons/coupon2.png', alt: 'Warm Hugs Coupon' },
        { id: 3, label: 'Need a distraction? 🎬', src: '/assets/coupons/coupon3.png', alt: 'Movie Night Coupon' },
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full place-items-center mb-16">
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
                            className="relative cursor-pointer w-full aspect-[3/4]"
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
                                    className="h-full bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-2 border-pink-100 overflow-hidden relative"
                                >
                                    {/* Image Coupon */}
                                    <img
                                        src={gift.src}
                                        alt={gift.alt}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <div class="flex flex-col items-center justify-center h-full p-4 text-center bg-pink-50">
                                                    <span class="text-4xl mb-2">🎟️</span>
                                                    <p class="font-bold text-pink-500">Image Missing</p>
                                                    <p class="text-xs text-gray-400 mt-2 break-all">${gift.src}</p>
                                                </div>
                                            `;
                                        }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Button Always Visible Now */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
            >
                <button
                    onClick={onComplete}
                    className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-pink-300/50 hover:scale-105 transition-all text-xl animate-pulse"
                >
                    One Final Message... 💌
                </button>
            </motion.div>
        </div>
    );
};

export default Gift;
