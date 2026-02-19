
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, CreditCard, Lock, ArrowRight, ShieldCheck, Plus, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

// Quick recommended products data for empty state
const recommendedProducts: Product[] = [
  {
    id: 'autumn-v1',
    name: "AUTUMN COLLECTION V1",
    type: "Sample Kit",
    price: 49.99,
    description: "Dark, moody melodies.",
    // Updated to match the main product image
    image: "https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1jatonpv9ahau3gi7m1e7s69p1a.png", 
    features: []
  },
];

const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, cart, removeFromCart, cartTotal, clearCart, addToCart } = useCart();
  
  const handleCheckout = () => {
    // Redirect to Payhip as requested
    window.location.href = "https://payhip.com/b/v89gM";
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-premium-card border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h2 className="text-2xl font-display font-bold text-white tracking-wide">
                YOUR CART
              </h2>
              <button onClick={toggleCart} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col">
                  <div className="flex flex-col items-center justify-center text-slate-600 py-10">
                    <ShoppingBagIcon />
                    <p className="mt-6 text-lg">Your cart is empty.</p>
                  </div>

                  {/* Recommended Section for Empty Cart */}
                  <div className="mt-auto border-t border-white/5 pt-8">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Recommended for You</h3>
                    <div className="space-y-4">
                        {recommendedProducts.map((prod) => (
                            <div key={prod.id} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors group">
                                <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all" />
                                <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="text-white font-bold text-xs uppercase">{prod.name}</h4>
                                    <span className="text-electric-blue text-xs font-mono">€{prod.price}</span>
                                </div>
                                <button 
                                    onClick={() => addToCart(prod)}
                                    className="self-center p-2 bg-white/10 rounded-full text-white hover:bg-electric-blue transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                        <p className="text-violet-400 font-bold">€{item.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-600 hover:text-red-500 self-center p-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400 text-sm uppercase tracking-wider">Total Amount</span>
                  <span className="text-3xl font-bold text-white">€{cartTotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 group shadow-lg shadow-violet-900/20"
                >
                  Proceed to Checkout <ExternalLink size={18} />
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">
                    <ShieldCheck size={12} className="text-green-400" />
                    <span>Safe Checkout with Payhip</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ShoppingBagIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);

export default CartSidebar;
