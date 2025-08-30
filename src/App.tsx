import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider } from './components/LanguageContext';
import { ElementSelector } from './components/ElementSelector';
import { BondingAnimation } from './components/BondingAnimation';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LanguageToggle } from './components/LanguageToggle';
import { SoundManager, useSoundEffects } from './components/SoundManager';
import { Element } from './components/ChemistryData';
import { useLanguage } from './components/LanguageContext';
import { Atom, Sparkles } from 'lucide-react';

type GameState = 'menu' | 'selecting' | 'animating' | 'results';

const GameContent: React.FC = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedElement1, setSelectedElement1] = useState<Element | null>(null);
  const [selectedElement2, setSelectedElement2] = useState<Element | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const soundEffects = useSoundEffects();

  useEffect(() => {
    // Start background music when component mounts
    soundEffects.playBackgroundMusic();
    
    return () => {
      soundEffects.stopBackgroundMusic();
    };
  }, []);

  const handleStartGame = () => {
    setGameState('selecting');
    soundEffects.playClickSound();
  };

  const handleElementSelect1 = (element: Element) => {
    setSelectedElement1(element);
    soundEffects.playClickSound();
  };

  const handleElementSelect2 = (element: Element) => {
    setSelectedElement2(element);
    soundEffects.playClickSound();
  };

  const handleStartBonding = () => {
    if (selectedElement1 && selectedElement2) {
      setGameState('animating');
      soundEffects.playClickSound();
    }
  };

  const handleAnimationComplete = () => {
    setGameState('results');
    setScore(prev => prev + 100);
    setLevel(prev => Math.floor((score + 100) / 500) + 1);
    soundEffects.playSuccessSound();
  };

  const handlePlayAgain = () => {
    setSelectedElement1(null);
    setSelectedElement2(null);
    setGameState('selecting');
    soundEffects.playClickSound();
  };

  const handleBackToMenu = () => {
    setSelectedElement1(null);
    setSelectedElement2(null);
    setGameState('menu');
    soundEffects.playClickSound();
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0.5, 1, 0.5],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* UI Controls */}
      <LanguageToggle />
      <SoundManager />

      {/* Game Content */}
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen flex items-center justify-center"
          >
            <div className="text-center space-y-8 px-4">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Atom className="w-16 h-16 text-yellow-300" />
                  </motion.div>
                  <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
                    {t('title')}
                  </h1>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-16 h-16 text-pink-300" />
                  </motion.div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto"
                >
                  {t('subtitle')}
                </motion.p>
              </motion.div>

              {/* Start Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl"
                >
                  ✨ {t('selectElements')} ✨
                </motion.button>
              </motion.div>

              {/* Score Display */}
              {score > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-center space-x-8 text-white"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                    <p className="text-lg font-semibold">{t('score')}: {score}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                    <p className="text-lg font-semibold">{t('level')}: {level}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {gameState === 'selecting' && (
          <motion.div
            key="selecting"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-screen bg-white/95 backdrop-blur-sm flex items-center justify-center py-8"
          >
            <ElementSelector
              selectedElement1={selectedElement1}
              selectedElement2={selectedElement2}
              onSelectElement1={handleElementSelect1}
              onSelectElement2={handleElementSelect2}
              onStartBonding={handleStartBonding}
            />
            
            {/* Back to Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToMenu}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              ← {t('title')}
            </motion.button>
          </motion.div>
        )}

        {gameState === 'animating' && selectedElement1 && selectedElement2 && (
          <motion.div
            key="animating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <BondingAnimation
              element1={selectedElement1}
              element2={selectedElement2}
              onAnimationComplete={handleAnimationComplete}
            />
          </motion.div>
        )}

        {gameState === 'results' && selectedElement1 && selectedElement2 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <ResultsDisplay
              element1={selectedElement1}
              element2={selectedElement2}
              score={score}
              level={level}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <GameContent />
    </LanguageProvider>
  );
}