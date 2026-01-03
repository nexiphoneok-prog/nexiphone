
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchLiveProducts } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchLiveProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.capacity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.color.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#1C1C1E] flex flex-col">
      
      {/* Header Unificado: Nombre Izquierda, Buscador Derecha */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-[60px] flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 gap-4">
          
          {/* Lado Izquierdo: Back + Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 
              onClick={() => navigate('/')}
              className="text-xl font-bold tracking-tight text-text-dark dark:text-white cursor-pointer"
            >
              nexiPhone
            </h1>
          </div>

          {/* Lado Derecho: Buscador Integrado */}
          <div className="flex-1 max-w-lg relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
            <input 
              type="text"
              placeholder="Buscar modelo..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 pl-9 pr-10 text-sm focus:ring-1 focus:ring-primary transition-all"
            />
            {searchTerm && (
              <button 
                onClick={clearFilters}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

        </div>
      </header>

      <SubHeaderNav />

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-1">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {searchTerm ? `Resultados para: ${searchTerm}` : 'Stock en tiempo real'}
          </h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse flex flex-col gap-3">
                <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 animate-slide-in">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center max-w-xs mx-auto">
            <div className="size-20 bg-gray-50 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600">search_off</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Sin stock disponible</h3>
            <button 
              onClick={clearFilters}
              className="mt-6 text-primary font-bold text-sm hover:underline"
            >
              Ver todos los modelos
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
