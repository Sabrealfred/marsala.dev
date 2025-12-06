import { useCallback } from 'react';
import type { Json } from '@/lib/supabase/types';

interface TrackEventParams {
  event_type: string;
  event_name: string;
  properties?: Record<string, any>;
  page_url?: string;
}

interface AnalyticsHook {
  trackEvent: (params: TrackEventParams) => Promise<void>;
}

export function useAnalytics(): AnalyticsHook {
  const trackEvent = useCallback(async ({
    event_type,
    event_name,
    properties = {},
    page_url,
  }: TrackEventParams) => {
    try {
      // Auto-capture current page URL if not provided
      const url = page_url || (typeof window !== 'undefined' ? window.location.href : '');

      // Fire and forget - don't await the response
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type,
          event_name,
          properties: properties as Json,
          page_url: url,
        }),
        // Use keepalive to ensure request completes even if page unloads
        keepalive: true,
      }).catch((error) => {
        // Silently fail - analytics should never disrupt user experience
        if (process.env.NODE_ENV === 'development') {
          console.warn('Analytics tracking failed:', error);
        }
      });
    } catch (error) {
      // Silently fail in production, log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics tracking error:', error);
      }
    }
  }, []);

  return {
    trackEvent,
  };
}

// Helper hook for common event types
export function usePageView() {
  const { trackEvent } = useAnalytics();

  const trackPageView = useCallback((pageName?: string) => {
    trackEvent({
      event_type: 'pageview',
      event_name: pageName || (typeof window !== 'undefined' ? window.location.pathname : ''),
      properties: {
        page_title: typeof document !== 'undefined' ? document.title : '',
      },
    });
  }, [trackEvent]);

  return trackPageView;
}

// Helper hook for tracking clicks
export function useClickTracking() {
  const { trackEvent } = useAnalytics();

  const trackClick = useCallback((
    elementName: string,
    properties?: Record<string, any>
  ) => {
    trackEvent({
      event_type: 'click',
      event_name: elementName,
      properties: properties || {},
    });
  }, [trackEvent]);

  return trackClick;
}

// Helper hook for tracking form submissions
export function useFormTracking() {
  const { trackEvent } = useAnalytics();

  const trackFormSubmit = useCallback((
    formName: string,
    properties?: Record<string, any>
  ) => {
    trackEvent({
      event_type: 'form_submit',
      event_name: formName,
      properties: properties || {},
    });
  }, [trackEvent]);

  const trackFormError = useCallback((
    formName: string,
    error: string,
    properties?: Record<string, any>
  ) => {
    trackEvent({
      event_type: 'form_error',
      event_name: formName,
      properties: {
        error,
        ...properties,
      },
    });
  }, [trackEvent]);

  return {
    trackFormSubmit,
    trackFormError,
  };
}

// Helper hook for tracking custom events
export function useCustomEvent() {
  const { trackEvent } = useAnalytics();

  const trackCustom = useCallback((
    eventName: string,
    properties?: Record<string, any>
  ) => {
    trackEvent({
      event_type: 'custom',
      event_name: eventName,
      properties: properties || {},
    });
  }, [trackEvent]);

  return trackCustom;
}
