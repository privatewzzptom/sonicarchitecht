
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Ticker: React.FC = () => {
    const items = [
        "BILLBOARD CHARTING PRODUCER",
        "INSTANT DELIVERY",
        "SECURE CHECKOUT",
        "HIGH QUALITY INDUSTRY LEVEL",
        "100% ROYALTY FREE OPTIONS",
        "CUSTOM PRODUCTION"
    ];

    return (
        <div className="py-3 bg-electric-blue border-y border-white/10 overflow-hidden relative z-30 -rotate-1 origin-center scale-[1.02] shadow-[0_0_25px_rgba(59,130,246,0.4)] my-8 transform">
             {/* Gradient Overlays for smooth fade */}
             <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-electric-blue to-transparent z-10"></div>
             <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-electric-blue to-transparent z-10"></div>

            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-12"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                >
                    {/* Quadruple the items to ensure seamless loop on large screens */}
                    {[...items, ...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 text-black font-display font-black text-lg md:text-xl tracking-widest uppercase">
                            <span>{item}</span>
                            <Zap size={18} className="fill-black" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Ticker;