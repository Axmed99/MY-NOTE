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
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200" />
          <p className="text-slate-400 font-medium">MyNotes</p>
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
