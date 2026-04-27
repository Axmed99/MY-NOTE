import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../AuthProvider';
import { Note, NoteType } from '../types';

export function useNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Since bucket is private, we must generate signed URLs for any notes with files
      const notesWithSignedUrls = await Promise.all((data || []).map(async (note) => {
        if (note.file_url) {
          const { data: signedData, error: signedError } = await supabase.storage
            .from('app-files')
            .createSignedUrl(note.file_url, 3600); // 1 hour expiry
          
          if (!signedError && signedData) {
            return { ...note, display_url: signedData.signedUrl };
          }
        }
        return note;
      }));

      setNotes(notesWithSignedUrls);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();

    // Set up real-time subscription
    const subscription = supabase
      .channel('notes-channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'notes',
        filter: `user_id=eq.${user?.id}`
      }, () => {
        fetchNotes();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const addNote = async (title: string, content: string, type: NoteType, filePath: string | null = null) => {
    if (!user) return;
    
    // Client-side check for better UX
    if (notes.length >= 3) {
      throw new Error('LIMIT_REACHED');
    }

    try {
      const { error } = await supabase
        .from('notes')
        .insert([{
          user_id: user.id,
          title,
          content,
          type,
          file_url: filePath, // Store the relative path in the DB
          updated_at: new Date().toISOString()
        }]);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      // 1. Get note to find file path
      const { data: note } = await supabase.from('notes').select('file_url').eq('id', id).single();
      
      // 2. Delete file from storage if it exists
      if (note?.file_url) {
        await supabase.storage.from('app-files').remove([note.file_url]);
      }

      // 3. Delete from DB
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const uploadFile = async (file: File, feature: string, itemId: string) => {
    if (!user) return null;
    try {
      const fileExt = file.name.split('.').pop();
      const uuid = crypto.randomUUID();
      // Path Rule: ${auth.uid()}/${featureName}/${itemId}/${uuid}.${extension}
      const filePath = `${user.id}/${feature}/${itemId}/${uuid}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('app-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      
      // For private buckets, we return the relative path to be stored in DB
      return filePath;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return { notes, loading, error, addNote, updateNote, deleteNote, uploadFile };
}
