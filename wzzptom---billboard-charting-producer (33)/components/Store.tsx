import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Disc } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: "WZZPTOM VOL. 1",
    type: "Sample Kit",
    price: 39.99,
    description: "The debut collection. Dark, melodic, billboard ready.",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    features: ["20 Loops", "Stems", "Key/BPM"]
  },
  {
    id: '2',
    name: "MIDNIGHT",
    type: "Loop Kit",
    price: 29.99,
    description: "Haunting pianos and vintage synths for pain beats.",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
    features: ["15 WAVs", "Royalty Free", "Dark R&B"]
  },
  {
    id: '3',
    name: "DRUM GOD IV",
    type: "Drum Kit",
    price: 24.99,
    description: "The hardest hitting drums in the industry. Period.",
    image: "https://images.unsplash.com/photo-1519874179391-3ebc752241dd?q=80&w=2070&auto=format&fit=crop",
    features: ["One Shots", "808s", "Hi-Hats"]
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-charcoal rounded-none border border-white/5 overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"></div>
        
        <div className="absolute top-4 right-4">
             <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-md">
                <Disc size={14} className="animate-spin-slow text-white" />
             </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        
        <div className="flex justify-between items-start mb-4">
            <div>
                <span className="text-xs font-bold text-electric-blue uppercase tracking-wider block mb-1">{product.type}</span>
                <h3 className="text-xl font-display font-bold text-white">{product.name}</h3>
            </div>
            <span className="text-lg font-mono text-white">${product.price}</span>
        </div>
        
        <button
            onClick={() => addToCart(product)}
            className="w-full py-3 mt-4 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
            <Plus size={14} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

const Store: React.FC = () => {
  return (
    <section id="store" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
              SOUND <br/> SUPPLY
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0">
             <p className="text-slate-400 max-w-xs">Premium audio tools crafted for the charts. 100% Royalty Free options available.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;