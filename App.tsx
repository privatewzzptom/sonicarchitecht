
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Credits from './components/Credits';
import About from './components/About';
import ValueProp from './components/ValueProp';
import Footer from './components/Footer';
import LegalModal, { LegalType } from './components/LegalModal';
import ContactModal from './components/ContactModal';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import FAQPage from './components/FAQPage';
import SoundKitsPage from './components/SoundKitsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import AccountPage from './components/AccountPage';
import { Product } from './types';
import Ticker from './components/Ticker';
import { ShopifyService } from './components/ShopifyService';
import { Loader2 } from 'lucide-react';

const PRODUCTS: Product[] = [
    {
      id: 'autumn-v1',
      name: "AUTUMN COLLECTION V1",
      type: "Sample Kit",
      price: 49.99,
      description: "The definitive collection for the season. Dark, moody, and intricate melodies inspired by the changing weather.",
      image: "https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1jatonpv9ahau3gi7m1e7s69p1a.png", 
      features: [
        "14 Original Loops",
        "+130 Stems Included (WAV)",
        "More Than 2GB Of Sounds",
        "BPM & Key Labelled",
        "Send labs to an apposite mail",
        "100% Royalty Free for Independent Releases"
      ]
    },
    {
      id: 'warmcode-v1',
      name: "WARMCODE PRODUCTION SUITE",
      type: "Sample Kit",
      price: 47.00,
      description: "BUILT TO REPLACE EVERY COLD, STERILE SOUND FOLDER YOU’VE BEEN SETTLING FOR. Over 6 months of analog processing and sound design.",
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop", 
      features: [
        "6 Exclusive Kits",
        "3,000+ Analog One-Shots",
        "Live Recorded Percussion",
        "MIDI Vault & Templates",
        "12hr Production Masterclass"
      ]
    }
];

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-full flex-1 flex flex-col"
  >
    {children}
  </motion.div>
);

const AnimatedBackground = ({ theme }: { theme: 'default' | 'autumn' }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']); 
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']); 
  const isAutumn = theme === 'autumn';

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black">
      <motion.div 
        style={{ y: y1 }}
        className={`absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] transition-colors duration-1000 ${isAutumn ? 'bg-orange-500/25' : 'bg-blue-900/20'}`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ y: y2 }}
        className={`absolute bottom-[-10%] right-[-10%] w-[65vw] h-[65vw] rounded-full blur-[150px] transition-colors duration-1000 ${isAutumn ? 'bg-amber-500/20' : 'bg-cyan-900/15'}`}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};

const App: React.FC = () => {
  const [legalModalType, setLegalModalType] = useState<LegalType>(null);
  const [contactModal, setContactModal] = useState<{isOpen: boolean; subject: string}>({ isOpen: false, subject: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  const location = useLocation();
  // Include warmcode-v1 in the "autumn" theme logic for orange background
  const isWarmPage = location.pathname.includes('autumn-v1') || location.pathname.includes('warmcode-v1');
  const currentTheme = isWarmPage ? 'autumn' : 'default';

  // Persistence check on boot
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('shopify_customer_token');
      if (token) {
        try {
          const customer = await ShopifyService.getCustomer(token);
          if (customer) {
            setCustomerData(customer);
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        } catch (e) {
          console.error("Auth validation failed", e);
          handleLogout();
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogin = (token: string, customer: any) => {
    localStorage.setItem('shopify_customer_token', token);
    setCustomerData(customer);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('shopify_customer_token');
    setCustomerData(null);
    setIsLoggedIn(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-electric-blue" size={40} />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Initializing Session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-50 font-sans relative selection:bg-electric-blue selection:text-white overflow-x-hidden">
      <AnimatedBackground theme={currentTheme} />
      
      <div className="relative z-50">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} customerName={customerData?.firstName} />
          <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
          <ContactModal 
            isOpen={contactModal.isOpen}
            onClose={() => setContactModal(prev => ({ ...prev, isOpen: false }))}
            initialSubject={contactModal.subject}
          />
      </div>
      
      <main className="relative z-10 flex flex-col min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                  <PageWrapper>
                      <Hero />
                      <Ticker />
                      <Credits />
                      <ValueProp />
                      <About openStory={() => setLegalModalType('story')} />
                  </PageWrapper>
              } />
              <Route path="/services" element={<PageWrapper><ServicesPage onBook={(s) => setContactModal({isOpen: true, subject: s})} /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
              <Route path="/sound-kits" element={<PageWrapper><SoundKitsPage products={PRODUCTS} /></PageWrapper>} />
              <Route path="/sound-kits/:id" element={<PageWrapper><ProductDetailsPage products={PRODUCTS} /></PageWrapper>} />
              <Route path="/account" element={
                  <PageWrapper>
                      <AccountPage 
                          isLoggedIn={isLoggedIn} 
                          customerData={customerData}
                          onLogin={handleLogin} 
                          onLogout={handleLogout} 
                      />
                  </PageWrapper>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer openLegal={(t) => setLegalModalType(t)} />
    </div>
  );
};

export default App;
