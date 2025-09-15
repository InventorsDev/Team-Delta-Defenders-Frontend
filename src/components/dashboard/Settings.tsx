import React, { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';
import LogoutModal from './LogoutModal';

interface MenuItem {
  id: string;
  label: string;
}

interface SettingsProps {
  context?: 'farmer' | 'marketplace';
  headerTitle?: string;
  headerSubtitle?: string;
  showHeader?: boolean;
  menuItems?: MenuItem[];
  showBusinessName?: boolean;
  placeholders?: {
    fullName?: string;
    businessName?: string;
    phoneNumber?: string;
    email?: string;
    houseAddress?: string;
  };
}

const Settings: React.FC<SettingsProps> = ({
  context = 'farmer',
  headerTitle = 'Manage Your Preferences',
  headerSubtitle = 'Your Settings',
  showHeader = true,
  menuItems,
  showBusinessName = true,
  placeholders = {}
}) => {
  const [activeSection, setActiveSection] = useState<string>('personal-details');
  const [selectedState, setSelectedState] = useState<string>('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'warning'>('warning');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  
  // Address Book data
  const [addresses] = useState([
    {
      id: 1,
      location: 'Ojo, Lagos',
      address: 'Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria'
    },
    {
      id: 2,
      location: 'Kura, Kano',
      address: 'No. 12, Sabon Gari Road, Kura LGA, Kano State, Nigeria'
    },
    {
      id: 3,
      location: 'Ifo, Ogun',
      address: 'Block 7, Aiyetoro Road, Ifo LGA, Ogun State, Nigeria'
    }
  ]);
  
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
    'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const defaultFarmerMenuItems = [
    { id: 'personal-details', label: 'Personal details' },
    { id: 'address-book', label: 'Address Book' },
    { id: 'change-language', label: 'Change Language' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'delete-account', label: 'Delete Account' }
  ];

  const defaultMarketplaceMenuItems = [
    { id: 'personal-details', label: 'Personal details' },
    { id: 'change-language', label: 'Change Language' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'delete-account', label: 'Delete Account' },
    { id: 'logout', label: 'Logout' }
  ];

  const settingsMenuItems = menuItems || (context === 'marketplace' ? defaultMarketplaceMenuItems : defaultFarmerMenuItems);

  const defaultPlaceholders = {
    fullName: context === 'marketplace' ? 'Enter your full name' : 'Enter your Full name',
    businessName: 'Enter your Business Name',
    phoneNumber: 'Enter your phone number',
    email: 'Enter your email address'
  };

  const finalPlaceholders = { ...defaultPlaceholders, ...placeholders };

  const handleMenuClick = (sectionId: string) => {
    if (sectionId === 'delete-account') {
      setShowDeleteAccountModal(true);
    } else if (sectionId === 'logout') {
      setShowLogoutModal(true);
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setIsStateDropdownOpen(false);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSaveLanguage = () => {
    if (selectedLanguage !== 'English') {
      setToastMessage('This language is not yet available');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setToastMessage('Language saved successfully');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setToastMessage('Please fill in all password fields');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastMessage('New password and confirm password do not match');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setToastMessage('Password must be at least 8 characters long');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setToastMessage('Password changed successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(false);
    setToastMessage('Account deleted successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    setToastMessage('Logged out successfully');
    setToastType('success');
    setShowToast(true);

    // Redirect to landing page after showing toast
    setTimeout(() => {
      setShowToast(false);
      window.location.href = '/';
    }, 1500);
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'personal-details':
        return 'Personal Details';
      case 'address-book':
        return 'Address Book';
      case 'change-language':
        return 'Change Language';
      case 'change-password':
        return 'Change Password';
      default:
        return 'Personal Details';
    }
  };

  return (
    <div className="w-[1129px] h-[980px] relative bg-brand-colors-SteamWhite rounded-[20px]">
      {/* Header */}
      {showHeader && (
        <div className="w-[1129px] px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
          <div className="inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
              {headerTitle}
            </div>
            <div className="w-80 justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">
              {headerSubtitle}
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <div className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 relative overflow-hidden">
                  <img src="/notification-icon.svg" alt="Notifications" className="w-6 h-6" />
                </div>
              </div>
            </div>
            <img className="w-10 h-10 rounded-full object-cover" src="/profile image.png" alt="Profile" />
          </div>
        </div>
      )}

      {/* Settings Menu Sidebar */}
      <div className={`w-80 h-[824px] px-2.5 py-5 left-[40px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] inline-flex flex-col justify-start items-start gap-5 overflow-hidden ${
        showHeader ? 'top-[126px]' : 'top-[40px]'
      }`}>
        {settingsMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`self-stretch h-12 px-6 py-3 rounded-[20px] inline-flex justify-start items-center gap-2.5 transition-colors ${
              activeSection === item.id
                ? 'bg-black/10'
                : 'bg-brand-colors-SteamWhite hover:bg-black/5'
            }`}
          >
            <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className={`w-[693px] h-[824px] left-[396px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden relative ${
        showHeader ? 'top-[126px]' : 'top-[40px]'
      }`}>
        {/* Content Header */}
        <div className="w-[693px] p-5 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
          <div className="justify-start text-black text-2xl font-normal font-['MadaniArabic-Bold']">
            {getSectionTitle()}
          </div>
        </div>

        {/* Content based on active section */}
        {activeSection === 'personal-details' && (
          <>
            {/* Profile Picture */}
            <img src="/upload-image.svg" alt="Upload" data-property-1="upload" className="w-24 h-24 left-[295px] top-[76px] absolute rounded-[10px] overflow-hidden" />

            {/* Form Fields */}
            <div className="w-[553px] left-[70px] top-[219px] absolute inline-flex flex-col justify-start items-center gap-7">
          {/* Full Name */}
          <div data-property-1="alternate default" className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Full Name
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input
                type="text"
                placeholder={finalPlaceholders.fullName}
                className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Business Name */}
          {showBusinessName && (
            <div data-property-1="alternate default" className="self-stretch flex flex-col justify-start items-start gap-5">
              <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
                Business Name
              </div>
              <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
                <input
                  type="text"
                  placeholder={finalPlaceholders.businessName}
                  className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
                />
              </div>
            </div>
          )}

          {/* State */}
          <div data-property-1="alternate default" className="self-stretch inline-flex flex-col justify-start items-start gap-5 relative z-10">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              State
            </div>
            <div className="relative w-full">
              <button 
                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                className="self-stretch w-full h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-between items-center overflow-visible cursor-pointer"
              >
                <div className={`justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9 ${!selectedState ? 'opacity-50' : ''}`}>
                  {selectedState || 'Enter your state'}
                </div>
                <div data-property-1="down" className="flex justify-start items-center gap-2.5">
                  <img src="/chevron-down-2.svg" alt="Dropdown" className="w-6 h-6" />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isStateDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] border border-black/5 max-h-64 overflow-y-auto z-[100]">
                  {nigerianStates.map((state) => (
                    <button
                      key={state}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStateSelect(state);
                      }}
                      className={`w-full px-7 py-3 text-left hover:bg-black/5 transition-colors ${
                        selectedState === state ? 'bg-black/10' : ''
                      }`}
                    >
                      <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
                        {state}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div data-property-1="alternate default" className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Phone Number
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input
                type="tel"
                placeholder={finalPlaceholders.phoneNumber}
                className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Email */}
          <div data-property-1="alternate default" className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Email
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input
                type="email"
                placeholder={finalPlaceholders.email}
                className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

              {/* Save Button */}
              <div data-property-1="Default" className="self-stretch h-14 min-w-48 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">
                  Save
                </div>
              </div>
            </div>
          </>
        )}

        {/* Address Book Section */}
        {activeSection === 'address-book' && (
          <div className="w-[553px] left-[70px] top-[98px] absolute inline-flex flex-col justify-start items-center gap-9 max-h-[700px] overflow-y-auto">
            {addresses.map((address) => (
              <div key={address.id} data-property-1="default" className="self-stretch px-6 pt-4 pb-7 bg-black/5 rounded-[30px] flex flex-col justify-start items-start gap-5">
                <div className="self-stretch inline-flex justify-between items-start">
                  <div className="flex justify-start items-center gap-1">
                    <div className="flex justify-start items-center gap-2.5">
                      <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-4 h-3.5 left-[4px] top-[7.50px] absolute bg-brand-colors-RootBlack"></div>
                        <div className="w-3.5 h-4 left-[4.50px] top-[2px] absolute opacity-30 bg-brand-colors-RootBlack"></div>
                      </div>
                    </div>
                    <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
                      {address.location}
                    </div>
                  </div>
                  <div data-property-1="Default" className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] flex justify-center items-center gap-2.5 cursor-pointer hover:bg-brand-colors-HarvestMist/80 transition-colors">
                    <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
                      Edit
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                  <div className="self-stretch justify-start text-black text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
                    Farm Address:
                  </div>
                  <div className="self-stretch justify-start text-brand-colors-rootgrey text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
                    {address.address}
                  </div>
                </div>
              </div>
            ))}
            <div data-property-1="Default" className="self-stretch h-14 min-w-48 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-brand-colors-SproutGreen/90 transition-colors">
              <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">
                Add New Location
              </div>
            </div>
          </div>
        )}

        {/* Change Language Section */}
        {activeSection === 'change-language' && (
          <div className="w-[553px] left-[70px] top-[98px] absolute flex flex-col justify-center items-center gap-[30px] h-[500px]">
            <div className="flex flex-col gap-[25px] w-full max-w-[450px]">
              {['English', 'Igbo', 'Yoruba', 'Hausa'].map((language) => (
                <div
                  key={language}
                  className="w-full px-4 py-4 bg-black bg-opacity-5 rounded-[15px] flex justify-between items-center cursor-pointer hover:bg-opacity-10 transition-colors"
                  onClick={() => handleLanguageSelect(language)}
                >
                  <div className="text-brand-colors-RootBlack text-lg font-normal font-['MadaniArabic-Medium'] leading-7">{language}</div>
                  <div className="w-5 h-5 relative overflow-hidden rounded-full border border-brand-colors-SproutGreen">
                    {selectedLanguage === language && (
                      <div className="w-full h-full absolute bg-brand-colors-SproutGreen rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveLanguage}
              className="w-full max-w-[300px] h-[50px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[25px] flex justify-center items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">Save</div>
            </button>
          </div>
        )}

        {/* Change Password Section */}
        {activeSection === 'change-password' && (
          <div className="w-[553px] left-[70px] top-[98px] absolute flex flex-col justify-center items-center gap-[30px] h-[500px]">
            <div className="flex flex-col gap-[25px] w-full max-w-[450px]">
              {/* Old Password */}
              <div className="flex flex-col gap-3">
                <label className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
                  Old Password
                </label>
                <div className="w-full h-14 px-6 bg-black bg-opacity-5 rounded-[20px] flex items-center justify-between">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your Old password"
                    className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  >
                    <img
                      src={showCurrentPassword ? "/eye.svg" : "/eye-closed.svg"}
                      alt={showCurrentPassword ? "Hide password" : "Show password"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-3">
                <label className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
                  New Password
                </label>
                <div className="w-full h-14 px-6 bg-black bg-opacity-5 rounded-[20px] flex items-center justify-between">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your New password"
                    className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  >
                    <img
                      src={showNewPassword ? "/eye.svg" : "/eye-closed.svg"}
                      alt={showNewPassword ? "Hide password" : "Show password"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-3">
                <label className="text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
                  Confirm Password
                </label>
                <div className="w-full h-14 px-6 bg-black bg-opacity-5 rounded-[20px] flex items-center justify-between">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype your New password"
                    className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  >
                    <img
                      src={showConfirmPassword ? "/eye.svg" : "/eye-closed.svg"}
                      alt={showConfirmPassword ? "Hide password" : "Show password"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              className="w-full max-w-[300px] h-[50px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[25px] flex justify-center items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">Change</div>
            </button>
          </div>
        )}


      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 text-brand-colors-SteamWhite px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 ${
          toastType === 'success' ? 'bg-brand-colors-SproutGreen' : 'bg-brand-colors-RootBlack'
        }`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
            toastType === 'success' ? 'bg-green-600' : 'bg-yellow-500'
          }`}>
            {toastType === 'success' ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>
          <div className="text-sm font-medium">{toastMessage}</div>
        </div>
      )}

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteAccountModal}
        onClose={() => setShowDeleteAccountModal(false)}
        onConfirm={handleDeleteAccount}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Settings;