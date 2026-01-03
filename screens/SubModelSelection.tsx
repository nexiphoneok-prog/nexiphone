
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchLiveProducts } from '../services/productService';
import { Product } from '../types';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

interface ModelInfo {
  name: string;
  desc: string;
  image: string;
}

const SubModelSelection: React.FC = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams<{ seriesId: string }>();
  const [availableModels, setAvailableModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const modelMarketing: Record<string, string> = {
    'iPhone 16 Pro Max': 'La pantalla más grande',
    'iPhone 16 Pro': 'Titanio y cámara de cine',
    'iPhone 16': 'Puro rendimiento y color',
    'iPhone 15 Pro Max': 'El zoom más avanzado',
    'iPhone 15 Pro': 'Diseño en Titanio Pro',
    'iPhone 15': 'Isla Dinámica para todos',
    'iPhone 14 Pro Max': 'Potencia Pro en pantalla Max',
    'iPhone 14 Pro': 'La primera Isla Dinámica',
    'iPhone 14': 'Gran batería y Modo Acción',
    'iPhone 13 Pro Max': 'El más grande y poderoso',
    'iPhone 13 Pro': 'Fluidez con ProMotion 120Hz',
    'iPhone 13': 'Increíble por donde lo mires',
    'iPhone 12 Pro Max': 'El máximo rendimiento y tamaño',
    'iPhone 12 Pro': 'Un salto en cámaras y diseño',
    'iPhone 12': 'Rápido, colorido, increíble',
    'iPhone 11 Pro Max': 'El más grande y poderoso',
    'iPhone 11 Pro': 'Cámaras pro. Pantalla pro.',
    'iPhone 11': 'Todo lo que necesitas'
  };

  useEffect(() => {
    async function loadModelsInStock() {
      const allProducts = await fetchLiveProducts();
      
      const filteredBySeries = allProducts.filter(p => {
        const match = p.name.match(/iPhone\s+(\d+)/i);
        return match && match[1] === seriesId;
      });

      const modelMap = new Map<string, ModelInfo>();
      
      filteredBySeries.forEach(p => {
        if (!modelMap.has(p.name)) {
          modelMap.set(p.name, {
            name: p.name,
            desc: modelMarketing[p.name] || 'Calidad certificada NexiPhone',
            image: p.image
          });
        }
      });

      const sortedModels = Array.from(modelMap.values()).sort((a, b) => {
        const getRank = (name: string) => {
          if (name.includes("Pro Max")) return 0;
          if (name.includes("Pro")) return 1;
          if (name.includes("Plus")) return 2;
          if (name.includes("mini")) return 3;
          return 4;
        };
        return getRank(a.name) - getRank(b.name);
      });

      setAvailableModels(sortedModels);
      setLoading(false);
    }
    loadModelsInStock();
  }, [seriesId]);

  const handleSelectModel = (name: string) => {
    navigate(`/shop?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-[#111418] dark:text-white transition-colors duration-200 font-display">
      <div className="sticky top-0 z-50 flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div 
          onClick={() => navigate('/select-model')}
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
        <div className="pt-6 px-4 pb-4 text-center">
          <h1 className="text-[#111418] dark:text-white tracking-tight text-[28px] font-bold leading-tight">
            {seriesId === '13' || seriesId === '12' ? '¿Qué modelo buscas?' : `Serie iPhone ${seriesId}`}
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? 'Verificando modelos disponibles...' : `Serie iPhone ${seriesId}`}
          </p>
        </div>

        <div className="flex flex-col w-full px-4 gap-3 max-w-2xl mx-auto mb-12">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            ))
          ) : availableModels.length > 0 ? (
            availableModels.map((model, idx) => (
              <div 
                key={idx}
                onClick={() => handleSelectModel(model.name)}
                className="group flex items-center p-3 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer hover:border-primary dark:hover:border-primary transition-all active:scale-[0.98]"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <div 
                    className="h-full w-full bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-300" 
                    style={{ backgroundImage: `url("${model.image}")` }}
                  />
                </div>
                <div className="flex flex-1 items-center justify-between ml-4">
                  <div className="flex flex-col">
                    <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight">{model.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{model.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 px-6">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
              <p className="text-gray-500">No encontramos modelos disponibles en esta serie.</p>
              <button onClick={() => navigate('/select-model')} className="mt-4 text-primary font-bold">Ver otras series</button>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default SubModelSelection;
