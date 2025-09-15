import React, { useState } from 'react';

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({ isOpen, onClose }) => {
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!emailOrPhone.trim()) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would navigate to verification code screen or show success message
      console.log('Verification code sent to:', emailOrPhone);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setEmailOrPhone('');
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-brand-colors-SteamWhite rounded-[20px] shadow-lg w-[480px] max-w-[90vw] p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-brand-colors-RootBlack" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold'] mb-2">
            Reset Password
          </h2>
          <p className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">
            Enter your email or phone number to receive a verification code
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-8">
          <label 
            className="block text-brand-colors-RootBlack text-lg font-normal font-['MadaniArabic-Medium'] mb-3"
            style={{
              color: 'var(--brand-colors-RootBlack, #182605)',
              fontSize: 18,
              fontFamily: 'MadaniArabic-Medium',
              fontWeight: '400'
            }}
          >
            Email or Phone Number
          </label>
          <div className="w-full h-14 px-6 bg-black bg-opacity-5 rounded-[20px] flex items-center">
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter your email or phone number"
              className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack font-normal font-['MadaniArabic-Medium']"
              style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                lineHeight: 24
              }}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className="flex-1 h-12 px-6 py-3 bg-gray-200 rounded-[25px] flex justify-center items-center hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            <span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
              Cancel
            </span>
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={!emailOrPhone.trim() || isLoading}
            className="flex-1 h-12 px-6 py-3 bg-brand-colors-SproutGreen rounded-[25px] flex justify-center items-center hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">
                  Sending...
                </span>
              </div>
            ) : (
              <span 
                className="text-brand-colors-SteamWhite font-normal font-['MadaniArabic-Bold']"
                style={{
                  fontSize: 16,
                  fontFamily: 'MadaniArabic-Bold',
                  fontWeight: '400'
                }}
              >
                Send Code
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;