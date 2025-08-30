import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Element, determineBondType } from './ChemistryData';
import { useLanguage } from './LanguageContext';
import { Sparkles, Zap, Heart } from 'lucide-react';

interface BondingAnimationProps {
  element1: Element;
  element2: Element;
  onAnimationComplete: () => void;
}

export const BondingAnimation: React.FC<BondingAnimationProps> = ({
  element1,
  element2,
  onAnimationComplete
}) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'approaching' | 'bonding' | 'complete'>('approaching');
  const bondType = determineBondType(element1, element2);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('bonding'), 2000);
    const timer2 = setTimeout(() => setPhase('complete'), 4000);
    const timer3 = setTimeout(() => onAnimationComplete(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnimationComplete]);

  const getBondColor = () => {
    switch (bondType) {
      case 'ionic': return 'from-red-400 to-blue-400';
      case 'covalent': return 'from-green-400 to-purple-400';
      case 'metallic': return 'from-yellow-400 to-orange-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getBondIcon = () => {
    switch (bondType) {
      case 'ionic': return <Zap className="w-8 h-8" />;
      case 'covalent': return <Heart className="w-8 h-8" />;
      case 'metallic': return <Sparkles className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  const renderElectrons = (element: Element, side: 'left' | 'right') => {
    const electrons = [];
    const electronCount = element.valenceElectrons;
    
    for (let i = 0; i < Math.min(electronCount, 8); i++) {
      const angle = (i / Math.min(electronCount, 8)) * 2 * Math.PI;
      const radius = 60;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      electrons.push(
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-lg"
          initial={{
            x: side === 'left' ? x - 100 : x + 100,
            y: y,
            scale: 0
          }}
          animate={{
            x: phase === 'bonding' ? (side === 'left' ? x - 50 : x + 50) : x,
            y: y,
            scale: 1,
            rotate: phase === 'bonding' ? 360 : 0
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      );
    }
    
    return electrons;
  };

  const renderIonicTransfer = () => {
    if (bondType !== 'ionic') return null;
    
    const metal = element1.category === 'metal' ? element1 : element2;
    const nonMetal = element1.category === 'nonmetal' ? element1 : element2;
    const metalIsLeft = element1.category === 'metal';
    
    return (
      <AnimatePresence>
        {phase === 'bonding' && (
          <>
            {/* Electron transfer */}
            <motion.div
              className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg z-10"
              initial={{
                x: metalIsLeft ? -80 : 80,
                y: 0,
                scale: 0
              }}
              animate={{
                x: metalIsLeft ? 80 : -80,
                y: 0,
                scale: [0, 1.5, 1],
                rotate: 360
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut"
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
            
            {/* Charge symbols */}
            <motion.div
              className="absolute text-2xl font-bold text-red-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                left: metalIsLeft ? '25%' : '75%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              +
            </motion.div>
            
            <motion.div
              className="absolute text-2xl font-bold text-blue-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                left: metalIsLeft ? '75%' : '25%',
                top: '30%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              -
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const renderCovalentBond = () => {
    if (bondType !== 'covalent') return null;
    
    return (
      <AnimatePresence>
        {phase === 'bonding' && (
          <motion.div
            className="absolute w-2 h-16 bg-gradient-to-b from-green-400 to-purple-400 rounded-full shadow-lg"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </AnimatePresence>
    );
  };

  const renderMetallicSea = () => {
    if (bondType !== 'metallic') return null;
    
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          initial={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: 0
          }}
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: [0, 1, 0.5, 1],
            opacity: [0, 1, 0.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      );
    }
    
    return (
      <AnimatePresence>
        {phase === 'bonding' && particles}
      </AnimatePresence>
    );
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main animation container */}
      <div className="relative w-96 h-96">
        {/* Element 1 */}
        <motion.div
          className="absolute w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl"
          style={{ backgroundColor: element1.color }}
          initial={{ x: -150, scale: 0.5 }}
          animate={{ 
            x: phase === 'complete' ? -60 : -100, 
            scale: phase === 'complete' ? 1.2 : 1,
            rotate: phase === 'bonding' ? [0, 10, -10, 0] : 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {element1.symbol}
          {renderElectrons(element1, 'left')}
        </motion.div>

        {/* Element 2 */}
        <motion.div
          className="absolute w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl"
          style={{ backgroundColor: element2.color }}
          initial={{ x: 150, scale: 0.5 }}
          animate={{ 
            x: phase === 'complete' ? 60 : 100, 
            scale: phase === 'complete' ? 1.2 : 1,
            rotate: phase === 'bonding' ? [0, -10, 10, 0] : 0
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {element2.symbol}
          {renderElectrons(element2, 'right')}
        </motion.div>

        {/* Bond visualizations */}
        {renderIonicTransfer()}
        {renderCovalentBond()}
        {renderMetallicSea()}

        {/* Bond formation effect */}
        <AnimatePresence>
          {phase === 'bonding' && (
            <motion.div
              className={`absolute w-32 h-32 rounded-full bg-gradient-to-br ${getBondColor()} opacity-50 blur-xl`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 2, 1], 
                opacity: [0, 0.8, 0.3],
                rotate: 360
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </AnimatePresence>

        {/* Success celebration */}
        <AnimatePresence>
          {phase === 'complete' && (
            <motion.div
              className="absolute text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                left: '50%',
                top: '80%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {getBondIcon()}
              </motion.div>
              <div className="text-white text-xl font-bold bg-black/30 backdrop-blur-sm rounded-lg p-4">
                {t('bondFormed')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading text */}
      {phase !== 'complete' && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-xl font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t('loading')}
        </motion.div>
      )}
    </div>
  );
};