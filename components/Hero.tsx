
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yScroll = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityScroll = useTransform(scrollY, [0, 300], [1, 0]);

  const title = "WZZPTOM";
  const letters = Array.from(title);

  const containerVars = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      }
    }
  };

  const letterVars = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background Glow */}
      <motion.div
        style={{ y: yScroll, opacity: opacityScroll }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-electric-blue/5 rounded-full blur-[160px]" />
      </motion.div>

      <div className="w-full px-6 relative z-10 flex flex-col items-center justify-center h-full">
        <div className="relative z-20 flex flex-col items-center text-center w-full max-w-7xl">
            <motion.div 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            >
                <h2 className="text-electric-blue font-bold tracking-[0.6em] text-[10px] md:text-xs uppercase mb-8 opacity-80">
                    Sonic Architecture • Billboard Charting
                </h2>
            </motion.div>

            <motion.h1
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="font-display font-black text-[15vw] sm:text-[12vw] lg:text-[10vw] leading-[0.9] tracking-tighter text-white mb-10 flex select-none"
            >
                {letters.map((char, i) => (
                  <motion.span key={i} variants={letterVars} className="inline-block">
                    {char}
                  </motion.span>
                ))}
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col items-center justify-center gap-10"
            >
                 <p className="text-slate-500 max-w-md text-sm md:text-base leading-relaxed text-center px-6 font-medium">
                    High-end textures for the modern landscape.
                    <br />
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-4 block">
                      Trusted by <span className="text-white/80">Lil Baby • Roddy Ricch • 42 Dugg</span>
                    </span>
                 </p>
                 
                 <button 
                    onClick={() => navigate('/sound-kits')}
                    className="group relative flex items-center gap-6 pl-8 pr-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-500"
                 >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">View Kits</span>
                    <div className="w-11 h-11 bg-electric-blue rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-95 shadow-xl shadow-electric-blue/20">
                        <ArrowDownRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                 </button>
            </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
