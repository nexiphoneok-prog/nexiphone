
import React, { useState, useRef, useEffect } from 'react';
import { askGeminiAboutPhones } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu asistente de NexiPhone. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.slice(-4);
    const response = await askGeminiAboutPhones(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "" }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 translate-y-20' : 'scale-100 translate-y-0'}`}
      >
        <span className="material-symbols-outlined !text-[28px]">auto_awesome</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white dark:bg-[#1C1C1E] md:inset-auto md:bottom-24 md:right-6 md:h-[550px] md:w-[380px] md:rounded-3xl md:shadow-2xl animate-premium-in">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                <span className="material-symbols-outlined !text-[20px]">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">NexiAI</h3>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">En línea</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined !text-[20px]">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu consulta..."
                className="flex-1 rounded-2xl bg-gray-100 dark:bg-gray-800 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-primary"
              />
              <button 
                onClick={handleSend}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
