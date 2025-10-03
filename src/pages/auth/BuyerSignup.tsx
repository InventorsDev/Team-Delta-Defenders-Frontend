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

const BuyerSignup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',  // Changed from phoneNumber to phone
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    sessionStorage.setItem('buyerSignupStep1', JSON.stringify(formData));
    navigate('/buyer-signup-step2');
  };

  const handleGoogleSignup = () => {
    // Google signup functionality to be implemented
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
        backgroundImage: 'url("/buyersignup1.webp")',
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
          {/* Fixed height box matching form height */}
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
                Buy Direct from Farmers
              </h1>
              <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                Access fresh farm produce directly from farmers. Get the best quality at fair prices with no middleman markup.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <div className="w-8 h-1 bg-brand-colors-SteamWhite rounded-full" />
                <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
                <div className="w-6 h-1 bg-brand-colors-SteamWhite/50 rounded-full" />
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
              Create your buyers account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full h-11 px-4 bg-brand-colors-HarvestMist border-2 border-brand-colors-HarvestMist rounded-2xl text-brand-colors-RootBlack text-sm font-madani-medium focus:outline-none focus:border-brand-colors-SproutGreen transition-colors custom-placeholder"
                required
              />
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 rounded-2xl flex items-center justify-center text-brand-colors-SteamWhite text-sm font-madani-bold transition-colors mt-5"
            >
              Get Started
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-brand-colors-RootBlack/20"></div>
            <span className="text-brand-colors-RootBlack/60 text-sm font-madani-medium">Or</span>
            <div className="flex-1 h-px bg-brand-colors-RootBlack/20"></div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full h-11 bg-brand-colors-SteamWhite hover:bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-brand-colors-RootBlack text-sm font-madani-bold transition-colors"
          >
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm">
            <span style={{
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'MadaniArabic-Medium', 
              fontWeight: '400', 
              wordWrap: 'break-word'
            }}>Already have an account? </span>
            <Link 
              to="/login" 
              className="hover:underline"
              style={{
                color: 'var(--brand-colors-RootBlack, #182605)', 
                fontSize: 16, 
                fontFamily: 'MadaniArabic-Medium', 
                fontWeight: '400', 
                wordWrap: 'break-word'
              }}
            >
              Login
            </Link>
          </p>

          {/* Switch to Farmer Signup */}
          <p className="mt-2 text-center text-sm">
            <span style={{
              color: 'white', 
              fontSize: 14, 
              fontFamily: 'MadaniArabic-Medium', 
              fontWeight: '400', 
              wordWrap: 'break-word'
            }}>Want to sell produce? </span>
            <Link 
              to="/farmers-signup" 
              className="hover:underline"
              style={{
                color: 'var(--brand-colors-RootBlack, #182605)', 
                fontSize: 14, 
                fontFamily: 'MadaniArabic-Medium', 
                fontWeight: '400', 
                wordWrap: 'break-word'
              }}
            >
              Sign up as Farmer
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyerSignup;