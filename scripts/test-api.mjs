#!/usr/bin/env node

// API Test Script for Team Delta Defenders (ES Module)
// Run with: node scripts/test-api.mjs

const API_BASE_URL = 'https://team-delta-defenders-backend.onrender.com/api';
const TIMEOUT = 45000; // 45 seconds

console.log('🧪 Testing Team Delta Defenders API');
console.log('=====================================');
console.log(`Base URL: ${API_BASE_URL}`);
console.log('');

// Test function with timeout
async function testWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Test 1: Products Endpoint (Public)
async function testProductsEndpoint() {
  console.log('📡 Test 1: Products Endpoint (Public)');
  const startTime = Date.now();

  try {
    const response = await testWithTimeout(`${API_BASE_URL}/products`);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      console.log(`✅ Products endpoint accessible (${responseTime}ms)`);
      try {
        const data = await response.json();
        console.log(`   Found ${Array.isArray(data) ? data.length : 'unknown'} products`);
      } catch {
        console.log(`   Response: OK (no JSON body)`);
      }
    } else {
      console.log(`⚠️  Products endpoint returned ${response.status} (${responseTime}ms)`);
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    if (error.name === 'AbortError') {
      console.log(`❌ Products endpoint timeout after ${responseTime}ms`);
    } else {
      console.log(`❌ Products endpoint failed: ${error.message} (${responseTime}ms)`);
    }
  }
  console.log('');
}

// Test 2: Authentication Endpoints
async function testAuthEndpoints() {
  console.log('🔐 Test 2: Authentication Endpoints');

  // Test authentication endpoints that should work with invalid data
  const endpoints = [
    {
      path: '/auth/login',
      method: 'POST',
      expectStatus: [400, 401, 422], // Bad request, unauthorized, or validation error
      body: { email: '', password: '' }
    },
    {
      path: '/auth/register',
      method: 'POST',
      expectStatus: [400, 422], // Bad request or validation error
      body: { email: '', password: '', name: '' }
    },
  ];

  for (const endpoint of endpoints) {
    const startTime = Date.now();
    try {
      const response = await testWithTimeout(`${API_BASE_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: endpoint.body ? JSON.stringify(endpoint.body) : undefined,
      });

      const responseTime = Date.now() - startTime;

      if (endpoint.expectStatus.includes(response.status)) {
        console.log(`✅ ${endpoint.method} ${endpoint.path} - ${response.status} (${responseTime}ms)`);
      } else {
        console.log(`⚠️  ${endpoint.method} ${endpoint.path} - ${response.status} (expected ${endpoint.expectStatus.join(' or ')}) (${responseTime}ms)`);
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.log(`❌ ${endpoint.method} ${endpoint.path} - ${error.message} (${responseTime}ms)`);
    }
  }
  console.log('');
}

// Test 3: CORS Check
async function testCORS() {
  console.log('🌐 Test 3: CORS Configuration');

  try {
    const response = await testWithTimeout(`${API_BASE_URL}/products`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    });

    if (response.ok || response.status === 204) {
      console.log('✅ CORS preflight check passed');

      const corsHeaders = {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials'),
      };

      Object.entries(corsHeaders).forEach(([header, value]) => {
        if (value) {
          console.log(`   ${header}: ${value}`);
        }
      });
    } else {
      console.log(`⚠️  CORS preflight returned ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ CORS test failed: ${error.message}`);
  }
  console.log('');
}

// Test 4: Protected Endpoints
async function testProtectedRoutes() {
  console.log('🔍 Test 4: Protected Endpoints');

  const routes = [
    { path: '/orders/123', name: 'Order Details (Protected)', expectStatus: [401, 404] },
    { path: '/admin/users', name: 'Admin Users (Protected)', expectStatus: [401, 403] },
    { path: '/messages/123', name: 'Messages (Protected)', expectStatus: [401, 404] },
  ];

  for (const route of routes) {
    const startTime = Date.now();
    try {
      const response = await testWithTimeout(`${API_BASE_URL}${route.path}`);
      const responseTime = Date.now() - startTime;

      if (route.expectStatus.includes(response.status)) {
        console.log(`✅ ${route.name} - ${response.status} (expected) (${responseTime}ms)`);
      } else {
        console.log(`⚠️  ${route.name} - ${response.status} (expected ${route.expectStatus.join(' or ')}) (${responseTime}ms)`);
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.log(`❌ ${route.name} - ${error.message} (${responseTime}ms)`);
    }
  }
  console.log('');
}

// Main test runner
async function runTests() {
  const startTime = Date.now();

  await testProductsEndpoint();
  await testProtectedRoutes();
  await testAuthEndpoints();
  await testCORS();

  const totalTime = Date.now() - startTime;
  console.log('=====================================');
  console.log(`🏁 Tests completed in ${totalTime}ms`);
  console.log('');

  if (totalTime > 30000) {
    console.log('⚠️  Note: Backend may have been cold starting (first request after inactivity)');
    console.log('   Subsequent requests should be much faster.');
  }

  console.log('💡 Next steps:');
  console.log('   1. If tests pass: Ready for frontend integration');
  console.log('   2. If tests fail: Check backend logs on Render.com');
  console.log('   3. Test authentication with actual login/register forms');
  console.log('');
  console.log('🚀 Backend endpoints updated to match API specification!');
  console.log(`   API Base URL: ${API_BASE_URL}`);
  console.log('   Available endpoints:');
  console.log('   • POST /auth/register - create new account');
  console.log('   • POST /auth/login - login and receive JWT');
  console.log('   • GET /products - list all products');
  console.log('   • POST /products - create product (farmer)');
  console.log('   • GET /products/:id - get product details');
  console.log('   • PUT /products/:id - update product');
  console.log('   • DELETE /products/:id - delete product');
  console.log('   • POST /orders - create order (buyer)');
  console.log('   • GET /orders/:id - view order details');
  console.log('   • GET /orders/user/:id - get orders for user');
  console.log('   • POST /messages - send message');
  console.log('   • GET /messages/:userId - get chat history');
  console.log('   • GET /admin/users - view all users (admin)');
  console.log('   • DELETE /admin/users/:id - remove user (admin)');
  console.log('   • PUT /admin/products/:id - approve/remove product (admin)');
}

// Run the tests
runTests().catch(console.error);