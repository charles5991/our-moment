import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Mail } from 'lucide-react';
import flowerImg from './assets/flower.jpeg';
import togetherImg from './assets/together.jpeg';
import './App.css';

// Import all memory photos for the surprise
// Using src/assets ensures Vite adds content hashes for perfect cache busting
const memoryImages = Object.values(
  import.meta.glob('./assets/memory/*.{jpeg,jpg,png,JPEG,JPG,PNG,gif,webp}', {
    eager: true,
    import: 'default'
  })
);

const App = () => {
  const [accepted, setAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [randomMemories, setRandomMemories] = useState([]);
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);

  useEffect(() => {
    if (accepted && randomMemories.length === 0) {
      const shuffled = [...memoryImages]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      setRandomMemories(shuffled);
    }
  }, [accepted]);

  useEffect(() => {
    if (accepted && randomMemories.length > 0) {
      const interval = setInterval(() => {
        setCurrentMemoryIndex(prev => (prev + 1) % randomMemories.length);
      }, 6000); // 6 seconds per photo for a more relaxed, romantic feel
      return () => clearInterval(interval);
    }
  }, [accepted, randomMemories]);

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
                  src={flowerImg}
                  alt="Cute Flower"
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
              className="space-y-4 md:space-y-8"
            >
              <div className="relative inline-block">
                <img
                  src={togetherImg}
                  alt="Celebrate Together"
                  className="rounded-3xl shadow-2xl border-4 border-white w-40 h-40 md:w-64 md:h-64 object-cover mx-auto z-10 relative"
                />
                <motion.div
                  className="absolute -top-4 -left-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg z-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                </motion.div>
              </div>

              <h2 className="text-3xl md:text-6xl font-black text-[#ff4d6d] animate-bounce relative z-10 px-4">
                Rak na! ❤️
              </h2>

              <div className="letter-image" onClick={() => setIsModalOpen(true)}>
                <div className="animated-mail">
                  <div className="back-fold"></div>
                  <div className="letter">
                    <div className="letter-border"></div>
                    <div className="letter-title"></div>
                    <div className="letter-context"></div>
                    <div className="letter-stamp"></div>
                  </div>
                  <div className="top-fold"></div>
                  <div className="body"></div>
                  <div className="left-fold"></div>
                </div>
                <div className="shadow"></div>
                <div className="letter-label">Love Letter</div>
              </div>

              {/* Memory Photos - Responsive layout to stay within screen boundaries */}
              <AnimatePresence>
                {randomMemories.length > 0 && [0, 1, 2].map((offset) => {
                  const index = (currentMemoryIndex + offset) % randomMemories.length;
                  const imgSrc = randomMemories[index];
                  const corner = index % 4; // 0: Top Left, 1: Top Right, 2: Bottom Left, 3: Bottom Right

                  return (
                    <motion.img
                      key={imgSrc}
                      src={imgSrc}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        // Tightened offsets for mobile (approx 375px width safe)
                        x: (window.innerWidth > 768)
                          ? (corner % 2 === 0 ? -330 : 330)
                          : (corner % 2 === 0 ? -95 : 95),
                        y: (window.innerWidth > 768)
                          ? (Math.floor(corner / 2) === 0 ? -180 : 180)
                          : (Math.floor(corner / 2) === 0 ? -220 : 220),
                        rotate: (index % 2 === 0 ? 4 : -4)
                      }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 1.5 } }}
                      whileHover={{ scale: 1.2, zIndex: 30, rotate: 0 }}
                      whileTap={{ scale: 1.2, zIndex: 30, rotate: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="absolute w-32 h-32 md:w-56 md:h-56 object-cover rounded-lg border-2 md:border-4 border-white shadow-xl cursor-pointer"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 0
                      }}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-4 text-pink-400 text-sm opacity-50">
        Made with ❤️ for my special Valentine
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-[#ff4d6d] to-pink-300" />

              <div className="space-y-6">
                <div className="bg-pink-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-[#ff4d6d]">
                  <Heart fill="currentColor" size={32} />
                </div>

                <div className="space-y-4 text-gray-800">
                  <p className="font-bold text-2xl text-[#ff4d6d] romantic-font">💌 Love Letter to PAO</p>

                  <div className="space-y-3 text-2xl leading-relaxed romantic-font">
                    <p>Ever since I found you on <span className="text-pink-500 font-bold">TikTok</span> that day...</p>
                    <p>And I've loved you since the very first moment, and I love you even more today... even if I'm a bit more whiny! 😜</p>
                    <p>Let's <span className="text-[#ff4d6d] font-bold">"Susu" together</span> and keep supporting each other forever. ❤️</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-[#ff4d6d] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#ff3355] transition-colors"
                >
                  Close with Love ❤️
                </motion.button>
              </div>

              {/* Decorative sparkles */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-100 rounded-full blur-xl opacity-50" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-100 rounded-full blur-xl opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

export default App;
