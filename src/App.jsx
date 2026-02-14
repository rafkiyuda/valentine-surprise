import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import Game from './components/Game';
import Gift from './components/Gift';
import Proposal from './components/Proposal';
import Gallery from './components/Gallery';
import Letter from './components/Letter';

function App() {
  const [stage, setStage] = useState('intro'); // intro, game, proposal, letter, gallery, gift
  const [musicStarted, setMusicStarted] = useState(false);

  const handleStart = () => {
    setMusicStarted(true);
    setStage('game');
  };

  const handleGameComplete = () => {
    setStage('proposal');
  };

  const handleProposalAccepted = () => {
    setStage('letter');
  };

  const handleLetterRead = () => {
    setStage('gallery');
  };

  const handleGalleryViewed = () => {
    setStage('gift');
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800 font-sans overflow-x-hidden relative">
      <FloatingHearts />
      <MusicPlayer startPlaying={musicStarted} />

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">

          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-pink-600 mb-6 font-custom drop-shadow-sm">
                For You ❤️
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                I have a little surprise for you. Are you ready?
              </p>
              <button
                onClick={handleStart}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-pink-500 font-lg rounded-full hover:bg-pink-600 hover:shadow-lg ring-offset-2 focus:ring-2"
              >
                <Play className="mr-2" size={20} fill="currentColor" />
                Start Surprise
                <div className="absolute -inset-3 rounded-full bg-pink-400 opacity-20 group-hover:opacity-40 animate-pulse"></div>
              </button>
            </motion.div>
          )}

          {/* GAME STAGE */}
          {stage === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full flex justify-center"
            >
              <Game onComplete={handleGameComplete} />
            </motion.div>
          )}

          {/* PROPOSAL STAGE */}
          {stage === 'proposal' && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full"
            >
              <Proposal onAccept={handleProposalAccepted} />
            </motion.div>
          )}

          {/* LETTER STAGE */}
          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <Letter onOpenMemories={handleLetterRead} />
            </motion.div>
          )}

          {/* GALLERY STAGE */}
          {stage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <Gallery onOpenGift={handleGalleryViewed} />
            </motion.div>
          )}

          {/* GIFT STAGE */}
          {stage === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <Gift />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
