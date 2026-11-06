import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, X, Loader2 } from "lucide-react";
import {
  ConversationAgent,
  BrowserAudioInterface,
  InteractionType,
  AgentState,
  RateLimitError,
  ForbiddenError,
  ServerError,
} from "sarvam-conv-ai-sdk/browser";

import { useLanguage } from "../context/LanguageContext";

/*
 * Browser voice conversation with Chaitra (Sarvam voice agent).
 *
 * No API key is used in the browser: the SDK's apiKey is empty and baseUrl points at the
 * AI Mandi Advisor backend, which adds the Sarvam key server-side (only for this agent)
 * and rate-limits sessions. Each session uses Sarvam credits.
 */
const API_BASE = (
  import.meta.env.VITE_MANDI_API_BASE || "https://ai-mandi-advisor-api.onrender.com"
).replace(/\/$/, "");

const VOICE_AGENT = {
  org_id: "01a1acdc-f1b4-7250-ba0b-57131b4d67eb",
  workspace_id: "01a1acdc-f1bc-7b18-bb31-81a575586086",
  app_id: "AI-Mandi-Ad-873b0bc6-7b7a",
  version: 1, // the backend pins the published version anyway
};

const TEXT = {
  en: {
    title: "Talk to Chaitra",
    subtitle:
      "Speak in Kannada or English. Tell her your crop, quantity in quintals, village and district.",
    start: "Start conversation",
    end: "End conversation",
    mute: "Mute",
    unmute: "Unmute",
    close: "Close",
    you: "You",
    chaitra: "Chaitra",
    states: {
      idle: "Ready",
      connecting: "Connecting…",
      connected: "Connected",
      listening: "Listening…",
      speaking: "Chaitra is speaking…",
      error: "Something went wrong",
    },
    empty: "Press start and allow microphone access. The conversation will appear here.",
    note: "Your microphone is used only during this conversation. Prices are sample estimates, not live market prices.",
    errors: {
      mic: "Microphone access was blocked. Please allow the microphone in your browser and try again.",
      noMic: "No microphone was found on this device.",
      busy: "Too many conversations right now. Please wait a minute and try again.",
      forbidden: "Voice conversations are only available on the AI Mandi Advisor website.",
      server: "The voice service is not available right now. Please try again later.",
      generic: "Could not start the conversation. Please check your internet connection and try again.",
    },
  },
  kn: {
    title: "ಚೈತ್ರಾ ಜೊತೆ ಮಾತನಾಡಿ",
    subtitle:
      "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ. ನಿಮ್ಮ ಬೆಳೆ, ಕ್ವಿಂಟಾಲ್‌ನಲ್ಲಿ ಪ್ರಮಾಣ, ಗ್ರಾಮ ಮತ್ತು ಜಿಲ್ಲೆಯನ್ನು ತಿಳಿಸಿ.",
    start: "ಮಾತುಕತೆ ಪ್ರಾರಂಭಿಸಿ",
    end: "ಮಾತುಕತೆ ಮುಗಿಸಿ",
    mute: "ಮ್ಯೂಟ್",
    unmute: "ಅನ್‌ಮ್ಯೂಟ್",
    close: "ಮುಚ್ಚಿ",
    you: "ನೀವು",
    chaitra: "ಚೈತ್ರಾ",
    states: {
      idle: "ಸಿದ್ಧ",
      connecting: "ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ…",
      connected: "ಸಂಪರ್ಕವಾಗಿದೆ",
      listening: "ಕೇಳುತ್ತಿದ್ದಾರೆ…",
      speaking: "ಚೈತ್ರಾ ಮಾತನಾಡುತ್ತಿದ್ದಾರೆ…",
      error: "ಏನೋ ತಪ್ಪಾಗಿದೆ",
    },
    empty: "ಪ್ರಾರಂಭಿಸಿ ಒತ್ತಿ ಮತ್ತು ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನೀಡಿ. ಮಾತುಕತೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.",
    note: "ಈ ಮಾತುಕತೆಯ ಸಮಯದಲ್ಲಿ ಮಾತ್ರ ಮೈಕ್ರೋಫೋನ್ ಬಳಸಲಾಗುತ್ತದೆ. ಬೆಲೆಗಳು ಮಾದರಿ ಅಂದಾಜುಗಳು, ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳಲ್ಲ.",
    errors: {
      mic: "ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ರೋಫೋನ್ ಅನುಮತಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      noMic: "ಈ ಸಾಧನದಲ್ಲಿ ಮೈಕ್ರೋಫೋನ್ ಕಂಡುಬಂದಿಲ್ಲ.",
      busy: "ಈಗ ಹೆಚ್ಚು ಮಾತುಕತೆಗಳು ನಡೆಯುತ್ತಿವೆ. ಒಂದು ನಿಮಿಷ ಬಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      forbidden: "ಧ್ವನಿ ಮಾತುಕತೆ AI ಮಂಡಿ ಅಡ್ವೈಸರ್ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಮಾತ್ರ ಲಭ್ಯವಿದೆ.",
      server: "ಧ್ವನಿ ಸೇವೆ ಈಗ ಲಭ್ಯವಿಲ್ಲ. ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      generic: "ಮಾತುಕತೆ ಪ್ರಾರಂಭಿಸಲು ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    },
  },
};

