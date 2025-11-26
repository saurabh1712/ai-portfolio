"use client";
import { useChat } from "ai/react";
import { Send, Bot, User, Cpu, Mic, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onFinish: (message) => {
      if (isSoundOn) {
        speakText(message.content);
      }
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // 1. LOAD VOICES ON MOUNT
  // Browsers load voices async, so we need to listen for the event
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. TEXT-TO-SPEECH (STRICT ENGLISH FILTER)
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop previous speech

    const utterance = new SpeechSynthesisUtterance(text);

    // PRIORITY LIST: Try to find these specific high-quality voices first
    const preferredVoice = voices.find(v => v.name.includes("Google US English")) // Chrome Best
                        || voices.find(v => v.name.includes("Samantha"))      // Mac Best
                        || voices.find(v => v.name.includes("Microsoft David")) // Windows Best
                        || voices.find(v => v.lang === "en-US");              // Generic US English

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = "en-US"; // Force language code
    }

    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // 3. SPEECH-TO-TEXT
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleInputChange({ target: { value: transcript } } as any);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      alert("Browser does not support speech recognition.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-lg overflow-hidden font-mono text-sm relative">

      {/* Sound Toggle */}
      <button
        onClick={() => setIsSoundOn(!isSoundOn)}
        className="absolute top-2 right-2 z-20 p-2 text-gray-500 hover:text-primary transition-colors"
        title={isSoundOn ? "Mute System" : "Enable Voice"}
      >
        {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar min-h-[200px] max-h-[400px]">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-8 flex flex-col items-center gap-2">
            <Cpu size={32} className="animate-pulse opacity-50"/>
            <p>&gt; SYSTEM READY. VOICE MODULE ONLINE.</p>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && <div className="mt-1"><Bot size={16} className="text-secondary"/></div>}

            <div className={`p-3 rounded-md max-w-[85%] leading-relaxed whitespace-pre-wrap ${
              m.role === 'user'
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-white/5 text-gray-200 border border-white/5'
            }`}>
              {m.content}
            </div>

            {m.role === 'user' && <div className="mt-1"><User size={16} className="text-primary"/></div>}
          </div>
        ))}
        {isLoading && <span className="text-secondary animate-pulse ml-8 text-xs">PROCESSING DATA STREAM...</span>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2 bg-black/40">
        <input
          className="flex-grow bg-transparent border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors text-xs md:text-sm"
          value={input}
          placeholder="Execute command..."
          onChange={handleInputChange}
        />

        <button
          type="button"
          onClick={startListening}
          className={`p-2 rounded border transition-all ${isListening ? 'bg-red-500 text-white animate-pulse border-red-500' : 'text-primary hover:bg-white/5 border-primary/50'}`}
        >
          <Mic size={18} />
        </button>

        <button type="submit" className="text-primary hover:text-white p-2 rounded hover:bg-white/5 transition-all">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}