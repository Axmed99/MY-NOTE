-- 1. Create Profiles Table (Recommended)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Create Notes Table
CREATE TABLE public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT NOT NULL CHECK (type IN ('text', 'audio', 'image')),
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- 4. Set up Policies for Profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- 5. Set up Policies for Notes
CREATE POLICY "Users can view their own notes" 
ON public.notes FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" 
ON public.notes FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.notes FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.notes FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- 6. Storage Bucket setup (Run this in Supabase Storage SQL runner if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('notes-files', 'notes-files', true);

-- 7. Trigger for Profile creation on Signup (Optional but helpful)
/*
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
*/

-- 8. Security: Enforce 3-note limit for free users at DB level
CREATE OR REPLACE FUNCTION check_note_limit() 
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT count(*) FROM public.notes WHERE user_id = auth.uid()) >= 3 THEN
    RAISE EXCEPTION 'Free plan limit reached (max 3 notes). Please upgrade to Pro.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_note_limit
BEFORE INSERT ON public.notes
FOR EACH ROW EXECUTE PROCEDURE check_note_limit();
