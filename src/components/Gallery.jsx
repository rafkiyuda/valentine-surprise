import { motion } from 'framer-motion';

const Gallery = ({ onOpenGift }) => {
    // Dummy data. User should add their photos to public/assets/photos and update this list.
    const photos = [
        { id: 1, src: '/assets/photos/dummy1.jpg', caption: 'Our First Date' },
        { id: 2, src: '/assets/photos/dummy2.jpg', caption: 'Movie Night' },
        { id: 3, src: '/assets/photos/dummy3.jpg', caption: 'Beach Day' },
        { id: 4, src: '/assets/photos/dummy4.jpg', caption: 'Silly Moments' },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-custom">
                Our Memories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-lg rotate-1 hover:rotate-0 transition-transform duration-300"
                    >
                        <div className="aspect-video bg-pink-100 rounded-md overflow-hidden flex items-center justify-center text-pink-300">
                            {/* This img tag will work once user adds photos. For now it shows alt text or broken image icon if file missing */}
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                      <div class="flex flex-col items-center justify-center h-full text-pink-300 bg-pink-50 w-full animate-pulse">
                                        <span class="text-6xl font-custom">?</span>
                                        <span class="text-sm mt-2 font-bold opacity-70">Soon...</span>
                                      </div>
                                    `;
                                }}
                            />
                        </div>
                        <p className="mt-4 text-center text-gray-600 font-handwriting text-lg">
                            {photo.caption}
                        </p>
                    </motion.div>
                ))}
            </div>
            <p className="text-center text-pink-400 mt-8 text-sm mb-8">
                (Tip: Add your photos to the public/assets/photos folder!)
            </p>

            <div className="flex justify-center pb-8">
                <button
                    onClick={onOpenGift}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
                >
                    <span>One Last Surprise...</span>
                    <span className="text-xl">🎁</span>
                </button>
            </div>
        </div>
    );
};

export default Gallery;
