import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ForgotPasswordStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact || '';
  const contactType = location.state?.contactType || 'email';
  const email = location.state?.email || ''; // For backward compatibility
  
  const [pin, setPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinCode = pin.join('');
    
    if (pinCode.length !== 4) {
      setError('Please enter a 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement actual PIN verification logic
      console.log(`PIN verification for ${contactType}:`, contact, "PIN:", pinCode);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to password reset final step
      navigate('/forgot-password-step3', { state: { contact, contactType, email, verified: true } });
    } catch (error) {
      console.error("PIN verification error:", error);
      setError('Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      console.log(`Resending code to ${contactType}:`, contact);
      // TODO: Implement resend logic
      setCountdown(60);
      setCanResend(false);
      alert('Code resent successfully!');
    } catch (error) {
      console.error("Resend error:", error);
    }
  };

  return (
    <>
      <style>
        {`
          .pin-input:focus {
            outline: none;
            border-color: var(--brand-colors-SproutGreen) !important;
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
                <img 
                  src="/Agrilink-logo-light.svg" 
                  alt="Agrilink" 
                  className="h-10 w-auto"
                />
              </div>

              {/* Content at bottom */}
              <div className="space-y-4">
                <h1 className="text-brand-colors-SteamWhite text-2xl xl:text-3xl font-madani-bold leading-tight">
                  Enter Verification Code
                </h1>
                <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                  We've sent a 4-digit verification code to your {contactType === 'email' ? 'email' : 'phone number'}. Enter it below to proceed with resetting your password.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-4">
            <img 
              src="/Agrilink-logo-light.svg" 
              alt="Agrilink" 
              className="h-8 w-auto mx-auto"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md md:max-w-lg backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-125 border-2 border-white/60 rounded-[30px] p-6 md:p-8 shadow-2xl drop-shadow-2xl before:absolute before:inset-0 before:rounded-[30px] before:bg-gradient-to-br before:from-white/25 before:via-white/8 before:to-transparent before:pointer-events-none relative after:absolute after:inset-0 after:rounded-[30px] after:bg-gradient-to-tl after:from-transparent after:via-transparent after:to-white/15 after:pointer-events-none flex flex-col" style={{ backgroundColor: 'hsla(114, 88%, 94%, 0.5)' }}>
            
            {/* Header */}
            <div>
              <div className="w-16 h-2 bg-brand-colors-SproutGreen rounded-full mb-3" />
              <h2 className="text-brand-colors-RootBlack text-3xl font-normal font-['MadaniArabic-Bold'] leading-[50px]">
                Enter Verification Code
              </h2>
              <p className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9 mt-1">
                We sent a 4-digit code to <span className="font-['MadaniArabic-Bold']">{contact}</span>. Enter it below to verify your identity.
              </p>
            </div>

            {/* Form */}
            <div className="mt-10">
              <form onSubmit={handleSubmit}>
                {/* PIN Input */}
                <div className="space-y-1">
                  <label className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                    Verification Code
                  </label>
                  <div className="flex gap-3 justify-center">
                    {pin.map((digit, index) => (
                      <input
                        key={index}
                        id={`pin-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handlePinChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl font-bold bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack focus:outline-none focus:border-brand-colors-SproutGreen transition-colors pin-input"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-[30px] flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors mt-6"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </button>
              </form>

              {/* Resend Code */}
              <div className="text-center mt-4">
                {!canResend ? (
                  <p>
                    <span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
                      Didn't receive the verification code? it could take a bit of time, request a new code in{' '}
                    </span>
                    <span className="text-brand-colors-SproutGreen text-base font-normal font-['MadaniArabic-Medium']">
                      {countdown}
                    </span>
                    <span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
                      {' '}seconds
                    </span>
                  </p>
                ) : (
                  <div>
                    <span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
                      Didn't receive the verification code?{' '}
                    </span>
                    <button
                      onClick={handleResendCode}
                      className="text-brand-colors-SproutGreen text-base font-normal font-['MadaniArabic-Medium'] hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Step 1 */}
            <div className="text-center mt-6">
              <Link 
                to="/forgot-password" 
                className="text-brand-colors-RootBlack text-sm font-madani-medium hover:underline"
              >
                ← Back to Email Entry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordStep2;