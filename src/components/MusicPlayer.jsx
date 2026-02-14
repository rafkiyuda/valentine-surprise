import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = ({ startPlaying }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // NOTE: User can replace this with their own music file in public/assets/music/bgm.mp3
    // If file doesn't exist, it will just fail silently or show error in console
    const musicSrc = "/assets/music/bgm.mp3";

    useEffect(() => {
        if (startPlaying && audioRef.current) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Audio play failed:", e));
        }
    }, [startPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 z-50"
        >
            <audio ref={audioRef} src={musicSrc} loop />
            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-pink-600 hover:bg-pink-100 transition-colors"
            >
                {isPlaying ? <Pause size={24} /> : <Music size={24} />}
            </button>
        </motion.div>
    );
};

export default MusicPlayer;
