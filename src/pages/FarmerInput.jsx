import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mic,
  MapPin,
  Sprout,
  ArrowRight,
  Package,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function FarmerInput() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
    village: "",
    district: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/mandis", {
      state: formData,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-14">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout size={28} className="text-green-800" />
          </div>

          <h1 className="text-3xl font-bold text-green-950">
            {t("findBestMandi")}
          </h1>

          <p className="text-gray-500 mt-3">
            {language === "kn"
              ? "ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಸ್ಥಳದ ವಿವರಗಳನ್ನು ನೀಡಿ."
              : "Tell us about your produce and location to find better selling opportunities."}
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* Voice Input */}
          <button
            type="button"
            className="w-full bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center justify-center gap-3 text-green-800 hover:bg-green-100 transition mb-8"
          >

            <Mic size={24} />

            <div className="text-left">

              <p className="font-semibold">
                {t("speakKannada")}
              </p>

              <p className="text-sm text-green-700">
                {language === "kn"
                  ? "ನಿಮ್ಮ ಬೆಳೆ, ಪ್ರಮಾಣ ಮತ್ತು ಗ್ರಾಮದ ಹೆಸರನ್ನು ಹೇಳಿ"
                  : "Tell us your crop, quantity and village"}
              </p>

            </div>

          </button>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Crop */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                {t("crop")}
              </label>

              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              >

                <option value="">
                  {language === "kn" ? "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ" : "Choose crop"}
                </option>

                <option value="Tomato">
                  {language === "kn" ? "ಟೊಮೇಟೊ" : "Tomato"}
                </option>

                <option value="Onion">
                  {language === "kn" ? "ಈರುಳ್ಳಿ" : "Onion"}
                </option>

                <option value="Potato">
                  {language === "kn" ? "ಆಲೂಗಡ್ಡೆ" : "Potato"}
                </option>

                <option value="Ragi">
                  {language === "kn" ? "ರಾಗಿ" : "Ragi"}
                </option>

                <option value="Rice">
                  {language === "kn" ? "ಅಕ್ಕಿ" : "Rice"}
                </option>

              </select>

            </div>

            {/* Quantity */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                {t("quantity")}
              </label>

              <div className="relative">

                <Package
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder={
                    language === "kn"
                      ? "ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ"
                      : "Enter quantity"
                  }
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-24 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  {language === "kn" ? "ಕ್ವಿಂಟಾಲ್" : "Quintals"}
                </span>

              </div>

            </div>

            {/* Village */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                {t("village")}
              </label>

              <div className="relative">

                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder={
                    language === "kn"
                      ? "ನಿಮ್ಮ ಗ್ರಾಮದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"
                      : "Enter your village"
                  }
                  required
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

            </div>

            {/* District */}
            <div>

              <label className="block font-semibold text-gray-700 mb-2">
                {t("district")}
              </label>

              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              >

                <option value="">
                  {language === "kn" ? "ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ" : "Select district"}
                </option>

                <option value="Bengaluru Urban">Bengaluru Urban</option>
                <option value="Ramanagara">Ramanagara</option>
                <option value="Kolar">Kolar</option>
                <option value="Mandya">Mandya</option>
                <option value="Mysuru">Mysuru</option>
                <option value="Tumakuru">Tumakuru</option>

              </select>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md"
            >
              {t("submit")}
              <ArrowRight size={20} />
            </button>

          </form>

        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          {language === "kn"
            ? "ಉತ್ತಮ ಮಾರಾಟದ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಲು ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ."
            : "Your information is used to find the best selling opportunities."}
        </p>

      </div>

    </div>
  );
}

export default FarmerInput;