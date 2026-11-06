import { Link } from "react-router-dom";
import { Mic, Scale, Truck, Languages, ArrowRight } from "lucide-react";

import Logo from "../components/Logo";
import { useLanguage } from "../context/LanguageContext";
import { SITE } from "../siteInfo";

const TEXT = {
  en: {
    title: "About Raitha Mitra",
    intro:
      "Raitha Mitra (ರೈತ ಮಿತ್ರ, \"farmer's friend\") helps farmers in Karnataka decide where to sell. The highest price is not always the best deal: transport and mandi charges change what you actually take home. Raitha Mitra compares mandis on net earnings, so you can choose with confidence.",
    missionTitle: "Our mission",
    mission:
      "Give every farmer a simple, honest answer to one question — which mandi gives me the most money after costs? — in their own language, by text or by voice.",
    howTitle: "How it helps",
    features: [
      { icon: Scale, title: "Net earnings, not just price", body: "Price × quantity minus transport and other charges, compared across nearby mandis." },
      { icon: Truck, title: "Transport costs included", body: "Distance-based transport estimates so a far-away high price doesn't mislead you." },
      { icon: Mic, title: "Talk in Kannada", body: "Speak to Chaitra, our voice assistant, or listen to your recommendation read aloud." },
      { icon: Languages, title: "Kannada and English", body: "Switch language any time from the top of the page." },
    ],
    noteTitle: "Please note",
    note:
      "This is a demonstration project. Prices, distances and charges are sample estimates, not live market prices. Always confirm the price at the mandi before selling.",
    cta: "Find your best mandi",
  },
  kn: {
    title: "ರೈತ ಮಿತ್ರದ ಬಗ್ಗೆ",
    intro:
      "ರೈತ ಮಿತ್ರ ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಬೆಳೆ ಎಲ್ಲಿ ಮಾರಬೇಕು ಎಂದು ನಿರ್ಧರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಹೆಚ್ಚು ಬೆಲೆ ಯಾವಾಗಲೂ ಹೆಚ್ಚು ಲಾಭವಲ್ಲ — ಸಾಗಣೆ ಮತ್ತು ಮಂಡಿ ಶುಲ್ಕಗಳು ನಿಮ್ಮ ಕೈಗೆ ಬರುವ ಹಣವನ್ನು ಬದಲಿಸುತ್ತವೆ. ರೈತ ಮಿತ್ರ ಮಂಡಿಗಳನ್ನು ನಿವ್ವಳ ಆದಾಯದ ಆಧಾರದಲ್ಲಿ ಹೋಲಿಸುತ್ತದೆ.",
    missionTitle: "ನಮ್ಮ ಗುರಿ",
    mission:
      "ವೆಚ್ಚ ಕಳೆದ ನಂತರ ಯಾವ ಮಂಡಿಯಲ್ಲಿ ಹೆಚ್ಚು ಹಣ ಸಿಗುತ್ತದೆ ಎಂಬ ಪ್ರಶ್ನೆಗೆ ಪ್ರತಿಯೊಬ್ಬ ರೈತನಿಗೂ ಅವರ ಭಾಷೆಯಲ್ಲಿ, ಬರಹ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ ಸರಳ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ಉತ್ತರ ನೀಡುವುದು.",
    howTitle: "ಇದು ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ",
    features: [
      { icon: Scale, title: "ಕೇವಲ ಬೆಲೆ ಅಲ್ಲ, ನಿವ್ವಳ ಆದಾಯ", body: "ಬೆಲೆ × ಪ್ರಮಾಣದಿಂದ ಸಾಗಣೆ ಮತ್ತು ಇತರ ಶುಲ್ಕ ಕಳೆದು, ಹತ್ತಿರದ ಮಂಡಿಗಳ ಹೋಲಿಕೆ." },
      { icon: Truck, title: "ಸಾಗಣೆ ವೆಚ್ಚ ಸೇರಿದೆ", body: "ದೂರದ ಆಧಾರದ ಸಾಗಣೆ ಅಂದಾಜು, ದೂರದ ಹೆಚ್ಚು ಬೆಲೆ ತಪ್ಪುದಾರಿಗೆ ಎಳೆಯದಂತೆ." },
      { icon: Mic, title: "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ", body: "ನಮ್ಮ ಧ್ವನಿ ಸಹಾಯಕಿ ಚೈತ್ರಾ ಜೊತೆ ಮಾತನಾಡಿ ಅಥವಾ ಶಿಫಾರಸನ್ನು ಕೇಳಿ." },
      { icon: Languages, title: "ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್", body: "ಪುಟದ ಮೇಲ್ಭಾಗದಿಂದ ಯಾವಾಗ ಬೇಕಾದರೂ ಭಾಷೆ ಬದಲಿಸಿ." },
    ],
    noteTitle: "ಗಮನಿಸಿ",
    note:
      "ಇದು ಪ್ರದರ್ಶನ ಯೋಜನೆ. ಬೆಲೆ, ದೂರ ಮತ್ತು ಶುಲ್ಕಗಳು ಮಾದರಿ ಅಂದಾಜುಗಳು, ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಲ್ಲ. ಮಾರಾಟದ ಮೊದಲು ಮಂಡಿಯಲ್ಲಿ ಬೆಲೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    cta: "ನಿಮ್ಮ ಉತ್ತಮ ಮಂಡಿ ಹುಡುಕಿ",
  },
};

function About() {
  const { language } = useLanguage();
  const txt = TEXT[language] ?? TEXT.en;

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-14">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Logo size={64} />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-950">{txt.title}</h1>
            <p className="text-green-700 font-medium">{SITE.nameKn} · {SITE.name}</p>
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed">{txt.intro}</p>

        <div className="bg-white border border-gray-100 rounded-3xl p-7 mt-8">
          <h2 className="text-xl font-bold text-green-950 mb-2">{txt.missionTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{txt.mission}</p>
        </div>

        <h2 className="text-xl font-bold text-green-950 mt-10 mb-4">{txt.howTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {txt.features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="bg-green-100 text-green-800 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mt-10">
          <h2 className="font-bold text-amber-900 mb-1">{txt.noteTitle}</h2>
          <p className="text-amber-900/80 text-sm leading-relaxed">{txt.note}</p>
        </div>

        <Link
          to="/input"
          className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-7 py-3 rounded-xl font-semibold mt-10 transition"
        >
          {txt.cta}
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default About;
