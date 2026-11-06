import {
  Mic,
  ArrowRight,
  TrendingUp,
  Truck,
  IndianRupee,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

function Home() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <TrendingUp size={25} />,
      title: t("compareMandi"),
      description:
        "Compare crop prices across different agricultural markets.",
    },
    {
      icon: <Truck size={25} />,
      title: t("transportCalculator"),
      description:
        "Estimate transportation expenses before choosing a mandi.",
    },
    {
      icon: <IndianRupee size={25} />,
      title: t("maximiseProfit"),
      description:
        "Discover where you can earn the highest net profit.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF5]">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sprout size={16} />
              {t("smartAgriculture")}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-green-950 leading-tight mb-6">

              {t("sellSmarter")}

              <span className="text-green-600 block">
                {t("earnBetter")}
              </span>

            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              {t("homeDescription")}
            </p>

            {/* Voice Button */}
            <Link
              to="/input"
              className="flex items-center justify-center gap-3 bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all w-full sm:w-auto"
            >
              <Mic size={24} />
              {t("speakKannada")}
            </Link>

            <p className="text-sm text-gray-500 mt-3 mb-5">
              Speak in Kannada and find the best selling opportunities.
            </p>

            {/* Manual Input */}
            <Link
              to="/input"
              className="inline-flex items-center gap-2 border border-green-800 text-green-800 hover:bg-green-50 px-7 py-3 rounded-xl font-semibold transition-all"
            >
              {t("manualEntry")}
              <ArrowRight size={18} />
            </Link>

          </motion.div>

          {/* Right Visual */}
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
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : 0.15,
              ease: "easeOut",
            }}
            className="relative"
          >

            <div className="bg-green-100 rounded-[2rem] p-8 md:p-12">

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -4, transition: { duration: 0.2 } }
                }
                className="bg-white rounded-2xl p-6 shadow-sm"
              >

                <div className="flex items-center gap-3 mb-6">

                  <div className="bg-green-100 p-3 rounded-xl">
                    <Sprout className="text-green-800" size={28} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">
                      {t("assistant")}
                    </h3>

                    <p className="text-sm text-gray-500">
                      AI-powered market insights
                    </p>
                  </div>

                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">

                  <p className="text-sm text-gray-500 mb-1">
                    Your question
                  </p>

                  <p className="text-gray-800 font-medium">
                    Where should I sell my tomatoes?
                  </p>

                </div>

                <div className="bg-green-50 rounded-xl p-4">

                  <p className="text-sm text-green-700 mb-2 font-medium">
                    AI Recommendation
                  </p>

                  <h3 className="text-2xl font-bold text-green-900">
                    Kolar Mandi
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    A potentially better selling opportunity based on
                    market prices and transportation expenses.
                  </p>

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >

          <h2 className="text-3xl font-bold text-green-950">
            {t("howWeHelp")}
          </h2>

          <p className="text-gray-500 mt-3">
            Everything you need to make smarter selling decisions.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.12,
              }}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -5,
                      transition: { duration: 0.2 },
                    }
              }
              className="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-shadow"
            >

              <div className="bg-green-100 text-green-800 w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;