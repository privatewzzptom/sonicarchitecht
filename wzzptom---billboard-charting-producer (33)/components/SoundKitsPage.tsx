
import React from 'react';
import { motion } from 'framer-motion';
import { Disc, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface SoundKitsPageProps {
  products: Product[];
}

const SoundKitsPage: React.FC<SoundKitsPageProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">SOUND KITS</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Premium sonic arsenals. Curated and processed for immediate inspiration.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-12">
            {products.map((product) => (
                <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate(`/sound-kits/${product.id}`)}
                className="group cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-electric-blue/50 transition-all duration-500 shadow-2xl hover:shadow-electric-blue/10"
                >
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
                        {/* Removed grayscale filter and added transparent background logic via App.tsx theme */}
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        
                        {/* Floating Disc Animation */}
                        <div className="absolute top-6 left-6 w-12 h-12 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:rotate-180 transition-transform duration-700">
                            <Disc className="text-white w-6 h-6" />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-transparent to-black/40">
                        <div>
                            <span className="text-electric-blue font-bold tracking-[0.2em] text-xs uppercase mb-4 block">New Release</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                                {product.name} <br/> <span className="text-slate-500">WZZPTOM</span>
                            </h2>
                            <p className="text-slate-400 mb-8 line-clamp-3">
                                {product.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {product.features.slice(0, 3).map((feat, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                            <span className="text-3xl font-mono font-bold text-white">€{product.price.toFixed(2)}</span>
                            <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm group-hover:text-electric-blue transition-colors">
                                View Details <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SoundKitsPage;
