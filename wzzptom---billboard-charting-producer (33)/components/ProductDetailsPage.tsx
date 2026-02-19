
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, Play, Download, Check, Music2, Star, ChevronDown, ChevronUp, Zap, ShieldCheck, Flame, TrendingUp, Trophy } from 'lucide-react';
import { Product } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import { SHOPIFY_CONFIG } from './ShopifyConfig';

interface ProductDetailsPageProps {
  products: Product[];
}

const ShopifyBuyButton: React.FC<{ nodeId: string; buttonText?: string }> = ({ nodeId, buttonText = "UNLOCK ACCESS" }) => {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    const ShopifyBuyInit = () => {
      // @ts-ignore
      if (!window.ShopifyBuy || !window.ShopifyBuy.UI) return;
      
      // @ts-ignore
      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_CONFIG.domain,
        storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
      });

      // @ts-ignore
      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '15894155002236',
          node: document.getElementById(nodeId),
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: {
            "product": {
              "buttonDestination": "checkout",
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  },
                  "text-align": "center"
                },
                "button": {
                  ":hover": {
                    "background-color": "#ffffff",
                    "color": "#000000"
                  },
                  "background-color": "#000000",
                  "color": "#ffffff",
                  ":focus": {
                    "background-color": "#ffffff"
                  },
                  "border-radius": "100px",
                  "padding-left": "40px",
                  "padding-right": "40px",
                  "padding-top": "20px",
                  "padding-bottom": "20px",
                  "font-size": "14px",
                  "font-weight": "900",
                  "text-transform": "uppercase",
                  "letter-spacing": "0.3em",
                  "border": "1px solid rgba(255,255,255,0.2)"
                }
              },
              "contents": {
                "img": false,
                "title": false,
                "price": false
              },
              "text": {
                "button": buttonText
              }
            }
          },
        });
      });
    };

    // @ts-ignore
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    }
  }, [nodeId, buttonText]);

  return <div id={nodeId} className="flex justify-center w-full"></div>;
};

const AnimatedWarmBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const xPos = useTransform(springX, (v) => (v - window.innerWidth / 2) * 0.15);
  const yPos = useTransform(springY, (v) => (v - window.innerHeight / 2) * 0.15);
  const invertX = useTransform(xPos, (v) => -v * 0.5);
  const invertY = useTransform(yPos, (v) => -v * 0.5);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* Deep Orange Foundation Blob */}
      <motion.div
        style={{ x: xPos, y: yPos }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] bg-orange-600 rounded-full blur-[160px]"
      />
      
      {/* Pulsing Amber Glow */}
      <motion.div
        style={{ x: invertX, y: invertY }}
        animate={{
          scale: [0.9, 1.1, 1, 0.9],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-amber-500 rounded-full blur-[180px]"
      />

      {/* Reactive Center Pulse */}
      <motion.div
        style={{ 
          x: useTransform(xPos, (v) => v * 0.4), 
          y: useTransform(yPos, (v) => v * 0.4) 
        }}
        animate={{
          opacity: [0.2, 0.5, 0.3, 0.5, 0.2],
          scale: [0.8, 1.1, 0.9, 1.1, 0.8],
          backgroundColor: ['#f59e0b', '#fb923c', '#ea580c', '#fb923c', '#f59e0b']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[240px]"
      />

      {/* Extreme Bottom Atmosphere */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-orange-900/40 via-orange-950/20 to-transparent"></div>
      
      {/* High-Contrast Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay"></div>
    </div>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const impactReveal = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
};

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
                  <button onClick={() => navigate('/sound-kits')} className="text-electric-blue hover:text-white transition-colors">Back to Sound Kits</button>
              </div>
          </div>
      )
  }

  const scrollToOffer = () => {
    const pricingSection = document.getElementById('pricing-stack');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (id === 'warmcode-v1') {
    return (
      <div className="bg-transparent text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden relative">
        {/* Dynamic Warm Background */}
        <AnimatedWarmBackground />

        <AnimatePresence>
          {showStickyCTA && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-black/90 backdrop-blur-2xl border-t border-white/5"
            >
              <div className="container mx-auto max-w-6xl flex items-center justify-between">
                <div>
                  <p className="font-display font-black text-xl italic uppercase tracking-tighter">WARMCODE <span className="text-amber-500">ACCESS</span></p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Digital License • Instant Delivery</p>
                </div>
                <button 
                  onClick={scrollToOffer}
                  className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 rounded-full hover:bg-amber-500"
                >
                  SECURE ACCESS
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="relative pt-48 pb-24 px-6 min-h-screen flex flex-col justify-center items-center overflow-hidden">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="container mx-auto max-w-6xl text-center relative z-10 flex flex-col items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 text-white rounded-full mb-12 font-black text-[10px] uppercase tracking-[0.4em] backdrop-blur-sm"
            >
              <Flame size={14} className="text-amber-500" />
              THE INDUSTRY STANDARD PROTOCOL
            </motion.div>

            <div className="w-full max-w-5xl mx-auto mb-16 flex justify-center">
              <motion.h1 
                variants={impactReveal}
                className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-black leading-[0.8] tracking-tighter italic uppercase text-center flex flex-col items-center"
              >
                <span className="relative">WARM</span>
                <span className="text-amber-500 drop-shadow-[0_0_80px_rgba(245,158,11,0.5)]">CODE</span>
              </motion.h1>
            </div>

            <motion.p 
              variants={fadeInUp}
              className="text-slate-400 text-lg md:text-xl font-medium uppercase tracking-[0.2em] max-w-2xl mx-auto mb-20 leading-relaxed text-center"
            >
              Eradicate <span className="text-white">Cold Digital Textures</span>. 
              <br/>
              A Complete Analog Reconstruction.
            </motion.p>

            <motion.div 
               variants={fadeInUp}
               className="aspect-video w-full max-w-5xl mx-auto bg-charcoal rounded-[3rem] border border-white/5 mb-20 relative group overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 to-transparent opacity-50"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-8 border border-white/20 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer shadow-2xl"
                 >
                    <Play fill="currentColor" size={32} className="ml-1" />
                 </motion.div>
                 <p className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px] italic">Watch The Technical Overview</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full flex justify-center">
                <button 
                onClick={scrollToOffer}
                className="group relative px-16 py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-sm rounded-full transition-all hover:bg-amber-500 hover:text-white shadow-2xl"
                >
                UNLOCK ACCESS TIER
                </button>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-32 bg-charcoal/40 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto max-w-6xl px-6">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
            >
                <motion.div 
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="space-y-6 group"
                >
                    <motion.div
                      whileInView={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    >
                      <Trophy className="text-amber-500/60 mx-auto w-10 h-10 group-hover:text-amber-500 transition-colors duration-500" strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="text-5xl font-display font-black italic tracking-tighter">3K+</h4>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Mastered Samples</p>
                </motion.div>
                
                <motion.div 
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="space-y-6 group"
                >
                    <motion.div
                      whileInView={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <TrendingUp className="text-amber-500/60 mx-auto w-10 h-10 group-hover:text-amber-500 transition-colors duration-500" strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="text-5xl font-display font-black italic tracking-tighter">ELITE</h4>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Billboard Specification</p>
                </motion.div>
                
                <motion.div 
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="space-y-6 group"
                >
                    <motion.div
                      whileInView={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Zap className="text-amber-500/60 mx-auto w-10 h-10 group-hover:text-amber-500 transition-colors duration-500" strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="text-5xl font-display font-black italic tracking-tighter">SYNC</h4>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Zero Latency Workflow</p>
                </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="py-40 bg-black/50 backdrop-blur-md border-y border-white/5"
        >
          <div className="container mx-auto max-w-5xl px-6 text-center flex flex-col items-center">
            <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-black uppercase italic mb-20 leading-[0.9] tracking-tighter">
              THE <span className="text-slate-800">MANIFESTO</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-16 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
              <p className="tracking-wide">
                Industry standards have shifted. The market is saturated with thin, synthesized kits that lack the weight required for major label placements.
              </p>
              
              <div className="relative py-16 px-12 bg-white/[0.02] border border-white/5 rounded-[3rem] italic flex flex-col items-center backdrop-blur-sm">
                <div className="w-16 h-[1px] bg-amber-500/40 mb-10"></div>
                <p className="text-white text-2xl md:text-3xl leading-snug tracking-tight font-display font-light">
                  "Warmcode is a corrective measure. We spent months routing high-frequency digital signals through Neve 1073 preamps and custom analog chains to restore the natural harmonics that define platinum records."
                </p>
                <div className="w-16 h-[1px] bg-amber-500/40 mt-10"></div>
              </div>

              <p className="pt-4 tracking-wide text-white/40">
                Stop over-processing your mix. Start with <span className="text-white">Professional Integrity.</span>
              </p>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-32 px-6">
          <div className="container mx-auto max-w-6xl flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-32 flex flex-col items-center"
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase italic mb-4 leading-none text-center">THE <span className="text-amber-500">ARSENAL</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs text-center">6 KITS. NO FILLER. COMPLETE SYSTEM.</p>
            </motion.div>

            <motion.div 
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="w-full flex flex-col items-center"
            >
              {[
                { 
                  name: "NEON TRAP", 
                  desc: "Aggressive, analog-saturated 808s and crisp, heavy-duty percussion designed for high-end speakers.",
                  detail: "Focused on low-end stability and harmonic richness. These sounds were driven through a Thermionic Culture Vulture for that signature 'expensive' distortion. Includes over 400 unique transients and tuned sub-layers." 
                },
                { 
                  name: "VINTAGE SOUL", 
                  desc: "Lush chord progressions and melodic fragments recorded through real tube preamps for instant vibe.",
                  detail: "100% original compositions played on Rhodes and Juno-60. No MIDI, just pure analog soul sampled at 96kHz. Every loop comes with a dedicated 'tape-warped' version for lo-fi aesthetics."
                },
                { 
                  name: "ANALOG DRUM BREAKS", 
                  desc: "Live-recorded kits processed through a legendary SSL board for that unmistakable 'thump'.",
                  detail: "The character you can't get from software. Recorded in a high-ceiling studio with a pair of Coles 4038 ribbons. Processed through a Fairchild 670 compressor for massive, cohesive energy."
                },
                { 
                  name: "ATMOS LO-FI", 
                  desc: "Found-sound textures and warm synth beds for deep, moody, and cinematic production.",
                  detail: "Real-world textures. Tape-saturated field recordings from the streets of Milan and London. Perfect for adding organic depth to modern digital arrangements. Includes 100+ ambient layers."
                },
                { 
                  name: "R&B GEMS", 
                  desc: "Silky melodies and professional vocal chops designed to sit perfectly in the center of the mix.",
                  detail: "Silky-smooth progressions focused on 90s nostalgia mixed with 2025 clarity. Vocal elements were processed with a vintage Telefunken U47 chain for elite presence and texture."
                },
                { 
                  name: "ORGANIC PERC", 
                  desc: "Hundreds of unique foley and percussion hits to give your bounce an unmistakable identity.",
                  detail: "Foley sounds from glass, wood, and metal, processed through a modular rig for unique rhythmic foundations. This is the secret to getting a unique 'pocket' in your drum patterns."
                }
              ].map((kit, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="w-full max-w-4xl py-24 px-10 mb-32 bg-white/[0.03] border border-white/5 rounded-[3.5rem] flex flex-col items-center text-center group hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 shadow-2xl relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="mb-12 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/5 text-amber-500 rounded-3xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 shadow-lg mb-8 border border-white/5">
                      <Music2 size={36} />
                    </div>
                    <span className="px-6 py-2 bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-[0.4em] rounded-full border border-amber-500/20 mb-6">
                      KIT 0{i+1} • PRO SPEC
                    </span>
                    <h3 className="text-4xl md:text-6xl font-display font-black uppercase italic mb-6 tracking-tighter text-center">{kit.name}</h3>
                  </div>

                  <div className="max-w-2xl mx-auto space-y-8">
                    <p className="text-white text-lg md:text-xl font-bold leading-tight uppercase tracking-tight text-center">{kit.desc}</p>
                    <div className="w-12 h-[1px] bg-white/10 mx-auto"></div>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium text-center">{kit.detail}</p>
                  </div>

                  <div className="mt-16 pt-12 border-t border-white/5 w-full flex flex-wrap justify-center gap-8">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      <Check size={14} className="text-amber-500" /> Analog Summed
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      <Check size={14} className="text-amber-500" /> 24-Bit / 96kHz
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      <Check size={14} className="text-amber-500" /> Phase Aligned
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="pricing-stack" className="py-48 px-6 bg-black/60 relative overflow-hidden backdrop-blur-md">
          <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center">
            <div className="grid lg:grid-cols-2 gap-32 items-center w-full max-w-6xl">
                <div className="space-y-16 flex flex-col items-center lg:items-start">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                        <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[10px]">The Producer Protocol</span>
                        <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-[0.8] tracking-tighter">TOTAL <br/> <span className="text-white/20">STORY</span></h2>
                    </div>

                    <div className="space-y-3 w-full max-w-md">
                        {[
                            { name: "01. CORE ANALOG COLLECTION (6 KITS)", val: "INCLUDED" },
                            { name: "02. MASTERCLASS (12HR TECHNICAL)", val: "INCLUDED" },
                            { name: "03. PRIVATE MIDI VAULT ACCESS", val: "INCLUDED" },
                            { name: "04. PLACEMENT MIXING TEMPLATES", val: "INCLUDED" },
                            { name: "05. LIFETIME REPOSITORY UPDATES", val: "LIFETIME" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex justify-between items-center py-4 border-b border-white/5 group hover:bg-white/[0.02] transition-all px-2"
                            >
                                <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-slate-500 group-hover:text-white transition-colors">{item.name}</span>
                                <span className="text-amber-500/60 font-mono text-[9px] font-black group-hover:text-amber-500">{item.val}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[3rem] p-16 md:p-20 text-black text-center shadow-3xl relative w-full max-w-lg"
                    >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-black text-white rounded-full font-black uppercase tracking-[0.3em] text-[9px] shadow-2xl whitespace-nowrap border border-white/10">
                            OFFICIAL LICENSE TIER
                        </div>
                        
                        <div className="flex flex-col mb-16 items-center">
                            <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] mb-8 italic">Commercial Entry Point</span>
                            
                            <div className="flex items-center justify-center gap-6">
                                <span className="text-7xl md:text-9xl font-display font-black italic leading-none tracking-tighter">€47</span>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                                Single-user license. Includes all project files and commercial usage rights.
                            </p>
                            
                            <div className="flex justify-center w-full py-2">
                                <ShopifyBuyButton nodeId="product-component-stack" buttonText="SECURE MY ACCESS" />
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-3 opacity-20 hover:opacity-100 transition-opacity">
                            <ShieldCheck size={14} />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em]">Shopify Certified Encrypted</span>
                        </div>
                    </motion.div>
                </div>
            </div>
          </div>
        </section>

        <footer className="py-32 border-t border-white/5 text-center flex flex-col items-center bg-black/80 backdrop-blur-md">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-display font-black italic uppercase tracking-tighter mb-4">WARM<span className="text-amber-500">CODE</span></h3>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.6em] mb-12">WZZPTOM PRODUCTION • ARCHITECTURAL AUDIO</p>
          </div>
        </footer>
      </div>
    );
  }

  // Standard product detail view logic...
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex flex-col items-center">
      <div className="container mx-auto max-w-6xl flex flex-col items-center">
        <div className="w-full flex justify-start mb-16">
            <button 
                onClick={() => navigate('/sound-kits')}
                className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors font-black uppercase tracking-[0.3em] text-[10px]"
            >
                <ArrowLeft size={16} /> Return To Inventory
            </button>
        </div>

        <div className="grid md:grid-cols-2 gap-24 w-full items-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col"
            >
                <div className="aspect-square w-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-3xl relative group mb-12">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 w-full">
                    <h3 className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px] mb-10 flex items-center gap-3">
                        <Download size={14} className="text-electric-blue" /> Specification List
                    </h3>
                    <div className="space-y-5">
                        {product.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-1.5 h-1.5 bg-electric-blue/20 rounded-full group-hover:bg-electric-blue transition-colors" />
                                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-start"
            >
                <div className="mb-16">
                    <span className="text-electric-blue font-black tracking-[0.5em] text-[10px] uppercase mb-6 block opacity-60">{product.type}</span>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-10 leading-[0.9] tracking-tighter uppercase italic">{product.name}</h1>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">{product.description}</p>
                </div>
                
                <div className="bg-white/[0.03] rounded-[2.5rem] p-12 border border-white/5 w-full">
                    <div className="flex justify-between items-center mb-12">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Commercial License</span>
                        <span className="text-4xl font-display font-black text-white italic">€{product.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="w-full py-4 border-t border-white/5 mt-4">
                        <ShopifyBuyButton nodeId={`product-component-${product.id}`} buttonText="PURCHASE LICENSE" />
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 text-[9px] text-slate-700 font-black uppercase tracking-[0.3em] pt-12">
                        <ShieldCheck size={14} />
                        <span>Identity Protected Checkout</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
