
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Shop from './screens/Shop';
import ProductDetail from './screens/ProductDetail';
import Wholesale from './screens/Wholesale';
import FAQ from './screens/FAQ';
import AboutUs from './screens/AboutUs';
import ModelSelection from './screens/ModelSelection';
import SubModelSelection from './screens/SubModelSelection';
import Cart from './screens/Cart';
import AIChat from './components/AIChat';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen w-full max-w-[1920px] mx-auto bg-background-light dark:bg-background-dark shadow-sm relative">
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/select-model" element={<ModelSelection />} />
              <Route path="/select-model/:seriesId" element={<SubModelSelection />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          
          <AIChat />
        </div>
      </CartProvider>
    </HashRouter>
  );
};

export default App;
