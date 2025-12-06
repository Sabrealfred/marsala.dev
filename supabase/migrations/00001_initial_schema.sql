-- Marsala OS - Supabase Database Schema
-- Version: 1.0.0
-- Description: Complete backend architecture for marsala.dev

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer', 'client');
CREATE TYPE project_status AS ENUM ('draft', 'active', 'paused', 'completed', 'archived');
CREATE TYPE contact_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'closed_won', 'closed_lost');
CREATE TYPE module_category AS ENUM ('brand', 'web', 'crm', 'ai', 'ads', 'data');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE subscription_tier AS ENUM ('free', 'starter', 'professional', 'enterprise');

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    company TEXT,
    role user_role DEFAULT 'viewer',
    subscription_tier subscription_tier DEFAULT 'free',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MODULES (Core Marsala OS Modules)
-- ============================================
CREATE TABLE public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category module_category NOT NULL,
    tagline TEXT,
    description TEXT,
    features JSONB DEFAULT '[]',
    pricing JSONB DEFAULT '{}',
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PROJECTS (Client Projects)
-- ============================================
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    status project_status DEFAULT 'draft',
    modules JSONB DEFAULT '[]', -- Array of module IDs used
    budget_range TEXT,
    timeline TEXT,
    deliverables JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- CONTACTS (CRM - Lead Management)
-- ============================================
CREATE TABLE public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    website TEXT,
    status contact_status DEFAULT 'new',
    source TEXT DEFAULT 'website',
    message TEXT,
    budget_range TEXT,
    timeline TEXT,
    services_interested JSONB DEFAULT '[]',
    notes TEXT,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_contacted_at TIMESTAMPTZ
);

-- ============================================
-- WAITLIST
-- ============================================
CREATE TABLE public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    role TEXT,
    interest TEXT,
    referral_source TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ
);

-- ============================================
-- BLOG/RESEARCH CONTENT
-- ============================================
CREATE TABLE public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Marsala Team',
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    type TEXT DEFAULT 'Article',
    status content_status DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',
    reading_time TEXT,
    featured_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    metadata JSONB DEFAULT '{}',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- ============================================
-- CASE STUDIES
-- ============================================
CREATE TABLE public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client_name TEXT,
    industry TEXT,
    summary TEXT,
    challenge TEXT,
    solution TEXT,
    results JSONB DEFAULT '{}',
    modules_used JSONB DEFAULT '[]',
    testimonial TEXT,
    testimonial_author TEXT,
    testimonial_role TEXT,
    featured_image TEXT,
    gallery JSONB DEFAULT '[]',
    status content_status DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);

-- ============================================
-- ANALYTICS & EVENTS
-- ============================================
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country TEXT,
    city TEXT,
    device_type TEXT,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FORM SUBMISSIONS (Generic)
-- ============================================
CREATE TABLE public.form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    form_type TEXT NOT NULL,
    data JSONB NOT NULL,
    source_url TEXT,
    ip_address INET,
    user_agent TEXT,
    is_processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MEDIA LIBRARY
-- ============================================
CREATE TABLE public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_name TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    storage_path TEXT NOT NULL,
    public_url TEXT,
    alt_text TEXT,
    caption TEXT,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    folder TEXT DEFAULT 'general',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SETTINGS (Key-Value Store)
-- ============================================
CREATE TABLE public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_status ON public.contacts(status);
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);

CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at DESC);

CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category_id);

CREATE INDEX idx_projects_client ON public.projects(client_id);
CREATE INDEX idx_projects_status ON public.projects(status);

CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

CREATE INDEX idx_media_folder ON public.media(folder);
CREATE INDEX idx_media_uploaded_by ON public.media(uploaded_by);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Modules: Public read access
CREATE POLICY "Anyone can view active modules" ON public.modules
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage modules" ON public.modules
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Blog Posts: Public read for published, admin full access
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
    );

-- Blog Categories: Public read
CREATE POLICY "Anyone can view categories" ON public.blog_categories
    FOR SELECT USING (true);

-- Case Studies: Public read for published
CREATE POLICY "Anyone can view published case studies" ON public.case_studies
    FOR SELECT USING (status = 'published');

-- Contacts: Admin/Editor only
CREATE POLICY "Staff can manage contacts" ON public.contacts
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
    );

-- Waitlist: Insert for anyone, select for admin
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view waitlist" ON public.waitlist
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Form Submissions: Insert for anyone
CREATE POLICY "Anyone can submit forms" ON public.form_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view submissions" ON public.form_submissions
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
    );

-- Settings: Public can read public settings
CREATE POLICY "Anyone can view public settings" ON public.settings
    FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can manage settings" ON public.settings
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.modules
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.contacts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.case_studies
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Increment blog post views
CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.blog_posts
    SET views = views + 1
    WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA - Modules
-- ============================================
INSERT INTO public.modules (slug, name, category, tagline, description, features, sort_order) VALUES
('brand-identity', 'Brand Identity', 'brand', 'Strategic brand development', 'Complete brand identity systems including logo, typography, color palette, and brand guidelines.', '["Logo Design", "Typography System", "Color Palette", "Brand Guidelines", "Visual Identity"]', 1),
('web-development', 'Web Development', 'web', 'High-performance websites', 'Custom web applications built with modern frameworks for optimal performance and user experience.', '["Custom Development", "Responsive Design", "SEO Optimization", "Performance", "Analytics Integration"]', 2),
('crm-automation', 'CRM & Automation', 'crm', 'Streamline your operations', 'Automated workflows and CRM integrations to scale your business operations efficiently.', '["HubSpot Integration", "Salesforce Setup", "Email Automation", "Lead Scoring", "Pipeline Management"]', 3),
('ai-integration', 'AI Integration', 'ai', 'Intelligent automation', 'Custom AI solutions including chatbots, content generation, and predictive analytics.', '["Custom Chatbots", "Content AI", "Predictive Analytics", "Process Automation", "Data Insights"]', 4),
('paid-media', 'Paid Media', 'ads', 'Performance marketing', 'Data-driven advertising campaigns across Google, Meta, LinkedIn, and programmatic channels.', '["Google Ads", "Meta Ads", "LinkedIn Ads", "Programmatic", "Attribution Modeling"]', 5),
('data-analytics', 'Data & Analytics', 'data', 'Actionable insights', 'Comprehensive analytics setup with custom dashboards and reporting infrastructure.', '["Google Analytics 4", "Custom Dashboards", "Data Warehousing", "BI Integration", "Real-time Reporting"]', 6);

-- Seed Blog Categories
INSERT INTO public.blog_categories (slug, name, description, icon, sort_order) VALUES
('strategy', 'Strategy', 'Business and growth strategy insights', 'target', 1),
('technology', 'Technology', 'Technical guides and tutorials', 'code', 2),
('marketing', 'Marketing', 'Marketing and advertising insights', 'megaphone', 3),
('case-studies', 'Case Studies', 'Client success stories', 'briefcase', 4),
('industry', 'Industry', 'Industry trends and analysis', 'trending-up', 5);
