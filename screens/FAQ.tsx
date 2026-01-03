
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQS } from '../constants';
import SubHeaderNav from '../components/SubHeaderNav';

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactAdvisor = () => {
    window.open('https://wa.me/5493517713422', '_blank');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-32 bg-background-light dark:bg-background-dark transition-colors duration-200">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-separator-light dark:border-separator-dark px-4 py-3 transition-colors duration-200 h-[60px]">
        <button 
          onClick={() => navigate(-1)} 
          className="flex size-10 items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 pr-10 truncate text-slate-900 dark:text-white">
          Preguntas Frecuentes
        </h1>
      </header>

      <SubHeaderNav />

      {/* SearchBar */}
      <div className="px-4 py-4 sticky top-[108px] z-40 bg-background-light dark:bg-background-dark transition-colors duration-200">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            className="block w-full rounded-xl border-none bg-white dark:bg-surface-dark py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 shadow-sm focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all" 
            placeholder="Buscar ayuda, envíos, garantía..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      <main className="flex flex-col gap-6 px-4">
        {/* Accordions Group */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-surface-light dark:bg-surface-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <details 
                key={faq.id} 
                className="group border-b border-separator-light dark:border-separator-dark last:border-none"
                open={faq.id === 4 && searchTerm === ''} // Default open item 4 (Seminuevo)
              >
                <summary className="flex w-full cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{faq.icon}</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 transition-transform duration-200 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div 
                  className="px-4 pb-4 pl-[3.25rem] text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: faq.answer
                      .replace(/'(.*?)'/g, "<strong>'$1'</strong>")
                      .replace(/\d+ meses/g, "<strong>$&</strong>")
                      .replace(/Estrada 18/g, "<strong>Estrada 18</strong>")
                      .replace(/\d+% OFF/g, "<strong>$&</strong>")
                  }}
                />
              </details>
            ))
          ) : (
            <div className="p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">help_outline</span>
              <p className="text-sm text-slate-500 dark:text-slate-400">No encontramos respuestas para tu búsqueda.</p>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="mt-2 flex flex-col items-center justify-center rounded-xl bg-surface-light dark:bg-surface-dark p-6 text-center shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <span className="material-symbols-outlined text-primary text-2xl">chat</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">¿No encontraste tu respuesta?</h3>
          <p className="mt-1 mb-4 text-sm text-slate-500 dark:text-slate-400 max-w-[280px]">
            Nuestro equipo de expertos está disponible para ayudarte a elegir tu próximo iPhone.
          </p>
          <button 
            onClick={handleContactAdvisor}
            className="w-full max-w-xs rounded-lg bg-primary py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Contactar asesor
          </button>
        </div>
        
        <div className="h-8"></div> {/* Spacer */}
      </main>
    </div>
  );
};

export default FAQ;
