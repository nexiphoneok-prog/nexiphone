
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const Wholesale: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 h-[60px]">
        <div onClick={() => navigate(-1)} className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </div>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-12">Venta Mayorista</h2>
      </div>

      <SubHeaderNav />

      <div className="flex-1 pb-24">
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div 
              className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden bg-surface-light dark:bg-surface-dark @[480px]:rounded-3xl min-h-[260px] shadow-sm" 
              style={{
                backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCytVPed5TmsIT40hBP0_2_XFZvYLA4L4CZbWg8HzLyDdKIVMDsAGVE8z3RfEXQBrCq8PfFAmpDxF9VTCb7NkItjB9fVgw9bRes8ifG24_ffrn28xWBhXmz-ev8bOJ1ivHmDb8P3lHHONjw-Zbj7K6rHDn2-5_06T0G07z2pcd0NGGOAFyTxXnl7uJJfHw5Rbe41GV5KUP_sUf9lGCJzIVY5D8g1egopWvIP38NK_es1DQETUJuzfZl5A4Ldl4ERoaOBNqvL7Glx9I")'
              }}
            >
              <div className="flex flex-col p-6">
                <h1 className="text-white tracking-tight text-3xl font-bold mb-2">Programa de Socios</h1>
                <p className="text-white/90 text-sm font-medium">Accede a inventario premium para tu negocio.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 max-w-[600px] mx-auto">
          <p className="text-[#111418] dark:text-gray-300 text-base font-normal leading-relaxed text-center">
            Únete a nuestro programa de distribución y accede a precios exclusivos en productos Apple. Completa el siguiente formulario para iniciar tu solicitud.
          </p>
        </div>

        <div className="max-w-[600px] mx-auto px-4 flex flex-col gap-8 mb-12">
          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>
            <label className="flex flex-col w-full">
              <p className="text-sm font-medium pb-2">Nombre Completo</p>
              <input className="w-full rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20" placeholder="Ej. Juan Pérez" type="text" />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col w-full">
                <p className="text-sm font-medium pb-2">Correo Electrónico</p>
                <input className="w-full rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20" placeholder="juan@ejemplo.com" type="email" />
              </label>
              <label className="flex flex-col w-full">
                <p className="text-sm font-medium pb-2">Teléfono de Contacto</p>
                <input className="w-full rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20" placeholder="+54 9 11 ..." type="tel" />
              </label>
            </div>
          </div>

          {/* Negocio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información del Negocio</h3>
            <label className="flex flex-col w-full">
              <p className="text-sm font-medium pb-2">Nombre Fantasía</p>
              <input className="w-full rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20" placeholder="Ej. Tech Store" type="text" />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-sm font-medium pb-2">Dirección</p>
              <input className="w-full rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20" placeholder="Escribí donde recibirías tus compras" type="text" />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-sm font-medium pb-2">¿Cuántas unidades vendes por mes?</p>
              <div className="relative">
                <select className="w-full appearance-none rounded-xl border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-surface-dark h-12 px-4 focus:ring-primary outline-none transition-shadow focus:shadow-lg focus:shadow-primary/20">
                  <option disabled selected>Selecciona un rango</option>
                  <option value="0-10">0 - 10</option>
                  <option value="11-25">11 - 25</option>
                  <option value="26-50">26 - 50</option>
                  <option value="51-100">51 - 100</option>
                  <option value="100+">+100</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-400">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <Footer />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex justify-center z-40">
        <button className="flex items-center justify-center rounded-2xl h-14 bg-primary text-white text-base font-bold w-full max-w-lg shadow-lg shadow-primary/30 transition-transform active:scale-[0.98]">
          <span className="truncate">Enviar Solicitud</span>
          <span className="material-symbols-outlined ml-2 text-xl">send</span>
        </button>
      </div>
      <div className="h-24"></div>
    </div>
  );
};

export default Wholesale;
