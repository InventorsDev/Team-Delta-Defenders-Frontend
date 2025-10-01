// Development component to test API integration
// Remove this component in production

import React, { useState, useEffect } from 'react';
import { runApiTests, testApiConnection } from '../../services/apiTest';

interface ApiTestResult {
  success: boolean;
  message: string;
  responseTime: number;
  baseUrl: string;
}

const ApiTestComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResult, setTestResult] = useState<ApiTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only show in development
  useEffect(() => {
    setIsVisible(import.meta.env.MODE === 'development' || import.meta.env.VITE_ENVIRONMENT === 'development');
  }, []);

  const handleQuickTest = async () => {
    setIsLoading(true);
    try {
      const result = await testApiConnection();
      setTestResult(result);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFullTest = async () => {
    setIsLoading(true);
    try {
      await runApiTests();
      // Check console for detailed results
      alert('Full API tests completed! Check the console for detailed results.');
    } catch (error) {
      console.error('Full test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-800">🧪 API Test</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 text-lg"
        >
          ×
        </button>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-600 mb-2">
          Backend: {import.meta.env.VITE_API_URL}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleQuickTest}
            disabled={isLoading}
            className="flex-1 bg-blue-500 text-white text-xs py-2 px-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Quick Test'}
          </button>

          <button
            onClick={handleFullTest}
            disabled={isLoading}
            className="flex-1 bg-green-500 text-white text-xs py-2 px-3 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Full Test
          </button>
        </div>

        {testResult && (
          <div className={`text-xs p-2 rounded ${
            testResult.success
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            <div className="font-medium mb-1">
              {testResult.success ? '✅ Connected' : '❌ Failed'}
            </div>
            <div>Time: {testResult.responseTime}ms</div>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        Development only - remove in production
      </div>
    </div>
  );
};

export default ApiTestComponent;