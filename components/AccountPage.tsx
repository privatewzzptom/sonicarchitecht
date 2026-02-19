
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, LogIn, UserPlus, Mail, Lock, Loader2, AlertCircle, ShieldCheck, 
  LogOut, ShoppingBag, LayoutDashboard 
} from 'lucide-react';
import { ShopifyService } from './ShopifyService';

interface AccountPageProps {
  isLoggedIn: boolean;
  customerData: any;
  onLogin: (token: string, customer: any) => void;
  onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ isLoggedIn, customerData, onLogin, onLogout }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Stati per gli ordini (customer)
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Stati per admin metrics (da Vercel)
  const [adminMetrics, setAdminMetrics] = useState({ ordersCount: 0, totalSales: 0 });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    if (isLoggedIn && customerData) {
      if (customerData.metafield?.value === 'true' || customerData.metafield?.value === 'Vero') {
        // Fetch metriche admin da Vercel
        const fetchAdminMetrics = async () => {
          setAdminLoading(true);
          setAdminError('');
          try {
            const response = await fetch('https://newshopifybackend.vercel.app/api/admin-stats', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAdminMetrics({ 
              ordersCount: data.ordersCount || 0, 
              totalSales: data.totalSales || 0 
            });
          } catch (err: any) {
            setAdminError(err.message || 'Failed to load admin metrics.');
          } finally {
            setAdminLoading(false);
          }
        };
        fetchAdminMetrics();
      } else {
        // Fetch ordini customer
        const fetchOrders = async () => {
          setOrdersLoading(true);
          setOrdersError('');
          try {
            const token = localStorage.getItem('shopify_customer_token');
            if (!token) throw new Error('No token found');

            const ordersData = await ShopifyService.getCustomerOrders(token);
            setOrders(ordersData);
          } catch (err: any) {
            if (err.message?.includes('expired') || err.message?.includes('AccessToken')) {
              try {
                const token = localStorage.getItem('shopify_customer_token');
                const renewed = await ShopifyService.renewToken(token);
                localStorage.setItem('shopify_customer_token', renewed.accessToken);
                const ordersData = await ShopifyService.getCustomerOrders(renewed.accessToken);
                setOrders(ordersData);
              } catch (renewErr: any) {
                setOrdersError('Session expired. Please log in again.');
                onLogout();
              }
            } else {
              setOrdersError(err.message || 'Failed to load orders.');
            }
          } finally {
            setOrdersLoading(false);
          }
        };
        fetchOrders();
      }
    }
  }, [isLoggedIn, customerData, onLogout]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const auth = await ShopifyService.login(email, password);
      const customer = await ShopifyService.getCustomerDetails(auth.accessToken);
      localStorage.setItem('shopify_customer_token', auth.accessToken);
      onLogin(auth.accessToken, customer);
      setMessage('Successfully logged in!');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await ShopifyService.register(email, password, firstName, lastName);
      const auth = await ShopifyService.login(email, password);
      const customer = await ShopifyService.getCustomerDetails(auth.accessToken);
      localStorage.setItem('shopify_customer_token', auth.accessToken);
      onLogin(auth.accessToken, customer);
      setMessage('Account created successfully! Welcome.');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Try a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError('Please enter your email address first.');
    setIsLoading(true);
    setError('');
    try {
      await ShopifyService.recoverPassword(email);
      setMessage('Recovery link sent! Check your inbox (and spam folder).');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn && customerData) {
    if (customerData.metafield?.value === 'true' || customerData.metafield?.value === 'Vero') {
      // Pannello Amministratore (layout identico al vecchio)
      return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Profile Admin */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-charcoal border border-white/10 p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
                  <div className="w-24 h-24 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-electric-blue/20 group-hover:scale-110 transition-transform duration-500">
                    <User className="text-electric-blue" size={40} />
                  </div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight italic">
                    Admin {customerData.firstName}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-electric-blue/10 text-electric-blue rounded-full mt-4 border border-electric-blue/20">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Admin Access</span>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Admin Email</span>
                    <span className="text-sm text-slate-300 font-medium">{customerData.email}</span>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-3 py-5 border border-red-500/20 text-red-500/60 hover:text-red-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>

              {/* Admin Dashboard Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-charcoal border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <LayoutDashboard className="text-white" size={24} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-white uppercase italic">Admin Dashboard</h3>
                  </div>

                  {adminLoading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin text-electric-blue" size={32} />
                    </div>
                  ) : adminError ? (
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center">
                      {adminError}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="border border-white/5 p-6 rounded-2xl">
                        <h4 className="text-white font-black text-lg mb-2">Total Orders</h4>
                        <p className="text-electric-blue font-black text-4xl">{adminMetrics.ordersCount}</p>
                      </div>
                      <div className="border border-white/5 p-6 rounded-2xl">
                        <h4 className="text-white font-black text-lg mb-2">Total Sales (Last 30 Days)</h4>
                        <p className="text-electric-blue font-black text-4xl">${adminMetrics.totalSales.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    } else {
      // Pannello Customer (identico al vecchio)
      return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Profile Customer */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-charcoal border border-white/10 p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
                  <div className="w-24 h-24 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-electric-blue/20 group-hover:scale-110 transition-transform duration-500">
                    <User className="text-electric-blue" size={40} />
                  </div>
                  <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight italic">
                    {customerData.firstName} {customerData.lastName}
                  </h2>
                  <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Email</span>
                    <span className="text-sm text-slate-300 font-medium">{customerData.email}</span>
                  </div>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-3 py-5 border border-red-500/20 text-red-500/60 hover:text-red-500 font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl hover:bg-red-500/5 transition-all"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>

              {/* Customer Dashboard Content - identico al vecchio */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-charcoal border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                      <ShoppingBag className="text-white" size={24} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-white uppercase italic">Your Orders</h3>
                  </div>

                  {ordersLoading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin text-electric-blue" size={32} />
                    </div>
                  ) : ordersError ? (
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center">
                      {ordersError}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-slate-400 text-center">
                      No orders yet. Start shopping!
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order: any) => (
                        <div key={order.id} className="border border-white/5 p-6 rounded-2xl">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-white font-black text-lg mb-1">Order #{order.orderNumber}</h4>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                {new Date(order.processedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-electric-blue font-black text-lg">
                                {parseFloat(order.totalPrice.amount).toFixed(2)} {order.totalPrice.currencyCode}
                              </p>
                              <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 block">
                                {order.financialStatus} • {order.fulfillmentStatus || 'Processing'}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-slate-300 mt-4">
                            <p className="font-medium mb-2">Items:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {order.lineItems.edges.map((edge: any, i: number) => (
                                <li key={i}>
                                  {edge.node.quantity} × {edge.node.title}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {order.statusUrl && (
                            <a 
                              href={order.statusUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-6 inline-block text-electric-blue text-xs font-black uppercase tracking-widest hover:underline"
                            >
                              View order details & tracking →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-electric-blue/10 to-charcoal border border-electric-blue/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-display font-black text-white mb-3 uppercase italic tracking-tight">ROSTER EXCLUSIVE</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
                      As a registered WZZPTOM producer, you have priority access to placements snippets and beta kits. Check your dashboard weekly for updates.
                    </p>
                  </div>
                  <div className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full shadow-xl">
                    Early Access Active
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }
  }

  // Login / Registration Form (identico al vecchio)
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center bg-black">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
        <div className="bg-charcoal border border-white/10 p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-black/80">
          <div className="flex justify-center gap-4 mb-10">
            <button 
              onClick={() => setMode('login')} 
              className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${mode === 'login' ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-slate-500 hover:text-white'}`}
            >
              Sync Login
            </button>
            <button 
              onClick={() => setMode('register')} 
              className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${mode === 'register' ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-slate-500 hover:text-white'}`}
            >
              New Account
            </button>
          </div>

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <AlertCircle size={16} /> 
                {error}
              </div>
            )}
            {message && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <ShieldCheck size={16} /> 
                {message}
              </div>
            )}

            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-2">First Name</label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)} 
                    className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-electric-blue outline-none transition-all placeholder:text-slate-800" 
                    placeholder="Enter Name" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-2">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)} 
                    className="w-full bg-black border border-white/5 rounded-2xl py-4 px-6 text-white focus:border-electric-blue outline-none transition-all placeholder:text-slate-800" 
                    placeholder="Enter Last Name" 
                    required 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:border-electric-blue outline-none transition-all placeholder:text-slate-800" 
                  placeholder="producer@example.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:border-electric-blue outline-none transition-all placeholder:text-slate-800" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={handleForgotPassword} 
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] rounded-[1.25rem] hover:bg-electric-blue hover:text-white flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-xl shadow-white/5"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'
              )}
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-700">
            <ShieldCheck size={12} />
            <span className="text-[8px] font-black uppercase tracking-widest">Secured by Shopify</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountPage;
