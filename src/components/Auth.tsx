import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Mail, Lock, User, Github, Chrome, AlertCircle, Loader2 } from 'lucide-react';
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
        
        // Handle successful signup
        if (data.user) {
          setSuccessMessage('Your account has been created. Please check your email and verify your address before logging in.');
          setIsLogin(true); // Switch to login view
          // Password is cleared automatically by state, but email is preserved
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* ... (Visual Side remains the same) ... */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[120px] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xl">M</div>
            <span className="text-xl font-bold tracking-tight">MyNotes</span>
          </div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Join the community of <br /> organized thinkers.
          </h2>
          <p className="text-indigo-100 text-lg max-w-md">"Your mind is for having ideas, not holding them." — Get started today for free.</p>
        </div>
        
        <div className="relative z-10 flex gap-12 text-sm font-medium text-indigo-100/60">
          <span>© 2026 MyNotes</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-8 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to landing
          </button>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h1>
            <p className="text-slate-500">
              {isLogin ? "Enter your credentials to access your notes." : "Get started with your free account."}
            </p>
          </div>

          {(error || successMessage) && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border",
                successMessage ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
              )}
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error || successMessage}
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {/* ... (Form inputs remain basically the same but tied to state) ... */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required={!isLogin} className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all" />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                {isLogin && <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-medium" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white rounded-xl py-3.5 font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer mt-2">{loading && <Loader2 className="w-5 h-5 animate-spin" />}{isLogin ? 'Sign In' : 'Create Account'}</button>
          </form>
          {/* ... (Footer remains same) ... */}
          <p className="mt-10 text-center text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(null); setSuccessMessage(null); }} className="text-indigo-600 font-bold hover:text-indigo-700 cursor-pointer">{isLogin ? 'Sign Up' : 'Log In'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}
