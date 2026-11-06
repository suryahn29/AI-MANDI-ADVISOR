import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShieldAlert } from "lucide-react";

import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { SITE } from "../siteInfo";

const TEXT = {
  en: {
    about:
      "Helping Karnataka farmers choose the mandi with the best net earnings, in Kannada and English, by text or voice.",
    explore: "Explore",
    help: "Help",
    contact: "Contact",
    links: {
      home: "Home",
      input: "Find Best Mandi",
      mandis: "Compare Prices",
      assistant: "Selling Assistant",
      aboutUs: "About Us",
      faq: "FAQ",
      contactUs: "Contact Us",
    },
    disclaimer:
      "Prices, distances and charges are sample estimates for demonstration, not live market prices. Always check the price at the mandi before selling.",
    rights: "All rights reserved.",
  },
  kn: {
    about:
      "ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಹೆಚ್ಚು ನಿವ್ವಳ ಆದಾಯ ನೀಡುವ ಮಂಡಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಸಹಾಯ — ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ, ಬರಹ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ.",
    explore: "ಅನ್ವೇಷಿಸಿ",
    help: "ಸಹಾಯ",
    contact: "ಸಂಪರ್ಕ",
    links: {
      home: "ಮುಖಪುಟ",
      input: "ಉತ್ತಮ ಮಂಡಿ ಹುಡುಕಿ",
      mandis: "ಬೆಲೆ ಹೋಲಿಕೆ",
      assistant: "ಮಾರಾಟ ಸಹಾಯಕ",
      aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
      faq: "ಪದೇ ಪದೇ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು",
      contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    },
    disclaimer:
      "ಬೆಲೆ, ದೂರ ಮತ್ತು ಶುಲ್ಕಗಳು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಮಾದರಿ ಅಂದಾಜುಗಳು, ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಲ್ಲ. ಮಾರಾಟದ ಮೊದಲು ಮಂಡಿಯಲ್ಲಿ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ.",
    rights: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
};

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-green-100/80 hover:text-white transition">
        {children}
      </Link>
    </li>
  );
}

function Footer() {
  const { language } = useLanguage();
  const txt = TEXT[language] ?? TEXT.en;
  const kn = language === "kn";

  return (
    <footer className="bg-green-950 text-green-50 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <Logo size={44} />
            <div>
              <p className="text-lg font-bold text-white">{kn ? SITE.nameKn : SITE.name}</p>
              <p className="text-xs text-green-200/80">{kn ? SITE.name : SITE.nameKn}</p>
            </div>
          </Link>
          <p className="text-sm text-green-100/80 mt-4 leading-relaxed">{txt.about}</p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white mb-4">{txt.explore}</h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/">{txt.links.home}</FooterLink>
            <FooterLink to="/input">{txt.links.input}</FooterLink>
            <FooterLink to="/mandis">{txt.links.mandis}</FooterLink>
            <FooterLink to="/assistant">{txt.links.assistant}</FooterLink>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-white mb-4">{txt.help}</h3>
          <ul className="space-y-2 text-sm">
            <FooterLink to="/about">{txt.links.aboutUs}</FooterLink>
            <FooterLink to="/faq">{txt.links.faq}</FooterLink>
            <FooterLink to="/contact">{txt.links.contactUs}</FooterLink>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-4">{txt.contact}</h3>
          <ul className="space-y-3 text-sm text-green-100/80">
            {SITE.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-green-300" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white break-all">
                  {SITE.email}
                </a>
              </li>
            )}
            {SITE.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-green-300" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0 text-green-300" />
              {SITE.location[language] ?? SITE.location.en}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-green-200/70">
          <p className="flex items-start gap-2 max-w-3xl">
            <ShieldAlert size={14} className="shrink-0 mt-0.5" />
            {txt.disclaimer}
          </p>
          <p className="shrink-0">
            © {SITE.year} {SITE.name}. {txt.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
