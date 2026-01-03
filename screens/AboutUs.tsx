
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    window.open('https://wa.me/5493517713422', '_blank');
  };

  const handleWholesale = () => {
    navigate('/wholesale');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-surface-light dark:bg-surface-dark transition-colors duration-200">
      {/* TopAppBar */}
      <div className="sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-[60px] flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center px-4 justify-between">
          <div 
            onClick={() => navigate(-1)}
            className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back</span>
          </div>
          <h2 className="text-[#111418] dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Nosotros
          </h2>
        </div>
      </div>

      <SubHeaderNav />

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col pb-48">
        {/* Hero Section */}
        <div className="pt-2">
          <div 
            className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden h-[320px] w-full"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0l3ubJ8z-8zA5F05iVsjCEBJB6R1nAEMlQIUkePyteAmjyC980A5YR94QOabgwydxcZYd-eAzcBjgUcs3cy5kEoIk5Nsz5nXGc6gxAjTHUH7e5Ms5g-78iYw47YDpMc40Mhapha4O_U5cPmzx_myaCBhcXIRxglfmGPjtA2zCS5Hq6ueuJKn21HRglpOA67hrhLaVD9Fou3Hipc5DUAjRyJk9ZuNuSKIxR1nhfgd4ht5HS8cuA0ty4uLErLxreevPysewd2dU-bk")'
            }}
          >
            <div className="flex flex-col p-6 pb-8">
              <span className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-1">Sobre NexiPhone</span>
              <p className="text-white tracking-tight text-[32px] font-bold leading-tight">Nuestra Historia</p>
            </div>
          </div>
        </div>

        {/* Narrative Text */}
        <div className="px-6 py-8">
          <h2 className="text-[#111418] dark:text-white tracking-tight text-[24px] font-bold leading-tight text-left mb-4">
            Pasión por la tecnología.<br/>Calidad garantizada.
          </h2>
          <div className="space-y-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              NexiPhone nació hace 3 años con una misión simple: ser el lider de productos Apple . Creemos que la innovación debe estar al alcance de todos.
            </p>
            <p>
              Hoy, somos líderes en el mercado de iPhones seminuevos. Nos diferenciamos por ofrecer dispositivos rigurosamente verificados, alta calidad al mejor precio del pais. Tenemos un compromiso inquebrantable con la satisfacción del cliente.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 py-2">
          <div className="flex flex-wrap gap-3">
            <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-2xl p-5 bg-background-light dark:bg-background-dark border border-transparent dark:border-gray-700">
              <span className="material-symbols-outlined text-primary text-3xl mb-1">history</span>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Trayectoria</p>
              <p className="text-[#111418] dark:text-white tracking-tight text-2xl font-bold leading-tight">3 Años</p>
            </div>
            <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-2xl p-5 bg-background-light dark:bg-background-dark border border-transparent dark:border-gray-700">
              <span className="material-symbols-outlined text-primary text-3xl mb-1">trophy</span>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Posición</p>
              <p className="text-[#111418] dark:text-white tracking-tight text-2xl font-bold leading-tight">Líderes</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="px-6 py-8 mb-12">
          <h3 className="text-[#111418] dark:text-white tracking-tight text-[24px] font-bold leading-tight text-left mb-4">
            🚀 ¿Por qué elegir NexiPhone?
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            No solo vendemos tecnología; ofrecemos la tranquilidad de saber que llevás un equipo premium sin pagar de más. Nuestra filosofía se basa en tres pilares:
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700">
              <div className="flex-shrink-0 size-10 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">diamond</span>
              </div>
              <div>
                <h4 className="font-bold text-[#111418] dark:text-white">Excelencia en Selección</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Cada equipo en nuestro inventario pasa por una curaduría estética y funcional.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700">
               <div className="flex-shrink-0 size-10 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <div>
                <h4 className="font-bold text-[#111418] dark:text-white">Sustentabilidad Inteligente</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Al elegir un iPhone seminuevo, extendés la vida útil del dispositivo y reducís el impacto ambiental.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700">
               <div className="flex-shrink-0 size-10 mt-1 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">fact_check</span>
              </div>
              <div>
                <h4 className="font-bold text-[#111418] dark:text-white">Transparencia Total</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Lo que ves es lo que recibís. Sin sorpresas, sin fallas ocultas.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto p-4 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3 z-40">
        <button 
          onClick={handleWholesale}
          className="flex items-center justify-center w-full h-12 gap-2 rounded-xl bg-primary text-white font-semibold text-base hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
        >
          <span className="material-symbols-outlined text-[20px]">storefront</span>
          Quiero hacer una compra mayorista
        </button>
        <button 
          onClick={handleContact}
          className="flex items-center justify-center w-full h-12 gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white font-semibold text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          Contactar
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
