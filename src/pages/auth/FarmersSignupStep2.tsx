import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.79 22.38 10.11H12.25V14.26H18.24C17.93 15.72 17.07 16.94 15.83 17.78V20.54H19.41C21.36 18.8 22.56 16.25 22.56 12.25Z" fill="#4285F4"/>
    <path d="M12.25 23C15.49 23 18.2 21.92 19.41 20.54L15.83 17.78C14.82 18.48 13.55 18.9 12.25 18.9C9.12 18.9 6.46 16.94 5.57 14.27H1.86V17.14C3.11 19.62 7.42 23 12.25 23Z" fill="#34A853"/>
    <path d="M5.57 14.27C5.33 13.57 5.2 12.8 5.2 12C5.2 11.2 5.33 10.43 5.57 9.73V6.86H1.86C1.07 8.44 0.625 10.17 0.625 12C0.625 13.83 1.07 15.56 1.86 17.14L5.57 14.27Z" fill="#FBBC05"/>
    <path d="M12.25 5.1C13.71 5.1 15.06 5.67 16.1 6.67L19.24 3.53C18.19 2.56 15.49 1 12.25 1C7.42 1 3.11 4.38 1.86 6.86L5.57 9.73C6.46 7.06 9.12 5.1 12.25 5.1Z" fill="#EA4335"/>
  </svg>
);

const EyeIcon: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <img 
    src={isVisible ? "/eye.svg" : "/eye-closed.svg"} 
    alt={isVisible ? "Hide password" : "Show password"}
    className="w-5 h-5"
  />
);

const SignupStep2: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    state: '',
    farmAddress: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      alert('Please accept the Terms and Conditions to continue.');
      return;
    }
    
    console.log('Step 2 Form submitted:', formData);
    navigate('/farmers-signup-step3');
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
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
        backgroundImage: 'url("/signupstep2.png")',
        backgroundColor: 'hsl(var(--brand-colors-HarvestMist))'
      }}>
        
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
                Your Market, Your Price
              </h1>
              <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                Set your own price, talk to buyers, and close deals your way. AgriLink puts you in control of your hustle.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
                <div className="w-8 h-1 bg-brand-colors-SteamWhite rounded-full" />
                <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
              </div>
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
        <div className="w-full max-w-sm md:max-w-md backdrop-blur-xl backdrop-saturate-200 backdrop-brightness-125 border-2 border-white/60 rounded-2xl p-6 md:p-8 shadow-2xl drop-shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/25 before:via-white/8 before:to-transparent before:pointer-events-none relative after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-transparent after:via-transparent after:to-white/15 after:pointer-events-none" style={{ backgroundColor: 'hsla(114, 88%, 94%, 0.5)' }}>
          {/* Header */}
          <div className="mb-6">
            <div className="w-16 h-2 bg-brand-colors-SproutGreen rounded-full mb-3" />
            <h2 style={{ 
              color: 'var(--brand-colors-RootBlack, #182605)', 
              fontSize: 28, 
              fontFamily: 'MadaniArabic-Bold', 
              fontWeight: '400', 
              wordWrap: 'break-word' 
            }} className="leading-tight">
              Just a few more details
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name */}
            <div className="space-y-1">
              <label htmlFor="businessName" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your Business Name"
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                required
              />
            </div>

            {/* State */}
            <div className="space-y-1">
              <label htmlFor="state" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors"
                required
              >
                <option value="">Enter your state</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="FCT">Federal Capital Territory</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
              </select>
            </div>

            {/* Farm Address */}
            <div className="space-y-1">
              <label htmlFor="farmAddress" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Farm Address
              </label>
              <input
                type="text"
                id="farmAddress"
                name="farmAddress"
                value={formData.farmAddress}
                onChange={handleInputChange}
                placeholder="Enter your farm address"
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full h-11 px-4 pr-12 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
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
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full h-11 px-4 pr-12 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-2xl flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors mt-5"
            >
              Sign Up
            </button>
          </form>


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
      </div>
    </div>
    </>
  );
};

export default SignupStep2;