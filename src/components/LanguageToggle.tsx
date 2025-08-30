import React from 'react';
import { motion } from 'motion/react';
import { useLanguage, Language } from './LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        onClick={toggleLanguage}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 rounded-xl px-4 py-2 shadow-lg"
      >
        <Globe className="w-4 h-4 mr-2 text-purple-600" />
        <span className="font-semibold text-purple-600">
          {language === 'en' ? '🇮🇩 ID' : '🇺🇸 EN'}
        </span>
      </Button>
    </motion.div>
  );
};