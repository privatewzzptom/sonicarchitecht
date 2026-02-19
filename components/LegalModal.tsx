
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalType = 'terms' | 'privacy' | 'licensing' | 'story' | null;

interface LegalModalProps {
  isOpen: boolean;
  type: LegalType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const getContent = () => {
    switch (type) {
      case 'story':
        return {
            title: 'THE WZZPTOM STORY',
            content: (
                <div className="space-y-8 text-slate-300 font-light text-lg">
                    <p>
                        <span className="text-white font-bold text-xl">I'm 17 years old, and I've been playing piano and guitar since I was a kid.</span>
                    </p>
                    <p>
                        Music isn't just a hobby for me; it's what I do every day. Starting with instruments gave me a different perspective on how melodies work before I even touched a computer.
                    </p>
                    <p>
                        I spend a massive amount of time in the studio, not just making beats, but simply trying out new sounds and experimenting. I'm always looking to invest in new gear and analog pedals to create textures that feel completely new and unique.
                    </p>
                    <div className="border-l-2 border-electric-blue pl-6 py-2 italic text-white">
                        "My work has been used by Lil Baby, Roddy Ricch, 42 Dugg, Hotboii, and many more. This comes from the endless hours I spend searching for the perfect sound and constantly expanding my sonic palette."
                    </div>
                    <p>
                        My goal is simple: to provide you with the same high-quality industry level tools that I use. Every loop and sample is a product of my personal experimentation and musical background.
                    </p>
                </div>
            )
        };
      case 'licensing':
        return {
          title: 'LICENSING INFO',
          content: (
            <div className="space-y-6 text-slate-300">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">MP3 Lease ($29.99)</h3>
                <p className="text-sm">Includes MP3 file. Sell up to 5,000 copies. 500,000 streams. Must credit Wzzptom.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">WAV Lease ($49.99)</h3>
                <p className="text-sm">Includes WAV + MP3. Sell up to 10,000 copies. 1,000,000 streams. Must credit Wzzptom.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Trackout / Unlimited ($149.99)</h3>
                <p className="text-sm">Includes Stems + WAV + MP3. Unlimited sales and streams. Great for major placements.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Exclusive Rights</h3>
                <p className="text-sm">Contact via email for exclusive rights pricing and negotiation. The beat will be removed from the store.</p>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'TERMS OF SERVICE',
          content: (
            <div className="space-y-4 text-slate-300 text-sm">
              <p>By purchasing from Wzzptom.com, you agree to the following terms:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>All purchases are final and non-refundable due to the digital nature of the products.</li>
                <li>You may not resell, re-license, or redistribute the sample files as is.</li>
                <li>You must provide credit (Prod. Wzzptom) on all released works using these files.</li>
                <li>Clearance is guaranteed for independent releases. Major label placements must be cleared directly with Wzzptom.</li>
              </ul>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'PRIVACY POLICY',
          content: (
            <div className="space-y-4 text-slate-300 text-sm">
              <p>Your privacy is important to us.</p>
              <p>We only collect information necessary to process your order (Name, Email). We do not sell your data to third parties.</p>
              <p>Payments are processed securely via Stripe/PayPal. We do not store your credit card information on our servers.</p>
            </div>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  const { title, content } = getContent();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-premium-card border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 border-b border-white/10 pb-6">
            {title}
          </h2>
          
          <div className="leading-relaxed font-light">
            {content}
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-violet-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LegalModal;
