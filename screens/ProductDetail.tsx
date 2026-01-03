
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLiveProducts } from '../services/productService';
import { Product, Condition, PriceOption } from '../types';
import SubHeaderNav from '../components/SubHeaderNav';
import Footer from '../components/Footer';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de selección
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<Condition>(Condition.New);
  const [selectedBattery, setSelectedBattery] = useState<string>('');
  const [selectedPriceOption, setSelectedPriceOption] = useState<PriceOption>(PriceOption.CASH);

  useEffect(() => {
    async function loadData() {
      const data = await fetchLiveProducts();
      setAllProducts(data);
      
      const current = data.find(p => p.id === id);
      if (current) {
        setSelectedCapacity(current.capacity);
        setSelectedColor(current.color);
        setSelectedCondition(current.condition);
        setSelectedBattery(current.battery || '');
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const baseProduct = useMemo(() => {
    if (allProducts.length === 0) return null;
    return allProducts.find(p => p.id === id) || allProducts[0];
  }, [allProducts, id]);

  const variations = useMemo(() => {
    if (!baseProduct) return [];
    return allProducts.filter(p => p.name === baseProduct.name);
  }, [allProducts, baseProduct]);

  const availableCapacities = useMemo(() => {
    if (!variations.length) return [];
    return Array.from(new Set(variations.map(v => v.capacity)));
  }, [variations]);

  const availableColors = useMemo(() => {
    if (!variations.length) return [];
    const filtered = variations.filter(v => v.capacity === selectedCapacity);
    if (filtered.length === 0) return Array.from(new Set(variations.map(v => v.color)));
    return Array.from(new Set(filtered.map(v => v.color)));
  }, [variations, selectedCapacity]);

  useEffect(() => {
    if (availableColors.length > 0 && !availableColors.includes(selectedColor)) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);

  const filteredCapacities = useMemo(() => {
    if (!variations.length) return [];
    const filtered = variations.filter(v => v.color === selectedColor);
    if (filtered.length === 0) return availableCapacities;
    return Array.from(new Set(filtered.map(v => v.capacity)));
  }, [variations, selectedColor, availableCapacities]);

  const availableConditions = useMemo(() => {
    const filtered = variations.filter(v => 
      v.capacity === selectedCapacity && 
      v.color === selectedColor
    );
    return Array.from(new Set(filtered.map(v => v.condition)));
  }, [variations, selectedCapacity, selectedColor]);

  useEffect(() => {
    if (availableConditions.length > 0 && !availableConditions.includes(selectedCondition)) {
      setSelectedCondition(availableConditions[0]);
    }
  }, [availableConditions, selectedCondition]);

  const availableBatteries = useMemo(() => {
    const filtered = variations.filter(v => 
      v.capacity === selectedCapacity && 
      v.color === selectedColor && 
      v.condition === selectedCondition
    );
    return Array.from(new Set(filtered.map(v => v.battery || ''))).sort((a: string, b: string) => {
        if (a.toLowerCase().includes('nueva')) return -1;
        if (b.toLowerCase().includes('nueva')) return 1;
        return b.localeCompare(a, undefined, {numeric: true});
    });
  }, [variations, selectedCapacity, selectedColor, selectedCondition]);

  useEffect(() => {
    if (availableBatteries.length > 0 && !availableBatteries.includes(selectedBattery)) {
      setSelectedBattery(availableBatteries[0]);
    }
  }, [availableBatteries, selectedBattery]);

  const activeProduct = useMemo(() => {
    if (!baseProduct) return null;
    const found = variations.find(v => 
      v.capacity === selectedCapacity && 
      v.color === selectedColor && 
      v.condition === selectedCondition &&
      v.battery === selectedBattery
    ) || variations.find(v => 
      v.capacity === selectedCapacity && 
      v.color === selectedColor && 
      v.condition === selectedCondition
    ) || variations.find(v => v.capacity === selectedCapacity && v.color === selectedColor);

    return found || baseProduct;
  }, [variations, selectedCapacity, selectedColor, selectedCondition, selectedBattery, baseProduct]);

  const priceData = useMemo(() => {
    if (!activeProduct) return null;
    
    const discountPercent = activeProduct.listPriceArs > 0 
      ? Math.round((1 - activeProduct.discountPriceArs / activeProduct.listPriceArs) * 100) 
      : 0;

    const installmentValue = Math.round(activeProduct.listPriceArs / 3);

    return {
      discountPercent,
      installmentValue,
      listPriceArs: activeProduct.listPriceArs,
      discountPriceArs: activeProduct.discountPriceArs,
      formattedListPrice: `$ ${activeProduct.listPriceArs.toLocaleString('es-AR')}`,
      formattedDiscountPrice: `$ ${activeProduct.discountPriceArs.toLocaleString('es-AR')}`,
      formattedUsdPrice: `USD ${activeProduct.usdPrice}`,
      formattedInstallment: `$ ${installmentValue.toLocaleString('es-AR')}`
    };
  }, [activeProduct]);

  const getColorHex = (color: string) => {
    const c = color.toLowerCase();
    if (c.includes('graphite') || c.includes('grafito')) return '#383838';
    if (c.includes('silver') || c.includes('plata')) return '#e3e4e5';
    if (c.includes('gold') || c.includes('oro')) return '#f5e1c8';
    if (c.includes('pacific blue')) return '#28475c';
    if (c.includes('sierra blue')) return '#9bb5ce';
    if (c.includes('alpine green') || c.includes('verde alpino')) return '#4f5a4b';
    if (c.includes('space gray') || c.includes('gris espacial')) return '#535150';
    if (c.includes('midnight') || c.includes('medianoche')) return '#1d2327';
    if (c.includes('starlight') || c.includes('blanco estelar')) return '#faf7f2';
    if (c.includes('blue') || c.includes('azul')) return '#215e7c';
    if (c.includes('pink') || c.includes('rosa')) return '#fae3e0';
    if (c.includes('red') || c.includes('rojo')) return '#bf0013';
    if (c.includes('purple') || c.includes('púrpura')) return '#e5ddea';
    if (c.includes('natural')) return '#bebbb4';
    if (c.includes('black') || c.includes('negro')) return '#424345';
    if (c.includes('white') || c.includes('blanco')) return '#f2f1ed';
    if (c.includes('teal')) return '#b2d4d1';
    if (c.includes('ultramarine')) return '#4c558f';
    if (c.includes('desert') || c.includes('desierto')) return '#d2beb3';
    if (c.includes('green') || c.includes('verde')) return '#4e584a';
    return '#888888';
  };

  const formatBattery = (bat: string) => {
    if (bat.toLowerCase().includes('nueva')) return '100%';
    const match = bat.match(/\d+/);
    if (match) return `${match[0]}%`;
    return bat;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-background-dark text-slate-900 dark:text-white">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!baseProduct || !activeProduct || !priceData) return <div className="p-10 text-center">Producto no encontrado</div>;

  const handleWhatsAppPurchase = () => {
    if (!activeProduct || !priceData) return;

    const message = encodeURIComponent(
      `¡Hola NexiPhone! 👋\n\nQuisiera reservar este equipo:\n📱 *${activeProduct.name}*\n📦 ${activeProduct.capacity}\n🎨 ${activeProduct.color}\n✨ Estado: ${activeProduct.condition}\n🔋 Batería: ${activeProduct.battery || 'N/A'}\n\nForma de pago elegida: ${selectedPriceOption === PriceOption.CASH ? 'Efectivo/Transferencia' : 'USD'}\n💰 Valor: ${
        selectedPriceOption === PriceOption.CASH ? priceData.formattedDiscountPrice : priceData.formattedUsdPrice
      }`
    );
    window.open(`https://wa.me/+5493517713422?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark text-slate-900 dark:text-white font-display">
      {/* Header centrado */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-background-dark/90 sticky top-0 z-[50] backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full flex items-center relative h-6">
          <button onClick={() => navigate(-1)} className="absolute left-0 p-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="w-full text-center text-base font-bold truncate px-10">{activeProduct.name}</h1>
        </div>
      </div>

      <SubHeaderNav />

      {/* Layout Responsivo Principal */}
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col flex-1">
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Lado Izquierdo: Imagen */}
          <div className="flex flex-col items-center md:w-1/2">
            <div className="relative w-full aspect-square max-w-[420px] bg-[#fbfbfd] dark:bg-[#161617] rounded-[48px] flex items-center justify-center p-14 overflow-hidden border border-gray-50 dark:border-white/5">
              <img 
                key={activeProduct.image}
                src={activeProduct.image} 
                alt={activeProduct.name}
                className="max-h-full max-w-full object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)] animate-premium-in"
              />
            </div>
            <p className="mt-8 text-[14px] font-bold text-[#86868b] dark:text-[#a1a1a6] tracking-tight">
              {activeProduct.name}
            </p>
          </div>

          {/* Lado Derecho: Opciones de Selección */}
          <div className="flex flex-col gap-10 md:w-1/2">
            {/* Color */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Color</h3>
              <div className="flex flex-wrap gap-5">
                {availableColors.map(color => (
                  <button key={color} onClick={() => setSelectedColor(color)} className="group flex flex-col items-center gap-2">
                    <div className={`size-12 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color ? 'border-primary ring-4 ring-primary/10' : 'border-transparent'}`}>
                      <div className="size-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm" style={{ backgroundColor: getColorHex(color) }} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedColor === color ? 'text-primary' : 'text-gray-400'}`}>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capacidad */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Capacidad</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableCapacities.map(cap => {
                  const isAvailable = filteredCapacities.includes(cap);
                  return (
                    <button key={cap} disabled={!isAvailable} onClick={() => isAvailable && setSelectedCapacity(cap)} className={`py-4 rounded-2xl border-2 font-bold text-[15px] transition-all text-center ${selectedCapacity === cap ? 'border-primary bg-primary/5 text-primary' : isAvailable ? 'border-gray-100 dark:border-gray-800 text-gray-400 bg-white dark:bg-transparent' : 'border-gray-50 dark:border-gray-900 opacity-30 cursor-not-allowed'}`}>
                      {cap}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Batería */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Batería</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableBatteries.map(bat => (
                  <button key={bat} onClick={() => setSelectedBattery(bat)} className={`py-3.5 rounded-2xl border-2 font-bold text-[17px] transition-all text-center ${selectedBattery === bat ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-800 text-gray-400 bg-white dark:bg-transparent'}`}>
                    {formatBattery(bat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Estado</h3>
              <div className="flex flex-col gap-4">
                {availableConditions.map(cond => (
                  <button key={cond} onClick={() => setSelectedCondition(cond)} className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex flex-col gap-1 relative ${selectedCondition === cond ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent shadow-sm'}`}>
                    {cond === Condition.New && (
                      <div className="absolute top-5 right-6 flex items-center gap-1.5 px-3 py-1 bg-green-500/10 dark:bg-green-500/20 rounded-full">
                        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Recomendado</span>
                        <span className="material-symbols-outlined !text-[14px] text-green-600 dark:text-green-400 font-bold">verified</span>
                      </div>
                    )}
                    <span className={`text-base font-bold ${selectedCondition === cond ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>{cond}</span>
                    <span className="text-sm text-gray-400 font-medium">{cond === Condition.New || cond === Condition.Excellent ? "Como nuevo." : "Signos mínimos de uso."}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN CERTIFICADO Y GARANTIZADO */}
        <div className="w-full mt-12 md:mt-16 p-6 md:p-8 rounded-[40px] bg-[#fbfbfd] dark:bg-[#111112] border border-gray-100 dark:border-white/5 shadow-inner flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 mb-3 text-olive-700 dark:text-olive-300">
            <span className="material-symbols-outlined !text-[16px] font-bold">verified</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">EQUIPOS GARANTIZADOS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-text-dark dark:text-white mb-2 leading-tight">Certificado y Garantizado</h2>
          <p className="text-text-light dark:text-gray-400 text-[11px] md:text-xs leading-relaxed mb-8 max-w-[420px]">Cada dispositivo pasa por una inspección rigurosa de 30 puntos realizada por expertos. Comprá con total tranquilidad.</p>
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-[#161617] border border-gray-100 dark:border-white/5 shadow-sm text-left">
              <div className="size-10 rounded-full bg-olive-50 dark:bg-olive-900/10 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-olive-700 dark:text-olive-400 !text-[20px]">verified_user</span></div>
              <div><h3 className="font-bold text-xs leading-tight">Garantía hasta 12 Meses</h3><p className="text-[10px] text-text-light dark:text-gray-400 mt-0.5">Cobertura total ante cualquier fallo técnico.</p></div>
            </div>
            <div className="flex-1 flex items-center gap-4 p-4 rounded-3xl bg-white dark:bg-[#161617] border border-gray-100 dark:border-white/5 shadow-sm text-left">
              <div className="size-10 rounded-full bg-olive-50 dark:bg-olive-900/10 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-olive-700 dark:text-olive-400 !text-[20px]">battery_full</span></div>
              <div><h3 className="font-bold text-xs leading-tight">Baterías originales</h3><p className="text-[10px] text-text-light dark:text-gray-400 mt-0.5">Salud garantizada.</p></div>
            </div>
          </div>
        </div>

        {/* Sección de Opciones de Pago */}
        <div className="mt-16 md:mt-24 flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Opciones de pago</h3>
          <div className="flex flex-col gap-4">
            
            <button 
              onClick={() => setSelectedPriceOption(PriceOption.USD)}
              className={`w-full p-6 rounded-[32px] border-2 text-left transition-all flex items-center justify-between ${selectedPriceOption === PriceOption.USD ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent shadow-sm'}`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-base font-bold ${selectedPriceOption === PriceOption.USD ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>Precio en USD</span>
                <span className="text-[13px] text-gray-400 font-medium">Billetes físicos</span>
              </div>
              <div className="text-right">
                <span className={`block font-bold text-xl ${selectedPriceOption === PriceOption.USD ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{priceData.formattedUsdPrice}</span>
              </div>
            </button>

            <button 
              onClick={() => setSelectedPriceOption(PriceOption.CASH)}
              className={`w-full p-6 rounded-[32px] border-2 text-left transition-all flex items-center justify-between ${selectedPriceOption === PriceOption.CASH ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-transparent shadow-sm'}`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-base font-bold ${selectedPriceOption === PriceOption.CASH ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>Precio en efect/transfe</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[15px] text-gray-400 line-through leading-none mb-1">{priceData.formattedListPrice}</span>
                <span className={`block font-extrabold text-xl ${selectedPriceOption === PriceOption.CASH ? 'text-[#1d1d1f] dark:text-white' : 'text-gray-900 dark:text-white'}`}>{priceData.formattedDiscountPrice}</span>
                <span className="text-[14px] font-medium text-gray-500 mt-1">3 cuotas de {priceData.formattedInstallment}</span>
              </div>
            </button>

          </div>
        </div>
      </div>

      <Footer />
      <div className="h-52"></div>

      {/* BARRA INFERIOR FIJA */}
      <div className="fixed bottom-0 left-0 right-0 z-[100]">
        <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-900 shadow-[0_-20px_50px_rgba(0,0,0,0.06)]">
            <div className="max-w-4xl mx-auto w-full">
                {/* Main content */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5">
                    
                    {/* Price section */}
                    <div className="flex flex-col justify-center">
                        {selectedPriceOption === PriceOption.CASH ? (
                          <div className="flex flex-col relative">
                            <div className="h-5 flex items-end">
                              <span className="text-sm font-medium text-gray-400 dark:text-gray-500 line-through tracking-tight">
                                {priceData.formattedListPrice}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-3xl font-extrabold text-[#1d1d1f] dark:text-white tracking-tighter leading-none">
                                {priceData.formattedDiscountPrice}
                              </span>
                              <div className="px-2 py-0.5 bg-[#e6fcf5] dark:bg-green-500/10 rounded-md">
                                <span className="text-xs font-bold text-[#099268] dark:text-green-400 uppercase tracking-tighter">
                                  {priceData.discountPercent}% OFF
                                </span>
                              </div>
                            </div>
                            <div className="mt-1">
                              <span className="text-sm font-medium text-[#1d1d1f] dark:text-gray-300">
                                3 cuotas de <span className="font-bold">{priceData.formattedInstallment}</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-3xl font-extrabold text-[#1d1d1f] dark:text-white tracking-tighter leading-none">
                              {priceData.formattedUsdPrice}
                            </span>
                          </div>
                        )}
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex items-center">
                        <button 
                            onClick={handleWhatsAppPurchase}
                            className="w-full sm:w-auto h-14 px-8 rounded-full text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all bg-primary hover:bg-blue-700 shadow-primary/30 active:scale-[0.97]"
                        >
                            <span className="material-symbols-outlined !text-lg">shopping_cart</span>
                            <span className="text-base">Reservar</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
