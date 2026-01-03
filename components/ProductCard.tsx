import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Condition } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const getConditionLabel = (condition: Condition) => {
    switch (condition) {
      case Condition.New: return 'Nuevo';
      case Condition.Excellent: return 'Excelente';
      case Condition.Good: return 'Buen estado';
      case Condition.Used: return 'Outlet';
      default: return 'Certificado';
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
      className="flex flex-col group cursor-pointer animate-premium-in"
    >
      <div className="relative aspect-[1/1.1] w-full rounded-[32px] bg-[#fbfbfd] dark:bg-[#161617] overflow-hidden mb-6 flex items-center justify-center p-12 transition-all duration-500 group-hover:bg-[#f5f5f7] dark:group-hover:bg-[#1d1d1f] group-hover:shadow-2xl group-hover:shadow-black/5">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" 
        />
        
        {product.isOffer && (
          <div className="absolute top-5 right-5 px-3 py-1 bg-primary rounded-full shadow-lg z-10">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">PROMOCIÓN</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-1">
          {getConditionLabel(product.condition)}
        </span>
        <h4 className="text-xl font-bold text-text-dark dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h4>
        <p className="text-[13px] text-text-light dark:text-gray-400 font-medium mb-3">
          {product.capacity} • {product.color}
        </p>
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-xl">USD {product.usdPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;