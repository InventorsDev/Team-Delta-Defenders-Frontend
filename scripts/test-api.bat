@echo off
echo 🧪 Testing Team Delta Defenders API
echo =====================================
echo Base URL: https://team-delta-defenders-backend.onrender.com/api
echo.

echo 📡 Test 1: Health Check
curl -w "Response Time: %%{time_total}s\nStatus: %%{http_code}\n" -s https://team-delta-defenders-backend.onrender.com/api/health
echo.

echo 🔐 Test 2: Auth Endpoint (should return 401)
curl -w "Response Time: %%{time_total}s\nStatus: %%{http_code}\n" -s https://team-delta-defenders-backend.onrender.com/api/auth/me
echo.

echo 🌐 Test 3: CORS Preflight
curl -X OPTIONS -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: GET" -w "Response Time: %%{time_total}s\nStatus: %%{http_code}\n" -s https://team-delta-defenders-backend.onrender.com/api/health
echo.

echo =====================================
echo 🏁 Tests completed!
echo.
echo 💡 Next steps:
echo    1. If tests pass: Deploy to Vercel
echo    2. If tests fail: Check backend logs on Render.com
echo    3. Test authentication with actual login/register
echo.
pause