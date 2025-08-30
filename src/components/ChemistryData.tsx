// Chemistry elements data and bonding logic
export interface Element {
  symbol: string;
  name: string;
  nameIndonesian: string;
  atomicNumber: number;
  electronConfiguration: string;
  valenceElectrons: number;
  electronegativity: number;
  group: number;
  period: number;
  category: 'metal' | 'nonmetal' | 'metalloid' | 'noble-gas';
  color: string;
}

export interface Bond {
  type: 'ionic' | 'covalent' | 'metallic';
  description: string;
  descriptionIndonesian: string;
}

export interface Compound {
  formula: string;
  name: string;
  nameIndonesian: string;
  bondType: 'ionic' | 'covalent' | 'metallic';
  description: string;
  descriptionIndonesian: string;
}

export const elements: Element[] = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', nameIndonesian: 'Hidrogen', atomicNumber: 1, electronConfiguration: '1s1', valenceElectrons: 1, electronegativity: 2.2, group: 1, period: 1, category: 'nonmetal', color: '#FF6B6B' },
  { symbol: 'He', name: 'Helium', nameIndonesian: 'Helium', atomicNumber: 2, electronConfiguration: '1s2', valenceElectrons: 8, electronegativity: 0, group: 18, period: 1, category: 'noble-gas', color: '#4ECDC4' },
  
  // Period 2
  { symbol: 'Li', name: 'Lithium', nameIndonesian: 'Litium', atomicNumber: 3, electronConfiguration: '1s2 2s1', valenceElectrons: 1, electronegativity: 0.98, group: 1, period: 2, category: 'metal', color: '#FFE66D' },
  { symbol: 'Be', name: 'Beryllium', nameIndonesian: 'Berilium', atomicNumber: 4, electronConfiguration: '1s2 2s2', valenceElectrons: 2, electronegativity: 1.57, group: 2, period: 2, category: 'metal', color: '#FF8B94' },
  { symbol: 'B', name: 'Boron', nameIndonesian: 'Boron', atomicNumber: 5, electronConfiguration: '1s2 2s2 2p1', valenceElectrons: 3, electronegativity: 2.04, group: 13, period: 2, category: 'metalloid', color: '#A8E6CF' },
  { symbol: 'C', name: 'Carbon', nameIndonesian: 'Karbon', atomicNumber: 6, electronConfiguration: '1s2 2s2 2p2', valenceElectrons: 4, electronegativity: 2.55, group: 14, period: 2, category: 'nonmetal', color: '#95A5A6' },
  { symbol: 'N', name: 'Nitrogen', nameIndonesian: 'Nitrogen', atomicNumber: 7, electronConfiguration: '1s2 2s2 2p3', valenceElectrons: 5, electronegativity: 3.04, group: 15, period: 2, category: 'nonmetal', color: '#3498DB' },
  { symbol: 'O', name: 'Oxygen', nameIndonesian: 'Oksigen', atomicNumber: 8, electronConfiguration: '1s2 2s2 2p4', valenceElectrons: 6, electronegativity: 3.44, group: 16, period: 2, category: 'nonmetal', color: '#E74C3C' },
  { symbol: 'F', name: 'Fluorine', nameIndonesian: 'Fluorin', atomicNumber: 9, electronConfiguration: '1s2 2s2 2p5', valenceElectrons: 7, electronegativity: 3.98, group: 17, period: 2, category: 'nonmetal', color: '#F39C12' },
  { symbol: 'Ne', name: 'Neon', nameIndonesian: 'Neon', atomicNumber: 10, electronConfiguration: '1s2 2s2 2p6', valenceElectrons: 8, electronegativity: 0, group: 18, period: 2, category: 'noble-gas', color: '#9B59B6' },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', nameIndonesian: 'Natrium', atomicNumber: 11, electronConfiguration: '1s2 2s2 2p6 3s1', valenceElectrons: 1, electronegativity: 0.93, group: 1, period: 3, category: 'metal', color: '#F1C40F' },
  { symbol: 'Mg', name: 'Magnesium', nameIndonesian: 'Magnesium', atomicNumber: 12, electronConfiguration: '1s2 2s2 2p6 3s2', valenceElectrons: 2, electronegativity: 1.31, group: 2, period: 3, category: 'metal', color: '#2ECC71' },
  { symbol: 'Al', name: 'Aluminum', nameIndonesian: 'Aluminium', atomicNumber: 13, electronConfiguration: '1s2 2s2 2p6 3s2 3p1', valenceElectrons: 3, electronegativity: 1.61, group: 13, period: 3, category: 'metal', color: '#95A5A6' },
  { symbol: 'Si', name: 'Silicon', nameIndonesian: 'Silikon', atomicNumber: 14, electronConfiguration: '1s2 2s2 2p6 3s2 3p2', valenceElectrons: 4, electronegativity: 1.9, group: 14, period: 3, category: 'metalloid', color: '#34495E' },
  { symbol: 'P', name: 'Phosphorus', nameIndonesian: 'Fosfor', atomicNumber: 15, electronConfiguration: '1s2 2s2 2p6 3s2 3p3', valenceElectrons: 5, electronegativity: 2.19, group: 15, period: 3, category: 'nonmetal', color: '#E67E22' },
  { symbol: 'S', name: 'Sulfur', nameIndonesian: 'Belerang', atomicNumber: 16, electronConfiguration: '1s2 2s2 2p6 3s2 3p4', valenceElectrons: 6, electronegativity: 2.58, group: 16, period: 3, category: 'nonmetal', color: '#F39C12' },
  { symbol: 'Cl', name: 'Chlorine', nameIndonesian: 'Klorin', atomicNumber: 17, electronConfiguration: '1s2 2s2 2p6 3s2 3p5', valenceElectrons: 7, electronegativity: 3.16, group: 17, period: 3, category: 'nonmetal', color: '#27AE60' },
  { symbol: 'Ar', name: 'Argon', nameIndonesian: 'Argon', atomicNumber: 18, electronConfiguration: '1s2 2s2 2p6 3s2 3p6', valenceElectrons: 8, electronegativity: 0, group: 18, period: 3, category: 'noble-gas', color: '#8E44AD' },
  
  // Period 4 (most common)
  { symbol: 'K', name: 'Potassium', nameIndonesian: 'Kalium', atomicNumber: 19, electronConfiguration: '[Ar] 4s1', valenceElectrons: 1, electronegativity: 0.82, group: 1, period: 4, category: 'metal', color: '#9B59B6' },
  { symbol: 'Ca', name: 'Calcium', nameIndonesian: 'Kalsium', atomicNumber: 20, electronConfiguration: '[Ar] 4s2', valenceElectrons: 2, electronegativity: 1.0, group: 2, period: 4, category: 'metal', color: '#E74C3C' },
  { symbol: 'Fe', name: 'Iron', nameIndonesian: 'Besi', atomicNumber: 26, electronConfiguration: '[Ar] 3d6 4s2', valenceElectrons: 2, electronegativity: 1.83, group: 8, period: 4, category: 'metal', color: '#95A5A6' },
  { symbol: 'Cu', name: 'Copper', nameIndonesian: 'Tembaga', atomicNumber: 29, electronConfiguration: '[Ar] 3d10 4s1', valenceElectrons: 1, electronegativity: 1.9, group: 11, period: 4, category: 'metal', color: '#E67E22' },
  { symbol: 'Zn', name: 'Zinc', nameIndonesian: 'Seng', atomicNumber: 30, electronConfiguration: '[Ar] 3d10 4s2', valenceElectrons: 2, electronegativity: 1.65, group: 12, period: 4, category: 'metal', color: '#3498DB' },
  { symbol: 'Br', name: 'Bromine', nameIndonesian: 'Bromin', atomicNumber: 35, electronConfiguration: '[Ar] 3d10 4s2 4p5', valenceElectrons: 7, electronegativity: 2.96, group: 17, period: 4, category: 'nonmetal', color: '#A0522D' },
];

