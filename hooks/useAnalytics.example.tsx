/**
 * EXAMPLE USAGE - Analytics Tracking System
 *
 * This file demonstrates how to use the analytics tracking hooks
 * throughout the marsala.dev application.
 */

import { useAnalytics, usePageView, useClickTracking, useFormTracking, useCustomEvent } from './useAnalytics';
import { useEffect } from 'react';

// ============================================
// Example 1: Basic Event Tracking
// ============================================
export function ExampleBasicTracking() {
  const { trackEvent } = useAnalytics();

  const handleButtonClick = () => {
    trackEvent({
      event_type: 'click',
      event_name: 'cta_button_clicked',
      properties: {
        button_text: 'Get Started',
        section: 'hero',
      },
    });
  };

  return <button onClick={handleButtonClick}>Get Started</button>;
}

// ============================================
// Example 2: Page View Tracking
// ============================================
export function ExamplePageTracking() {
  const trackPageView = usePageView();

  useEffect(() => {
    // Track page view when component mounts
    trackPageView('Home Page');
  }, [trackPageView]);

  return <div>Home Page Content</div>;
}

// ============================================
// Example 3: Click Tracking
// ============================================
export function ExampleClickTracking() {
  const trackClick = useClickTracking();

  const handleNavClick = (destination: string) => {
    trackClick('navigation_link', {
      destination,
      location: 'header',
    });
  };

  return (
    <nav>
      <a onClick={() => handleNavClick('/about')}>About</a>
      <a onClick={() => handleNavClick('/contact')}>Contact</a>
    </nav>
  );
}

// ============================================
// Example 4: Form Tracking
// ============================================
export function ExampleFormTracking() {
  const { trackFormSubmit, trackFormError } = useFormTracking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Submit form...
      trackFormSubmit('contact_form', {
        form_location: 'footer',
        has_company: true,
      });
    } catch (error) {
      trackFormError('contact_form', 'Submission failed', {
        error_message: String(error),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

// ============================================
// Example 5: Custom Event Tracking
// ============================================
export function ExampleCustomTracking() {
  const trackCustom = useCustomEvent();

  const handleVideoPlay = () => {
    trackCustom('video_played', {
      video_id: 'intro-video',
      video_duration: 120,
      timestamp: new Date().toISOString(),
    });
  };

  const handleDownload = (fileName: string) => {
    trackCustom('file_downloaded', {
      file_name: fileName,
      file_type: fileName.split('.').pop(),
    });
  };

  return (
    <div>
      <button onClick={handleVideoPlay}>Play Video</button>
      <button onClick={() => handleDownload('guide.pdf')}>Download Guide</button>
    </div>
  );
}

// ============================================
// Example 6: E-commerce Tracking
// ============================================
export function ExampleEcommerceTracking() {
  const { trackEvent } = useAnalytics();

  const trackProductView = (productId: string, productName: string, price: number) => {
    trackEvent({
      event_type: 'ecommerce',
      event_name: 'product_viewed',
      properties: {
        product_id: productId,
        product_name: productName,
        price,
        currency: 'USD',
      },
    });
  };

  const trackAddToCart = (productId: string, quantity: number) => {
    trackEvent({
      event_type: 'ecommerce',
      event_name: 'add_to_cart',
      properties: {
        product_id: productId,
        quantity,
      },
    });
  };

  return <div>Product Page</div>;
}

// ============================================
// Example 7: Search Tracking
// ============================================
export function ExampleSearchTracking() {
  const { trackEvent } = useAnalytics();

  const handleSearch = (query: string, results: number) => {
    trackEvent({
      event_type: 'search',
      event_name: 'site_search',
      properties: {
        search_query: query,
        results_count: results,
        search_location: 'header',
      },
    });
  };

  return <div>Search Component</div>;
}

// ============================================
// Example 8: Module/Feature Interaction
// ============================================
export function ExampleModuleTracking() {
  const { trackEvent } = useAnalytics();

  const trackModuleInteraction = (moduleName: string, action: string) => {
    trackEvent({
      event_type: 'module_interaction',
      event_name: `${moduleName}_${action}`,
      properties: {
        module: moduleName,
        action,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const handleModuleClick = () => {
    trackModuleInteraction('brand_builder', 'view_details');
  };

  return <button onClick={handleModuleClick}>View Module</button>;
}
