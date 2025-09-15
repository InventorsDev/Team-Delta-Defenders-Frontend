import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'email' | 'phone' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Detect if input is email or phone number
  useEffect(() => {
    if (contact) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[+]?[0-9\-() \s]{10,15}$/;
      
      if (emailRegex.test(contact)) {
        setContactType('email');
      } else if (phoneRegex.test(contact.replace(/\s/g, ''))) {
        setContactType('phone');
      } else {
        setContactType(null);
      }
    } else {
      setContactType(null);
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactType) {
      alert('Please enter a valid email address or phone number');
      return;
    }
    
    setIsLoading(true);
    try {
      // TODO: Implement actual password reset logic
      console.log(`Password reset requested for ${contactType}:`, contact);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to step 2 with contact info and type
      navigate('/forgot-password-step2', { 
        state: { 
          contact, 
          contactType,
          // Keep email for backward compatibility
          email: contactType === 'email' ? contact : ''
        } 
      });
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .custom-placeholder::placeholder {
            opacity: 0.50 !important;
            color: var(--brand-colors-RootBlack, #182605) !important;
            font-size: 14px !important;
            font-family: 'MadaniArabic-Medium' !important;
            font-weight: 400 !important;
            line-height: 37px !important;
            word-wrap: break-word !important;
          }
        `}
      </style>
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
                  Sign In and Get Straight to Business
                </h1>
                <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                  Log in to connect, trade, and grow — whether you're here to sell your harvest or find the freshest produce across Nigeria.
                </p>
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

          {/* Right Side - Form */}
          <div className="w-full max-w-md md:max-w-lg backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-125 border-2 border-white/60 rounded-[30px] p-6 md:p-8 shadow-2xl drop-shadow-2xl before:absolute before:inset-0 before:rounded-[30px] before:bg-gradient-to-br before:from-white/25 before:via-white/8 before:to-transparent before:pointer-events-none relative after:absolute after:inset-0 after:rounded-[30px] after:bg-gradient-to-tl after:from-transparent after:via-transparent after:to-white/15 after:pointer-events-none flex flex-col" style={{ backgroundColor: 'hsla(114, 88%, 94%, 0.5)' }}>
            
            {!isEmailSent ? (
              <>
                {/* Header */}
                <div>
                  <div className="w-16 h-2 bg-brand-colors-SproutGreen rounded-full mb-3" />
                  <h2 className="text-brand-colors-RootBlack text-3xl font-normal font-['MadaniArabic-Bold'] leading-[50px]">
                    Recover Your Password
                  </h2>
                  <p className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9 mt-1">
                    You can request a password reset below. We will send a security code to this email address, please make sure it is correct
                  </p>
                </div>

                {/* Form */}
                <div className="mt-10">
                  <form onSubmit={handleSubmit}>
                    {/* Contact Info */}
                    <div className="space-y-1">
                      <label htmlFor="contact" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                        Email Address or Phone Number
                      </label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter your email address or phone number"
                        className={`w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 rounded-[30px] text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none transition-colors custom-placeholder ${
                          contactType === null && contact ? 'border-red-400' : 'border-brand-colors-HarvestMist focus:border-brand-colors-SproutGreen'
                        }`}
                        required
                      />
                      {contact && contactType && (
                        <p className="text-xs text-brand-colors-SproutGreen mt-1">
                          {contactType === 'email' ? '✓ Valid email address' : '✓ Valid phone number'}
                        </p>
                      )}
                      {contact && !contactType && (
                        <p className="text-xs text-red-500 mt-1">
                          Please enter a valid email address or phone number
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-[30px] flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors mt-6"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                </div>

                {/* Back to Login */}
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-brand-colors-RootBlack text-sm font-madani-medium hover:underline"
                  >
                    ← Back to Login
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  <img 
                    src="/icon-park_success.svg" 
                    alt="Success" 
                    className="w-20 h-20"
                  />
                  
                  <div className="text-center space-y-3">
                    <h2 style={{ 
                      color: 'var(--brand-colors-RootBlack, #182605)', 
                      fontSize: 24, 
                      fontFamily: 'MadaniArabic-Bold', 
                      fontWeight: '400', 
                      wordWrap: 'break-word' 
                    }}>
                      Check your {contactType === 'email' ? 'email' : 'phone'}
                    </h2>
                    <p className="text-brand-colors-RootBlack/70 text-sm font-madani-medium">
                      We've sent a password reset code to <br />
                      <span className="font-madani-bold">{contact}</span>
                    </p>
                    <p className="text-brand-colors-RootBlack/60 text-xs font-madani-medium">
                      Didn't receive the {contactType === 'email' ? 'email' : 'message'}? {contactType === 'email' ? 'Check your spam folder.' : 'Check your messages.'}
                    </p>
                  </div>

                  <div className="space-y-3 w-full">
                    <button
                      onClick={() => {
                        setIsEmailSent(false);
                        setContact('');
                        setContactType(null);
                      }}
                      className="w-full h-11 bg-brand-colors-HarvestMist hover:bg-brand-colors-HarvestMist/80 rounded-[30px] flex items-center justify-center text-brand-colors-RootBlack text-sm font-madani-bold transition-colors"
                    >
                      Try another contact
                    </button>
                    
                    <Link 
                      to="/login"
                      className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-[30px] flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;