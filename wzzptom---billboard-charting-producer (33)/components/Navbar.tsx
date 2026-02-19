
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, User, LogIn, ShoppingBag, HardDrive, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  customerName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout, customerName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sound Kits', path: '/sound-kits' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const loggedOutLinks = [
    { name: 'Login / Sign Up', icon: <LogIn size={16} />, path: '/account', isExternal: false },
  ];

  const loggedInLinks = [
    { name: 'My Dashboard', icon: <LayoutDashboard size={16} />, path: '/account', isExternal: false },
    { name: 'Order History', icon: <ShoppingBag size={16} />, href: 'https://wzzptom-production.myshopify.com/account', isExternal: true },
    { name: 'Digital Vault', icon: <HardDrive size={16} />, href: 'https://shopify.com/94687068540/account', isExternal: true },
  ];

  const isActive = (path: string) => {
      if (path === '/' && location.pathname !== '/') return false;
      return location.pathname.startsWith(path);
  };

  const handleLinkClick = (link: any) => {
    setIsAccountDropdownOpen(false);
    if (link.isExternal) {
      window.open(link.href, '_blank');
    } else {
      navigate(link.path);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-6 px-6 pointer-events-none`}>
        <div className={`pointer-events-auto transition-all duration-500 ${
          isScrolled 
            ? 'w-full max-w-5xl glass-panel rounded-full px-6 py-3 shadow-2xl shadow-black/50' 
            : 'w-full max-w-7xl bg-transparent py-4'
        }`}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border border-white/20 group-hover:border-electric-blue transition-colors"
                 />
                 <div className="w-2 h-2 bg-white rounded-full group-hover:bg-electric-blue transition-colors shadow-[0_0_100px_rgba(59,130,246,0.8)]"></div>
              </div>
              <span className="font-display font-bold text-lg tracking-widest text-white group-hover:text-electric-blue transition-colors">
                WZZPTOM
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors relative group overflow-hidden ${
                      isActive(link.path)
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-electric-blue transform transition-transform duration-300 ${
                      isActive(link.path)
                      ? 'translate-x-0' 
                      : '-translate-x-full group-hover:translate-x-0'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-all group relative"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all border border-white/10 relative">
                  <User size={16} />
                  {isLoggedIn && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                  )}
                </div>
                <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white">
                  {isLoggedIn ? (customerName || 'Member') : 'Account'}
                </span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown Menu */}
              <AnimatePresence>
                {isAccountDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-4 w-64 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-2 z-[60]"
                  >
                    <div className="px-4 py-3 mb-2 border-b border-white/5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {isLoggedIn ? `Welcome Back, ${customerName}` : 'Customer Portal'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      {(isLoggedIn ? loggedInLinks : loggedOutLinks).map((link, i) => (
                        <button
                          key={i}
                          onClick={() => handleLinkClick(link)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group text-left"
                        >
                          <span className="text-slate-500 group-hover:text-electric-blue transition-colors">
                            {link.icon}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
                        </button>
                      ))}

                      {isLoggedIn && (
                        <button
                          onClick={() => { onLogout(); setIsAccountDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all group text-left mt-2 border-t border-white/5 pt-4"
                        >
                          <LogOut size={16} />
                          <span className="text-xs font-bold uppercase tracking-widest">Log Out</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden pt-32 px-6"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-display font-bold transition-colors ${
                      isActive(link.path) ? 'text-electric-blue' : 'text-white hover:text-electric-blue'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-[1px] bg-white/5 my-4"></div>
              {(isLoggedIn ? loggedInLinks : loggedOutLinks).map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleLinkClick(link)}
                  className="text-xl font-display font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-3"
                >
                  {link.icon} {link.name}
                </button>
              ))}
              {isLoggedIn && (
                <button
                   onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                   className="text-xl font-display font-bold text-red-500 transition-colors flex items-center gap-3"
                >
                  <LogOut size={20} /> Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
