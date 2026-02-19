
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu, Radio } from 'lucide-react';

const SpotlightCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, idx: number }> = ({ icon, title, desc, idx }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="p-12 md:p-16 flex flex-col items-center text-center group relative overflow-hidden transition-all duration-700"
    >
      {/* Refined Spotlight Effect */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [x, y],
            ([xVal, yVal]) => `radial-gradient(400px circle at ${xVal}px ${yVal}px, rgba(59, 130, 246, 0.04), transparent)`
          )
        }}
      />
      
      <div className="mb-10 text-white/40 group-hover:text-electric-blue group-hover:scale-110 transition-all duration-700 relative z-10">
        {icon}
      </div>
      <h3 className="text-lg font-black text-white uppercase tracking-[0.2em] mb-4 relative z-10 italic">{title}</h3>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-[240px] leading-relaxed relative z-10">{desc}</p>
    </motion.div>
  );
};

const ValueProp: React.FC = () => {
  const values = [
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "Major Protocol",
      desc: "Mixed & mastered to major label loudness standards."
    },
    {
      icon: <Cpu size={32} strokeWidth={1.5} />,
      title: "Analog Flow",
      desc: "Processed through Neve preamps and vintage tube circuitry."
    },
    {
      icon: <Radio size={32} strokeWidth={1.5} />,
      title: "Seamless Sync",
      desc: "Drag and drop formatted for immediate workflow."
    }
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.01] backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {values.map((val, i) => (
            <SpotlightCard key={i} {...val} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
