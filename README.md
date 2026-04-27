# MyNotes - Modern AI-Powered Note-Taking Workspace

MyNotes is a clean, modern, and production-ready workspace for capturing your ideas as text, voice recordings, and images. Built with React and powered by Supabase, it features end-to-end security, private storage, and a seamless cross-device synchronization experience.

## ✨ Features

- **Multi-format Notes:** Capture your thoughts through rich text, audio memos, and image attachments.
- **Secure Authentication:** Integrated Supabase Auth for high-security user accounts.
- **Private Storage:** All file attachments are stored in a private Supabase Storage bucket (`app-files`) with unique user-prefixed paths.
- **Signed URLs:** For maximum security, private files are accessed via short-lived signed URLs.
- **SaaS Plan Management:** Integrated free-tier logic restricting users to 3 notes, scalable for future pro features.
- **Modern UI:** Built with Tailwind CSS, Framer Motion for cinematic animations, and Outfit typography.
- **Responsive Design:** Optimized for both desktop and mobile productivity.

## 🚀 Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Backend & Database:** Supabase (PostgreSQL, Auth, Storage)

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`) and add your Supabase credentials:

```env
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 2. Database Schema

Execute the SQL provided in `supabase_schema.sql` within your Supabase SQL Editor. This will:
- Create `profiles` and `notes` tables.
- Enable Row Level Security (RLS).
- Set up access policies for authenticated users.
- Configure a 3-note limit trigger for free users.

### 3. Storage Configuration

1. Create a **private** bucket in Supabase Storage named `app-files`.
2. Add RLS policies to allow authenticated users to:
   - **SELECT/INSERT/UPDATE/DELETE** files where the path starts with their `auth.uid()`.

### 4. Installation

```bash
npm install
npm run dev
```

## 🔒 Security

This application follows Zero Trust principles:
- **Relational RLS:** Notes can only be accessed by their creator via `auth.uid() = user_id`.
- **Storage Isolation:** Every file is prefixed with the user's ID: `${auth.uid()}/${featureName}/${itemId}/...`
- **Private Access:** Direct access to storage URLs is blocked; the app uses backend-signed URLs for display.

## 📜 License

MIT License - feel free to use this for your own projects!
