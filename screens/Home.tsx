
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchLiveProducts } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [promoProducts, setPromoProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function loadData() {
      const allProducts = await fetchLiveProducts();
      const filtered = allProducts.filter(p => p.isOffer);
      setPromoProducts(filtered);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="bg-white dark:bg-black text-text-dark dark:text-white flex flex-col min-h-screen">
      {/* Header Rediseñado: Nombre Izquierda, Buscador Derecha (Sin ícono de menú) */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md h-[60px] flex items-center border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 gap-4">
          
          {/* Lado Izquierdo: Logo */}
          <div className="flex items-center shrink-0">
            <h1 
              onClick={() => navigate('/')}
              className="text-xl font-bold tracking-tight text-text-dark dark:text-white cursor-pointer"
            >
              nexiPhone
            </h1>
          </div>

          {/* Lado Derecho: Buscador + Bolsa */}
          <div className="flex items-center gap-3 flex-1 justify-end max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[240px] hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
              <input 
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="¿Qué modelo buscas?"
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-1.5 pl-9 pr-4 text-xs focus:ring-1 focus:ring-primary transition-all"
              />
            </form>
            
            <div className="flex items-center gap-2">
              <span 
                onClick={() => navigate('/shop')}
                className="material-symbols-outlined text-gray-600 dark:text-gray-300 cursor-pointer sm:hidden text-[22px]"
              >
                search
              </span>
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 cursor-pointer text-[22px] hover:text-primary">shopping_bag</span>
            </div>
          </div>

        </div>
      </header>

      <SubHeaderNav />

      {/* Hero "Ultra-Premium" */}
      <section className="w-full bg-black overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-7xl relative flex flex-col items-center pt-16 md:pt-24 px-6 min-h-[500px] md:min-h-[700px]">
          <div className="relative z-10 flex flex-col gap-2 text-center items-center max-w-3xl animate-premium-in">
            <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tight">iPhone 16 Pro</h2>
            <p className="text-[#a1a1a6] text-lg md:text-2xl font-medium">Titanio. El futuro en tus manos.</p>
          </div>
          
          <div className="w-full max-w-4xl mt-12 animate-premium-in delay-150 relative">
            <img 
              src="https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121031-iphone-16-pro.png"
              alt="iPhone 16 Pro"
              className="w-full h-auto object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
              <button 
                onClick={() => navigate('/select-model')} 
                className="bg-[#0071e3] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#0077ed] transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Comprar
              </button>
              <Link to="/select-model" className="text-[#0071e3] font-bold text-sm flex items-center gap-1 hover:underline">
                Más información
                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Certificado y Garantizado */}
      <section className="px-6 py-20 bg-[#fbfbfd] dark:bg-[#131c15] border-y border-gray-100 dark:border-olive-900/30">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4 text-olive-700 dark:text-olive-300">
            <span className="material-symbols-outlined !text-[20px]">verified</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">EQUIPOS GARANTIZADOS</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center text-text-dark dark:text-white mb-6">
            Certificado y Garantizado
          </h2>
          
          <p className="text-text-light dark:text-gray-400 text-base md:text-lg leading-relaxed text-center mb-12">
            Cada dispositivo pasa por una inspección rigurosa de 30 puntos. Comprá con total tranquilidad.
          </p>
          
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-5 p-6 rounded-3xl bg-white dark:bg-[#101922] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-olive-50 dark:bg-olive-900/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-olive-600 dark:text-olive-400 !text-[24px]">verified_user</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Garantía hasta 12 Meses</h3>
                <p className="text-sm text-text-light dark:text-gray-400 mt-1">Cobertura total ante cualquier fallo técnico.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-6 rounded-3xl bg-white dark:bg-[#101922] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-olive-50 dark:bg-olive-900/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-olive-600 dark:text-olive-400 !text-[24px]">battery_full</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Baterías originales</h3>
                <p className="text-sm text-text-light dark:text-gray-400 mt-1">Salud garantizada en todos los modelos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Elegidos para vos</h3>
            <p className="text-text-light font-medium">Equipos certificados con garantía premium.</p>
          </div>
          <Link to="/shop" className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
            Explorar catálogo
            <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-gray-50 dark:bg-surface-dark rounded-[32px] animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {promoProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;
