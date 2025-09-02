import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EyeIcon: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <img 
    src={isVisible ? "/eye.svg" : "/eye-closed.svg"} 
    alt={isVisible ? "Hide password" : "Show password"}
    className="w-5 h-5"
  />
);

const BuyerSignupStep2: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: '',
    houseAddress: '',
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
    
    console.log('Buyer Step 2 Form submitted:', formData);
    navigate('/buyer-signup-step3');
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
        backgroundImage: 'url("/buyerssignup2.png")',
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
                Quality Produce, Fair Prices
              </h1>
              <p className="text-brand-colors-SteamWhite text-sm xl:text-base font-madani-medium leading-relaxed">
                Connect directly with farmers for the freshest produce. Build relationships and get the best deals for your business.
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
              Complete your buyer profile
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* House Address */}
            <div className="space-y-1">
              <label htmlFor="houseAddress" className="block text-brand-colors-RootBlack text-sm font-madani-medium">
                House Address
              </label>
              <input
                type="text"
                id="houseAddress"
                name="houseAddress"
                value={formData.houseAddress}
                onChange={handleInputChange}
                placeholder="Enter your house address"
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
                  placeholder="Confirm your password"
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

export default BuyerSignupStep2;