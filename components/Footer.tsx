
import React from 'react';

const Footer: React.FC = () => {
  const handleInstagram = () => window.open('https://instagram.com/nexiphone.ok', '_blank');
  const handleMaps = () => window.open('https://maps.google.com/?q=Estrada 18, Cordoba', '_blank');
  const handleWhatsApp = () => window.open('https://wa.me/5493517713422', '_blank');

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#111112] border-t border-[#d2d2d7] dark:border-[#333336] pb-10 pt-10 mt-auto">
      <div className="max-w-md mx-auto px-6 flex flex-col items-center sm:items-start">
        <div className="flex flex-col gap-4 mb-8 w-full">
          <button 
            onClick={handleMaps}
            className="flex items-center gap-3 text-[13px] font-semibold text-[#6e6e73] dark:text-[#a1a1a6] hover:text-primary transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[20px] opacity-80">location_on</span>
            <span>Estrada 18, Nueva Córdoba</span>
          </button>
          
          <button 
            onClick={handleInstagram}
            className="flex items-center gap-3 text-[13px] font-semibold text-[#6e6e73] dark:text-[#a1a1a6] hover:text-primary transition-colors text-left"
          >
            <div className="size-5 flex items-center justify-center opacity-80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <span>@nexiphone.ok</span>
          </button>
          
          <button 
            onClick={handleWhatsApp}
            className="flex items-center gap-3 text-[13px] font-semibold text-[#6e6e73] dark:text-[#a1a1a6] hover:text-primary transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[20px] opacity-80">call</span>
            <span>54 9 351 771 3422</span>
          </button>
        </div>
        
        <div className="w-full border-t border-[#d2d2d7] dark:border-[#333336] pt-5">
          <p className="text-[11px] text-[#86868b] dark:text-[#6e6e73] font-medium">
            Copyright © 2024 NexiPhone. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
