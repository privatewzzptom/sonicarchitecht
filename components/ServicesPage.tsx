import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, Mic2, Sliders, Music } from 'lucide-react';

interface ServicesPageProps {
    onBook: (serviceName: string) => void;
}

const TiltCard: React.FC<{ service: any, idx: number, onBook: (s: string) => void }> = ({ service, idx, onBook }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;
    x.set(mouseXRelative / width - 0.5);
    y.set(mouseYRelative / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="bg-charcoal border border-white/5 rounded-3xl p-10 flex flex-col h-full relative group perspective-1000 cursor-default"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="mb-8 p-4 bg-obsidian rounded-2xl w-fit border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-lg">
          {service.icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">{service.title}</h3>
        <p className="text-3xl font-mono text-electric-blue font-bold mb-8">{service.price}</p>
        <ul className="space-y-4 mb-10 flex-grow">
          {service.features.map((feat: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
              <Check size={16} className="text-electric-blue shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
        <button 
          onClick={() => onBook(service.title)}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-electric-blue hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
        >
          Book Now
        </button>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-electric-blue/10 pointer-events-none"></div>
    </motion.div>
  );
};

const ServicesPage: React.FC<ServicesPageProps> = ({ onBook }) => {
  const services = [
    {
      title: "Mixing & Mastering",
      price: "Contact",
      icon: <Sliders className="w-8 h-8 text-electric-blue" />,
      features: ["High Quality Industry Level Loudness", "Vocal Correction (Auto-Tune)", "Analog Processing", "48h Turnaround", "3 Revisions"]
    },
    {
      title: "Custom Beat",
      price: "€500",
      icon: <Music className="w-8 h-8 text-electric-blue" />,
      features: ["Custom vibes", "Tailored to your style", "Unlimited Stems", "Mix included", "1-on-1 Consultation"]
    },
    {
      title: "Executive Production",
      price: "Contact",
      icon: <Mic2 className="w-8 h-8 text-electric-blue" />,
      features: ["Full Project Oversight", "Recording Sessions", "Feature Arrangements", "Album Sequencing", "Industry Guidance"]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">SERVICES</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Take your sound to the next level. Professional engineering and production services tailored to major label standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <TiltCard key={idx} service={service} idx={idx} onBook={onBook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;