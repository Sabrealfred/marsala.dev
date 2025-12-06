/**
 * Example Contact Form Component
 *
 * This is a sample React component showing how to integrate with the
 * /api/contact endpoint in your Next.js application.
 */

'use client';

import { useState, FormEvent } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  budget_range?: string;
  timeline?: string;
  services_interested?: string[];
  entryPoint?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    company: '',
    phone: '',
    budget_range: '',
    timeline: '',
    services_interested: [],
    entryPoint: 'contact_page',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState({
    limit: 0,
    remaining: 0,
    reset: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Extract rate limit headers
      const limit = response.headers.get('X-RateLimit-Limit');
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const reset = response.headers.get('X-RateLimit-Reset');

      if (limit && remaining && reset) {
        setRateLimitInfo({
          limit: parseInt(limit),
          remaining: parseInt(remaining),
          reset: new Date(reset).toLocaleTimeString(),
        });
      }

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(data.message);

        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          company: '',
          phone: '',
          budget_range: '',
          timeline: '',
          services_interested: [],
          entryPoint: 'contact_page',
        });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong. Please try again.');

        // Show retry info for rate limit errors
        if (response.status === 429 && data.retryAfter) {
          setResponseMessage(
            `${data.error} Please try again in ${Math.ceil(data.retryAfter / 60)} minutes.`
          );
        }
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services_interested: prev.services_interested?.includes(service)
        ? prev.services_interested.filter(s => s !== service)
        : [...(prev.services_interested || []), service],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      {/* Rate Limit Info */}
      {rateLimitInfo.limit > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          Rate Limit: {rateLimitInfo.remaining} / {rateLimitInfo.limit} requests remaining
          (resets at {rateLimitInfo.reset})
        </div>
      )}

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800">
          ✓ {responseMessage}
        </div>
      )}

      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-800">
          ✗ {responseMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length} / 5000 characters
          </p>
        </div>

        {/* Optional Fields */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Company (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium mb-1">
            Budget Range (Optional)
          </label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a range</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k - $25k">$10k - $25k</option>
            <option value="$25k - $50k">$25k - $50k</option>
            <option value="$50k - $100k">$50k - $100k</option>
            <option value="$100k+">$100k+</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-medium mb-1">
            Timeline (Optional)
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Services Interested (Optional)
          </label>
          <div className="space-y-2">
            {['Web Development', 'Brand Strategy', 'CRM', 'AI Solutions', 'Ads Management', 'Data Analytics'].map(
              service => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.services_interested?.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="mr-2"
                  />
                  {service}
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
