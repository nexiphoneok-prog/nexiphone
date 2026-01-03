
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/shop', label: 'Tienda', icon: 'storefront' },
    { path: '/cart', label: 'Bolsa', icon: 'shopping_bag' },
    { path: '/faq', label: 'Ayuda', icon: 'help_center' },
  ];

  const protectedPaths = ['/product/', '/select-model'];
  const shouldHide = protectedPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 pb-safe pt-2.5 px-2">
      <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative ${
                active 
                  ? 'text-primary' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] transition-transform ${active ? 'filled-icon scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              {item.path === '/cart' && cartCount > 0 && (
                <span className="absolute top-1 right-[20%] w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#101922]">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;