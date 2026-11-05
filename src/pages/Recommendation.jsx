import {
  Trophy,
  MapPin,
  Truck,
  IndianRupee,
  Mic,
  CheckCircle,
  ArrowLeft,
  Sprout,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, t } = useLanguage();

  const recommendationData = location.state;

  if (!recommendationData) {
    return (
      <div className="min-h-screen bg-[#F8FAF5] flex flex-col items-center justify-center px-6">

        <h1 className="text-2xl font-bold text-green-950 mb-3">
          {language === "kn"
            ? "ಶಿಫಾರಸು ಕಂಡುಬಂದಿಲ್ಲ"
            : "Recommendation Not Found"}
        </h1>

        <p className="text-gray-500 mb-6">
          {language === "kn"
            ? "ದಯವಿಟ್ಟು ಮೊದಲು ಮಂಡಿಗಳನ್ನು ಹೋಲಿಸಿ."
            : "Please compare mandis before viewing your recommendation."}
        </p>

        <button
          onClick={() => navigate("/input")}
          className="bg-green-800 text-white px-6 py-3 rounded-xl"
        >
          {t("findBestMandi")}
        </button>

      </div>
    );
  }

  const { farmer, mandi } = recommendationData;

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const mandiName =
    language === "kn"
      ? mandi.kannadaName || mandi.name
      : mandi.name;

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <p className="text-green-700 font-semibold text-sm mb-2">
            {language === "kn"
              ? "ನಿಮ್ಮ ಮಾರಾಟದ ಅವಕಾಶ"
              : "YOUR SELLING OPPORTUNITY"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-green-950">
            {t("recommendation")}
          </h1>

          <p className="text-gray-500 mt-3">
            {language === "kn"
              ? "ನಿಮ್ಮ ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿಯ ಅಂದಾಜು ಆದಾಯದ ವಿವರಗಳು."
              : "Here's your estimated earning breakdown based on your selected mandi."}
          </p>

        </div>

        {/* Recommended Mandi */}
        <div className="bg-green-900 rounded-3xl p-8 md:p-10 text-white shadow-xl">

          <div className="flex items-center gap-2 text-green-200 mb-5">
            <Trophy size={22} />

            <span className="font-semibold">
              {language === "kn" ? "ಆಯ್ಕೆ ಮಾಡಿದ ಮಂಡಿ" : "Selected Mandi"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {mandiName}
          </h2>

          <p className="flex items-center gap-2 text-green-200 mb-8">
            <MapPin size={18} />
            {mandi.location}
          </p>

          <div className="grid sm:grid-cols-3 gap-6">

            <div>
              <p className="text-green-200 text-sm">
                {language === "kn" ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ" : "Market Price"}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(mandi.price)}
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್" : "Per quintal"}
              </p>
            </div>

            <div>
              <p className="text-green-200 text-sm">
                {t("distance")}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {mandi.distance} km
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ನಿಮ್ಮ ಗ್ರಾಮದಿಂದ" : "From your village"}
              </p>
            </div>

            <div>
              <p className="text-green-200 text-sm">
                {t("availableQuantity")}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {farmer.quantity} Q
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ಲಭ್ಯವಿರುವ ಬೆಳೆ" : "Available produce"}
              </p>
            </div>

          </div>

        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mt-8 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900 mb-7">
            {language === "kn" ? "ನಿಮ್ಮ ಅಂದಾಜು ಆದಾಯ" : "Your Estimated Earnings"}
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {t("grossRevenue")}
              </span>

              <span className="font-semibold text-gray-900">
                {formatCurrency(mandi.grossRevenue)}
              </span>
            </div>

            <div className="flex justify-between items-center">

              <span className="text-gray-600 flex items-center gap-2">
                <Truck size={18} />
                {t("transportation")}
              </span>

              <span className="font-semibold text-red-600">
                - {formatCurrency(mandi.transport)}
              </span>

            </div>

            <div className="flex justify-between items-center">

              <span className="text-gray-600">
                {t("otherCharges")}
              </span>

              <span className="font-semibold text-red-600">
                - {formatCurrency(mandi.otherCharges)}
              </span>

            </div>

            <div className="border-t border-gray-200 pt-6">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500 text-sm">
                    {t("netEarnings")}
                  </p>

                  <p className="text-3xl font-bold text-green-800 mt-2">
                    {formatCurrency(mandi.net)}
                  </p>
                </div>

                <div className="bg-green-100 p-4 rounded-2xl">
                  <IndianRupee
                    size={30}
                    className="text-green-800"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Explanation */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mt-8 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {t("whyMandi")}
          </h2>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `${farmer.crop} ಗೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ ${formatCurrency(mandi.price)} ಆಗಿದೆ.`
                  : `Offers a market price of ${formatCurrency(mandi.price)} per quintal for ${farmer.crop}.`}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `ಅಂದಾಜು ಸಾಗಣೆ ವೆಚ್ಚ ${formatCurrency(mandi.transport)} ಆಗಿದೆ.`
                  : `Estimated transportation expense is ${formatCurrency(mandi.transport)}.`}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿದ ನಂತರ ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ${formatCurrency(mandi.net)} ಆಗಿದೆ.`
                  : `After estimated expenses, your expected net earnings are ${formatCurrency(mandi.net)}.`}
              </p>
            </div>

          </div>

        </div>

        {/* Kannada Voice Recommendation */}
        <div className="bg-green-50 border border-green-100 rounded-3xl p-8 mt-8 text-center">

          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic size={26} className="text-green-800" />
          </div>

          <h2 className="text-xl font-bold text-green-950">
            {language === "kn"
              ? "ನಿಮ್ಮ ಶಿಫಾರಸನ್ನು ಕೇಳಿ"
              : "Listen to Your Recommendation"}
          </h2>

          <p className="text-gray-600 mt-2 mb-5">
            {language === "kn"
              ? "ನಿಮ್ಮ ಮಾರಾಟದ ವಿವರಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ."
              : "Listen to your selling recommendation in Kannada."}
          </p>

          <button className="bg-green-800 hover:bg-green-900 text-white px-7 py-3 rounded-xl font-semibold transition">
            {language === "kn" ? "ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ" : "Listen Now"}
          </button>

        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-5 mt-8">

          <Link
            to="/mandis"
            state={farmer}
            className="inline-flex items-center gap-2 text-green-800 font-semibold hover:text-green-950"
          >
            <ArrowLeft size={18} />
            {language === "kn" ? "ಮಂಡಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to Mandi Comparison"}
          </Link>

          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 text-green-800 font-semibold hover:text-green-950"
          >
            <Sprout size={18} />
            {t("askAssistant")}
          </Link>

        </div>

        <p className="text-xs text-gray-400 text-center mt-8">
          {language === "kn"
            ? "ಈ ಆದಾಯವು ಮಾದರಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಅಂದಾಜು ವೆಚ್ಚಗಳನ್ನು ಆಧರಿಸಿದೆ."
            : "Earnings are estimates based on illustrative market data and assumed expenses."}
        </p>

      </div>

    </div>
  );
}

export default Recommendation;