export const determineBondType = (element1: Element, element2: Element): 'ionic' | 'covalent' | 'metallic' => {
  // If both are metals, it's metallic bonding
  if (element1.category === 'metal' && element2.category === 'metal') {
    return 'metallic';
  }
  
  // If one is metal and other is nonmetal, check electronegativity difference
  if ((element1.category === 'metal' && element2.category === 'nonmetal') ||
      (element1.category === 'nonmetal' && element2.category === 'metal')) {
    const electronegativityDiff = Math.abs(element1.electronegativity - element2.electronegativity);
    return electronegativityDiff >= 1.7 ? 'ionic' : 'covalent';
  }
  
  // If both are nonmetals, it's covalent
  return 'covalent';
};

export const getCompoundFormula = (element1: Element, element2: Element): string => {
  const bondType = determineBondType(element1, element2);
  
  if (bondType === 'metallic') {
    return `${element1.symbol}${element2.symbol}`;
  }
  
  if (bondType === 'ionic') {
    // Simple ionic formula based on valence electrons
    const metal = element1.category === 'metal' ? element1 : element2;
    const nonMetal = element1.category === 'nonmetal' ? element1 : element2;
    
    const metalCharge = metal.valenceElectrons <= 4 ? metal.valenceElectrons : metal.valenceElectrons - 8;
    const nonMetalCharge = nonMetal.valenceElectrons - 8;
    
    const lcm = Math.abs(metalCharge * nonMetalCharge);
    const metalCount = lcm / Math.abs(metalCharge);
    const nonMetalCount = lcm / Math.abs(nonMetalCharge);
    
    if (metal === element1) {
      return `${metal.symbol}${metalCount > 1 ? metalCount : ''}${nonMetal.symbol}${nonMetalCount > 1 ? nonMetalCount : ''}`;
    } else {
      return `${metal.symbol}${metalCount > 1 ? metalCount : ''}${nonMetal.symbol}${nonMetalCount > 1 ? nonMetalCount : ''}`;
    }
  }
  
  // Covalent - simplified
  return `${element1.symbol}${element2.symbol}`;
};

