/**
 * Test script for the Contact Form API
 *
 * Run this with: npx tsx app/api/contact/test-api.ts
 * Or with Node: node --loader ts-node/esm app/api/contact/test-api.ts
 *
 * This script tests the contact form API endpoint locally
 */

const BASE_URL = 'http://localhost:3000';

interface TestResult {
  test: string;
  passed: boolean;
  status?: number;
  message?: string;
  data?: any;
}

const results: TestResult[] = [];

async function testContactAPI() {
  console.log('🧪 Testing Contact Form API\n');
  console.log('Make sure your dev server is running on http://localhost:3000\n');

  // Test 1: Valid submission with all fields
  await testValidSubmissionComplete();

  // Test 2: Valid submission with required fields only
  await testValidSubmissionMinimal();

  // Test 3: Missing required fields
  await testMissingRequiredFields();

  // Test 4: Invalid email format
  await testInvalidEmail();

  // Test 5: Message too short
  await testMessageTooShort();

  // Test 6: Message too long
  await testMessageTooLong();

  // Test 7: Rate limiting (6 requests in a row)
  await testRateLimiting();

  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS');
  console.log('='.repeat(60) + '\n');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  results.forEach((result, index) => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} Test ${index + 1}: ${result.test}`);
    if (result.message) {
      console.log(`   ${result.message}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`Total: ${results.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('='.repeat(60) + '\n');

  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the details above.');
  }
}

async function testValidSubmissionComplete() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a complete test message with all fields populated to verify the API works correctly.',
        company: 'Acme Corporation',
        phone: '+1-555-0123',
        budget_range: '$25k - $50k',
        timeline: '3-6 months',
        services_interested: ['Web Development', 'Brand Strategy', 'CRM'],
        entryPoint: 'test_script',
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Valid submission with all fields',
      passed: response.ok && data.success === true,
      status: response.status,
      message: data.message || data.error,
      data,
    });
  } catch (error) {
    results.push({
      test: 'Valid submission with all fields',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testValidSubmissionMinimal() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        message: 'This is a minimal test message with only required fields.',
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Valid submission with required fields only',
      passed: response.ok && data.success === true,
      status: response.status,
      message: data.message || data.error,
    });
  } catch (error) {
    results.push({
      test: 'Valid submission with required fields only',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testMissingRequiredFields() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        // Missing email and message
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Missing required fields (should fail with 400)',
      passed: response.status === 400 && data.error !== undefined,
      status: response.status,
      message: data.error,
    });
  } catch (error) {
    results.push({
      test: 'Missing required fields',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testInvalidEmail() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email-format',
        message: 'Testing invalid email format validation in the contact form.',
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Invalid email format (should fail with 400)',
      passed: response.status === 400 && data.error?.includes('email'),
      status: response.status,
      message: data.error,
    });
  } catch (error) {
    results.push({
      test: 'Invalid email format',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testMessageTooShort() {
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Short',
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Message too short (should fail with 400)',
      passed: response.status === 400 && data.error?.includes('10 characters'),
      status: response.status,
      message: data.error,
    });
  } catch (error) {
    results.push({
      test: 'Message too short',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testMessageTooLong() {
  try {
    const message = 'A'.repeat(5001); // 5001 characters

    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message,
      }),
    });

    const data = await response.json();

    results.push({
      test: 'Message too long (should fail with 400)',
      passed: response.status === 400 && data.error?.includes('5000 characters'),
      status: response.status,
      message: data.error,
    });
  } catch (error) {
    results.push({
      test: 'Message too long',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function testRateLimiting() {
  try {
    console.log('\n⏱️  Testing rate limiting (sending 6 requests)...');

    const requests = [];
    for (let i = 1; i <= 6; i++) {
      requests.push(
        fetch(`${BASE_URL}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `Rate Limit Test ${i}`,
            email: `ratelimit${i}@example.com`,
            message: `Rate limit test message number ${i}. Testing the rate limiting functionality.`,
          }),
        })
      );
    }

    const responses = await Promise.all(requests);
    const lastResponse = responses[5]; // 6th request (index 5)
    const data = await lastResponse.json();

    // Check if 6th request was rate limited
    const rateLimited = lastResponse.status === 429;

    // Get rate limit headers from one of the successful requests
    const successResponse = responses.find(r => r.ok);
    const rateLimitInfo = successResponse
      ? {
          limit: successResponse.headers.get('X-RateLimit-Limit'),
          remaining: successResponse.headers.get('X-RateLimit-Remaining'),
          reset: successResponse.headers.get('X-RateLimit-Reset'),
        }
      : null;

    results.push({
      test: 'Rate limiting (6th request should be blocked)',
      passed: rateLimited,
      status: lastResponse.status,
      message: rateLimited
        ? `Rate limited successfully. ${data.error}`
        : 'Rate limiting did not work as expected',
      data: rateLimitInfo,
    });
  } catch (error) {
    results.push({
      test: 'Rate limiting',
      passed: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

// Run tests
testContactAPI().catch(console.error);
