
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AboutProps {
    openStory: () => void;
}

const Counter: React.FC<{ from: number; to: number; duration?: number }> = ({ from, to, duration = 2 }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        const node = nodeRef.current;
        if (!node || !inView) return;

        const controls = animate(from, to, {
            duration: duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(value) {
                node.textContent = value.toFixed(0);
            }
        });

        return () => controls.stop();
    }, [from, to, duration, inView]);

    return <span ref={nodeRef}>{from}</span>;
};

const About: React.FC<AboutProps> = ({ openStory }) => {
  return (
    <section id="about" className="py-40 relative z-10 overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 md:order-1"
          >
             <div className="aspect-[4/5] bg-white/[0.02] overflow-hidden rounded-[2.5rem] relative group border border-white/10 shadow-3xl">
                <img 
                    src="https://scontent.cdninstagram.com/v/t51.82787-15/553923331_17963355008980093_5356185360735427364_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzcyOTUxMDk2Mzg0NzQzMzQxOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=JjJYkprhOE4Q7kNvwGU-b5M&_nc_oc=Admyrar3PvzPKK3t0hZrJOflnxHuCDM4RoPl15YHvF1ynMczX00HwoZ-zYJjigj1leg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=FN7bT52DY7W-F8Sn8g6OTg&oh=00_AfitvO-EOkQww0Ozw76q2NjwUM4tebuQ5hcEDFALizNLSQ&oe=692D1A2B" 
                    alt="Wzzptom Portfolio" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
             </div>
             {/* Architectural Accent */}
             <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-white/20 rounded-tl-[3rem] -z-10" />
          </motion.div>

          <div className="order-1 md:order-2 flex flex-col items-start">
             <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-electric-blue font-black tracking-[0.5em] uppercase text-[10px] mb-10 block opacity-80"
             >
                The Visionary Behind the Sound
             </motion.span>
             
             <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-10 leading-[0.9] tracking-tighter uppercase italic">
                7 Years. <br/>
                <span className="text-white/20">The Evolution.</span>
             </h2>

             <div className="space-y-8 text-slate-500 font-medium text-lg leading-relaxed mb-12 max-w-lg">
                <p>
                    Rooted in classical piano and guitar, I bridge the gap between organic composition and modern synthesis. Every placement is a result of obsessive sound design.
                </p>
                <p className="text-white/80 italic text-base">
                    "I don't just provide beats; I design sonic atmospheres that define the next generation of trap and R&B."
                </p>
             </div>

             <button 
                onClick={openStory}
                className="group flex items-center gap-6 text-white text-[11px] font-black uppercase tracking-[0.4em] hover:text-electric-blue transition-all"
             >
                The Narrative <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
             </button>

             <div className="mt-20 flex gap-16 border-t border-white/5 pt-12 w-full">
                <div>
                    <h3 className="text-5xl font-display font-black text-white tracking-tighter italic">
                        <Counter from={0} to={7} />
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black mt-3">Years Active</p>
                </div>
                <div>
                    <h3 className="text-5xl font-display font-black text-white tracking-tighter italic">
                        <Counter from={0} to={100} duration={3} />+
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-black mt-3">Industry Placements</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
