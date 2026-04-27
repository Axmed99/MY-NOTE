import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Mic, Image as ImageIcon, FileText, 
  CheckCircle2, Sparkles, Shield, Zap, Globe, 
  Layers, MessageSquare, Fingerprint, Sparkle,
  Crown, Cpu, Zap as ZapIcon, Terminal, Lock
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onAuth: () => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  return (
    <div className="min-h-screen gradient-futuristic text-slate-100 overflow-hidden font-sans relative">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 noise-bg pointer-events-none z-0" />

      {/* Dynamic Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-5%] right-[-5%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[140px]" 
        />
      </div>

      {/* Futuristic Navigation */}
      <nav className="relative z-[100] px-8 py-6 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="text-3xl font-display font-black tracking-tighter text-white">NeuralNotes</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/5 shadow-2xl">
          {['Features', 'Intelligence', 'Security', 'Pricing'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button 
            onClick={onAuth}
            className="text-slate-400 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer px-4"
          >
            Access Terminal
          </button>
          <button 
            onClick={onAuth}
            className="bg-white text-[#020617] px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer flex items-center gap-3 group"
          >
            Initialize
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-40 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Next-Gen Data Architecture
            </div>
            
            <h1 className="text-8xl lg:text-[10rem] font-display font-black tracking-tighter text-white mb-10 leading-[0.8] uppercase">
              Capture <br />
              <span className="neon-text-purple">Intel.</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium max-w-lg opacity-80 decoration-white/20">
              Transform fleeting thoughts into permanent neural fragments. The premier data workspace for elite researchers and high-output thinkers.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <button 
                onClick={onAuth}
                className="group bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-5 rounded-[2.5rem] text-xs font-black uppercase tracking-[0.3em] hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all flex items-center gap-4 cursor-pointer active:scale-95 shadow-2xl"
              >
                Create Hub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center gap-4 py-2 px-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-xl border border-[#020617] bg-slate-800" />
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span className="text-white">+4k</span> Nodes Active
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Visual Glass UI Mockup */}
            <div className="relative group">
               <div className="absolute -inset-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-[5rem] blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
               
               <div className="relative glass-panel rounded-[4rem] p-12 shadow-2xl border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-red-500/30" />
                      <div className="w-4 h-4 rounded-full bg-yellow-500/30" />
                      <div className="w-4 h-4 rounded-full bg-green-500/30" />
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">SYSTEM_SYNC [v4.2]</p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="h-48 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group/item">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                      </div>
                      <div className="h-48 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group/item">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/10">
                      <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-black shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                        <Mic className="w-7 h-7" />
                      </div>
                      <div className="flex-1 space-y-3">
                         <div className="h-1.5 w-full bg-white/10 rounded-full" />
                         <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                      </div>
                    </div>
                  </div>
               </div>
               
               {/* Floating Data Badges */}
               <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 glass-card p-8 rounded-[2.5rem] border-white/10 flex items-center gap-5 shadow-2xl backdrop-blur-3xl"
               >
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 border border-green-500/20">
                    <Fingerprint className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Encrypted</p>
                    <p className="text-lg font-display font-black text-white uppercase tracking-tight leading-none">Identity Masked</p>
                  </div>
               </motion.div>

               <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-12 glass-card p-6 rounded-[2rem] border-white/10 flex items-center gap-4 backdrop-blur-3xl"
               >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <ZapIcon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none">Instant Latency</p>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features - Revamped */}
      <section id="features" className="relative z-10 py-56">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-7xl font-display font-black text-white mb-8 tracking-tighter uppercase leading-tight">Neural Upgrade <br /><span className="neon-text-purple">Sequence.</span></h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium opacity-70">A complete reimagining of thoughts. Faster, deeper, and more visual than any legacy platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
             {/* Main Hub Card */}
             <div className="md:col-span-2 lg:col-span-2 bg-white/[0.03] rounded-[3.5rem] p-12 border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 overflow-hidden opacity-0 group-hover:opacity-10 transition-all scale-150 rotate-12">
                  <Cpu className="w-64 h-64 text-purple-400" />
                </div>
                <div className="relative z-10 text-left">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center text-purple-400 mb-10 border border-purple-500/20">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-display font-black text-white mb-6 uppercase tracking-tight">System Core Hub</h3>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-sm opacity-70">Advanced rich text engine designed for rapid synchronization and multi-threaded data mapping.</p>
                </div>
             </div>

             <div className="md:col-span-1 lg:col-span-1 bg-pink-500/5 rounded-[3.5rem] p-10 flex flex-col justify-between border border-pink-500/10 group hover:border-pink-500/30 transition-all">
                <div className="w-16 h-16 bg-pink-500/10 rounded-[1.5rem] flex items-center justify-center text-pink-400 shadow-inner group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-black text-white mb-3 uppercase tracking-tight">Audio Fragment</h4>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] leading-relaxed">Encrypted vocal transmission with local cache priority.</p>
                </div>
             </div>

             <div className="md:col-span-1 lg:col-span-1 bg-blue-500/5 rounded-[3.5rem] p-10 flex flex-col justify-between border border-blue-500/10 group hover:border-blue-500/30 transition-all">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-black text-white mb-3 uppercase tracking-tight">Visual Proxy</h4>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] leading-relaxed">High-fidelity asset ingestion with instant neural preview.</p>
                </div>
             </div>

             <div className="md:col-span-1 bg-white/[0.02] rounded-[3rem] p-10 border border-white/5 hover:border-white/20 transition-all">
                <Terminal className="w-10 h-10 text-orange-400 mb-6" />
                <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-2">CLI Integrated</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Power users only</p>
             </div>

             <div className="md:col-span-1 bg-white/[0.02] rounded-[3rem] p-10 border border-white/5 hover:border-white/20 transition-all">
                <Lock className="w-10 h-10 text-green-400 mb-6" />
                <h4 className="text-xl font-display font-black text-white uppercase tracking-tight mb-2">Vault Protocol</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Post-quantum safety</p>
             </div>

             <div className="md:col-span-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[3.5rem] p-10 border border-white/5 flex items-center gap-10 group overflow-hidden relative">
                <div className="flex-1 relative z-10">
                  <h4 className="text-3xl font-display font-black text-white mb-3 uppercase tracking-tight">Neural Network</h4>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-relaxed">Sychronize with up to 12 team members in the same workspace fragment.</p>
                </div>
                <div className="flex -space-x-5 relative z-10">
                  {[1,2,3,4].map(i => <div key={i} className="w-14 h-14 rounded-2xl border-4 border-[#020617] bg-slate-800 shadow-2xl" />)}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Modern Footer - Reimagined */}
      <footer className="relative z-10 py-32 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="md:col-span-1">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white text-[#020617] rounded-xl flex items-center justify-center font-black">MN</div>
                  <span className="text-2xl font-display font-black tracking-tight text-white uppercase">NeuralNotes</span>
               </div>
               <p className="text-slate-500 font-bold text-[12px] uppercase tracking-widest leading-relaxed opacity-60">The only digital sanctuary that respects your complexity.</p>
            </div>
            
            <FooterList title="Workspace" items={['Features', 'Templates', 'Security', 'Pricing']} />
            <FooterList title="Network" items={['Fragments', 'Neural API', 'Status', 'Alliance']} />
            <FooterList title="Protocols" items={['Privacy', 'Service Terms', 'Encryption']} />
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 NeuralNotes Workspace. Built for the Infinite.</p>
            <div className="flex items-center gap-8">
               {[Globe, Zap, Shield].map((Icon, i) => (
                 <div key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/5">
                    <Icon className="w-5 h-5" />
                 </div>
               ))}
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
      <h5 className="font-black text-white mb-8 uppercase tracking-[0.25em] text-[10px] opacity-40">{title}</h5>
      <ul className="space-y-5">
        {items.map(item => (
          <li key={item}>
            <a href="#" className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors duration-300">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
