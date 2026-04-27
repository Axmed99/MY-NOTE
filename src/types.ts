export type NoteType = 'text' | 'audio' | 'image';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: NoteType;
  file_url: string | null;
  display_url?: string; // Signed URL for UI display
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  user: {
    id: string;
    email?: string;
  } | null;
}
