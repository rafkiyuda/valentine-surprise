import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Closing = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-pink-100/50 pointer-events-none -z-10"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-md mx-auto text-center"
            >
                {/* Image Container */}
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white mb-12 group">
                    <div className="absolute inset-0 bg-pink-200 animate-pulse">
                        {/* Placeholder for user's animated photo */}
                        <div className="flex flex-col items-center justify-center h-full text-pink-400 opacity-50">
                            <span className="text-6xl mb-4">💑</span>
                            <span className="font-handwriting text-xl">Our Animated Photo Here</span>
                        </div>
                    </div>
                    {/* Placeholder content - User will replace src */}
                    <img
                        src="/assets/closing.gif"
                        alt="Us"
                        className="w-full h-full object-cover relative z-10 opacity-0" // Hidden by default until user adds image
                        onError={(e) => e.target.style.opacity = 0}
                        onLoad={(e) => e.target.style.opacity = 1}
                    />

                    {/* Overlay Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>
                </div>

                {/* Lyrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="relative"
                >
                    <Sparkles className="absolute -top-6 -left-4 text-yellow-400 animate-spin-slow" size={24} />
                    <Sparkles className="absolute -bottom-6 -right-4 text-pink-400 animate-pulse" size={20} />

                    <p className="font-custom text-2xl md:text-3xl text-pink-600 leading-relaxed drop-shadow-sm">
                        "Cuz I think I’ve fallen <br />
                        In love this time. <br />
                        I blinked and suddenly <br />
                        I have a valentine."
                    </p>
                    <p className="mt-4 text-xs font-serif text-pink-400 uppercase tracking-widest opacity-80">
                        — Laufey
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    className="mt-16"
                >
                    <p className="text-gray-400 font-handwriting text-sm">
                        Forever & Always ❤️
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Closing;
