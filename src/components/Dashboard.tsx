import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthProvider';
import { useNotes } from '../hooks/useNotes';
import { 
  LogOut, Plus, Search, Filter, 
  FileText, Mic, Image as ImageIcon, 
  MoreVertical, Clock, Trash2, Edit2,
  X, Save, Loader2, Play, Square, Download
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

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                         note.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || note.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-xl tracking-tight">MyNotes</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<FileText className="w-5 h-5" />} label="All Notes" active={filter === 'all'} onClick={() => setFilter('all')} />
          <NavItem icon={<FileText className="w-5 h-5 text-indigo-500" />} label="Text" active={filter === 'text'} onClick={() => setFilter('text')} />
          <NavItem icon={<Mic className="w-5 h-5 text-purple-500" />} label="Audio" active={filter === 'audio'} onClick={() => setFilter('audio')} />
          <NavItem icon={<ImageIcon className="w-5 h-5 text-blue-500" />} label="Images" active={filter === 'image'} onClick={() => setFilter('image')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 mb-6">
             <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold uppercase border border-indigo-100">
                {user?.email?.[0] || 'U'}
             </div>
             <div className="flex-1 truncate">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.email}</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Free Plan</p>
             </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="relative w-96 flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Note
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {filter === 'all' ? 'Your Workspace' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notes`}
              </h1>
              <p className="text-slate-500 font-medium">You have {filteredNotes.length} notes in this view.</p>
            </header>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-3xl h-64 border border-slate-100 animate-pulse" />
                ))}
              </div>
            ) : filteredNotes.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredNotes.map(note => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onEdit={() => setEditingNote(note)}
                    onDelete={() => deleteNote(note.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No notes found</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Create your first note to start organizing your thoughts and ideas.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Create Note
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
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
                  // Generate a temporary ID for new notes to use in the storage path
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

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm cursor-pointer relative overflow-hidden group",
        active ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {active && <motion.div layoutId="nav-active" className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-full" />}
      <span className={cn("transition-transform duration-300", active ? "scale-110" : "group-hover:scale-110")}>{icon}</span>
      {label}
    </button>
  );
}

function NoteCard({ note, onEdit, onDelete }: { note: Note, onEdit: () => void, onDelete: () => void | Promise<void>, key?: any }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="bg-white group rounded-3xl border border-slate-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative"
    >
      <div className="flex items-start justify-between">
        <div className={cn(
          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
          note.type === 'text' ? "bg-indigo-50 text-indigo-600" :
          note.type === 'audio' ? "bg-purple-50 text-purple-600" :
          "bg-blue-50 text-blue-600"
        )}>
          {note.type}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); setShowOptions(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); setShowOptions(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div onClick={onEdit} className="flex-1 cursor-pointer">
        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors truncate">{note.title || 'Untitled Note'}</h3>
        
        {note.type === 'image' && note.display_url && (
          <div className="w-full aspect-[16/9] mb-4 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
             <img src={note.display_url} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
        )}

        {note.type === 'audio' && (
          <div className="flex items-center gap-3 bg-purple-50/50 p-3 rounded-2xl mb-4 border border-purple-100/50">
             <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                <Play className="w-4 h-4 fill-current" />
             </div>
             <div className="flex-1 h-1.5 bg-purple-200 rounded-full" />
          </div>
        )}

        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed whitespace-pre-wrap">
          {note.content || 'No description provided.'}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium font-mono uppercase tracking-tight">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {format(new Date(note.updated_at), 'MMM d, h:mm a')}
        </div>
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

  // Audio recording state
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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <header className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">{initialNote ? 'Edit Note' : 'Create New Note'}</h2>
            <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
              <TypeButton active={type === 'text'} onClick={() => setType('text')} label="Text" icon={<FileText className="w-4 h-4" />} />
              <TypeButton active={type === 'audio'} onClick={() => setType('audio')} label="Audio" icon={<Mic className="w-4 h-4" />} />
              <TypeButton active={type === 'image'} onClick={() => setType('image')} label="Image" icon={<ImageIcon className="w-4 h-4" />} />
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-xl transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <input 
            type="text" 
            placeholder="Give your note a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none"
          />

          <div className="flex flex-col gap-4">
            {type === 'image' && (
              <div className="space-y-4">
                 {preview ? (
                   <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] group">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => { setFile(null); setPreview(null); }}
                        className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 ) : (
                   <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-12 hover:border-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer">
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                        <Download className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-slate-900">Click to upload image</p>
                      <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG (max. 5MB)</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                   </label>
                 )}
              </div>
            )}

            {type === 'audio' && (
              <div className="bg-purple-50 rounded-2xl p-8 flex flex-col items-center justify-center border border-purple-100">
                {preview ? (
                  <div className="w-full space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-purple-200 rounded-full w-full mb-2" />
                        <p className="text-xs font-bold text-purple-600 font-mono tracking-wide uppercase">Recorded Memo Ready</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setFile(null); setPreview(null); }}
                      className="text-xs font-bold text-purple-600 hover:underline uppercase tracking-wider"
                    >
                      Delete and re-record
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={toggleRecording}
                    className={cn(
                      "group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
                      isRecording ? "bg-red-500 scale-110 shadow-xl shadow-red-200" : "bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-100"
                    )}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-8 h-8 text-white fill-current" />
                        <div className="absolute inset-[-8px] border-2 border-red-500 rounded-full animate-ping opacity-25" />
                      </>
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </button>
                )}
                <p className={cn("text-sm font-bold mt-6", isRecording ? "text-red-600 animate-pulse" : "text-purple-600")}>
                  {isRecording ? 'Recording... click to stop' : preview ? '' : 'Click to start recording voice memo'}
                </p>
              </div>
            )}

            <textarea 
              placeholder={type === 'text' ? "Start typing your thoughts..." : "Add a caption or notes about this file..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full bg-transparent text-slate-600 placeholder:text-slate-300 focus:outline-none leading-relaxed text-lg resize-none"
            />
          </div>
        </div>

        <footer className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
           <p className="text-xs text-slate-400 font-medium tracking-tight">Last saved {format(new Date(), 'h:mm a')}</p>
           <button 
             onClick={handleSave}
             disabled={isSaving || (!title && !content && !file)}
             className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
           >
             {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
             {initialNote ? 'Update Note' : 'Save Note'}
           </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}

function TypeButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
        active ? "bg-white text-indigo-700 shadow-sm" : "text-slate-400 hover:text-slate-600"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
