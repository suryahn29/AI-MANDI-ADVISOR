import {
  Trophy,
  MapPin,
  Truck,
  IndianRupee,
  Mic,
  CheckCircle,
  ArrowLeft,
  Sprout,
  Sparkles,
  TrendingUp,
  Lightbulb,
  ShieldAlert,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import ListenRecommendation from "../components/ListenRecommendation";

function Recommendation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const recommendationData = location.state;

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

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut",
      },
    },
  };

  if (!recommendationData) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="min-h-screen bg-[#F8FAF5] flex flex-col items-center justify-center px-6"
      >
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
      </motion.div>
    );
  }

  const { farmer, mandi } = recommendationData;

  const formatCurrency = (value) =>
    `₹${Math.round(value).toLocaleString("en-IN")}`;

  const mandiName =
    language === "kn"
      ? mandi.kannadaName || mandi.name
      : mandi.name;

  // Illustrative price variation assumptions.
  // These will eventually come from the backend scenario engine.
  const priceVariation = 0.10;

  const scenarioCharges = mandi.transport + mandi.otherCharges;

  const scenarios = [
    {
      key: "optimistic",
      label: language === "kn" ? "ಅನುಕೂಲಕರ ಸ್ಥಿತಿ" : "Optimistic",
      description:
        language === "kn"
          ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ 10% ಹೆಚ್ಚಾದರೆ"
          : "Market price increases by 10%",
      price: mandi.price * (1 + priceVariation),
      color: "green",
      icon: TrendingUp,
    },
    {
      key: "expected",
      label: language === "kn" ? "ನಿರೀಕ್ಷಿತ ಸ್ಥಿತಿ" : "Expected",
      description:
        language === "kn"
          ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಬದಲಾಗದಿದ್ದರೆ"
          : "Market price remains unchanged",
      price: mandi.price,
      color: "blue",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      key: "pessimistic",
      label: language === "kn" ? "ಪ್ರತಿಕೂಲ ಸ್ಥಿತಿ" : "Pessimistic",
      description:
        language === "kn"
          ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ 10% ಕಡಿಮೆಯಾದರೆ"
          : "Market price decreases by 10%",
      price: mandi.price * (1 - priceVariation),
      color: "red",
      icon: ShieldAlert,
    },
  ].map((scenario) => {
    const grossRevenue = farmer.quantity * scenario.price;
    const netEarnings = grossRevenue - scenarioCharges;

    return {
      ...scenario,
      grossRevenue,
      netEarnings,
    };
  });

  const expectedScenario = scenarios.find(
    (scenario) => scenario.key === "expected"
  );

  const pessimisticScenario = scenarios.find(
    (scenario) => scenario.key === "pessimistic"
  );

  const potentialDownside =
    expectedScenario.netEarnings - pessimisticScenario.netEarnings;

  const marketInsight =
    language === "kn"
      ? `${mandi.kannadaName || mandi.name} ನಲ್ಲಿ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ${formatCurrency(mandi.price)} ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಲಭ್ಯವಿದೆ. ಸಾಗಣೆ ಮತ್ತು ಇತರ ಶುಲ್ಕಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿದ ನಂತರ ನಿಮ್ಮ ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ${formatCurrency(mandi.net)} ಆಗಿದೆ. ಈ ಅಂಕಿಅಂಶಗಳು ಲಭ್ಯವಿರುವ ಮಾದರಿ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿವೆ.`
      : `${mandi.name} offers a market price of ${formatCurrency(mandi.price)} per quintal. After accounting for estimated transportation and other charges, your expected net earnings are ${formatCurrency(mandi.net)}. These figures are based on the available illustrative market data.`;

  const scenarioStyles = {
    green: {
      card: "bg-green-50 border-green-200",
      badge: "bg-green-100 text-green-800",
      icon: "text-green-700",
      price: "text-green-800",
    },
    blue: {
      card: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-800",
      icon: "text-blue-700",
      price: "text-blue-800",
    },
    red: {
      card: "bg-red-50 border-red-200",
      badge: "bg-red-100 text-red-800",
      icon: "text-red-700",
      price: "text-red-800",
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
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
        </motion.div>

        {/* Recommended Mandi */}
        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
          }}
          className="bg-green-900 rounded-3xl p-8 md:p-10 text-white shadow-xl"
        >
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

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <p className="text-green-200 text-sm">
                {language === "kn" ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ" : "Market Price"}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(mandi.price)}
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್" : "Per quintal"}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-green-200 text-sm">
                {t("distance")}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {mandi.distance} km
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ನಿಮ್ಮ ಗ್ರಾಮದಿಂದ" : "From your village"}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-green-200 text-sm">
                {t("availableQuantity")}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {farmer.quantity} Q
              </h3>

              <p className="text-green-200 text-xs">
                {language === "kn" ? "ಲಭ್ಯವಿರುವ ಬೆಳೆ" : "Available produce"}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Earnings Breakdown */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
          className="bg-white rounded-3xl border border-gray-100 p-8 mt-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-7">
            {language === "kn"
              ? "ನಿಮ್ಮ ಅಂದಾಜು ಆದಾಯ"
              : "Your Estimated Earnings"}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <span className="text-gray-600">
                {t("grossRevenue")}
              </span>

              <span className="font-semibold text-gray-900">
                {formatCurrency(mandi.grossRevenue)}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-2">
                <Truck size={18} />
                {t("transportation")}
              </span>

              <span className="font-semibold text-red-600">
                - {formatCurrency(mandi.transport)}
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-between items-center">
              <span className="text-gray-600">
                {t("otherCharges")}
              </span>

              <span className="font-semibold text-red-600">
                - {formatCurrency(mandi.otherCharges)}
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-t border-gray-200 pt-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">
                    {t("netEarnings")}
                  </p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.5,
                      duration: 0.6,
                    }}
                    className="text-3xl font-bold text-green-800 mt-2"
                  >
                    {formatCurrency(mandi.net)}
                  </motion.p>
                </div>

                <div className="bg-green-100 p-4 rounded-2xl">
                  <IndianRupee size={30} className="text-green-800" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Market Price Risk Analysis */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.25 }}
          className="bg-white border border-gray-100 rounded-3xl p-8 mt-8 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChartNoAxesColumnIncreasing className="text-green-800" size={23} />

                <h2 className="text-xl font-bold text-gray-900">
                  {language === "kn"
                    ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಅಪಾಯ ವಿಶ್ಲೇಷಣೆ"
                    : "Market Price Risk Analysis"}
                </h2>
              </div>

              <p className="text-gray-500 text-sm">
                {language === "kn"
                  ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಬದಲಾದರೆ ನಿಮ್ಮ ಆದಾಯ ಹೇಗಿರಬಹುದು?"
                  : "How could changing market prices affect your earnings?"}
              </p>
            </div>

            <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-full px-3 py-2 w-fit">
              {language === "kn" ? "ಮಾದರಿ ಸನ್ನಿವೇಶಗಳು" : "Illustrative Scenarios"}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              const styles = scenarioStyles[scenario.color];

              return (
                <motion.div
                  key={scenario.key}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 15 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.1,
                  }}
                  className={`border rounded-2xl p-5 ${styles.card}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${styles.badge}`}>
                      {scenario.label}
                    </span>

                    <Icon size={21} className={styles.icon} />
                  </div>

                  <p className="text-xs text-gray-500 mb-2">
                    {scenario.description}
                  </p>

                  <p className={`text-2xl font-bold ${styles.price}`}>
                    {formatCurrency(scenario.price)}
                  </p>

                  <p className="text-xs text-gray-500 mb-5">
                    {language === "kn"
                      ? "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ"
                      : "Price per quintal"}
                  </p>

                  <div className="border-t border-black/10 pt-4">
                    <p className="text-xs text-gray-500">
                      {language === "kn"
                        ? "ಒಟ್ಟು ಮಾರಾಟದ ಆದಾಯ"
                        : "Gross Revenue"}
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {formatCurrency(scenario.grossRevenue)}
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      {language === "kn"
                        ? "ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ"
                        : "Estimated Net Earnings"}
                    </p>

                    <p className={`text-xl font-bold mt-1 ${styles.price}`}>
                      {formatCurrency(scenario.netEarnings)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Potential Downside */}
          <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-xl">
                <ShieldAlert size={21} className="text-red-700" />
              </div>

              <div>
                <h3 className="font-semibold text-red-900">
                  {language === "kn"
                    ? "ಸಂಭಾವ್ಯ ಆದಾಯದ ಇಳಿಕೆ"
                    : "Potential Earnings Downside"}
                </h3>

                <p className="text-sm text-red-800 mt-2 leading-relaxed">
                  {language === "kn"
                    ? `ನಿರೀಕ್ಷಿತ ಸನ್ನಿವೇಶಕ್ಕೆ ಹೋಲಿಸಿದರೆ, ಬೆಲೆ 10% ಕಡಿಮೆಯಾದರೆ ನಿಮ್ಮ ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ${formatCurrency(potentialDownside)} ಕಡಿಮೆಯಾಗಬಹುದು.`
                    : `Compared with the expected scenario, a 10% price decrease could reduce your estimated net earnings by ${formatCurrency(potentialDownside)}.`}
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-5 leading-relaxed">
            {language === "kn"
              ? "ಗಮನಿಸಿ: ±10% ಬೆಲೆ ಬದಲಾವಣೆಗಳು ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಬಳಸಿದ ಮಾದರಿ ಊಹೆಗಳಾಗಿವೆ. ಇವು ನೈಜ ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆಗಳಲ್ಲ. ನೈಜ ಬೆಲೆ ಸನ್ನಿವೇಶಗಳನ್ನು ಬ್ಯಾಕೆಂಡ್ ಮಾರುಕಟ್ಟೆ ದತ್ತಾಂಶದಿಂದ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ."
              : "Note: The ±10% price variations are illustrative assumptions for demonstration, not actual market forecasts. Real price scenarios will be calculated using backend market data."}
          </p>
        </motion.div>

        {/* AI Market Insight */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
          className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 rounded-3xl p-8 mt-8 text-white shadow-lg"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -right-5 -bottom-20 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 border border-white/10 p-3 rounded-xl">
                <Sparkles size={23} className="text-green-200" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    {language === "kn"
                      ? "AI ಮಾರುಕಟ್ಟೆ ಒಳನೋಟ"
                      : "AI Market Insight"}
                  </h2>

                  <span className="text-[10px] uppercase tracking-wider bg-green-500/20 text-green-100 border border-green-300/20 px-2 py-1 rounded-full">
                    {language === "kn" ? "ಸ್ಮಾರ್ಟ್ ವಿಶ್ಲೇಷಣೆ" : "Smart Analysis"}
                  </span>
                </div>

                <p className="text-green-200 text-xs mt-1">
                  {language === "kn"
                    ? "ನಿಮ್ಮ ಮಾರಾಟದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ"
                    : "Based on your selling information"}
                </p>
              </div>
            </div>

            <p className="text-green-50 text-sm md:text-base leading-7 max-w-3xl">
              {marketInsight}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-7">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <TrendingUp size={20} className="text-green-200 mb-3" />

                <p className="text-green-200 text-xs">
                  {language === "kn" ? "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ" : "Market Price"}
                </p>

                <p className="text-xl font-bold mt-1">
                  {formatCurrency(mandi.price)}
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <Truck size={20} className="text-green-200 mb-3" />

                <p className="text-green-200 text-xs">
                  {language === "kn" ? "ಸಾಗಣೆ ವೆಚ್ಚ" : "Transport Expense"}
                </p>

                <p className="text-xl font-bold mt-1">
                  {formatCurrency(mandi.transport)}
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <IndianRupee size={20} className="text-green-200 mb-3" />

                <p className="text-green-200 text-xs">
                  {language === "kn" ? "ನಿವ್ವಳ ಆದಾಯ" : "Net Earnings"}
                </p>

                <p className="text-xl font-bold mt-1">
                  {formatCurrency(mandi.net)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-6 text-green-200 text-xs">
              <Lightbulb size={16} className="shrink-0 mt-0.5" />

              <p>
                {language === "kn"
                  ? "ಈ ಒಳನೋಟವು ಪ್ರಸ್ತುತ ಲಭ್ಯವಿರುವ ಮಾದರಿ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದೆ. ನೈಜ AI ವಿಶ್ಲೇಷಣೆಯನ್ನು ಬ್ಯಾಕೆಂಡ್ ಸಂಪರ್ಕಿಸಿದ ನಂತರ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತದೆ."
                  : "This insight currently uses illustrative data. Live AI-generated analysis will be enabled after backend integration."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.35 }}
          className="bg-white rounded-3xl border border-gray-100 p-8 mt-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {t("whyMandi")}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1 shrink-0" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `${farmer.crop} ಗೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ ${formatCurrency(mandi.price)} ಆಗಿದೆ.`
                  : `Offers a market price of ${formatCurrency(mandi.price)} per quintal for ${farmer.crop}.`}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1 shrink-0" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `ಅಂದಾಜು ಸಾಗಣೆ ವೆಚ್ಚ ${formatCurrency(mandi.transport)} ಆಗಿದೆ.`
                  : `Estimated transportation expense is ${formatCurrency(mandi.transport)}.`}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1 shrink-0" size={20} />

              <p className="text-gray-600">
                {language === "kn"
                  ? `ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿದ ನಂತರ ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ${formatCurrency(mandi.net)} ಆಗಿದೆ.`
                  : `After estimated expenses, your expected net earnings are ${formatCurrency(mandi.net)}.`}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Voice Recommendation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
          className="bg-green-50 border border-green-100 rounded-3xl p-8 mt-8 text-center"
        >
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

          <ListenRecommendation farmer={farmer} mandi={mandi} language={language} />
        </motion.div>

        {/* Navigation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
          className="flex flex-wrap gap-5 mt-8"
        >
          <Link
            to="/mandis"
            state={farmer}
            className="inline-flex items-center gap-2 text-green-800 font-semibold hover:text-green-950 transition"
          >
            <ArrowLeft size={18} />
            {language === "kn" ? "ಮಂಡಿಗಳಿಗೆ ಹಿಂತಿರುಗಿ" : "Back to Mandi Comparison"}
          </Link>

          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 text-green-800 font-semibold hover:text-green-950 transition"
          >
            <Sprout size={18} />
            {t("askAssistant")}
          </Link>
        </motion.div>

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