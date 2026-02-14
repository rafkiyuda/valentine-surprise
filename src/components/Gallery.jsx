import { useEffect } from 'react'; // Added import
import { motion } from 'framer-motion';

const Gallery = ({ onOpenGift }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Dummy data. User should add their photos to public/assets/photos and update this list.
    const photos = [
        { id: 1, src: '/assets/photos/dummy1.jpg', caption: 'Our First Date' },
        { id: 2, src: '/assets/photos/dummy2.jpg', caption: 'Movie Night' },
        { id: 3, src: '/assets/photos/dummy3.jpg', caption: 'Beach Day' },
        { id: 4, src: '/assets/photos/dummy4.jpg', caption: 'Silly Moments' },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-4 min-h-screen">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-2 font-custom drop-shadow-sm">
                Our Memories
            </h2>
            <p className="text-center text-pink-400 font-handwriting text-xl mb-12">
                Every moment with you is my favorite... 📸💕
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rotate-1 hover:rotate-0 transition-transform duration-500 border-2 border-pink-50"
                    >
                        <div className="aspect-video bg-pink-50 rounded-xl overflow-hidden flex items-center justify-center text-pink-300 relative group">
                            {/* This img tag will work once user adds photos. For now it shows alt text or broken image icon if file missing */}
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                      <div class="flex flex-col items-center justify-center h-full text-pink-300 w-full bg-pink-50">
                                        <span class="text-5xl mb-2">🎁</span>
                                        <span class="text-lg font-custom text-pink-400">Coming Soon...</span>
                                      </div>
                                    `;
                                }}
                            />
                        </div>
                        <p className="mt-4 text-center text-pink-600 font-custom text-xl tracking-wide">
                            {photo.caption}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pb-20">
                <button
                    onClick={onOpenGift}
                    className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-pink-300/50 hover:scale-105 transition-all flex items-center gap-3 text-lg animate-bounce-slow"
                >
                    <span>One Last Surprise...</span>
                    <span className="text-2xl">🎁</span>
                </button>
            </div>
        </div>
    );
};

export default Gallery;
