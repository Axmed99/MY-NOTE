import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Mic, Image as ImageIcon, FileText, 
  CheckCircle2, Sparkles, Shield, Zap, Globe, 
  Layers, MessageSquare, Fingerprint
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onAuth: () => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-50 rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-50 rounded-full blur-[140px] opacity-30" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      {/* Modern Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-slate-100 backdrop-blur-sm bg-white/50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-50">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">MyNotes</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-500">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#security" className="hover:text-indigo-600 transition-colors">Security</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAuth}
            className="text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors cursor-pointer px-4"
          >
            Sign In
          </button>
          <button 
            onClick={onAuth}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center gap-2"
          >
            Start Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative z-10 px-6 pt-32 pb-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-8 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Revolutionizing Note-taking
            </div>
            <h1 className="text-7xl lg:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95] font-display">
              Capture <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                Pure Ideas.
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium max-w-lg">
              The only workspace designed for the speed of thought. Organize text, audio, and visual assets in a distraction-free environment.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onAuth}
                className="group bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-3 cursor-pointer active:scale-95"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex -space-x-3 overflow-hidden p-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 items-center justify-center flex text-[10px] font-bold text-slate-400">
                    JD
                  </div>
                ))}
                <div className="flex items-center justify-center h-10 px-4 text-xs font-bold text-slate-500">
                  +2.4k users joined
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative perspective-1000"
          >
            {/* Visual Glass Cards */}
            <div className="relative">
               <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[40px] blur-3xl opacity-20 animate-pulse" />
               <div className="relative glass-dark rounded-[32px] p-8 shadow-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-6 w-32 bg-white/5 rounded-full mx-auto" />
                  </div>
                  <div className="space-y-6">
                    <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                      <div className="h-32 bg-white/5 rounded-2xl border border-white/5" />
                    </div>
                    <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                        <Mic className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-2 mt-2">
                         <div className="h-2 w-full bg-white/5 rounded-full" />
                         <div className="h-2 w-2/3 bg-white/5 rounded-full opacity-50" />
                      </div>
                    </div>
                  </div>
               </div>
               
               {/* Floating Badges */}
               <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-xl border border-white flex items-center gap-4"
               >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sync Status</p>
                    <p className="text-sm font-bold text-slate-900">Encrypted & Online</p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="relative z-10 py-32 bg-slate-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-slate-900 mb-6 font-display tracking-tight">Your thinking, upgraded.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">We've reimagined how you interact with your thoughts. Faster, deeper, and more visual than ever before.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-6 h-[1000px] md:h-[800px]">
             {/* Large Bento Card */}
             <div className="md:col-span-2 md:row-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-64 h-64 text-indigo-600 -mr-20 -mt-20" />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 font-display">Infinite Knowledge Base</h3>
                  <p className="text-lg text-slate-500 font-medium max-w-md">Our rich text editor lets you create massive documents with speed and ease. Tags, links, and nested structures included.</p>
                </div>
             </div>

             {/* Small Cards */}
             <div className="bg-indigo-600 rounded-[40px] p-10 flex flex-col justify-between text-white group hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-100">
                <Mic className="w-10 h-10 opacity-60" />
                <div>
                  <h4 className="text-2xl font-bold mb-2 font-display">Voice Memos</h4>
                  <p className="text-indigo-100 font-medium text-sm leading-relaxed">Crystal clear audio recording with instant local storage.</p>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all">
                <ImageIcon className="w-10 h-10 text-blue-500 opacity-60" />
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2 font-display">Visual Assets</h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">Upload and preview high-res images directly in-line.</p>
                </div>
             </div>

             {/* Bottom row */}
             <div className="md:col-span-1 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
                <Shield className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-xl font-bold text-slate-900 font-display">Military Grade Encryption</h4>
             </div>

             <div className="md:col-span-1 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all flex flex-col justify-between">
                <Layers className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-xl font-bold text-slate-900 font-display">Smart Layering</h4>
             </div>

             <div className="md:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white flex items-center gap-8 group overflow-hidden">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2 font-display">Collaborative by Design</h4>
                  <p className="text-slate-400 text-sm font-medium">Invite your team and collaborate in real-time on any project or idea.</p>
                </div>
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-800 bg-slate-700" />)}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Security Focus */}
      <section id="security" className="relative z-10 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-indigo-600 rounded-[60px] p-12 md:p-24 text-white relative flex flex-col md:flex-row items-center gap-16 overflow-hidden">
             <div className="absolute top-0 right-0 p-24 opacity-10">
                <Shield className="w-96 h-96" />
             </div>
             
             <div className="flex-1 relative z-10">
                <h2 className="text-5xl font-black mb-8 leading-tight font-display tracking-tight">Your data is your <br /> property. Period.</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                        <Fingerprint className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2">Zero Trust Architecture</h4>
                        <p className="text-indigo-100/70 text-sm leading-relaxed">Nobody can access your notes except you. Not even us.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2">Supabase Powered</h4>
                        <p className="text-indigo-100/70 text-sm leading-relaxed">Enterprise-grade security used by companies like Netflix and Mozilla.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex-1 hidden lg:block group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-110" />
                  <div className="relative glass p-10 rounded-[40px] border-white/20 shadow-2xl skew-x-3 group-hover:skew-x-0 transition-transform duration-700">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-8">
                         <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Security Audit</span>
                         <span className="text-xs font-bold text-green-400">PASSED</span>
                      </div>
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div className="h-2 flex-1 bg-white/10 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-display">MyNotes</span>
               </div>
               <p className="text-slate-500 font-medium text-sm leading-relaxed">The only note-taking app that respects your time and your intelligence.</p>
            </div>
            
            <FooterList title="Product" items={['Features', 'Templates', 'Security', 'Pricing']} />
            <FooterList title="Support" items={['Documentation', 'Help Center', 'API Status', 'Community']} />
            <FooterList title="Legal" items={['Privacy Policy', 'Terms of Service', 'Cookie Settings']} />
          </div>
          
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-slate-400 text-sm font-medium">© 2026 MyNotes App. Reimagining the digital workspace.</p>
            <div className="flex items-center gap-6">
               <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"><Globe className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"><Zap className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"><Shield className="w-5 h-5" /></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterList({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">{title}</h5>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item}><a href="#" className="text-slate-500 text-sm font-medium hover:text-indigo-600 transition-colors">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}
