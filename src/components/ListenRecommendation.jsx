import { useEffect, useRef, useState } from "react";
import { Loader2, Square, Volume2 } from "lucide-react";

/*
 * "Listen Now": reads the recommendation shown on the page aloud in Kannada.
 * Audio comes from the backend (POST /api/v1/speak -> Sarvam Bulbul voice); the Sarvam key
 * stays on the server. If the backend is unavailable, the browser's own voice is used.
 */
const API_BASE = (
  import.meta.env.VITE_MANDI_API_BASE || "https://ai-mandi-advisor-api.onrender.com"
).replace(/\/$/, "");

const CROP_KN = {
  Tomato: "ಟೊಮೇಟೊ",
  Onion: "ಈರುಳ್ಳಿ",
  Potato: "ಆಲೂಗಡ್ಡೆ",
  Ragi: "ರಾಗಿ",
  Rice: "ಅಕ್ಕಿ",
};

const rupees = (value) => `${Math.round(Number(value) || 0).toLocaleString("en-IN")} ರೂಪಾಯಿ`;
const rupeesEn = (value) => `${Math.round(Number(value) || 0).toLocaleString("en-IN")} rupees`;

function buildKannadaText(farmer, mandi) {
  const crop = CROP_KN[farmer.crop] || farmer.crop;
  const name = mandi.kannadaName || mandi.name;
  return (
    `ನಿಮ್ಮ ${farmer.quantity} ಕ್ವಿಂಟಾಲ್ ${crop} ಮಾರಾಟಕ್ಕೆ ಉತ್ತಮ ಮಂಡಿ ${name}. ` +
    `ಅಲ್ಲಿ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆ ${rupees(mandi.price)}. ` +
    `ಸಾಗಣೆ ವೆಚ್ಚ ${rupees(mandi.transport)}, ಇತರ ಶುಲ್ಕ ${rupees(mandi.otherCharges)}. ` +
    `ಎಲ್ಲಾ ವೆಚ್ಚ ಕಳೆದು ಅಂದಾಜು ನಿವ್ವಳ ಆದಾಯ ${rupees(mandi.net)}. ` +
    `ಇವು ಮಾದರಿ ಅಂದಾಜುಗಳು. ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಮಂಡಿಯಲ್ಲಿ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ.`
  );
}

function buildEnglishText(farmer, mandi) {
  return (
    `For your ${farmer.quantity} quintals of ${farmer.crop}, the best mandi is ${mandi.name}. ` +
    `The price is ${rupeesEn(mandi.price)} per quintal. Transport costs ${rupeesEn(mandi.transport)} ` +
    `and other charges are ${rupeesEn(mandi.otherCharges)}. ` +
    `Your estimated net earnings are ${rupeesEn(mandi.net)}. ` +
    `These are sample estimates. Please check the price at the mandi before selling.`
  );
}

function ListenRecommendation({ farmer, mandi, language }) {
  const [status, setStatus] = useState("idle"); // idle | loading | playing
  const [note, setNote] = useState("");
  const audioRef = useRef(null);
  const urlRef = useRef(null);
  const abortRef = useRef(null);

  const kn = language === "kn";

  const cleanup = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => cleanup, []);

  const speakWithBrowser = () => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth) {
      setNote(kn ? "ಧ್ವನಿ ಸೇವೆ ಈಗ ಲಭ್ಯವಿಲ್ಲ. ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ." : "Audio is not available right now. Please try again later.");
      setStatus("idle");
      return;
    }
    const knVoice = synth.getVoices().find((v) => v.lang?.toLowerCase().startsWith("kn"));
    const utter = new SpeechSynthesisUtterance(knVoice ? buildKannadaText(farmer, mandi) : buildEnglishText(farmer, mandi));
    if (knVoice) {
      utter.voice = knVoice;
      utter.lang = knVoice.lang;
    } else {
      utter.lang = "en-IN";
      setNote(
        kn
          ? "ಕನ್ನಡ ಧ್ವನಿ ಈಗ ಲಭ್ಯವಿಲ್ಲ, ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಓದಲಾಗುತ್ತಿದೆ."
          : "Kannada audio is unavailable right now, reading in English."
      );
    }
    utter.onend = () => setStatus("idle");
    utter.onerror = () => setStatus("idle");
    setStatus("playing");
    synth.speak(utter);
  };

  const play = async () => {
    cleanup();
    setNote("");
    setStatus("loading");
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 60000); // Render free tier can take ~50 s to wake

    try {
      const res = await fetch(`${API_BASE}/api/v1/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: buildKannadaText(farmer, mandi), language: "kn-IN" }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`speak failed: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setStatus("idle");
      audio.onerror = () => setStatus("idle");
      await audio.play();
      setStatus("playing");
    } catch {
      if (controller.signal.aborted && abortRef.current !== controller) return; // stopped by user
      speakWithBrowser();
    } finally {
      clearTimeout(timer);
    }
  };

  const stop = () => {
    cleanup();
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {status === "idle" ? (
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          <Volume2 size={20} />
          {kn ? "ಕೇಳಲು ಪ್ರಾರಂಭಿಸಿ" : "Listen Now"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          {status === "loading" ? <Loader2 size={20} className="animate-spin" /> : <Square size={18} />}
          {status === "loading"
            ? kn
              ? "ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ… (ನಿಲ್ಲಿಸಿ)"
              : "Preparing audio… (stop)"
            : kn
              ? "ನಿಲ್ಲಿಸಿ"
              : "Stop"}
        </button>
      )}
      {note && <p className="text-sm text-gray-500">{note}</p>}
    </div>
  );
}

export default ListenRecommendation;