function errorKey(err) {
  if (err instanceof RateLimitError) return "busy";
  if (err instanceof ForbiddenError) return "forbidden";
  if (err instanceof ServerError) return "server";
  // Browser microphone errors are DOMExceptions.
  if (err?.name === "NotAllowedError" || err?.name === "SecurityError") return "mic";
  if (err?.name === "NotFoundError" && typeof DOMException !== "undefined" && err instanceof DOMException) {
    return "noMic";
  }
  return "generic";
}

function newSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function VoiceAssistant({ open, onClose }) {
  const { language } = useLanguage();
  const txt = TEXT[language] ?? TEXT.en;

  const [state, setState] = useState(AgentState.IDLE);
  const [messages, setMessages] = useState([]);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const agentRef = useRef(null);
  const listRef = useRef(null);

  const active = state !== AgentState.IDLE && state !== AgentState.ERROR;

  const stopSession = async () => {
    const agent = agentRef.current;
    agentRef.current = null;
    if (agent) {
      try {
        await agent.stop();
      } catch {
        /* already closed */
      }
    }
    setMuted(false);
    setState(AgentState.IDLE);
  };

  const startSession = async () => {
    setError("");
    setMessages([]);
    setState(AgentState.CONNECTING);
    try {
      const agent = new ConversationAgent({
        apiKey: "", // the backend proxy adds the key server-side
        baseUrl: `${API_BASE}/api/sarvam/`,
        config: {
          ...VOICE_AGENT,
          user_identifier: `web-${newSessionId()}`,
          user_identifier_type: "custom",
          interaction_type: InteractionType.CALL,
          input_sample_rate: 16000,
          output_sample_rate: 16000,
          initial_language_name: language === "kn" ? "Kannada" : "English",
        },
        audioInterface: new BrowserAudioInterface(16000),
        stateCallback: (s) => setState(s),
        transcriptCallback: async (msg) => {
          if (!msg?.content) return;
          setMessages((prev) => [
            ...prev,
            { role: msg.role === "user" ? "user" : "bot", content: msg.content },
          ]);
        },
        endCallback: async () => {
          agentRef.current = null;
          setMuted(false);
          setState(AgentState.IDLE);
        },
      });
      agentRef.current = agent;
      await agent.start();
    } catch (err) {
      await stopSession();
      setError(txt.errors[errorKey(err)]);
      setState(AgentState.ERROR);
    }
  };

  const toggleMute = () => {
    const agent = agentRef.current;
    if (!agent) return;
    if (agent.isMuted()) {
      agent.unmute();
      setMuted(false);
    } else {
      agent.mute();
      setMuted(true);
    }
  };

  const handleClose = async () => {
    await stopSession();
    setError("");
    onClose?.();
  };

  // End the session if the component unmounts (e.g. page change).
  useEffect(
    () => () => {
      agentRef.current?.stop().catch(() => {});
      agentRef.current = null;
    },
    []
  );

  // Keep the newest transcript line in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Close with the Escape key.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!open) return null;

  const dotClass =
    state === AgentState.SPEAKING
      ? "bg-green-600 animate-pulse"
      : state === AgentState.LISTENING
        ? "bg-amber-500 animate-pulse"
        : state === AgentState.ERROR
          ? "bg-red-500"
          : active
            ? "bg-green-600"
            : "bg-gray-300";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-assistant-title"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div>
            <h2 id="voice-assistant-title" className="text-xl font-bold text-green-950">
              {txt.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{txt.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={txt.close}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status */}
        <div className="px-6 pt-4 flex items-center gap-2 text-sm" aria-live="polite">
          {state === AgentState.CONNECTING ? (
            <Loader2 size={16} className="animate-spin text-green-700" />
          ) : (
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${dotClass}`} />
          )}
          <span className="font-medium text-gray-700">{txt.states[state] ?? state}</span>
        </div>

        {/* Transcript */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-3 min-h-[180px]">
          {messages.length === 0 && !error && <p className="text-sm text-gray-400">{txt.empty}</p>}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                  m.role === "user" ? "bg-green-800 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <span className="block text-xs opacity-70 mb-0.5">
                  {m.role === "user" ? txt.you : txt.chaitra}
                </span>
                {m.content}
              </div>
            </div>
          ))}
          {error && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl p-3">
              {error}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-100 space-y-3">
          {active ? (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleMute}
                disabled={state === AgentState.CONNECTING}
                className="flex-1 flex items-center justify-center gap-2 border border-green-800 text-green-800 rounded-xl py-3 font-semibold hover:bg-green-50 disabled:opacity-50"
              >
                {muted ? <MicOff size={18} /> : <Mic size={18} />}
                {muted ? txt.unmute : txt.mute}
              </button>
              <button
                type="button"
                onClick={stopSession}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold"
              >
                <PhoneOff size={18} />
                {txt.end}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startSession}
              className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white rounded-xl py-3 font-semibold shadow-md"
            >
              <Mic size={20} />
              {txt.start}
            </button>
          )}
          <p className="text-xs text-gray-400 text-center">{txt.note}</p>
        </div>
      </div>
    </div>
  );
}

export default VoiceAssistant;
