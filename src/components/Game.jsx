import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Game = ({ onComplete }) => {
    const [gameState, setGameState] = useState('idle'); // idle, moving, dropping, rising, won, lost
    const [clawPosition, setClawPosition] = useState(50); // 0 to 100%
    const [caughtItem, setCaughtItem] = useState(null);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    // Refs to get actual DOM positions for collision detection
    const clawRef = useRef(null);
    const containerRef = useRef(null);
    const moveInterval = useRef(null);

    // Static items definition 
    const items = [
        { id: 1, type: 'prize', left: 50, duration: 3, delay: 0 },
        { id: 2, type: 'flower', left: 20, duration: 5, delay: 0 },
        { id: 3, type: 'decoy', left: 80, duration: 6, delay: 1 },
        { id: 4, type: 'flower', left: 65, duration: 5.5, delay: 2 },
        { id: 5, type: 'decoy', left: 35, duration: 4.5, delay: 1.5 },
    ];

    // Manual Movement Logic
    useEffect(() => {
        if (gameState !== 'idle') return;

        let animationFrameId;

        const move = () => {
            setClawPosition((prev) => {
                let next = prev;
                if (isMovingLeft) next -= 0.8;
                if (isMovingRight) next += 0.8;
                return Math.max(10, Math.min(90, next));
            });
            animationFrameId = requestAnimationFrame(move);
        };

        if (isMovingLeft || isMovingRight) {
            move();
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isMovingLeft, isMovingRight, gameState]);

    const handleDrop = () => {
        if (gameState !== 'idle') return;
        setGameState('dropping');

        // Wait for drop animation to reach bottom
        setTimeout(() => {
            checkCollision();
        }, 1000);
    };

    const checkCollision = () => {
        if (!clawRef.current || !containerRef.current) return;

        // Get claw center X relative to container
        const clawRect = clawRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const clawCenterX = clawRect.left + clawRect.width / 2 - containerRect.left;

        // Check all scrolling items
        let caught = null;
        const itemElements = containerRef.current.querySelectorAll('.game-item');

        itemElements.forEach((el) => {
            if (caught) return; // Only catch one

            const itemRect = el.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2 - containerRect.left;

            // Check distance (tolerance 50px - easier catch)
            if (Math.abs(clawCenterX - itemCenterX) < 50) {
                const itemId = parseInt(el.dataset.id);
                caught = items.find(i => i.id === itemId);
            }
        });

        if (caught) {
            setCaughtItem(caught);
            setGameState('caught');

            setTimeout(() => {
                if (caught.type === 'prize') {
                    setGameState('won');
                    setTimeout(onComplete, 1500);
                } else {
                    setGameState('lost');
                    setTimeout(() => {
                        setGameState('idle');
                        setCaughtItem(null);
                    }, 1500);
                }
            }, 1000); // Rise duration
        } else {
            setGameState('rising');
            setTimeout(() => {
                setGameState('idle');
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-bold text-pink-600 mb-2 font-custom drop-shadow-sm">Heart Chaser</h2>
            <p className="text-lg text-pink-400 mb-8 font-handwriting rotate-[-2deg]">
                "Aim for My Heart! 💘"
            </p>

            {/* Arcade Cabinet Frame */}
            <div className="relative bg-pink-100 p-4 rounded-[2rem] shadow-2xl border-b-8 border-r-8 border-pink-200 w-full transform hover:scale-[1.01] transition-transform duration-500">

                {/* Decoration Top */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-pink-200 rounded-t-full border-t-4 border-l-4 border-r-4 border-pink-300 flex items-center justify-center z-0">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <span className="text-2xl animate-pulse">❤️</span>
                    </div>
                </div>

                {/* Glass Reflection Effect */}
                <div className="absolute inset-4 bg-gradient-to-tr from-white/40 to-transparent rounded-[1.5rem] pointer-events-none z-30"></div>

                {/* Game Area */}
                <div ref={containerRef} className="relative w-full h-80 bg-white rounded-2xl overflow-hidden border-4 border-pink-200 shadow-inner z-10">

                    {/* Track */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gray-200 border-b-2 border-gray-300 z-10"></div>

                    {/* Claw System */}
                    <div
                        ref={clawRef}
                        className="absolute top-0 z-20 flex flex-col items-center transition-all duration-75 ease-linear"
                        style={{
                            left: `${clawPosition}%`,
                            transform: 'translateX(-50%)',
                            width: '4px', // The rope width
                        }}
                    >
                        {/* The Rope */}
                        <div
                            className="bg-gray-800 w-1 mx-auto transition-all duration-1000 ease-in-out"
                            style={{
                                height: gameState === 'dropping' || gameState === 'caught' ? '220px' : '40px',
                            }}
                        ></div>

                        {/* The Claw Mechanism */}
                        <div className={`transition-transform duration-300 -mt-2 relative ${gameState === 'caught' ? 'scale-90' : ''}`}>
                            {/* Mechanical Housing */}
                            <div className="w-8 h-6 bg-gray-700 rounded-lg mx-auto shadow-md relative z-20"></div>

                            {/* Arms */}
                            <svg width="60" height="40" viewBox="0 0 100 60" className="drop-shadow-sm -mt-1 relative z-10">
                                {/* Left Arm */}
                                <path d="M40 0 Q 10 30 20 50"
                                    fill="none" stroke="#db2777" strokeWidth="6" strokeLinecap="round"
                                    className={`transition-all duration-300 ${gameState === 'caught' || gameState === 'dropping' ? 'rotate-12 origin-top' : '-rotate-12 origin-top'}`}
                                />
                                {/* Right Arm */}
                                <path d="M60 0 Q 90 30 80 50"
                                    fill="none" stroke="#db2777" strokeWidth="6" strokeLinecap="round"
                                    className={`transition-all duration-300 ${gameState === 'caught' || gameState === 'dropping' ? '-rotate-12 origin-top' : 'rotate-12 origin-top'}`}
                                />
                            </svg>

                            {/* Caught Item Visual - Positioned INSIDE the claw */}
                            {gameState === 'caught' && caughtItem && (
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-0">
                                    <img
                                        src={`/assets/game/${caughtItem.type}.png`}
                                        alt="item"
                                        className="w-10 h-10 object-contain drop-shadow-lg animate-bounce"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            let content = '';
                                            if (caughtItem.type === 'prize') content = '<span class="text-3xl filter drop-shadow">💖</span>';
                                            else if (caughtItem.type === 'flower') content = '<span class="text-2xl filter drop-shadow">🌸</span>';
                                            else content = '<span class="text-2xl filter drop-shadow">🍫</span>';
                                            e.target.parentElement.innerHTML = content;
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CSS Animated Items on Ground */}
                    <style>{`
                      @keyframes patrol {
                        0% { left: 10%; }
                        50% { left: 90%; }
                        100% { left: 10%; }
                      }
                      .game-item-moving {
                        animation-name: patrol;
                        animation-timing-function: ease-in-out;
                        animation-iteration-count: infinite;
                      }
                    `}</style>

                    {items.map(item => (
                        (item.id !== caughtItem?.id) && (
                            <div
                                key={item.id}
                                data-id={item.id}
                                className="game-item absolute bottom-8 transform -translate-x-1/2 game-item-moving"
                                style={{
                                    animationDuration: `${item.duration}s`,
                                    animationDelay: `${item.delay}s`,
                                }}
                            >
                                <img
                                    src={`/assets/game/${item.type}.png`}
                                    alt={item.type}
                                    className={`object-contain drop-shadow-md bg-white/50 backdrop-blur-sm rounded-full p-1 ${item.type === 'prize' ? 'w-16 h-16' : 'w-12 h-12 opacity-90'}`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        let content = '';
                                        if (item.type === 'prize') content = '<span class="text-4xl filter drop-shadow">💖</span>';
                                        else if (item.type === 'flower') content = '<span class="text-3xl filter drop-shadow">🌸</span>';
                                        else content = '<span class="text-3xl filter drop-shadow">🍫</span>';
                                        e.target.parentElement.innerHTML = content;
                                    }}
                                />
                            </div>
                        )
                    ))}

                    {/* Messages Overlay */}
                    {gameState === 'lost' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-bold text-2xl backdrop-blur-sm z-40 animate-pulse">
                            Missed! 😅
                        </div>
                    )}
                    {gameState === 'won' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-pink-500/60 text-white font-bold text-3xl backdrop-blur-sm z-40 animate-bounce">
                            You Won! ❤️
                        </div>
                    )}
                </div>

                {/* Control Panel */}
                <div className="bg-pink-200 mt-4 p-4 rounded-2xl shadow-inner flex items-center justify-between gap-4 border-t-4 border-pink-300 relative z-20">

                    {/* Directional Pad */}
                    <div className="flex gap-2 bg-pink-300 p-2 rounded-full shadow-inner">
                        <button
                            className="bg-white text-pink-500 w-12 h-12 rounded-full shadow-md active:shadow-inner active:bg-gray-100 flex items-center justify-center transition-transform active:scale-95"
                            onMouseDown={() => setIsMovingLeft(true)}
                            onMouseUp={() => setIsMovingLeft(false)}
                            onMouseLeave={() => setIsMovingLeft(false)}
                            onTouchStart={() => setIsMovingLeft(true)}
                            onTouchEnd={() => setIsMovingLeft(false)}
                        >
                            <ChevronLeft size={32} strokeWidth={3} />
                        </button>
                        <button
                            className="bg-white text-pink-500 w-12 h-12 rounded-full shadow-md active:shadow-inner active:bg-gray-100 flex items-center justify-center transition-transform active:scale-95"
                            onMouseDown={() => setIsMovingRight(true)}
                            onMouseUp={() => setIsMovingRight(false)}
                            onMouseLeave={() => setIsMovingRight(false)}
                            onTouchStart={() => setIsMovingRight(true)}
                            onTouchEnd={() => setIsMovingRight(false)}
                        >
                            <ChevronRight size={32} strokeWidth={3} />
                        </button>
                    </div>

                    {/* DROP Button */}
                    <div className="relative">
                        <button
                            onClick={handleDrop}
                            disabled={gameState !== 'idle'}
                            className="bg-red-500 text-white w-20 h-20 rounded-full shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-1 transition-all flex items-col items-center justify-center border-4 border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="font-bold text-xs tracking-widest mt-1">DROP</span>
                        </button>
                        {/* Shimmer effect on button */}
                        <div className="absolute top-2 left-4 w-6 h-3 bg-white/30 rounded-full skew-x-12 pointer-events-none"></div>
                    </div>

                </div>

                {/* Sweet Instruction Footer */}
                <div className="mt-4 text-center">
                    <p className="text-pink-400 text-xs font-handwriting bg-white/50 inline-block px-4 py-1 rounded-full border border-pink-100">
                        ✨ Position the grabber & hit the button! ✨
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Game;
