import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const TEXT = {
  en: {
    title: "Frequently Asked Questions",
    subtitle: "Quick answers about using Raitha Mitra.",
    more: "Still have a question?",
    contact: "Contact us",
    items: [
      ["What does Raitha Mitra do?", "It compares nearby mandis for your crop and shows where you are likely to earn the most after transport and other charges are deducted."],
      ["Are the prices live market prices?", "No. This is a demonstration and uses sample estimates. Always confirm the price at the mandi before you sell."],
      ["Which crops and districts are covered?", "Crops: Tomato, Onion, Potato, Ragi and Rice. Districts: Bengaluru Urban, Ramanagara (Bengaluru South), Kolar, Mandya, Mysuru and Tumakuru."],
      ["How is the best mandi chosen?", "Net earnings = price × quantity − transport cost − other mandi charges. The mandi with the highest net earnings is recommended, not just the highest price."],
      ["What unit should I use for quantity?", "Quintals. 1 quintal = 100 kg, and 1 tonne = 10 quintals."],
      ["How do I use the voice assistant?", "Tap \"Speak in Kannada\", allow the microphone, and tell Chaitra your crop, quantity, village and district. You can speak in Kannada or English."],
      ["Why does the first voice or audio request take time?", "The server sleeps when idle and can take up to a minute to wake up. After that it responds quickly."],
      ["Is my voice or personal data stored?", "We only need your crop, quantity, village and district. Please do not share Aadhaar, bank or other personal details. The microphone is used only while a conversation is running."],
      ["Does it cost anything?", "No. Raitha Mitra is free to use."],
    ],
  },
  kn: {
    title: "ಪದೇ ಪದೇ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು",
    subtitle: "ರೈತ ಮಿತ್ರ ಬಳಕೆಯ ಬಗ್ಗೆ ತ್ವರಿತ ಉತ್ತರಗಳು.",
    more: "ಇನ್ನೂ ಪ್ರಶ್ನೆ ಇದೆಯೇ?",
    contact: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    items: [
      ["ರೈತ ಮಿತ್ರ ಏನು ಮಾಡುತ್ತದೆ?", "ನಿಮ್ಮ ಬೆಳೆಗೆ ಹತ್ತಿರದ ಮಂಡಿಗಳನ್ನು ಹೋಲಿಸಿ, ಸಾಗಣೆ ಮತ್ತು ಇತರ ಶುಲ್ಕ ಕಳೆದ ನಂತರ ಎಲ್ಲಿ ಹೆಚ್ಚು ಆದಾಯ ಸಿಗಬಹುದು ಎಂದು ತೋರಿಸುತ್ತದೆ."],
      ["ಬೆಲೆಗಳು ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳೇ?", "ಇಲ್ಲ. ಇದು ಪ್ರದರ್ಶನ, ಮಾದರಿ ಅಂದಾಜುಗಳನ್ನು ಬಳಸುತ್ತದೆ. ಮಾರಾಟದ ಮೊದಲು ಮಂಡಿಯಲ್ಲಿ ಬೆಲೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."],
      ["ಯಾವ ಬೆಳೆ ಮತ್ತು ಜಿಲ್ಲೆಗಳು ಸೇರಿವೆ?", "ಬೆಳೆಗಳು: ಟೊಮೇಟೊ, ಈರುಳ್ಳಿ, ಆಲೂಗಡ್ಡೆ, ರಾಗಿ, ಅಕ್ಕಿ. ಜಿಲ್ಲೆಗಳು: ಬೆಂಗಳೂರು ನಗರ, ರಾಮನಗರ (ಬೆಂಗಳೂರು ದಕ್ಷಿಣ), ಕೋಲಾರ, ಮಂಡ್ಯ, ಮೈಸೂರು, ತುಮಕೂರು."],
      ["ಉತ್ತಮ ಮಂಡಿಯನ್ನು ಹೇಗೆ ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತದೆ?", "ನಿವ್ವಳ ಆದಾಯ = ಬೆಲೆ × ಪ್ರಮಾಣ − ಸಾಗಣೆ ವೆಚ್ಚ − ಇತರ ಮಂಡಿ ಶುಲ್ಕ. ಹೆಚ್ಚು ನಿವ್ವಳ ಆದಾಯದ ಮಂಡಿಯನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ."],
      ["ಪ್ರಮಾಣಕ್ಕೆ ಯಾವ ಅಳತೆ ಬಳಸಬೇಕು?", "ಕ್ವಿಂಟಾಲ್. 1 ಕ್ವಿಂಟಾಲ್ = 100 ಕೆಜಿ, 1 ಟನ್ = 10 ಕ್ವಿಂಟಾಲ್."],
      ["ಧ್ವನಿ ಸಹಾಯಕವನ್ನು ಹೇಗೆ ಬಳಸುವುದು?", "\"ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ\" ಒತ್ತಿ, ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿಸಿ, ಚೈತ್ರಾಗೆ ನಿಮ್ಮ ಬೆಳೆ, ಪ್ರಮಾಣ, ಗ್ರಾಮ ಮತ್ತು ಜಿಲ್ಲೆ ತಿಳಿಸಿ."],
      ["ಮೊದಲ ಧ್ವನಿ ವಿನಂತಿಗೆ ಯಾಕೆ ಸಮಯ ಬೇಕು?", "ಸರ್ವರ್ ಬಳಕೆ ಇಲ್ಲದಾಗ ನಿದ್ರಿಸುತ್ತದೆ, ಎಚ್ಚರಗೊಳ್ಳಲು ಒಂದು ನಿಮಿಷದವರೆಗೆ ಬೇಕಾಗಬಹುದು. ನಂತರ ಬೇಗ ಉತ್ತರಿಸುತ್ತದೆ."],
      ["ನನ್ನ ಧ್ವನಿ ಅಥವಾ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಉಳಿಸಲಾಗುತ್ತದೆಯೇ?", "ನಮಗೆ ಬೆಳೆ, ಪ್ರಮಾಣ, ಗ್ರಾಮ ಮತ್ತು ಜಿಲ್ಲೆ ಮಾತ್ರ ಬೇಕು. ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಅಥವಾ ಇತರ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಮಾತುಕತೆ ನಡೆಯುವಾಗ ಮಾತ್ರ ಮೈಕ್ರೋಫೋನ್ ಬಳಸಲಾಗುತ್ತದೆ."],
      ["ಇದಕ್ಕೆ ಹಣ ಕೊಡಬೇಕೇ?", "ಇಲ್ಲ. ರೈತ ಮಿತ್ರ ಉಚಿತ."],
    ],
  },
};

function FAQ() {
  const { language } = useLanguage();
  const txt = TEXT[language] ?? TEXT.en;
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-950">{txt.title}</h1>
        <p className="text-gray-500 mt-2 mb-8">{txt.subtitle}</p>

        <div className="space-y-3">
          {txt.items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="bg-white border border-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 font-semibold text-gray-900"
                >
                  {q}
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-green-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>}
              </div>
            );
          })}
        </div>

        <p className="text-gray-600 mt-10">
          {txt.more}{" "}
          <Link to="/contact" className="text-green-800 font-semibold hover:underline">
            {txt.contact}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FAQ;
