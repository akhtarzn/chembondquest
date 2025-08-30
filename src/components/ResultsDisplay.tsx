import React from 'react';
import { motion } from 'motion/react';
import { Element, determineBondType, getCompoundFormula, getCompoundName, getBondDescription } from './ChemistryData';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Award, Zap, Heart, Sparkles, RotateCcw, Trophy } from 'lucide-react';

interface ResultsDisplayProps {
  element1: Element;
  element2: Element;
  score: number;
  level: number;
  onPlayAgain: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  element1,
  element2,
  score,
  level,
  onPlayAgain
}) => {
  const { t, language } = useLanguage();
  const bondType = determineBondType(element1, element2);
  const formula = getCompoundFormula(element1, element2);
  const compoundName = getCompoundName(element1, element2, language);
  const bondDescription = getBondDescription(element1, element2, language);

  const getBondTypeIcon = () => {
    switch (bondType) {
      case 'ionic': return <Zap className="w-6 h-6" />;
      case 'covalent': return <Heart className="w-6 h-6" />;
      case 'metallic': return <Sparkles className="w-6 h-6" />;
    }
  };

  const getBondTypeColor = () => {
    switch (bondType) {
      case 'ionic': return 'from-red-500 to-blue-500';
      case 'covalent': return 'from-green-500 to-purple-500';
      case 'metallic': return 'from-yellow-500 to-orange-500';
    }
  };

  const getBondTypeBadgeColor = () => {
    switch (bondType) {
      case 'ionic': return 'bg-red-100 text-red-800 border-red-300';
      case 'covalent': return 'bg-green-100 text-green-800 border-green-300';
      case 'metallic': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {t('congratulations')}
            </h1>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          
          {/* Score and Level */}
          <div className="flex justify-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-white rounded-xl px-4 py-2 shadow-lg"
            >
              <Award className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">{t('score')}: {score}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-white rounded-xl px-4 py-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{t('level')}: {level}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className={`bg-gradient-to-r ${getBondTypeColor()} text-white`}>
              <CardTitle className="text-center text-2xl flex items-center justify-center space-x-3">
                {getBondTypeIcon()}
                <span>{t('bondFormed')}</span>
                {getBondTypeIcon()}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              {/* Elements Display */}
              <div className="flex items-center justify-center space-x-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-center space-y-2"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto"
                    style={{ backgroundColor: element1.color }}
                  >
                    {element1.symbol}
                  </div>
                  <p className="font-semibold">{language === 'en' ? element1.name : element1.nameIndonesian}</p>
                </motion.div>
                
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${getBondTypeColor()} flex items-center justify-center text-white shadow-lg`}
                >
                  {getBondTypeIcon()}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="text-center space-y-2"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto"
                    style={{ backgroundColor: element2.color }}
                  >
                    {element2.symbol}
                  </div>
                  <p className="font-semibold">{language === 'en' ? element2.name : element2.nameIndonesian}</p>
                </motion.div>
              </div>

              <Separator />

              {/* Compound Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg flex items-center space-x-2">
                      <span>{t('compound')}</span>
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">{compoundName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{t('formula')}</h3>
                    <p className="text-3xl font-mono font-bold text-blue-600 bg-blue-50 rounded-lg p-3 text-center">
                      {formula}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{t('bondType')}</h3>
                    <Badge className={`text-lg px-4 py-2 ${getBondTypeBadgeColor()}`}>
                      {getBondTypeIcon()}
                      <span className="ml-2">{t(bondType)}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{t('bondDescription')}</h3>
                    <p className="text-muted-foreground leading-relaxed bg-gray-50 rounded-lg p-3">
                      {bondDescription}
                    </p>
                  </div>
                </motion.div>
              </div>

              <Separator />

              {/* Electron Configurations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-lg text-center">{t('electronConfig')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 text-center">
                    <p className="font-semibold text-purple-600 mb-2">
                      {element1.symbol} ({language === 'en' ? element1.name : element1.nameIndonesian})
                    </p>
                    <p className="font-mono text-sm bg-white rounded px-3 py-2 shadow-inner">
                      {element1.electronConfiguration}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('valenceElectrons')}: {element1.valenceElectrons}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                    <p className="font-semibold text-blue-600 mb-2">
                      {element2.symbol} ({language === 'en' ? element2.name : element2.nameIndonesian})
                    </p>
                    <p className="font-mono text-sm bg-white rounded px-3 py-2 shadow-inner">
                      {element2.electronConfiguration}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t('valenceElectrons')}: {element2.valenceElectrons}
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Play Again Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t('playAgain')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};