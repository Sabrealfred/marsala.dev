'use client';

import { useAnalytics, usePageView, useClickTracking, useFormTracking } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';

/**
 * Analytics Demo Component
 *
 * This component demonstrates the analytics tracking system.
 * Use it to test that analytics events are being tracked correctly.
 *
 * To use: Import this component in any page and check the Supabase
 * analytics_events table to see the tracked events.
 */
export default function AnalyticsDemo() {
  const { trackEvent } = useAnalytics();
  const trackPageView = usePageView();
  const trackClick = useClickTracking();
  const { trackFormSubmit, trackFormError } = useFormTracking();
  const [message, setMessage] = useState('');

  // Track page view on mount
  useEffect(() => {
    trackPageView('Analytics Demo Page');
  }, [trackPageView]);

  // Test basic event tracking
  const testBasicEvent = () => {
    trackEvent({
      event_type: 'test',
      event_name: 'basic_test_event',
      properties: {
        test_type: 'basic',
        timestamp: new Date().toISOString(),
      },
    });
    setMessage('Basic event tracked!');
  };

  // Test click tracking
  const testClickEvent = () => {
    trackClick('demo_button', {
      button_type: 'test',
      color: 'blue',
    });
    setMessage('Click event tracked!');
  };

  // Test form submission
  const testFormEvent = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit('demo_form', {
      has_email: true,
      has_message: true,
    });
    setMessage('Form submit event tracked!');
  };

  // Test form error
  const testFormError = () => {
    trackFormError('demo_form', 'Simulated validation error', {
      field: 'email',
    });
    setMessage('Form error event tracked!');
  };

  // Test custom properties
  const testCustomProperties = () => {
    trackEvent({
      event_type: 'custom',
      event_name: 'complex_event',
      properties: {
        user_preferences: {
          theme: 'dark',
          language: 'en',
        },
        feature_flags: ['beta', 'premium'],
        metrics: {
          load_time: 1234,
          interactions: 42,
        },
      },
    });
    setMessage('Event with complex properties tracked!');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Analytics Demo</h1>
      <p className="mb-6 text-gray-600">
        Click the buttons below to test analytics tracking. Check your Supabase
        analytics_events table to see the tracked events.
      </p>

      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Event</h2>
          <button
            onClick={testBasicEvent}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Track Basic Event
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Click Tracking</h2>
          <button
            onClick={testClickEvent}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Track Click Event
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Form Tracking</h2>
          <form onSubmit={testFormEvent} className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Message"
              className="px-3 py-2 border rounded w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Track Form Submit
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Form Error Tracking</h2>
          <button
            onClick={testFormError}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Track Form Error
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Complex Properties</h2>
          <button
            onClick={testCustomProperties}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Track Event with Complex Data
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p className="text-sm text-gray-600">
          Page URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}
        </p>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Analytics events are sent asynchronously and won't block
          the UI. Check your Supabase dashboard to verify events are being stored.
        </p>
      </div>
    </div>
  );
}
