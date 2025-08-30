import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface SoundManagerProps {
  onSoundToggle?: (enabled: boolean) => void;
  onMusicToggle?: (enabled: boolean) => void;
}

export const SoundManager: React.FC<SoundManagerProps> = ({
  onSoundToggle,
  onMusicToggle
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);

  useEffect(() => {
    // Mock sound initialization
    console.log('🎵 Background music initialized');
    console.log('🔊 Sound effects initialized');
  }, []);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    onSoundToggle?.(newState);
    
    // Mock sound feedback
    if (newState) {
      console.log('🔊 Sound effects enabled');
    } else {
      console.log('🔇 Sound effects disabled');
    }
  };

  const toggleMusic = () => {
    const newState = !musicEnabled;
    setMusicEnabled(newState);
    onMusicToggle?.(newState);
    
    // Mock music feedback
    if (newState) {
      console.log('🎵 Background music playing');
    } else {
      console.log('🎵 Background music paused');
    }
  };

  const playBondingSound = (bondType: 'ionic' | 'covalent' | 'metallic') => {
    if (!soundEnabled) return;
    
    // Mock sound playing
    const sounds = {
      ionic: '⚡ Ionic bonding sound',
      covalent: '💖 Covalent bonding sound',
      metallic: '✨ Metallic bonding sound'
    };
    
    console.log(`🔊 Playing: ${sounds[bondType]}`);
  };

  const playSuccessSound = () => {
    if (!soundEnabled) return;
    console.log('🎉 Playing success sound');
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    console.log('🖱️ Playing click sound');
  };

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleSound}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-xl p-2 shadow-lg"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-blue-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-300 rounded-xl p-2 shadow-lg"
        >
          <Music className={`w-4 h-4 ${musicEnabled ? 'text-green-600' : 'text-gray-400'}`} />
        </Button>
      </motion.div>
    </div>
  );
};

// Export functions for other components to use
export const useSoundEffects = () => {
  const playBondingSound = (bondType: 'ionic' | 'covalent' | 'metallic') => {
    // Mock implementation
    console.log(`🔊 Playing ${bondType} bonding sound`);
  };

  const playSuccessSound = () => {
    console.log('🎉 Playing success sound');
  };

  const playClickSound = () => {
    console.log('🖱️ Playing click sound');
  };

  const playBackgroundMusic = () => {
    console.log('🎵 Starting background music');
  };

  const stopBackgroundMusic = () => {
    console.log('🎵 Stopping background music');
  };

  return {
    playBondingSound,
    playSuccessSound,
    playClickSound,
    playBackgroundMusic,
    stopBackgroundMusic
  };
};