export const getCompoundName = (element1: Element, element2: Element, language: 'en' | 'id'): string => {
  const bondType = determineBondType(element1, element2);
  const formula = getCompoundFormula(element1, element2);
  
  // Common compound names
  const compoundNames: { [key: string]: { en: string; id: string } } = {
    'NaCl': { en: 'Sodium Chloride', id: 'Natrium Klorida' },
    'H2O': { en: 'Water', id: 'Air' },
    'CO2': { en: 'Carbon Dioxide', id: 'Karbon Dioksida' },
    'NH3': { en: 'Ammonia', id: 'Amonia' },
    'CH4': { en: 'Methane', id: 'Metana' },
    'HCl': { en: 'Hydrogen Chloride', id: 'Hidrogen Klorida' },
    'CaO': { en: 'Calcium Oxide', id: 'Kalsium Oksida' },
    'MgO': { en: 'Magnesium Oxide', id: 'Magnesium Oksida' },
    'Al2O3': { en: 'Aluminum Oxide', id: 'Aluminium Oksida' },
    'Fe2O3': { en: 'Iron(III) Oxide', id: 'Besi(III) Oksida' },
  };
  
  if (compoundNames[formula]) {
    return compoundNames[formula][language];
  }
  
  // Generic naming
  const name1 = language === 'en' ? element1.name : element1.nameIndonesian;
  const name2 = language === 'en' ? element2.name : element2.nameIndonesian;
  
  if (bondType === 'ionic') {
    return language === 'en' ? `${name1} ${name2}ide` : `${name1} ${name2}ida`;
  }
  
  return `${name1} ${name2}`;
};

export const getBondDescription = (element1: Element, element2: Element, language: 'en' | 'id'): string => {
  const bondType = determineBondType(element1, element2);
  
  const descriptions = {
    ionic: {
      en: "Electrons are transferred from metal to nonmetal, creating charged ions that attract each other.",
      id: "Elektron ditransfer dari logam ke nonlogam, menciptakan ion bermuatan yang saling tarik-menarik."
    },
    covalent: {
      en: "Electrons are shared between atoms to achieve stable electron configurations.",
      id: "Elektron dibagi antara atom untuk mencapai konfigurasi elektron yang stabil."
    },
    metallic: {
      en: "Electrons form a 'sea' that moves freely between metal atoms, creating strong bonds.",
      id: "Elektron membentuk 'lautan' yang bergerak bebas antara atom logam, menciptakan ikatan yang kuat."
    }
  };
  
  return descriptions[bondType][language];
};