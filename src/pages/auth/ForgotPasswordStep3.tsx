import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EyeIcon: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <img 
    src={isVisible ? "/eye.svg" : "/eye-closed.svg"} 
    alt={isVisible ? "Hide password" : "Show password"}
    className="w-5 h-5"
  />
);

const ForgotPasswordStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact || '';
  const contactType = location.state?.contactType || 'email';
  const verified = location.state?.verified || false;

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Redirect if not verified
  React.useEffect(() => {
    if (!verified) {
      navigate('/forgot-password');
    }
  }, [verified, navigate]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/(?=.*[a-z])/.test(password)) errors.push('One lowercase letter');
    if (!/(?=.*[A-Z])/.test(password)) errors.push('One uppercase letter');
    if (!/(?=.*\d)/.test(password)) errors.push('One number');
    if (!/(?=.*[@$!%*?&])/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      alert('Please accept the Terms and Conditions to continue.');
      return;
    }
    
    const newErrors: {[key: string]: string} = {};
    
    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must have: ${passwordErrors.join(', ')}`;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual password reset logic
      console.log(`Password reset completed for ${contactType}:`, contact);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to success page
      navigate('/password-reset-success', { 
        state: { 
          contact, 
          contactType 
        } 
      });
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({ submit: 'Failed to reset password. Please try again.' });
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
                <img 
                  src="/Agrilink-logo-light.svg" 
                  alt="Agrilink" 
                  className="h-10 w-auto"
                />
              </div>

              {/* Content at bottom */}
              <div className="space-y-4">
                <h1 className="text-brand-colors-SteamWhite text-2xl xl:text-3xl font-madani-bold leading-tight">
                  Set Your New Password
                </h1>
                <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                  Choose a strong password to secure your account. Make sure it's something you'll remember but others can't guess.
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
                Create New Password
              </h2>
              <p className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9 mt-1">
                Your identity has been verified. Now create a strong new password for your account.
              </p>
            </div>

            {/* Form */}
            <div className="mt-10">
              <form onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="space-y-1 mb-4">
                  <label htmlFor="password" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your new password"
                      className="w-full h-11 px-4 pr-12 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-[30px] text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-colors-RootBlack/60 hover:text-brand-colors-RootBlack transition-colors"
                    >
                      <EyeIcon isVisible={showPassword} />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1 mb-6">
                  <label htmlFor="confirmPassword" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your new password"
                      className="w-full h-11 px-4 pr-12 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-[30px] text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-colors-RootBlack/60 hover:text-brand-colors-RootBlack transition-colors"
                    >
                      <EyeIcon isVisible={showConfirmPassword} />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-[30px] flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors"
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center mt-4">{errors.submit}</p>
              )}

              {/* Terms and Conditions */}
              <div className="mt-4 flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-brand-colors-SproutGreen"
                  required 
                />
                <label htmlFor="terms" className="text-sm">
                  <span style={{
                    color: 'white', 
                    fontSize: 16, 
                    fontFamily: 'MadaniArabic-Medium', 
                    fontWeight: '400', 
                    wordWrap: 'break-word'
                  }}>I read and consented to the </span>
                  <span style={{
                    color: 'var(--brand-colors-RootBlack, #182605)', 
                    fontSize: 16, 
                    fontFamily: 'MadaniArabic-Medium', 
                    fontWeight: '400', 
                    wordWrap: 'break-word'
                  }}>Terms and Conditions</span>
                </label>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link 
                to="/login" 
                className="text-brand-colors-RootBlack text-sm font-madani-medium hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordStep3;