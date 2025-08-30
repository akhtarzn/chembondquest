import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Atom } from 'lucide-react';
import { Element, elements } from './ChemistryData';
import { useLanguage } from './LanguageContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface ElementSelectorProps {
  selectedElement1: Element | null;
  selectedElement2: Element | null;
  onSelectElement1: (element: Element) => void;
  onSelectElement2: (element: Element) => void;
  onStartBonding: () => void;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({
  selectedElement1,
  selectedElement2,
  onSelectElement1,
  onSelectElement2,
  onStartBonding
}) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSelector, setActiveSelector] = useState<1 | 2>(1);

  const filteredElements = useMemo(() => {
    return elements.filter(element => 
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.nameIndonesian.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const categoryColors = {
    metal: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    nonmetal: 'bg-gradient-to-br from-blue-400 to-purple-500',
    metalloid: 'bg-gradient-to-br from-green-400 to-teal-500',
    'noble-gas': 'bg-gradient-to-br from-pink-400 to-violet-500'
  };

  const handleElementSelect = (element: Element) => {
    if (activeSelector === 1) {
      onSelectElement1(element);
      setActiveSelector(2);
    } else {
      onSelectElement2(element);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {t('selectElements')}
        </h2>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Selected Elements Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
            activeSelector === 1 ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-border'
          }`}
        >
          <Card className="h-32 cursor-pointer" onClick={() => setActiveSelector(1)}>
            <CardContent className="h-full flex items-center justify-center p-4">
              {selectedElement1 ? (
                <div className="text-center space-y-2">
                  <div 
                    className={`w-16 h-16 rounded-full ${categoryColors[selectedElement1.category]} flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg`}
                  >
                    {selectedElement1.symbol}
                  </div>
                  <div>
                    <p className="font-semibold">{language === 'en' ? selectedElement1.name : selectedElement1.nameIndonesian}</p>
                    <p className="text-sm text-muted-foreground">{t('atomicNumber')}: {selectedElement1.atomicNumber}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2 text-muted-foreground">
                  <Atom className="w-12 h-12 mx-auto" />
                  <p>{t('element1')}</p>
                  <p className="text-sm">{t('selectElement')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
            activeSelector === 2 ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-border'
          }`}
        >
          <Card className="h-32 cursor-pointer" onClick={() => setActiveSelector(2)}>
            <CardContent className="h-full flex items-center justify-center p-4">
              {selectedElement2 ? (
                <div className="text-center space-y-2">
                  <div 
                    className={`w-16 h-16 rounded-full ${categoryColors[selectedElement2.category]} flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg`}
                  >
                    {selectedElement2.symbol}
                  </div>
                  <div>
                    <p className="font-semibold">{language === 'en' ? selectedElement2.name : selectedElement2.nameIndonesian}</p>
                    <p className="text-sm text-muted-foreground">{t('atomicNumber')}: {selectedElement2.atomicNumber}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2 text-muted-foreground">
                  <Atom className="w-12 h-12 mx-auto" />
                  <p>{t('element2')}</p>
                  <p className="text-sm">{t('selectElement')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={t('searchElement')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 text-base rounded-xl border-2 focus:border-purple-500"
        />
      </div>

      {/* Element Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
        {filteredElements.map((element, index) => (
          <motion.div
            key={element.symbol}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedElement1?.symbol === element.symbol || selectedElement2?.symbol === element.symbol
                  ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/20'
                  : ''
              }`}
              onClick={() => handleElementSelect(element)}
            >
              <CardContent className="p-3 text-center space-y-1">
                <div 
                  className={`w-12 h-12 rounded-lg ${categoryColors[element.category]} flex items-center justify-center text-white font-bold text-sm mx-auto shadow-md`}
                  style={{ backgroundColor: element.color }}
                >
                  {element.symbol}
                </div>
                <div>
                  <p className="text-xs font-medium truncate">{language === 'en' ? element.name : element.nameIndonesian}</p>
                  <p className="text-xs text-muted-foreground">{element.atomicNumber}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Object.entries(categoryColors).map(([category, colorClass]) => (
          <Badge key={category} variant="outline" className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
            {t(category.replace('-', '') + 's')}
          </Badge>
        ))}
      </div>

      {/* Start Bonding Button */}
      {selectedElement1 && selectedElement2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            onClick={onStartBonding}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ✨ {t('startBonding')} ✨
          </Button>
        </motion.div>
      )}
    </div>
  );
};