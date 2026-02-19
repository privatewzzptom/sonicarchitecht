
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialSubject }) => {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-premium-card border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-10 shadow-2xl relative bg-charcoal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-full flex items-center justify-center">
                    <Mail className="text-electric-blue" size={20} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white">
                    Book Service
                </h2>
            </div>
            
            <p className="text-slate-400 mb-8">
                Fill out the form below to inquire about <span className="text-white font-bold">{initialSubject || 'our services'}</span>.
            </p>

            <ContactForm initialSubject={initialSubject} />

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
