// Marsala OS - Supabase Database Types
// Auto-generated types for type-safe database operations

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enums
export type UserRole = 'admin' | 'editor' | 'viewer' | 'client';
export type ProjectStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
export type ContactStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';
export type ModuleCategory = 'brand' | 'web' | 'crm' | 'ai' | 'ads' | 'data';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';

// Database Tables
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          company: string | null;
          role: UserRole;
          subscription_tier: SubscriptionTier;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          role?: UserRole;
          subscription_tier?: SubscriptionTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          role?: UserRole;
          subscription_tier?: SubscriptionTier;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          slug: string;
          name: string;
          category: ModuleCategory;
          tagline: string | null;
          description: string | null;
          features: Json;
          pricing: Json;
          icon: string | null;
          color: string | null;
          sort_order: number;
          is_active: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          category: ModuleCategory;
          tagline?: string | null;
          description?: string | null;
          features?: Json;
          pricing?: Json;
          icon?: string | null;
          color?: string | null;
          sort_order?: number;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          category?: ModuleCategory;
          tagline?: string | null;
          description?: string | null;
          features?: Json;
          pricing?: Json;
          icon?: string | null;
          color?: string | null;
          sort_order?: number;
          is_active?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          client_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          status: ProjectStatus;
          modules: Json;
          budget_range: string | null;
          timeline: string | null;
          deliverables: Json;
          metadata: Json;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          client_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          status?: ProjectStatus;
          modules?: Json;
          budget_range?: string | null;
          timeline?: string | null;
          deliverables?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          status?: ProjectStatus;
          modules?: Json;
          budget_range?: string | null;
          timeline?: string | null;
          deliverables?: Json;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };
      contacts: {
        Row: {
          id: string;
          email: string;
          name: string;
          company: string | null;
          phone: string | null;
          website: string | null;
          status: ContactStatus;
          source: string;
          message: string | null;
          budget_range: string | null;
          timeline: string | null;
          services_interested: Json;
          notes: string | null;
          assigned_to: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
          last_contacted_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          company?: string | null;
          phone?: string | null;
          website?: string | null;
          status?: ContactStatus;
          source?: string;
          message?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          services_interested?: Json;
          notes?: string | null;
          assigned_to?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          last_contacted_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          company?: string | null;
          phone?: string | null;
          website?: string | null;
          status?: ContactStatus;
          source?: string;
          message?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          services_interested?: Json;
          notes?: string | null;
          assigned_to?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          last_contacted_at?: string | null;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          company: string | null;
          role: string | null;
          interest: string | null;
          referral_source: string | null;
          is_verified: boolean;
          is_approved: boolean;
          metadata: Json;
          created_at: string;
          approved_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          company?: string | null;
          role?: string | null;
          interest?: string | null;
          referral_source?: string | null;
          is_verified?: boolean;
          is_approved?: boolean;
          metadata?: Json;
          created_at?: string;
          approved_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          company?: string | null;
          role?: string | null;
          interest?: string | null;
          referral_source?: string | null;
          is_verified?: boolean;
          is_approved?: boolean;
          metadata?: Json;
          created_at?: string;
          approved_at?: string | null;
        };
      };
      blog_categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          icon: string | null;
          color: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string | null;
          description: string | null;
          content: string;
          author_id: string | null;
          author_name: string;
          category_id: string | null;
          type: string;
          status: ContentStatus;
          tags: string[];
          keywords: string[];
          reading_time: string | null;
          featured_image: string | null;
          seo_title: string | null;
          seo_description: string | null;
          metadata: Json;
          views: number;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary?: string | null;
          description?: string | null;
          content: string;
          author_id?: string | null;
          author_name?: string;
          category_id?: string | null;
          type?: string;
          status?: ContentStatus;
          tags?: string[];
          keywords?: string[];
          reading_time?: string | null;
          featured_image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          metadata?: Json;
          views?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string | null;
          description?: string | null;
          content?: string;
          author_id?: string | null;
          author_name?: string;
          category_id?: string | null;
          type?: string;
          status?: ContentStatus;
          tags?: string[];
          keywords?: string[];
          reading_time?: string | null;
          featured_image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          metadata?: Json;
          views?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      case_studies: {
        Row: {
          id: string;
          slug: string;
          title: string;
          client_name: string | null;
          industry: string | null;
          summary: string | null;
          challenge: string | null;
          solution: string | null;
          results: Json;
          modules_used: Json;
          testimonial: string | null;
          testimonial_author: string | null;
          testimonial_role: string | null;
          featured_image: string | null;
          gallery: Json;
          status: ContentStatus;
          is_featured: boolean;
          metadata: Json;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          client_name?: string | null;
          industry?: string | null;
          summary?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: Json;
          modules_used?: Json;
          testimonial?: string | null;
          testimonial_author?: string | null;
          testimonial_role?: string | null;
          featured_image?: string | null;
          gallery?: Json;
          status?: ContentStatus;
          is_featured?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          client_name?: string | null;
          industry?: string | null;
          summary?: string | null;
          challenge?: string | null;
          solution?: string | null;
          results?: Json;
          modules_used?: Json;
          testimonial?: string | null;
          testimonial_author?: string | null;
          testimonial_role?: string | null;
          featured_image?: string | null;
          gallery?: Json;
          status?: ContentStatus;
          is_featured?: boolean;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_active: boolean;
          preferences: Json;
          metadata: Json;
          created_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          is_active?: boolean;
          preferences?: Json;
          metadata?: Json;
          created_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          is_active?: boolean;
          preferences?: Json;
          metadata?: Json;
          created_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          event_type: string;
          event_name: string;
          user_id: string | null;
          session_id: string | null;
          page_url: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_address: string | null;
          country: string | null;
          city: string | null;
          device_type: string | null;
          properties: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          event_name: string;
          user_id?: string | null;
          session_id?: string | null;
          page_url?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          device_type?: string | null;
          properties?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          event_name?: string;
          user_id?: string | null;
          session_id?: string | null;
          page_url?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          device_type?: string | null;
          properties?: Json;
          created_at?: string;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          form_type: string;
          data: Json;
          source_url: string | null;
          ip_address: string | null;
          user_agent: string | null;
          is_processed: boolean;
          processed_at: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          form_type: string;
          data: Json;
          source_url?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          is_processed?: boolean;
          processed_at?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          form_type?: string;
          data?: Json;
          source_url?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          is_processed?: boolean;
          processed_at?: string | null;
          metadata?: Json;
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          filename: string;
          original_name: string | null;
          mime_type: string | null;
          size_bytes: number | null;
          storage_path: string;
          public_url: string | null;
          alt_text: string | null;
          caption: string | null;
          uploaded_by: string | null;
          folder: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          original_name?: string | null;
          mime_type?: string | null;
          size_bytes?: number | null;
          storage_path: string;
          public_url?: string | null;
          alt_text?: string | null;
          caption?: string | null;
          uploaded_by?: string | null;
          folder?: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          original_name?: string | null;
          mime_type?: string | null;
          size_bytes?: number | null;
          storage_path?: string;
          public_url?: string | null;
          alt_text?: string | null;
          caption?: string | null;
          uploaded_by?: string | null;
          folder?: string;
          metadata?: Json;
          created_at?: string;
        };
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          is_public: boolean;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
    };
    Functions: {
      increment_post_views: {
        Args: { post_slug: string };
        Returns: void;
      };
    };
  };
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Module = Database['public']['Tables']['modules']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Contact = Database['public']['Tables']['contacts']['Row'];
export type WaitlistEntry = Database['public']['Tables']['waitlist']['Row'];
export type BlogCategory = Database['public']['Tables']['blog_categories']['Row'];
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type CaseStudy = Database['public']['Tables']['case_studies']['Row'];
export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row'];
export type FormSubmission = Database['public']['Tables']['form_submissions']['Row'];
export type MediaItem = Database['public']['Tables']['media']['Row'];
export type Setting = Database['public']['Tables']['settings']['Row'];

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ModuleInsert = Database['public']['Tables']['modules']['Insert'];
export type ContactInsert = Database['public']['Tables']['contacts']['Insert'];
export type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert'];
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
export type FormSubmissionInsert = Database['public']['Tables']['form_submissions']['Insert'];
