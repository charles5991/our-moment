import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars } from 'lucide-react';

const App = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Will you be my Trak mai? 💖",
    "Sure Pao? 🥺",
    "Think dii Think Dii! 🌹",
    "Naaaaaaaa? ✨",
    "Sad mak jing jing... 😿",
    "No talk leh beh!💔"
  ];

  const handleNoHover = () => {
    // Calculate a random position within a reasonable range
    // We avoid moving too close to the edges
    const padding = 100;
    const maxX = (window.innerWidth / 2) - padding;
    const maxY = (window.innerHeight / 2) - padding;
    
    const newX = (Math.random() - 0.5) * maxX * 1.5;
    const newY = (Math.random() - 0.5) * maxY * 1.5;
    
    setNoButtonPos({ x: newX, y: newY });
    setYesButtonScale(prev => Math.min(prev + 0.15, 3)); // Max scale of 3
    setMessageIndex(prev => (prev + 1) % messages.length);
  };


  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff8fa3', '#fff0f3', '#ff0000']
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#fff0f3] font-sans selection:bg-pink-200">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.3
            }}
            animate={{ 
              y: -100,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <Heart fill="currentColor" size={Math.random() * 40 + 20} />
          </motion.div>
        ))}
      </div>

      <main className="relative z-10 p-8 max-w-lg w-full text-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative inline-block"
              >
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpiazR3azR4NXo5NXo1NXo1NXo1NXo1NXo1NXo1NXo1NXo1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/c76IJLufpNUMo/giphy.gif" 
                  alt="Cute Cat" 
                  className="rounded-3xl shadow-2xl border-4 border-white w-64 h-64 object-cover mx-auto"
                />
                <motion.div 
                  className="absolute -top-4 -right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart fill="currentColor" size={24} />
                </motion.div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#ff4d6d] drop-shadow-sm leading-tight">
                {messages[accepted ? 0 : messageIndex]}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <motion.button
                  style={{ scale: yesButtonScale }}
                  whileHover={{ scale: yesButtonScale + 0.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYes}
                  className="px-10 py-4 bg-[#ff4d6d] text-white rounded-full text-2xl font-bold shadow-[0_8px_0_rgb(200,40,80)] hover:shadow-[0_4px_0_rgb(200,40,80)] transition-all cursor-pointer"
                >
                  Yes! ❤️
                </motion.button>

                <motion.button
                  animate={{ 
                    x: noButtonPos.x, 
                    y: noButtonPos.y,
                    scale: Math.max(1 - (messageIndex * 0.05), 0.5)
                  }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  onTouchStart={handleNoHover}
                  className="px-10 py-4 bg-gray-200 text-gray-700 rounded-full text-2xl font-bold shadow-[0_8px_0_rgb(180,180,180)] hover:bg-gray-300 transition-colors"
                >
                  No
                </motion.button>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="relative inline-block">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHlxNnZwa3V4NXo5NXo1NXo1NXo1NXo1NXo1NXo1NXo1NXo1JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l0Ex6f1c79k0132uM/giphy.gif" 
                  alt="Celebrate" 
                  className="rounded-3xl shadow-2xl border-4 border-white w-64 h-64 object-cover mx-auto"
                />
                <motion.div 
                  className="absolute -top-4 -left-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Stars size={32} />
                </motion.div>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-[#ff4d6d] animate-bounce">
                Yay! I love you! ❤️
              </h2>
              
              <p className="text-xl text-pink-600 font-medium italic">
                You've made me the happiest person!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-4 text-pink-400 text-sm opacity-50">
        Made with ❤️ for my special Valentine
      </footer>
    </div>
  );
};

export default App;
