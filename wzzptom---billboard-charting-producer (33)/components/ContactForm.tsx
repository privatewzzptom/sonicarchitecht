
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
    initialSubject?: string;
    onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialSubject = '', onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // 🔴 ID FORMSPREE
  const FORMSPREE_ID = "mkgavdna"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setError(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setError("Oops! There was a problem submitting your form");
        }
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
        {isSuccess ? (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full py-10"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-8">Thanks for reaching out. I'll get back to you shortly.</p>
                <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-electric-blue font-bold uppercase tracking-wider text-sm hover:text-white transition-colors"
                >
                    Send another message
                </button>
            </motion.div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Name</label>
                    <input 
                        required 
                        name="name"
                        type="text" 
                        className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-white focus:border-electric-blue outline-none transition-colors placeholder:text-slate-700" 
                        placeholder="Your Name" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                    <input 
                        required 
                        name="subject"
                        type="text" 
                        defaultValue={initialSubject}
                        className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-white focus:border-electric-blue outline-none transition-colors placeholder:text-slate-700" 
                        placeholder="Inquiry Type" 
                    />
                </div>
                </div>
                <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email</label>
                <input 
                    required 
                    name="email"
                    type="email" 
                    className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-white focus:border-electric-blue outline-none transition-colors placeholder:text-slate-700" 
                    placeholder="you@example.com" 
                />
                </div>
                <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message</label>
                <textarea 
                    required 
                    name="message"
                    rows={5} 
                    className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-white focus:border-electric-blue outline-none transition-colors resize-none placeholder:text-slate-700" 
                    placeholder="Tell me about your project..."
                ></textarea>
                </div>
                <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-electric-blue text-white font-bold uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isSubmitting ? (
                    <>Sending... <Loader2 className="animate-spin" size={18} /></>
                ) : (
                    <>Send Message <Send size={18} /></>
                )}
                </button>
            </form>
        )}
    </AnimatePresence>
  );
};

export default ContactForm;
