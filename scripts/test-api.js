#!/usr/bin/env node

// API Test Script for Team Delta Defenders
// Run with: node scripts/test-api.js

// Use built-in fetch (Node.js 18+) or import node-fetch if needed
const fetch = globalThis.fetch || (await import('node-fetch')).default;

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

// Test 1: Health Check
async function testHealthCheck() {
  console.log('📡 Test 1: Health Check');
  const startTime = Date.now();

  try {
    const response = await testWithTimeout(`${API_BASE_URL}/health`);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      console.log(`✅ Health check passed (${responseTime}ms)`);
      try {
        const data = await response.json();
        console.log(`   Response:`, data);
      } catch {
        console.log(`   Response: OK (no JSON body)`);
      }
    } else {
      console.log(`⚠️  Health check returned ${response.status} (${responseTime}ms)`);
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    if (error.name === 'AbortError') {
      console.log(`❌ Health check timeout after ${responseTime}ms`);
    } else {
      console.log(`❌ Health check failed: ${error.message} (${responseTime}ms)`);
    }
  }
  console.log('');
}

// Test 2: Auth Endpoints
async function testAuthEndpoints() {
  console.log('🔐 Test 2: Authentication Endpoints');

  const endpoints = [
    { path: '/auth', method: 'GET', expectStatus: [200, 404] },
    { path: '/auth/me', method: 'GET', expectStatus: [401] }, // Should fail without token
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
    const response = await testWithTimeout(`${API_BASE_URL}/health`, {
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

// Main test runner
async function runTests() {
  const startTime = Date.now();

  await testHealthCheck();
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
  console.log('   1. If tests pass: Deploy to Vercel');
  console.log('   2. If tests fail: Check backend logs on Render.com');
  console.log('   3. Test authentication with actual login/register');
}

// Run the tests
runTests().catch(console.error);