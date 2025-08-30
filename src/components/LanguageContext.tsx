import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: "Chemistry Bonding Quest",
    subtitle: "Discover the magical world of chemical bonds!",
    selectElements: "Select Two Elements",
    element1: "Element 1",
    element2: "Element 2",
    startBonding: "Start Bonding!",
    bondType: "Bond Type",
    compound: "Compound",
    formula: "Chemical Formula",
    electronConfig: "Electron Configuration",
    bondDescription: "Bond Description",
    playAgain: "Play Again",
    score: "Score",
    level: "Level",
    ionic: "Ionic Bond",
    covalent: "Covalent Bond",
    metallic: "Metallic Bond",
    congratulations: "Congratulations!",
    bondFormed: "Bond Successfully Formed!",
    loading: "Forming bonds...",
    searchElement: "Search element...",
    selectElement: "Select an element",
    metals: "Metals",
    nonmetals: "Nonmetals",
    metalloids: "Metalloids",
    nobleGases: "Noble Gases",
    atomicNumber: "Atomic Number",
    valenceElectrons: "Valence Electrons",
    electronegativity: "Electronegativity",
    group: "Group",
    period: "Period"
  },
  id: {
    title: "Petualangan Ikatan Kimia",
    subtitle: "Temukan dunia ajaib ikatan kimia!",
    selectElements: "Pilih Dua Unsur",
    element1: "Unsur 1",
    element2: "Unsur 2",
    startBonding: "Mulai Ikatan!",
    bondType: "Jenis Ikatan",
    compound: "Senyawa",
    formula: "Rumus Kimia",
    electronConfig: "Konfigurasi Elektron",
    bondDescription: "Deskripsi Ikatan",
    playAgain: "Main Lagi",
    score: "Skor",
    level: "Level",
    ionic: "Ikatan Ion",
    covalent: "Ikatan Kovalen",
    metallic: "Ikatan Logam",
    congratulations: "Selamat!",
    bondFormed: "Ikatan Berhasil Terbentuk!",
    loading: "Membentuk ikatan...",
    searchElement: "Cari unsur...",
    selectElement: "Pilih unsur",
    metals: "Logam",
    nonmetals: "Non-logam",
    metalloids: "Metaloid",
    nobleGases: "Gas Mulia",
    atomicNumber: "Nomor Atom",
    valenceElectrons: "Elektron Valensi",
    electronegativity: "Keelektronegatifan",
    group: "Golongan",
    period: "Periode"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};