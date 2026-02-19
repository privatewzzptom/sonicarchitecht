
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-display font-bold text-white mb-6">GET IN TOUCH</h1>
            <p className="text-slate-400 text-lg mb-12">
              Interested in exclusive rights, executive production, or just want to connect? 
              Fill out the form and I'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-electric-blue group-hover:bg-electric-blue/10 transition-all">
                  <Mail className="text-electric-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Email</h3>
                  <p className="text-slate-500 group-hover:text-white transition-colors">info@wzzptom.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <MapPin className="text-electric-blue" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Studio</h3>
                  <p className="text-slate-500">Italy</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-charcoal p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
