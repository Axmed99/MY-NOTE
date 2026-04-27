import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Mail, Lock, User, Github, Chrome, AlertCircle, Loader2, Sparkles, Terminal, Shield, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthProps {
  onBack: () => void;
}

export default function Auth({ onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (signUpError) throw signUpError;
        
        if (data.user) {
          setSuccessMessage('Access request processed. Verify neural link via email.');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Transmission error detected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-futuristic flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background Noise */}
      <div className="absolute inset-0 noise-bg pointer-events-none z-0" />

      {/* Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Visual Side (Left) */}
      <div className="hidden md:flex md:w-5/12 p-20 flex-col justify-between relative z-10 text-white border-r border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-4 mb-24 group cursor-pointer" onClick={onBack}>
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center font-black text-2xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              MN
            </div>
            <span className="text-3xl font-display font-black tracking-tighter uppercase leading-none">NeuralNotes</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-7xl font-display font-black leading-[0.8] mb-12 uppercase tracking-tighter">
              Join the <br />
              <span className="neon-text-purple">Collective.</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-sm font-medium leading-relaxed opacity-70">
              Synchronize your neural fragments across the infinite mesh. Secure, encrypted, and built for speed.
            </p>
          </motion.div>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 max-w-xs backdrop-blur-sm">
             <Shield className="w-8 h-8 text-green-400" />
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Post-Quantum Encryption Hub <span className="text-green-400">Online</span></p>
          </div>

          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
            <span className="hover:text-white cursor-pointer transition-colors">Fragment Protocol</span>
            <span className="hover:text-white cursor-pointer transition-colors">Neural Policy</span>
          </div>
        </div>
      </div>

      {/* Auth Content (Right) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-500 hover:text-white transition-all mb-12 cursor-pointer font-black text-[10px] uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            Back to Interface
          </button>

          <div className="mb-12">
            <h1 className="text-5xl font-display font-black text-white mb-4 uppercase tracking-tight">
              {isLogin ? 'Access Hub' : 'Construct Entry'}
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              {isLogin ? "Provide credentials for neural handshake." : "Establishing your unique hub parameters."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {(error || successMessage) && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={cn(
                  "p-6 rounded-3xl mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border backdrop-blur-2xl",
                  successMessage ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error || successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Individual Identity</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    placeholder="E.G. NEURAL_ENTITY_01" 
                    required={!isLogin} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 focus:bg-white/10 transition-all font-bold placeholder:text-slate-700 uppercase text-xs tracking-widest" 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Network Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="NAME@PROTOCOL.COM" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 focus:bg-white/10 transition-all font-bold placeholder:text-slate-700 uppercase text-xs tracking-widest" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Key</label>
                {isLogin && (
                  <button type="button" className="text-[9px] font-black text-purple-400 hover:text-purple-300 uppercase tracking-widest transition-colors">
                    Reset Protocol
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                  minLength={6} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 focus:bg-white/10 transition-all font-bold placeholder:text-slate-700 text-xs" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-white text-black rounded-3xl py-5 font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 cursor-pointer mt-8 disabled:opacity-30 group"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" strokeWidth={3} />}
              {isLogin ? 'Initiate Access' : 'Authorize Identity'}
            </button>
          </form>

          <footer className="mt-16 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              {isLogin ? "New user recognized?" : "Identify detected in database?"}{' '}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(null); setSuccessMessage(null); }} 
                className="text-white font-black hover:text-purple-400 transition-colors cursor-pointer ml-2 border-b border-white/20 hover:border-purple-400 pb-1"
              >
                {isLogin ? 'Create Hub' : 'Return to Entry'}
              </button>
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
