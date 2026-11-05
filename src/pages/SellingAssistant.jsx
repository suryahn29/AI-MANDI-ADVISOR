import { useState, useEffect } from "react";

import {
  Bot,
  Send,
  Mic,
  User,
  Sprout,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function SellingAssistant() {
  const { language } = useLanguage();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // Demo market data
  const quantity = 50;
  const crop = "Tomato";

  const mandis = [
    {
      name: "Kolar Mandi",
      kannadaName: "ಕೋಲಾರ ಮಂಡಿ",
      price: 2800,
      transport: 3000,
      otherCharges: 500,
    },
    {
      name: "Bengaluru Mandi",
      kannadaName: "ಬೆಂಗಳೂರು ಮಂಡಿ",
      price: 2500,
      transport: 1500,
      otherCharges: 300,
    },
    {
      name: "Ramanagara Mandi",
      kannadaName: "ರಾಮನಗರ ಮಂಡಿ",
      price: 2000,
      transport: 500,
      otherCharges: 200,
    },
  ];

  const calculateProfit = (mandi) =>
    quantity * mandi.price -
    mandi.transport -
    mandi.otherCharges;

  const bestMandi = mandis.reduce((best, current) =>
    calculateProfit(current) > calculateProfit(best)
      ? current
      : best
  );

  // Translations
  const translations = {
    en: {
      title: "AI Selling Assistant",
      subtitle: "Your intelligent farming market companion",
      assistant: "Mandi Mitra",
      placeholder: "Ask about crops, prices or profits...",
      suggestionsTitle: "Try asking",
      back: "Back to Home",
      welcome:
        "Hello! I'm Mandi Mitra. Ask me about crop prices, markets and expected profits.",
      suggestions: [
        "Where should I sell my tomatoes?",
        "How much profit can I make?",
        "Compare mandi prices",
        "What is the transportation cost?",
      ],
    },

    kn: {
      title: "AI ಮಾರಾಟ ಸಹಾಯಕ",
      subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಸಹಾಯಕ",
      assistant: "ಮಂಡಿ ಮಿತ್ರ",
      placeholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
      suggestionsTitle: "ಇದನ್ನು ಕೇಳಿ",
      back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      welcome:
        "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮಂಡಿ ಮಿತ್ರ. ಬೆಳೆ ಬೆಲೆ, ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಲಾಭದ ಬಗ್ಗೆ ಕೇಳಿ.",
      suggestions: [
        "ನನ್ನ ಟೊಮೇಟೊವನ್ನು ಎಲ್ಲಿ ಮಾರಾಟ ಮಾಡಲಿ?",
        "ನನ್ನ ಲಾಭ ಎಷ್ಟು?",
        "ಮಂಡಿಗಳ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಸಿ",
        "ಸಾಗಣೆ ವೆಚ್ಚ ಎಷ್ಟು?",
      ],
    },
  };

  const t = translations[language];

  // Reset welcome message when global language changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        text: translations[language].welcome,
      },
    ]);
  }, [language]);

  // Demo response engine
  const getResponse = (question) => {
    const q = question.toLowerCase();

    const isKannada = language === "kn";

    if (
      q.includes("where") ||
      q.includes("ಎಲ್ಲಿ") ||
      q.includes("mandi")
    ) {
      return isKannada
        ? `ನಮ್ಮ ಮಾದರಿ ಮಾಹಿತಿಯ ಪ್ರಕಾರ, ${bestMandi.kannadaName} ಉತ್ತಮ ಆಯ್ಕೆಯಾಗಿದೆ. ಇಲ್ಲಿ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ ₹${bestMandi.price} ಮತ್ತು ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ₹${calculateProfit(bestMandi).toLocaleString("en-IN")} ಆಗಿದೆ.`
        : `Based on our illustrative data, ${bestMandi.name} is the best option. Its price is ₹${bestMandi.price} per quintal, with estimated net earnings of ₹${calculateProfit(bestMandi).toLocaleString("en-IN")}.`;
    }

    if (
      q.includes("profit") ||
      q.includes("earn") ||
      q.includes("ಲಾಭ") ||
      q.includes("ಆದಾಯ")
    ) {
      return isKannada
        ? `${quantity} ಕ್ವಿಂಟಾಲ್ ${crop} ಮಾರಾಟ ಮಾಡಿದರೆ ${bestMandi.kannadaName} ನಲ್ಲಿ ಅಂದಾಜು ₹${calculateProfit(bestMandi).toLocaleString("en-IN")} ನಿವ್ವಳ ಆದಾಯ ಸಿಗಬಹುದು.`
        : `For ${quantity} quintals of ${crop}, the estimated net earnings at ${bestMandi.name} are ₹${calculateProfit(bestMandi).toLocaleString("en-IN")}.`;
    }

    if (
      q.includes("transport") ||
      q.includes("ಸಾಗಣೆ")
    ) {
      return isKannada
        ? `${bestMandi.kannadaName} ಗೆ ಅಂದಾಜು ಸಾಗಣೆ ವೆಚ್ಚ ₹${bestMandi.transport.toLocaleString("en-IN")} ಆಗಿದೆ.`
        : `The illustrative transportation estimate to ${bestMandi.name} is ₹${bestMandi.transport.toLocaleString("en-IN")}.`;
    }

    if (
      q.includes("compare") ||
      q.includes("ಬೆಲೆ") ||
      q.includes("price") ||
      q.includes("ಹೋಲಿಸಿ")
    ) {
      return isKannada
        ? mandis.map(
            (m) =>
              `${m.kannadaName}: ₹${m.price}/ಕ್ವಿಂಟಾಲ್, ನಿವ್ವಳ ಆದಾಯ ₹${calculateProfit(m).toLocaleString("en-IN")}`
          ).join("\n")
        : mandis.map(
            (m) =>
              `${m.name}: ₹${m.price}/quintal | Net: ₹${calculateProfit(m).toLocaleString("en-IN")}`
          ).join("\n");
    }

    return isKannada
      ? "ನಿಮ್ಮ ಬೆಳೆ ಬೆಲೆ, ಹತ್ತಿರದ ಮಂಡಿಗಳು, ಸಾಗಣೆ ವೆಚ್ಚ ಅಥವಾ ಅಂದಾಜು ಲಾಭದ ಬಗ್ಗೆ ಕೇಳಬಹುದು."
      : "You can ask me about crop prices, nearby mandis, transportation expenses or estimated profits.";
  };

  const handleSend = (text = message) => {
    if (!text.trim()) return;

    const userMessage = text.trim();

    const assistantResponse = getResponse(userMessage);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
      {
        role: "assistant",
        text: assistantResponse,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-10">

      <div className="max-w-4xl mx-auto">

        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-green-800 font-medium mb-6"
        >
          <ArrowLeft size={18} />
          {t.back}
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <div className="bg-green-100 p-4 rounded-2xl">
            <Bot size={32} className="text-green-800" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-950">
              {t.title}
            </h1>

            <p className="text-gray-500 mt-1">
              {t.subtitle}
            </p>
          </div>

        </div>

        {/* Chat Container */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">

          {/* Chat Header */}
          <div className="bg-green-900 text-white p-5 flex items-center gap-3">

            <div className="bg-green-800 p-2 rounded-full">
              <Sprout size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                {t.assistant}
              </h2>

              <p className="text-xs text-green-200">
                AI-powered market assistant
              </p>
            </div>

            <span className="ml-auto text-xs text-green-200">
              ● Online
            </span>

          </div>

          {/* Messages */}
          <div className="p-6 min-h-[380px] max-h-[480px] overflow-y-auto space-y-6">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex gap-3 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {msg.role === "assistant" && (
                  <div className="bg-green-100 p-2 rounded-full h-fit">
                    <Bot size={20} className="text-green-800" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-green-800 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>
                </div>

                {msg.role === "user" && (
                  <div className="bg-gray-200 p-2 rounded-full h-fit">
                    <User size={20} />
                  </div>
                )}

              </div>

            ))}

          </div>

          {/* Suggested Questions */}
          <div className="px-6 pb-5">

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
              <Sparkles size={16} />
              {t.suggestionsTitle}
            </div>

            <div className="flex flex-wrap gap-2">

              {t.suggestions.map((suggestion, index) => (

                <button
                  key={index}
                  onClick={() => handleSend(suggestion)}
                  className="border border-green-200 text-green-800 text-sm px-4 py-2 rounded-full hover:bg-green-50 transition"
                >
                  {suggestion}
                </button>

              ))}

            </div>

          </div>

          {/* Message Input */}
          <div className="border-t border-gray-100 p-5">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >

              <button
                type="button"
                className="bg-green-50 text-green-800 p-3 rounded-xl"
                title="Kannada voice input coming soon"
              >
                <Mic size={22} />
              </button>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.placeholder}
                lang={language}
                className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />

              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-green-800 text-white p-3 rounded-xl disabled:opacity-40"
              >
                <Send size={21} />
              </button>

            </form>

          </div>

        </div>

        <p className="text-xs text-gray-400 text-center mt-5">
          {language === "kn"
            ? "ಮಾದರಿ ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ ಮಾತ್ರ. ಮಾರಾಟಕ್ಕೂ ಮೊದಲು ಪ್ರಸ್ತುತ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ."
            : "Demo market data only. Verify current mandi prices before selling."}
        </p>

      </div>

    </div>
  );
}

export default SellingAssistant;