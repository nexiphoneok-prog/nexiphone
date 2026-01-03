
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SubHeaderNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/select-model') {
      return location.pathname.startsWith('/select-model');
    }
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/select-model', label: 'iPhone' },
    { path: '/shop', label: 'Tienda' },
    { path: '/wholesale', label: 'Mayorista' },
    { path: '/about-us', label: 'Nosotros' },
    { path: '/faq', label: 'Ayuda' },
  ];

  return (
    <div className="bg-white/80 dark:bg-black/80 premium-blur border-b border-gray-100 dark:border-gray-900 sticky top-[52px] z-40">
      <div className="max-w-2xl mx-auto flex justify-between py-3 px-6 overflow-x-auto no-scrollbar gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`text-[12px] font-medium transition-colors whitespace-nowrap ${
              isActive(link.path) 
                ? 'text-text-dark dark:text-white opacity-100 font-bold' 
                : 'text-text-light dark:text-gray-500 hover:text-text-dark dark:hover:text-white hover:opacity-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubHeaderNav;
