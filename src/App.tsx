/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider, useAuth } from './AuthProvider';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { useState, useEffect } from 'react';

function AppContent() {
  const { session, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  // If loading, show splash screen
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center gradient-futuristic relative overflow-hidden">
        <div className="absolute inset-0 noise-bg pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="w-20 h-20 bg-white text-[#020617] rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-bounce">
            MN
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-white font-display font-black text-2xl tracking-tighter uppercase">NeuralNotes</h2>
            <div className="flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Sync</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Routing
  if (session) {
    return <Dashboard />;
  }

  if (showAuth) {
    return <Auth onBack={() => setShowAuth(false)} />;
  }

  return <LandingPage onAuth={() => setShowAuth(true)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
