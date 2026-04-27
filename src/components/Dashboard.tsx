import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthProvider';
import { useNotes } from '../hooks/useNotes';
import { 
  LogOut, Plus, Search, 
  FileText, Mic, Image as ImageIcon, 
  MoreVertical, Clock, Trash2, Edit2,
  X, Save, Loader2, Play, Square, Download,
  LayoutGrid, List, Sparkles, Star, Trash,
  Bell, Command, Sparkle, User as UserIcon,
  Crown, ChevronRight, Search as SearchIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { Note, NoteType } from '../types';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { notes, loading, addNote, updateNote, deleteNote, uploadFile } = useNotes();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<NoteType | 'all'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                         note.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || note.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen gradient-futuristic text-slate-100 overflow-hidden font-sans relative">
      {/* Background Noise/Overlay */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />
      
      {/* Sidebar */}
      <aside className="w-72 glass-panel m-4 rounded-3xl flex flex-col p-6 z-20 relative border-white/5">
        <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            MN
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">MyNotes</span>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <NavItem icon={<Sparkles className="w-5 h-5" />} label="All Notes" active={filter === 'all'} onClick={() => setFilter('all')} />
          <NavItem icon={<FileText className="w-5 h-5" />} label="Text Notes" active={filter === 'text'} onClick={() => setFilter('text')} color="purple" />
          <NavItem icon={<Mic className="w-5 h-5" />} label="Audio Memos" active={filter === 'audio'} onClick={() => setFilter('audio')} color="pink" />
          <NavItem icon={<ImageIcon className="w-5 h-5" />} label="Reflex Images" active={filter === 'image'} onClick={() => setFilter('image')} color="blue" />
          <NavItem icon={<Star className="w-5 h-5" />} label="Favorites" active={false} onClick={() => {}} color="yellow" />
          <NavItem icon={<Trash className="w-5 h-5" />} label="Trash" active={false} onClick={() => {}} color="red" />
        </nav>

        <div className="mt-auto space-y-6">
          {/* Upgrade to Pro Card */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-4 border border-white/10">
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Limited Plan</span>
              </div>
              <p className="text-xs font-bold text-white mb-3">Unlock Pro Workspace</p>
              <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-colors shadow-lg shadow-white/5">
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 px-2 mb-6">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-black border border-white/10 shadow-inner">
                  {user?.email?.[0] || 'U'}
               </div>
               <div className="flex-1 truncate">
                  <p className="text-xs font-bold text-white truncate">{user?.email}</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase flex items-center gap-1.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Explorer
                  </p>
               </div>
            </div>
            <button 
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Terminate Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-24 px-12 flex items-center justify-between shrink-0 z-10">
          <div className="relative group w-1/3">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Query workspace..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 focus:bg-white/10 transition-all backdrop-blur-md placeholder:text-slate-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-500">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-500">K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-white")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-white")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button className="p-2.5 text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#020617]" />
            </button>

            <button 
              onClick={() => setIsAdding(true)}
              className="bg-white text-[#020617] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-black" strokeWidth={3} />
              New Intel
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-12 pb-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto mt-4">
            <header className="mb-12 flex items-end justify-between">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl font-display font-black tracking-tight text-white mb-3"
                >
                  Sync Logic <span className="neon-text-purple">01</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]"
                >
                  Active System Profile • {filteredNotes.length} Fragments Detected
                </motion.p>
              </div>

              <div className="flex gap-2">
                {['all', 'text', 'audio', 'image'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setFilter(t as any)}
                    className={cn(
                      "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                      filter === t 
                        ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                        : "bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10 hover:text-slate-300"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </header>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="glass-card rounded-[2rem] h-64 animate-pulse border-white/5" />
                ))}
              </div>
            ) : filteredNotes.length > 0 ? (
              <motion.div 
                layout
                className={cn(
                  "grid gap-8 pb-12",
                  viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {filteredNotes.map((note, index) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      index={index}
                      onEdit={() => setEditingNote(note)}
                      onDelete={() => deleteNote(note.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/2 p-20 text-center rounded-[3rem] border border-white/5 backdrop-blur-sm mt-12"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-ping" />
                  <Sparkle className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-3xl font-display font-black text-white mb-4">The Void is Waiting</h3>
                <p className="text-slate-500 mb-12 max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px] leading-relaxed">Capture your first data fragment to begin neural mapping.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-white text-black px-12 py-5 rounded-3xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs"
                >
                  Initialize Capture
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Modal System */}
      <AnimatePresence>
        {(isAdding || editingNote) && (
          <NoteModal 
            id={editingNote?.id}
            initialNote={editingNote}
            onClose={() => {
              setIsAdding(false);
              setEditingNote(null);
            }}
            onSave={async (title, content, type, file) => {
              try {
                let fileUrl = editingNote?.file_url || null;
                if (file) {
                  const noteId = editingNote?.id || crypto.randomUUID();
                  const featureName = type === 'audio' ? 'audio' : 'images';
                  const uploadedPath = await uploadFile(file, featureName, noteId);
                  if (uploadedPath) fileUrl = uploadedPath;
                }

                if (editingNote) {
                  await updateNote(editingNote.id, { title, content, type, file_url: fileUrl });
                } else {
                  await addNote(title, content, type, fileUrl);
                }
                setIsAdding(false);
                setEditingNote(null);
              } catch (err: any) {
                if (err.message === 'LIMIT_REACHED') {
                  alert("Free plan limit reached. Upgrade to Pro to create unlimited notes.");
                } else {
                  console.error(err);
                }
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick, color = "purple" }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, color?: string, key?: any }) => {
  const colorMap: any = {
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-xs uppercase tracking-[0.15em] cursor-pointer relative overflow-hidden group",
        active ? colorMap[color] + " border shadow-[shadow-inner]" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      )}
    >
      <span className={cn("transition-all duration-500", active ? "scale-110 rotate-3" : "group-hover:scale-110")}>{icon}</span>
      {label}
      {active && <motion.div layoutId="nav-glow" className="absolute inset-0 bg-current opacity-[0.03] blur-xl" />}
    </button>
  );
}

const NoteCard = ({ note, index, onEdit, onDelete }: { note: Note; index: number; onEdit: () => void; onDelete: () => void | Promise<void>; key?: any }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-card group rounded-[2.5rem] p-7 flex flex-col gap-5 border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden active:scale-95"
    >
      {/* Background radial glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
          note.type === 'text' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
          note.type === 'audio' ? "bg-pink-500/10 text-pink-400 border-pink-500/20" :
          "bg-blue-500/10 text-blue-400 border-blue-500/20"
        )}>
          {note.type}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10, x: -10 }}
                className="absolute right-0 mt-3 w-40 glass-panel rounded-2xl shadow-2xl z-20 py-2 border border-white/10"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(); setShowOptions(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Edit2 className="w-4 h-4" /> Edit Intel
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(); setShowOptions(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Purge
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div onClick={onEdit} className="flex-1 cursor-pointer relative z-10">
        <h3 className="font-display font-black text-xl text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tight leading-tight uppercase">
          {note.title || 'NULL_TITLE'}
        </h3>
        
        {note.type === 'image' && note.display_url && (
          <div className="w-full aspect-[16/10] mb-5 rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
             <img src={note.display_url} alt={note.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
          </div>
        )}

        {note.type === 'audio' && (
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[1.5rem] mb-5 border border-white/5 group-hover:bg-pink-500/5 group-hover:border-pink-500/20 transition-all">
             <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-[#020617] shadow-lg shadow-pink-500/20 animate-pulse-glow">
                <Play className="w-5 h-5 fill-current" />
             </div>
             <div className="flex-1 flex gap-0.5 items-end h-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex-1 bg-pink-500/30 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                ))}
             </div>
          </div>
        )}

        <p className="text-slate-400 text-xs font-medium line-clamp-3 leading-relaxed tracking-wide mb-2 opacity-80">
          {note.content || 'System fragment empty...'}
        </p>
      </div>

      <div className="pt-5 mt-auto border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] relative z-10">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          {format(new Date(note.updated_at), 'MMM d • HH:mm')}
        </div>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

function NoteModal({ id, initialNote, onClose, onSave }: { id?: string, initialNote?: Note | null, onClose: () => void, onSave: (title: string, content: string, type: NoteType, file: File | null) => Promise<void> }) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [type, setType] = useState<NoteType>(initialNote?.type || 'text');
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialNote?.display_url || null);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const audioFile = new File([blob], 'recording.webm', { type: 'audio/webm' });
          setFile(audioFile);
          setPreview(URL.createObjectURL(audioFile));
          stream.getTracks().forEach(track => track.stop());
        };
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (err) {
        console.error('Error starting recording:', err);
        alert('Could not access microphone.');
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(title, content, type, file);
    setIsSaving(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-2xl"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="glass-panel w-full max-w-4xl rounded-[3rem] shadow-[0_0_100px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col max-h-[90vh] border-white/10"
      >
        <header className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
              {initialNote ? 'Edit Fragment' : 'Construct Intel'}
            </h2>
            <div className="flex bg-white/5 p-1.5 rounded-2xl gap-1.5 border border-white/5">
              <TypeButton active={type === 'text'} onClick={() => setType('text')} label="Text" icon={<FileText className="w-4 h-4" />} color="purple" />
              <TypeButton active={type === 'audio'} onClick={() => setType('audio')} label="Audio" icon={<Mic className="w-4 h-4" />} color="pink" />
              <TypeButton active={type === 'image'} onClick={() => setType('image')} label="Visual" icon={<ImageIcon className="w-4 h-4" />} color="blue" />
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-slate-500 hover:text-white hover:bg-white/10 rounded-2xl transition-all cursor-pointer">
            <X className="w-7 h-7" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
          <input 
            type="text" 
            placeholder="Fragment identity..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-5xl font-display font-black text-white placeholder:text-white/10 focus:outline-none bg-transparent uppercase tracking-tighter"
          />

          <div className="flex flex-col gap-10">
            {type === 'image' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                 {preview ? (
                   <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[16/9] group shadow-2xl">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => { setFile(null); setPreview(null); }}
                          className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-red-700 transition-all scale-90 group-hover:scale-100"
                        >
                           Purge Component
                        </button>
                      </div>
                   </div>
                 ) : (
                   <label className="flex flex-col items-center justify-center border-4 border-dashed border-white/5 rounded-[3rem] p-24 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group">
                      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-inner">
                        <Download className="w-8 h-8" />
                      </div>
                      <p className="text-xl font-display font-black text-white uppercase tracking-widest mb-2">Initialize Upload</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Visual Data Packet • MAX. 5MB</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                   </label>
                 )}
              </motion.div>
            )}

            {type === 'audio' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-pink-500/5 rounded-[3.5rem] p-16 flex flex-col items-center justify-center border border-pink-500/10 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
                
                {preview ? (
                  <div className="w-full space-y-12 text-center">
                    <div className="flex items-center justify-center gap-8">
                       <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center text-[#020617] shadow-[0_0_40px_rgba(236,72,153,0.4)] relative">
                          <Play className="w-10 h-10 fill-current" />
                          <div className="absolute inset-[-10px] border-2 border-pink-500 rounded-full animate-pulse opacity-20" />
                       </div>
                       <div className="text-left">
                          <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight">Audio Fragment Locked</h4>
                          <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mt-1">Neural Recording Processed</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => { setFile(null); setPreview(null); }}
                      className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-white/20 pb-1"
                    >
                      Delete and re-record
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <button 
                      onClick={toggleRecording}
                      className={cn(
                        "group relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                        isRecording ? "bg-red-500 scale-110 shadow-[0_0_50px_rgba(239,68,68,0.5)]" : "bg-white/5 hover:bg-pink-500 shadow-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] border border-white/10"
                      )}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-10 h-10 text-white fill-current" />
                          <div className="absolute inset-[-15px] border-2 border-red-500 rounded-full animate-ping opacity-25" />
                        </>
                      ) : (
                        <Mic className={cn("w-12 h-12 transition-colors", "group-hover:text-black")} />
                      )}
                    </button>
                    <p className={cn("text-xs font-black mt-10 uppercase tracking-[0.3em] transition-all", isRecording ? "text-red-500 animate-pulse" : "text-slate-500")}>
                      {isRecording ? 'Capturing Neural Input...' : 'Ready for Vocal Transmission'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            <textarea 
              placeholder={type === 'text' ? "Begin neural dump..." : "Supplement fragment metadata..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-transparent text-slate-400 placeholder:text-white/5 focus:outline-none leading-relaxed text-2xl font-medium tracking-tight resize-none custom-scrollbar"
            />
          </div>
        </div>

        <footer className="px-10 py-10 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.25em]">System Standby • Encryption Active</p>
           </div>
           <button 
             onClick={handleSave}
             disabled={isSaving || (!title && !content && !file)}
             className="bg-white text-black px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20 flex items-center gap-3 cursor-pointer text-xs group"
           >
             {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" strokeWidth={3} />}
             {initialNote ? 'Update Fragment' : 'Commit to Sync'}
           </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

const TypeButton = ({ active, onClick, label, icon, color = "purple" }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode, color?: string, key?: any }) => {
  const colorMap: any = {
    purple: "text-purple-400 bg-purple-500/20 border-purple-500/30",
    pink: "text-pink-400 bg-pink-500/20 border-pink-500/30",
    blue: "text-blue-400 bg-blue-500/20 border-blue-500/30",
  };

  return (
    <button 
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer relative group",
        active ? colorMap[color] + " border shadow-lg" : "text-slate-500 hover:text-slate-300"
      )}
    >
      <span className={cn("transition-all", active ? "scale-110" : "group-hover:scale-110")}>{icon}</span>
      {label}
    </button>
  );

  // Helper for onClick since I missed it in the prop destructuring type but it's passed as onClick
  function onSelect(e: any) {
    e.preventDefault();
    onClick();
  }
}
