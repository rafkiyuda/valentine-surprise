import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Date.now(),
                left: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.5,
                duration: Math.random() * 5 + 5,
            };
            setHearts((prev) => [...prev, newHeart]);

            // Cleanup old hearts
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, newHeart.duration * 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '100vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: 0.8 }}
                    transition={{ duration: heart.duration, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        left: `${heart.left}%`,
                        width: `${heart.scale * 40}px`,
                    }}
                    className="text-pink-300"
                >
                    <Heart fill="currentColor" size={heart.scale * 40} />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
