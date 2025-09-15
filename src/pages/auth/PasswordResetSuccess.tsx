import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact || '';
  const contactType = location.state?.contactType || 'email';
  
  const [countdown, setCountdown] = useState(10);
  const [showFallbackLink, setShowFallbackLink] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto redirect when countdown reaches 0
      navigate('/login');
    }
  }, [countdown, navigate]);

  // Show fallback link after 5 seconds in case auto-redirect fails
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallbackLink(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center" style={{
        backgroundImage: 'url("/Login.png")',
        backgroundColor: 'hsl(var(--brand-colors-HarvestMist))'
      }}>
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'hsla(0, 0%, 0%, 0.6)',
            zIndex: 1
          }}
        />
        
        <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-center lg:justify-between p-4 md:p-6 lg:p-8 xl:px-12 gap-4 lg:gap-8">
          {/* Left Side - Brand */}
          <div className="hidden lg:flex max-w-sm xl:max-w-md">
            <div className="flex flex-col justify-between p-8 w-full">
              {/* Logo at top */}
              <div>
                <Link to="/">
                  <img 
                    src="/Agrilink-logo-light.svg" 
                    alt="Agrilink" 
                    className="h-10 w-auto"
                  />
                </Link>
              </div>

              {/* Content at bottom */}
              <div className="space-y-4">
                <h1 className="text-brand-colors-SteamWhite text-2xl xl:text-3xl font-madani-bold leading-tight">
                  Password Reset Complete
                </h1>
                <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                  Your password has been successfully updated. You can now log in with your new password and continue accessing your account.
                </p>
                <div className="flex items-center gap-2 mt-6">
                  <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
                  <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
                  <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
                  <div className="w-8 h-1 bg-brand-colors-SteamWhite rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-4">
            <Link to="/">
              <img 
                src="/Agrilink-logo-light.svg" 
                alt="Agrilink" 
                className="h-8 w-auto mx-auto"
              />
            </Link>
          </div>

          {/* Right Side - Success Card */}
          <div className="w-full max-w-sm md:max-w-md backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-125 border-2 border-white/60 rounded-2xl p-6 md:p-8 shadow-2xl drop-shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/25 before:via-white/8 before:to-transparent before:pointer-events-none relative after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-transparent after:via-transparent after:to-white/15 after:pointer-events-none flex flex-col justify-between" style={{ backgroundColor: 'rgba(228, 253, 225, 0.50)' }}>
            {/* Header */}
            <div>
              <div className="w-16 h-2 bg-brand-colors-SproutGreen rounded-full mb-3" />
              <h2 style={{ 
                color: 'var(--brand-colors-RootBlack, #182605)', 
                fontSize: 28, 
                fontFamily: 'MadaniArabic-Bold', 
                fontWeight: '400', 
                wordWrap: 'break-word' 
              }} className="leading-tight">
                Password Reset Successful
              </h2>
            </div>

            {/* Success Icon - Centered with content below */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-6">
              <img 
                src="/icon-park_success.svg" 
                alt="Success" 
                className="w-32 h-32"
              />
              
              {/* Content Section - Close to icon */}
              <div className="space-y-3">
              
              <div style={{width: '100%', textAlign: 'center'}}>
                {!showFallbackLink ? (
                  <>
                    <span style={{
                      color: 'white', 
                      fontSize: '18px', 
                      fontFamily: 'MadaniArabic-Bold', 
                      fontWeight: 400, 
                      wordWrap: 'break-word'
                    }}>
                      You'll be redirected to login in&nbsp;
                    </span>
                    <span style={{
                      color: '#182605', 
                      fontSize: '18px', 
                      fontFamily: 'MadaniArabic-Bold', 
                      fontWeight: 400, 
                      wordWrap: 'break-word'
                    }}>
                      {countdown}
                    </span>
                    <span style={{
                      color: 'white', 
                      fontSize: '18px', 
                      fontFamily: 'MadaniArabic-Bold', 
                      fontWeight: 400, 
                      wordWrap: 'break-word'
                    }}>
                      &nbsp;seconds
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{
                      color: 'white', 
                      fontSize: '18px', 
                      fontFamily: 'MadaniArabic-Bold', 
                      fontWeight: 400, 
                      wordWrap: 'break-word'
                    }}>
                      Not automatically redirected?&nbsp;
                    </span>
                  </>
                )}
              </div>
              
              <button 
                type="button"
                className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-2xl flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors"
                onClick={handleContinue}
              >
                Continue to Login
              </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <p style={{
                color: 'var(--brand-colors-RootBlack, #182605)', 
                fontSize: 14, 
                fontFamily: 'MadaniArabic-Medium', 
                fontWeight: '400', 
                wordWrap: 'break-word'
              }}>
                Your password has been successfully updated for {contactType === 'email' ? 'email' : 'phone number'}: <br />
                <span className="font-['MadaniArabic-Bold']">{contact}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetSuccess;