-- ============================================
-- AnimeVerse Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project
-- 3. Go to SQL Editor
-- 4. Click "New Query"
-- 5. Paste and run this entire file
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- ANIME TABLE (for your anime catalog)
-- ============================================
CREATE TABLE IF NOT EXISTS anime (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  title_japanese TEXT,
  description TEXT,
  genres TEXT[] DEFAULT '{}',
  episodes INTEGER,
  status TEXT CHECK (status IN ('airing', 'completed', 'upcoming')) DEFAULT 'upcoming',
  studio TEXT,
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 10),
  cover_image TEXT,
  banner_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- WATCH LIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS watch_list (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  anime_id UUID REFERENCES anime(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch')) DEFAULT 'plan_to_watch',
  progress INTEGER DEFAULT 0 CHECK (progress >= 0),
  score INTEGER CHECK (score >= 0 AND score <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(user_id, anime_id)
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  anime_id UUID REFERENCES anime(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE(user_id, anime_id)
);

-- ============================================
-- COMMENTS TABLE (for discussions)
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  anime_id UUID REFERENCES anime(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view any profile" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Anime policies (public read)
CREATE POLICY "Anyone can view anime" ON anime FOR SELECT USING (true);
CREATE POLICY "Only admins can insert anime" ON anime FOR INSERT WITH CHECK (false); -- Disable public insert for now
CREATE POLICY "Only admins can update anime" ON anime FOR UPDATE USING (false);
CREATE POLICY "Only admins can delete anime" ON anime FOR DELETE USING (false);

-- Watch list policies
CREATE POLICY "Users can view own watch list" ON watch_list FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watch list" ON watch_list FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watch list" ON watch_list FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watch list" ON watch_list FOR DELETE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to handle new user signup - auto create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', SPLIT_PART(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user when a new auth user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_watch_list_updated_at BEFORE UPDATE ON watch_list FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SAMPLE DATA (optional - for testing)
-- ============================================

-- Insert sample anime
INSERT INTO anime (id, title, title_japanese, description, genres, episodes, status, studio, rating, cover_image) VALUES
  (uuid_generate_v4(), 'Attack on Titan', '進撃の巨人', ' humanity lives inside cities surrounded by enormous walls due to the Titans', ARRAY['Action', 'Drama', 'Fantasy'], 87, 'completed', 'WIT Studio', 9.0, 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg'),
  (uuid_generate_v4(), 'Demon Slayer', '鬼滅の刃', 'A young boy becomes a demon slayer after his family is slaughtered', ARRAY['Action', 'Fantasy', 'Supernatural'], 44, 'airing', 'ufotable', 8.7, 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg'),
  (uuid_generate_v4(), 'My Hero Academia', '僕のヒーローアカデミア', 'A quirkless boy dreams of becoming a hero', ARRAY['Action', 'Comedy', 'School'], 138, 'completed', 'Bones', 8.4, 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg'),
  (uuid_generate_v4(), 'Jujutsu Kaisen', '呪術廻戦', 'A boy swallows a cursed talisman and becomes a sorcerer', ARRAY['Action', 'Fantasy', 'School'], 48, 'airing', 'MAPPA', 8.8, 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg'),
  (uuid_generate_v4(), 'One Piece', 'ワンピース', 'A boy sets out on a journey to become the Pirate King', ARRAY['Action', 'Adventure', 'Comedy'], 1100, 'airing', 'Toei Animation', 8.9, 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg')
ON CONFLICT DO NOTHING;

-- ============================================
-- STORAGE SETUP (optional - for avatars)
-- ============================================

-- Create avatars bucket (if using Supabase Storage)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
--   ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
-- CREATE POLICY "Avatar images are publicly viewable" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
-- CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON watch_list TO authenticated;
GRANT ALL ON reviews TO authenticated;
GRANT ALL ON comments TO authenticated;

-- Grant read access to anon (public)
GRANT SELECT ON anime TO anon;
GRANT SELECT ON reviews TO anon;
GRANT SELECT ON comments TO anon;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_anime_title ON anime(title);
CREATE INDEX IF NOT EXISTS idx_watch_list_user_id ON watch_list(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_list_anime_id ON watch_list(anime_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_anime_id ON reviews(anime_id);
CREATE INDEX IF NOT EXISTS idx_comments_anime_id ON comments(anime_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);

-- ============================================
-- VIEWS (for convenience)
-- ============================================

CREATE OR REPLACE VIEW public.user_profiles AS
SELECT 
  p.id,
  p.email,
  p.name,
  p.avatar_url,
  p.bio,
  p.created_at,
  COUNT(DISTINCT wl.anime_id) as anime_count,
  COUNT(DISTINCT r.id) as review_count
FROM profiles p
LEFT JOIN watch_list wl ON p.id = wl.user_id
LEFT JOIN reviews r ON p.id = r.user_id
GROUP BY p.id;

-- ============================================
-- DONE! 🎉
-- ============================================
-- Now you can:
-- 1. Restart your app (npm run dev)
-- 2. Test registration - it will auto-create a profile
-- 3. Check profiles table in Supabase dashboard
-- 4. Build your anime features on top!
-- ============================================
