import {
  MapPin,
  TrendingUp,
  ArrowRight,
  Truck,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function MandiComparison() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const farmerData = location.state;

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut",
      },
    },
  };

  if (!farmerData) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="min-h-screen bg-[#F8FAF5] flex flex-col items-center justify-center px-6"
      >
        <h1 className="text-2xl font-bold text-green-950 mb-3">
          {language === "kn"
            ? "ರೈತರ ವಿವರಗಳು ಕಂಡುಬಂದಿಲ್ಲ"
            : "Farmer details not found"}
        </h1>

        <p className="text-gray-500 mb-6">
          {language === "kn"
            ? "ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಸ್ಥಳದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ."
            : "Please enter your crop and location first."}
        </p>

        <button
          onClick={() => navigate("/input")}
          className="bg-green-800 text-white px-6 py-3 rounded-xl"
        >
          {t("findBestMandi")}
        </button>
      </motion.div>
    );
  }

  const quantity = Number(farmerData.quantity);

  const mandiData = [
    {
      name: "Kolar Mandi",
      kannadaName: "ಕೋಲಾರ ಮಂಡಿ",
      location: "Kolar, Karnataka",
      price: 2800,
      distance: 70,
      transportPer50: 3000,
      otherChargesPer50: 500,
    },
    {
      name: "Bengaluru Mandi",
      kannadaName: "ಬೆಂಗಳೂರು ಮಂಡಿ",
      location: "Bengaluru, Karnataka",
      price: 2500,
      distance: 35,
      transportPer50: 1500,
      otherChargesPer50: 300,
    },
    {
      name: "Ramanagara Mandi",
      kannadaName: "ರಾಮನಗರ ಮಂಡಿ",
      location: "Ramanagara, Karnataka",
      price: 2000,
      distance: 10,
      transportPer50: 500,
      otherChargesPer50: 200,
    },
  ];

  const mandis = mandiData.map((mandi) => {
    const grossRevenue = quantity * mandi.price;

    const transport = (mandi.transportPer50 / 50) * quantity;

    const otherCharges = (mandi.otherChargesPer50 / 50) * quantity;

    const net = grossRevenue - transport - otherCharges;

    return {
      ...mandi,
      grossRevenue,
      transport,
      otherCharges,
      net,
    };
  });

  const bestMandi = mandis.reduce((best, current) =>
    current.net > best.net ? current : best
  );

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const handleViewDetails = (mandi) => {
    navigate("/recommendation", {
      state: {
        farmer: farmerData,
        mandi: mandi,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <p className="text-green-700 font-semibold mb-2">
            {t("marketAnalysis")}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-green-950">
            {language === "kn"
              ? "ಹತ್ತಿರದ ಮಂಡಿಗಳನ್ನು ಹೋಲಿಸಿ"
              : "Compare Nearby Mandis"}
          </h1>

          <p className="text-gray-500 mt-3">
            {language === "kn"
              ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಸಾಗಣೆ ವೆಚ್ಚವನ್ನು ಹೋಲಿಸಿ."
              : "Compare market prices and transportation expenses to find your best selling opportunity."}
          </p>
        </motion.div>

        {/* Farmer Information */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 flex flex-wrap gap-8"
        >
          <div>
            <p className="text-sm text-gray-500">
              {t("selectedCrop")}
            </p>

            <h3 className="font-bold text-lg">
              {farmerData.crop}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {t("availableQuantity")}
            </p>

            <h3 className="font-bold text-lg">
              {quantity} {language === "kn" ? "ಕ್ವಿಂಟಾಲ್" : "Quintals"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {t("farmLocation")}
            </p>

            <h3 className="font-bold text-lg">
              {farmerData.village}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {t("district")}
            </p>

            <h3 className="font-bold text-lg">
              {farmerData.district}
            </h3>
          </div>
        </motion.div>

        {/* Mandi Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {mandis.map((mandi, index) => (

            <motion.div
              key={mandi.name}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.15,
                ease: "easeOut",
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -5,
                      transition: { duration: 0.2 },
                    }
              }
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-lg ${
                mandi.name === bestMandi.name
                  ? "border-green-600 ring-2 ring-green-100"
                  : "border-gray-100"
              }`}
            >

              {mandi.name === bestMandi.name && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {language === "kn" ? "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ" : "BEST OPTION"}
                </span>
              )}

              <h2 className="text-xl font-bold text-gray-900">
                {language === "kn" ? mandi.kannadaName : mandi.name}
              </h2>

              <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                <MapPin size={15} />
                {mandi.location}
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500 text-sm">
                    {t("pricePerQuintal")}
                  </span>

                  <span className="font-bold text-green-800">
                    {formatCurrency(mandi.price)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">
                    {t("distance")}
                  </span>

                  <span className="font-semibold">
                    {mandi.distance} km
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Truck size={15} />
                    {t("transportCost")}
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(mandi.transport)}
                  </span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-gray-500 text-sm">
                    {t("otherCharges")}
                  </span>

                  <span className="font-semibold">
                    {formatCurrency(mandi.otherCharges)}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">

                  <p className="text-sm text-gray-500 mb-1">
                    {t("netEarnings")}
                  </p>

                  <h3 className="text-2xl font-bold text-green-900">
                    {formatCurrency(mandi.net)}
                  </h3>

                </div>

              </div>

              <motion.button
                onClick={() => handleViewDetails(mandi)}
                whileHover={
                  shouldReduceMotion ? {} : { scale: 1.02 }
                }
                whileTap={
                  shouldReduceMotion ? {} : { scale: 0.97 }
                }
                className="w-full mt-6 flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl font-semibold transition"
              >
                {t("viewDetails")}
                <ArrowRight size={18} />
              </motion.button>

            </motion.div>

          ))}

        </div>

        {/* Recommendation Summary */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
            delay: shouldReduceMotion ? 0 : 0.5,
          }}
          className="bg-green-50 border border-green-100 rounded-xl p-5 mt-10 flex gap-3"
        >

          <TrendingUp
            className="text-green-800 shrink-0"
            size={22}
          />

          <div>

            <p className="font-bold text-green-900">
              {language === "kn"
                ? `ನಮ್ಮ ಶಿಫಾರಸು: ${bestMandi.kannadaName}`
                : `Our Recommendation: ${bestMandi.name}`}
            </p>

            <p className="text-sm text-green-800 mt-1">
              {language === "kn"
                ? "ಅಂದಾಜು ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿದ ನಂತರ ಈ ಮಂಡಿಯಲ್ಲಿ ಹೆಚ್ಚು ಆದಾಯ ಸಿಗುತ್ತದೆ."
                : "Based on illustrative prices and estimated expenses, this mandi offers the highest net earnings."}
            </p>

          </div>

        </motion.div>

        <p className="text-xs text-gray-400 text-center mt-6">
          {language === "kn"
            ? "ಬೆಲೆಗಳು ಮತ್ತು ಸಾಗಣೆ ವೆಚ್ಚಗಳು ಮಾದರಿ ಮಾಹಿತಿಯಾಗಿವೆ. ನೈಜ ಬೆಲೆಗಳು ಬದಲಾಗಬಹುದು."
            : "Market prices and transportation expenses are illustrative demo values, not verified live data."}
        </p>

      </div>

    </div>
  );
}

export default MandiComparison;