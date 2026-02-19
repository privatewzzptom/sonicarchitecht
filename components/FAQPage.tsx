
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Are the samples royalty free?",
      a: "Yes, for independent releases (under 1 million streams). For major label placements, clearance must be negotiated. All drum kits are 100% royalty free."
    },
    {
      q: "How do I receive my files?",
      a: "Payhip will make the download available immediately after purchase. You will also receive an email with the download link."
    },
    {
      q: "What DAW do these work in?",
      a: "All files are universal WAV format and work in FL Studio, Ableton, Logic Pro, Pro Tools, and any other DAW."
    },
    {
      q: "Can I get a refund?",
      a: "Due to the digital nature of the products, all sales are final. If you have a corrupted file, contact support for a replacement."
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6">
            <HelpCircle className="text-electric-blue w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">FAQ</h1>
          <p className="text-slate-400">Frequently asked questions about licensing and usage.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-charcoal border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold text-white">{faq.q}</span>
                {openIndex === idx ? <Minus className="text-electric-blue" /> : <Plus className="text-slate-500" />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;