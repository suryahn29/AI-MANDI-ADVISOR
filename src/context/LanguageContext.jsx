import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    home: "Home",
    findMandi: "Find Mandi",
    comparePrices: "Compare Prices",

    // Home
    tagline: "Smarter Selling for Farmers",
    smartAgriculture: "Smart Agriculture, Better Earnings",
    sellSmarter: "Sell Smarter.",
    earnBetter: "Earn Better.",
    homeDescription:
      "Find the best mandi for your crops. Compare market prices, calculate transportation costs and discover where you can earn more.",
    speakKannada: "Speak in Kannada",
    manualEntry: "Enter Details Manually",
    howWeHelp: "How We Help Farmers",
    compareMandi: "Compare Mandi Prices",
    transportCalculator: "Transport Calculator",
    maximiseProfit: "Maximise Your Profit",

    // Farmer Input
    findBestMandi: "Find the Best Mandi",
    crop: "Select your crop",
    quantity: "Available quantity",
    village: "Village / Farm location",
    district: "District",
    submit: "Find Best Mandi",

    // Comparison
    marketAnalysis: "MARKET ANALYSIS",
    selectedCrop: "Selected Crop",
    availableQuantity: "Available Quantity",
    farmLocation: "Farm Location",
    pricePerQuintal: "Price / Quintal",
    distance: "Distance",
    transportCost: "Transport Cost",
    netEarnings: "Estimated Net Earnings",
    viewDetails: "View Details",

    // Recommendation
    recommendation: "Your Mandi Recommendation",
    grossRevenue: "Gross Selling Revenue",
    transportation: "Transportation",
    otherCharges: "Other Charges",
    whyMandi: "Why This Mandi?",

    // Assistant
    assistant: "AI Selling Assistant",
    askAssistant: "Ask AI Selling Assistant",
  },

  kn: {
    // Navbar
    home: "ಮುಖಪುಟ",
    findMandi: "ಮಂಡಿ ಹುಡುಕಿ",
    comparePrices: "ಬೆಲೆ ಹೋಲಿಕೆ",

    // Home
    tagline: "ರೈತರಿಗಾಗಿ ಉತ್ತಮ ಮಾರಾಟ",
    smartAgriculture: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ, ಉತ್ತಮ ಆದಾಯ",
    sellSmarter: "ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಮಾರಿ.",
    earnBetter: "ಹೆಚ್ಚು ಸಂಪಾದಿಸಿ.",
    homeDescription:
      "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಉತ್ತಮ ಮಂಡಿಯನ್ನು ಹುಡುಕಿ. ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಸಿ, ಸಾಗಣೆ ವೆಚ್ಚವನ್ನು ಲೆಕ್ಕಹಾಕಿ ಮತ್ತು ಹೆಚ್ಚು ಆದಾಯ ಗಳಿಸಿ.",
    speakKannada: "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ",
    manualEntry: "ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    howWeHelp: "ನಾವು ರೈತರಿಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇವೆ",
    compareMandi: "ಮಂಡಿ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಸಿ",
    transportCalculator: "ಸಾಗಣೆ ವೆಚ್ಚದ ಲೆಕ್ಕಾಚಾರ",
    maximiseProfit: "ನಿಮ್ಮ ಲಾಭವನ್ನು ಹೆಚ್ಚಿಸಿ",

    // Farmer Input
    findBestMandi: "ಉತ್ತಮ ಮಂಡಿಯನ್ನು ಹುಡುಕಿ",
    crop: "ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    quantity: "ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ",
    village: "ಗ್ರಾಮ / ಕೃಷಿ ಸ್ಥಳ",
    district: "ಜಿಲ್ಲೆ",
    submit: "ಉತ್ತಮ ಮಂಡಿ ಹುಡುಕಿ",

    // Comparison
    marketAnalysis: "ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ",
    selectedCrop: "ಆಯ್ಕೆ ಮಾಡಿದ ಬೆಳೆ",
    availableQuantity: "ಲಭ್ಯವಿರುವ ಪ್ರಮಾಣ",
    farmLocation: "ಕೃಷಿ ಸ್ಥಳ",
    pricePerQuintal: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ",
    distance: "ದೂರ",
    transportCost: "ಸಾಗಣೆ ವೆಚ್ಚ",
    netEarnings: "ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ",
    viewDetails: "ವಿವರಗಳನ್ನು ನೋಡಿ",

    // Recommendation
    recommendation: "ನಿಮ್ಮ ಮಂಡಿ ಶಿಫಾರಸು",
    grossRevenue: "ಒಟ್ಟು ಮಾರಾಟದ ಆದಾಯ",
    transportation: "ಸಾಗಣೆ ವೆಚ್ಚ",
    otherCharges: "ಇತರೆ ಶುಲ್ಕಗಳು",
    whyMandi: "ಈ ಮಂಡಿ ಏಕೆ?",

    // Assistant
    assistant: "AI ಮಾರಾಟ ಸಹಾಯಕ",
    askAssistant: "AI ಮಾರಾಟ ಸಹಾಯಕರನ್ನು ಕೇಳಿ",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "kn" : "en"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
