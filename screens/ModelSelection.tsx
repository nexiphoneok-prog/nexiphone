
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLiveProducts } from '../services/productService';
import { Product } from '../types';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const ModelSelection: React.FC = () => {
  const navigate = useNavigate();
  const [availableSeries, setAvailableSeries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAvailableStock() {
      const products = await fetchLiveProducts();
      
      const seriesSet = new Set<string>();
      products.forEach(p => {
        const match = p.name.match(/iPhone\s+(\d+)/i);
        if (match && match[1]) {
          seriesSet.add(match[1]);
        }
      });

      const sortedSeries = Array.from(seriesSet).sort((a, b) => parseInt(b) - parseInt(a));
      setAvailableSeries(sortedSeries);
      setLoading(false);
    }
    loadAvailableStock();
  }, []);

  const handleSelectSeries = (id: string) => {
    navigate(`/select-model/${id}`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white transition-colors duration-200 font-display">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div 
          onClick={() => navigate('/')}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Elige tu iPhone
        </h2>
      </div>

      <SubHeaderNav />

      <div className="flex-1 flex flex-col pb-8">
        <div className="pt-6 px-4 pb-4">
          <h1 className="text-[#111418] dark:text-white tracking-tight text-[28px] font-bold leading-tight text-center">
            ¿Qué modelo buscas?
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? 'Consultando stock disponible...' : 'Selecciona la generación'}
          </p>
        </div>

        <div className="flex flex-col w-full px-4 gap-3 max-w-2xl mx-auto mb-12">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))
          ) : availableSeries.length > 0 ? (
            availableSeries.map((id) => (
              <button 
                key={id}
                onClick={() => handleSelectSeries(id)}
                className="group flex items-center justify-between w-full p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:border-primary dark:hover:border-primary transition-all active:scale-[0.98]"
              >
                <span className="text-[#111418] dark:text-white text-xl font-bold leading-tight">Serie iPhone {id}</span>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chevron_right</span>
              </button>
            ))
          ) : (
            <div className="text-center py-20 px-6">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
              <p className="text-gray-500">No hay stock disponible en este momento.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ModelSelection;
