
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PriceOption } from '../types';
import Footer from '../components/Footer';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const { usdTotal, arsTotal } = getCartTotal();

  const handleCheckout = () => {
    let message = '¡Hola NexiPhone! 👋\n\nEstoy interesado/a en comprar los siguientes productos:\n\n';
    cartItems.forEach(item => {
      const price = item.selectedPriceOption === PriceOption.USD 
        ? `USD ${item.product.usdPrice.toLocaleString('en-US')}` 
        : `$ ${item.product.discountPriceArs.toLocaleString('es-AR')}`;
      message += `📱 *${item.product.name}* (${item.product.capacity} - ${item.product.color})\n`;
      message += `💰 Precio: ${price}\n\n`;
    });

    message += 'Resumen del pedido:\n';
    if (arsTotal > 0) {
        message += `Total ARS: *$ ${arsTotal.toLocaleString('es-AR')}*\n`;
    }
    if (usdTotal > 0) {
        message += `Total USD: *USD ${usdTotal.toLocaleString('en-US')}*\n`;
    }
    
    window.open(`https://wa.me/+5493517713422?text=${encodeURIComponent(message.trim())}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-text-dark dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 h-[60px] flex items-center">
        <div className="max-w-4xl mx-auto w-full flex items-center px-4 relative justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Mi Bolsa</h1>
        </div>
      </header>

      {/* Cart Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 md:p-6">
        {cartItems.length === 0 ? (
          <div className="text-center pt-20 flex flex-col items-center">
            <span className="material-symbols-outlined text-7xl text-gray-300 dark:text-gray-700">shopping_bag</span>
            <h2 className="mt-6 text-2xl font-bold">Tu bolsa está vacía</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Añade algunos productos para empezar.</p>
            <button onClick={() => navigate('/shop')} className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition-colors">
              Ir a la tienda
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-premium-in">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex gap-4 items-center bg-gray-50 dark:bg-surface-dark p-4 rounded-2xl shadow-sm">
                <div className="w-24 h-24 bg-white dark:bg-black rounded-lg p-2 flex items-center justify-center shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base leading-tight">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.product.capacity} • {item.product.color}</p>
                  <p className="font-bold text-lg mt-2 text-primary">
                    {item.selectedPriceOption === PriceOption.USD
                      ? `USD ${item.product.usdPrice.toLocaleString('en-US')}`
                      : `$ ${item.product.discountPriceArs.toLocaleString('es-AR')}`}
                  </p>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 p-2 rounded-full self-start">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Summary & Checkout */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[60]">
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">Total</span>
                <div className="text-right">
                    {arsTotal > 0 && <p className="font-bold text-xl">$ {arsTotal.toLocaleString('es-AR')}</p>}
                    {usdTotal > 0 && <p className="font-bold text-xl">USD {usdTotal.toLocaleString('en-US')}</p>}
                </div>
                </div>
                <button 
                onClick={handleCheckout} 
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl text-base hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
                >
                Finalizar compra por WhatsApp
                </button>
            </div>
            </div>
        </div>
      )}
      
      {cartItems.length === 0 && <Footer />}
    </div>
  );
};

export default Cart;
