import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, HelpCircle } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { SITE } from "../siteInfo";

const TEXT = {
  en: {
    title: "Contact Us",
    subtitle: "Questions, feedback or ideas to help farmers? We'd love to hear from you.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    reply: "We usually reply within 2 working days.",
    faqTitle: "Looking for a quick answer?",
    faqLink: "Read the FAQ",
    privacy: "Please don't send Aadhaar, bank or other personal details.",
  },
  kn: {
    title: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    subtitle: "ಪ್ರಶ್ನೆಗಳು, ಸಲಹೆಗಳು ಅಥವಾ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಆಲೋಚನೆಗಳು? ನಮಗೆ ತಿಳಿಸಿ.",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    location: "ಸ್ಥಳ",
    reply: "ಸಾಮಾನ್ಯವಾಗಿ 2 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ಉತ್ತರಿಸುತ್ತೇವೆ.",
    faqTitle: "ತ್ವರಿತ ಉತ್ತರ ಬೇಕೇ?",
    faqLink: "ಪ್ರಶ್ನೋತ್ತರ ಓದಿ",
    privacy: "ದಯವಿಟ್ಟು ಆಧಾರ್, ಬ್ಯಾಂಕ್ ಅಥವಾ ಇತರ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಕಳುಹಿಸಬೇಡಿ.",
  },
};

function Card({ icon: Icon, label, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4">
      <div className="bg-green-100 text-green-800 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <div className="font-semibold text-gray-900 break-all">{children}</div>
      </div>
    </div>
  );
}

function Contact() {
  const { language } = useLanguage();
  const txt = TEXT[language] ?? TEXT.en;

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-950">{txt.title}</h1>
        <p className="text-gray-500 mt-2 mb-8">{txt.subtitle}</p>

        <div className="grid gap-4">
          {SITE.email && (
            <Card icon={Mail} label={txt.email}>
              <a href={`mailto:${SITE.email}`} className="text-green-800 hover:underline">
                {SITE.email}
              </a>
            </Card>
          )}
          {SITE.phone && (
            <Card icon={Phone} label={txt.phone}>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="text-green-800 hover:underline">
                {SITE.phone}
              </a>
            </Card>
          )}
          <Card icon={MapPin} label={txt.location}>
            {SITE.location[language] ?? SITE.location.en}
          </Card>
        </div>

        <p className="text-sm text-gray-500 mt-4">{txt.reply}</p>
        <p className="text-sm text-gray-500 mt-1">{txt.privacy}</p>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mt-10 flex items-center gap-4">
          <HelpCircle size={28} className="text-green-800 shrink-0" />
          <div>
            <p className="font-semibold text-green-950">{txt.faqTitle}</p>
            <Link to="/faq" className="text-green-800 font-semibold hover:underline">
              {txt.faqLink} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
