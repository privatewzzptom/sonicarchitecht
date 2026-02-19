
import React from 'react';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  openLegal: (type: 'terms' | 'privacy' | 'licensing') => void;
}

const Footer: React.FC<FooterProps> = ({ openLegal }) => {
  const navigate = useNavigate();

  return (
    <footer id="footer" className="bg-premium-black pt-32 pb-12 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <div className="mb-12 md:mb-0 max-w-md">
            <h2 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">WZZPTOM</h2>
            <p className="text-slate-500 text-lg mb-8">
              Billboard Charting Producer. Providing high quality industry level sounds for the next generation of hitmakers.
            </p>
            <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 text-violet-400 font-bold hover:text-white transition-colors border-b border-violet-400/30 hover:border-white pb-1">
              info@wzzptom.com
            </button>
          </div>
          
          <div className="flex gap-4">
            <a href="https://instagram.com/wzzptom" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-black hover:bg-white hover:border-white transition-all hover:-translate-y-2 duration-300">
              <Instagram size={24} />
            </a>
            <a href="https://www.youtube.com/@wzzptom" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all hover:-translate-y-2 duration-300">
              <Youtube size={24} />
            </a>
            <a href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black hover:border-slate-700 transition-all hover:-translate-y-2 duration-300">
              <Twitter size={24} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 font-medium">
          <div className="flex gap-6 mb-4 md:mb-0">
             <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
             <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">Services</button>
             <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">FAQ</button>
          </div>
          <p>&copy; {new Date().getFullYear()} Wzzptom Productions. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <button onClick={() => openLegal('terms')} className="hover:text-violet-400 transition-colors uppercase tracking-wider text-xs">Terms of Service</button>
            <button onClick={() => openLegal('privacy')} className="hover:text-violet-400 transition-colors uppercase tracking-wider text-xs">Privacy Policy</button>
            <button onClick={() => openLegal('licensing')} className="hover:text-violet-400 transition-colors uppercase tracking-wider text-xs">Licensing Info</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
