// API Connection Test for Team Delta Defenders Backend

import { api } from './api';

// Test the API connection to Render.com backend
export const testApiConnection = async (): Promise<{
  success: boolean;
  message: string;
  responseTime: number;
  baseUrl: string;
}> => {
  const startTime = Date.now();
  const baseUrl = process.env.REACT_APP_API_URL || 'Not configured';

  try {
    console.log('🚀 Testing API connection to:', baseUrl);

    // Test a simple products endpoint (public endpoint)
    const response = await api.get('/products');

    const responseTime = Date.now() - startTime;

    return {
      success: true,
      message: `✅ API connection successful! Response time: ${responseTime}ms`,
      responseTime,
      baseUrl,
    };

  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    console.error('❌ API connection failed:', error);

    return {
      success: false,
      message: `❌ API connection failed: ${error.message || 'Unknown error'}`,
      responseTime,
      baseUrl,
    };
  }
};

// Test available endpoints
export const testAvailableEndpoints = async (): Promise<{
  success: boolean;
  results: Array<{ endpoint: string; status: string; message: string }>;
}> => {
  const endpoints = [
    { path: '/products', method: 'GET', description: 'Get all products (public)' },
    { path: '/orders/123', method: 'GET', description: 'Get order details (should fail without token)' },
    { path: '/admin/users', method: 'GET', description: 'Get users (admin only, should fail without token)' },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      console.log(`🔍 Testing ${endpoint.method} ${endpoint.path}`);

      if (endpoint.method === 'GET') {
        await api.get(endpoint.path);
        results.push({
          endpoint: endpoint.path,
          status: '✅ Success',
          message: endpoint.description,
        });
      }
    } catch (error: any) {
      // For protected endpoints, a 401 error is expected without authentication
      if ((endpoint.path.includes('/orders/') || endpoint.path.includes('/admin/')) && error.status === 401) {
        results.push({
          endpoint: endpoint.path,
          status: '✅ Expected',
          message: '401 Unauthorized (expected without token)',
        });
      } else if (endpoint.path === '/products') {
        results.push({
          endpoint: endpoint.path,
          status: '❌ Failed',
          message: error.message || 'Unknown error',
        });
      } else {
        results.push({
          endpoint: endpoint.path,
          status: '⚠️  Uncertain',
          message: error.message || 'Unknown error',
        });
      }
    }
  }

  const allSuccessful = results.every(r =>
    r.status.includes('✅')
  );

  return {
    success: allSuccessful,
    results,
  };
};

// Comprehensive API test function
export const runApiTests = async (): Promise<void> => {
  console.log('🧪 Starting API Tests for Team Delta Defenders Backend');
  console.log('===============================================');

  // Test 1: Basic connection
  console.log('\n📡 Test 1: Basic API Connection');
  const connectionTest = await testApiConnection();
  console.log(connectionTest.message);
  console.log(`Base URL: ${connectionTest.baseUrl}`);
  console.log(`Response Time: ${connectionTest.responseTime}ms`);

  // Test 2: Available endpoints
  console.log('\n🔗 Test 2: Available Endpoints');
  const endpointTest = await testAvailableEndpoints();
  endpointTest.results.forEach(result => {
    console.log(`${result.status} ${result.endpoint} - ${result.message}`);
  });

  // Test 3: CORS and Headers
  console.log('\n🌐 Test 3: CORS and Security Headers');
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + '/products', {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    });

    if (response.ok) {
      console.log('✅ CORS preflight check passed');
    } else {
      console.log('⚠️  CORS preflight check failed');
    }
  } catch (error) {
    console.log('❌ CORS test failed:', error);
  }

  console.log('\n===============================================');
  console.log('🏁 API Tests Complete');

  if (connectionTest.success && endpointTest.success) {
    console.log('✅ All tests passed! API is ready for integration.');
  } else {
    console.log('⚠️  Some tests failed. Check backend configuration.');
  }
};

// Export for use in development
export default {
  testApiConnection,
  testAvailableEndpoints,
  runApiTests,
};