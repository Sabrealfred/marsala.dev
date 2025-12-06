/**
 * Analytics Type Definitions
 *
 * Type-safe definitions for analytics events and tracking
 */

import type { Json } from '@/lib/supabase/types';

// Event types that can be tracked
export type AnalyticsEventType =
  | 'pageview'
  | 'click'
  | 'form_submit'
  | 'form_error'
  | 'custom'
  | 'ecommerce'
  | 'search'
  | 'module_interaction'
  | 'navigation'
  | 'video'
  | 'download'
  | 'social'
  | string; // Allow custom event types

// Base event tracking parameters
export interface BaseEventParams {
  event_type: AnalyticsEventType;
  event_name: string;
  properties?: Record<string, any>;
  page_url?: string;
}

// Specialized event types with specific properties
export interface PageViewEvent extends BaseEventParams {
  event_type: 'pageview';
  properties?: {
    page_title?: string;
    page_path?: string;
    referrer?: string;
    [key: string]: any;
  };
}

export interface ClickEvent extends BaseEventParams {
  event_type: 'click';
  properties?: {
    element_id?: string;
    element_text?: string;
    element_type?: string;
    location?: string;
    [key: string]: any;
  };
}

export interface FormEvent extends BaseEventParams {
  event_type: 'form_submit' | 'form_error';
  properties?: {
    form_id?: string;
    form_name?: string;
    form_location?: string;
    field_count?: number;
    error?: string;
    [key: string]: any;
  };
}

export interface EcommerceEvent extends BaseEventParams {
  event_type: 'ecommerce';
  properties?: {
    product_id?: string;
    product_name?: string;
    price?: number;
    currency?: string;
    quantity?: number;
    category?: string;
    [key: string]: any;
  };
}

export interface SearchEvent extends BaseEventParams {
  event_type: 'search';
  properties?: {
    search_query: string;
    results_count?: number;
    search_location?: string;
    filters?: Record<string, any>;
    [key: string]: any;
  };
}

export interface ModuleInteractionEvent extends BaseEventParams {
  event_type: 'module_interaction';
  properties?: {
    module_name: string;
    action: string;
    module_category?: string;
    [key: string]: any;
  };
}

export interface VideoEvent extends BaseEventParams {
  event_type: 'video';
  properties?: {
    video_id: string;
    action: 'play' | 'pause' | 'complete' | 'seek';
    current_time?: number;
    duration?: number;
    [key: string]: any;
  };
}

export interface DownloadEvent extends BaseEventParams {
  event_type: 'download';
  properties?: {
    file_name: string;
    file_type?: string;
    file_size?: number;
    file_url?: string;
    [key: string]: any;
  };
}

export interface SocialEvent extends BaseEventParams {
  event_type: 'social';
  properties?: {
    platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'github' | string;
    action: 'share' | 'follow' | 'like' | string;
    content_url?: string;
    [key: string]: any;
  };
}

// Union type of all possible events
export type AnalyticsEvent =
  | PageViewEvent
  | ClickEvent
  | FormEvent
  | EcommerceEvent
  | SearchEvent
  | ModuleInteractionEvent
  | VideoEvent
  | DownloadEvent
  | SocialEvent
  | BaseEventParams;

// API request/response types
export interface AnalyticsAPIRequest {
  event_type: string;
  event_name: string;
  properties?: Json;
  page_url?: string;
}

export interface AnalyticsAPIResponse {
  success: boolean;
  error?: string;
}

// Session data
export interface AnalyticsSession {
  session_id: string;
  started_at: string;
  last_activity: string;
  page_views: number;
  events_count: number;
}

// Device information
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  os?: string;
  browser?: string;
  screen_width?: number;
  screen_height?: number;
}

// Geo location information
export interface GeoLocation {
  country?: string;
  country_code?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}
