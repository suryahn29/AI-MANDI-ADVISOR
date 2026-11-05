import { Sprout, Languages, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-green-100 p-2.5 rounded-xl group-hover:bg-green-200 transition">
            <Sprout size={27} className="text-green-800" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-green-950 tracking-tight">
                Mandi Mitra
              </h1>

              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-green-50 text-green-800 px-2 py-1 rounded-full border border-green-100">
                <Sparkles size={11} />
                AI
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {t("tagline")}
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-green-700 transition">
            {t("home")}
          </Link>

          <Link to="/input" className="hover:text-green-700 transition">
            {t("findMandi")}
          </Link>

          <Link to="/mandis" className="hover:text-green-700 transition">
            {t("comparePrices")}
          </Link>
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-50 hover:border-green-200 transition"
        >
          <Languages size={18} className="text-green-800" />
          {language === "en" ? "ಕನ್ನಡ" : "English"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;