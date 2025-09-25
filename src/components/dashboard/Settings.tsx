import React, { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';
import MobileDeleteModal from './MobileDeleteModal';
import LogoutModal from './LogoutModal';
import DesktopSettings from './DesktopSettings';

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
  variant?: 'mobile' | 'desktop';
  onBack?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
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
  variant = 'desktop',
  onBack,
  onNotificationClick,
  onProfileClick,
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
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    state: '',
    lga: '',
    farmAddress: ''
  });
  const [addFormData, setAddFormData] = useState({
    state: '',
    lga: '',
    farmAddress: ''
  });

  // Personal details form state
  const [personalFormData, setPersonalFormData] = useState({
    fullName: 'Anosikay Farms',
    businessName: 'Anosikay Farms Limited',
    state: 'Lagos'
  });
  const [originalPersonalData] = useState({
    fullName: 'Anosikay Farms',
    businessName: 'Anosikay Farms Limited',
    state: 'Lagos'
  });
  const [hasPersonalChanges, setHasPersonalChanges] = useState(false);
  const [passwordChangeStep, setPasswordChangeStep] = useState<'form' | 'otp'>('form');

  // Address Book data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      location: 'Ojo, Lagos',
      state: 'Lagos',
      lga: 'Ojo',
      address: 'Plot 15, Igbogbo Road, OJo, Lagos State, Nigeria'
    },
    {
      id: 2,
      location: 'Kura, Kano',
      state: 'Kano',
      lga: 'Kura',
      address: 'No. 12, Sabon Gari Road, Kura LGA, Kano State, Nigeria'
    },
    {
      id: 3,
      location: 'Ifo, Ogun',
      state: 'Ogun',
      lga: 'Ifo',
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
      setActiveSection(''); // Reset active section
      setShowDeleteAccountModal(true);
    } else if (sectionId === 'logout') {
      setActiveSection(''); // Reset active section
      setShowLogoutModal(true);
    } else {
      // Reset password change step when switching sections
      if (sectionId !== 'change-password') {
        setPasswordChangeStep('form');
      }
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

    // For mobile, proceed to OTP step
    if (variant === 'mobile') {
      setPasswordChangeStep('otp');
      setToastMessage('OTP sent to your registered phone number and email');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // For desktop, complete password change immediately
    setToastMessage('Password changed successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCompletePasswordChange = () => {
    setToastMessage('Password changed successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordChangeStep('form');
    setActiveSection('');
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

  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setEditFormData({
      state: address.state,
      lga: address.lga,
      farmAddress: address.address
    });
    setActiveSection('edit-address');
  };

  const handleSaveAddress = () => {
    if (!editFormData.state || !editFormData.lga || !editFormData.farmAddress) {
      setToastMessage('Please fill in all fields');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const updatedAddresses = addresses.map(addr =>
      addr.id === editingAddress.id
        ? {
            ...addr,
            state: editFormData.state,
            lga: editFormData.lga,
            location: `${editFormData.lga}, ${editFormData.state}`,
            address: editFormData.farmAddress
          }
        : addr
    );

    setAddresses(updatedAddresses);
    setEditingAddress(null);
    setEditFormData({ state: '', lga: '', farmAddress: '' });
    setActiveSection('address-book');

    setToastMessage('Address updated successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddNewLocation = () => {
    setAddFormData({ state: '', lga: '', farmAddress: '' });
    setActiveSection('add-new-location');
  };

  // Handle personal details form changes
  const handlePersonalFormChange = (field: string, value: string) => {
    const newFormData = { ...personalFormData, [field]: value };
    setPersonalFormData(newFormData);

    // Check if any field has changed from original
    const hasChanges = Object.keys(originalPersonalData).some(
      key => newFormData[key as keyof typeof originalPersonalData] !== originalPersonalData[key as keyof typeof originalPersonalData]
    );
    setHasPersonalChanges(hasChanges);
  };

  const handleSavePersonalDetails = () => {
    // Update the original data to match current form data
    setPersonalFormData({ ...personalFormData });
    setHasPersonalChanges(false);

    setToastMessage('Personal details saved successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveNewLocation = () => {
    if (!addFormData.state || !addFormData.lga || !addFormData.farmAddress) {
      setToastMessage('Please fill in all fields');
      setToastType('warning');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const newLocation = {
      id: addresses.length + 1,
      location: `${addFormData.lga}, ${addFormData.state}`,
      state: addFormData.state,
      lga: addFormData.lga,
      address: addFormData.farmAddress
    };

    setAddresses([newLocation, ...addresses]);
    setAddFormData({ state: '', lga: '', farmAddress: '' });
    setActiveSection('address-book');

    setToastMessage('New location added successfully');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

  // Desktop Version - Use new 3-column layout
  if (variant === 'desktop') {
    return <DesktopSettings showHeader={showHeader} />;
  }

  // Mobile Version
  if (variant === 'mobile') {
    // Show personal details form if that section is active
    if (activeSection === 'personal-details') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {/* Header */}
          <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveSection('')} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
              </button>
            </div>
            <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              Personal Details
            </div>
          </div>

          {/* Profile Picture */}
          <div className="w-[103px] h-[103px] left-[138px] top-[90px] absolute overflow-hidden rounded-[10px]">
            <img className="w-[103px] h-[103px] left-0 top-0 absolute rounded-full" src="https://placehold.co/103x103" alt="Profile" />
            <div className="w-6 h-6 left-[75px] top-[5px] absolute bg-brand-colors-HarvestMist shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-full flex justify-center items-center cursor-pointer">
              <img src="/edit icon.svg" alt="Edit Profile" className="w-4 h-4" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-[358px] left-4 top-[219px] absolute flex flex-col justify-start items-center gap-[30px]">
            {/* Full Name */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Full Name
              </div>
              <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="text"
                  value={personalFormData.fullName}
                  onChange={(e) => handlePersonalFormChange('fullName', e.target.value)}
                  placeholder="Enter your Full name"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Business Name
              </div>
              <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="text"
                  value={personalFormData.businessName}
                  onChange={(e) => handlePersonalFormChange('businessName', e.target.value)}
                  placeholder="Enter your Business Name"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* State */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                State
              </div>
              <div className="relative w-full">
                <button
                  onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                  className="w-full px-[30px] py-2 bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center"
                >
                  <div className={`text-brand-colors-RootBlack text-base font-medium ${!personalFormData.state ? 'opacity-50' : ''}`} style={{ fontFamily: 'MadaniArabic-Medium' }}>
                    {personalFormData.state || 'Enter your state'}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 relative overflow-hidden">
                      <img src="/chevron-down-2.svg" alt="Dropdown" className="w-6 h-6" />
                    </div>
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
                          handlePersonalFormChange('state', state);
                          setIsStateDropdownOpen(false);
                        }}
                        className={`w-full px-7 py-3 text-left hover:bg-black/5 transition-colors ${
                          personalFormData.state === state ? 'bg-black/10' : ''
                        }`}
                      >
                        <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                          {state}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Phone Number
              </div>
              <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Email
              </div>
              <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSavePersonalDetails}
              className={`w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 rounded-[30px] flex justify-center items-center gap-2.5 transition-colors ${
                hasPersonalChanges
                  ? 'bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90'
                  : 'bg-gray-400 cursor-default'
              }`}
              disabled={!hasPersonalChanges}
            >
              <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                {hasPersonalChanges ? 'Save' : 'Saved'}
              </div>
            </button>
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
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
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
    }

    // Show address book if that section is active
    if (activeSection === 'address-book') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {/* Header */}
          <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveSection('')} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
              </button>
            </div>
            <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              Address Book
            </div>
          </div>

          {/* Address List */}
          <div className="w-[358px] left-4 top-[95px] absolute flex flex-col items-center gap-9">
            {addresses.map((address) => (
              <div key={address.id} className="w-full pt-4 pb-[30px] px-4 bg-black/5 rounded-[30px] flex flex-col gap-5">
                <div className="w-full flex justify-between items-start">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/location-icon.svg"
                        alt="Location"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="text-brand-colors-RootBlack text-xl font-medium leading-9" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      {address.location}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-HarvestMist/80 transition-colors"
                  >
                    <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      Edit
                    </div>
                  </button>
                </div>
                <div className="w-full flex flex-col gap-[14px]">
                  <div className="w-full text-black text-xl font-medium leading-9" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                    Farm Address:
                  </div>
                  <div className="w-full text-brand-colors-rootgrey text-xl font-medium leading-9" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                    {address.address}
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Location Button */}
            <button
              onClick={handleAddNewLocation}
              className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 mb-8 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                Add New Location
              </div>
            </button>
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
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
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
    }

    // Show edit address form if that section is active
    if (activeSection === 'edit-address') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {/* Header */}
          <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveSection('address-book')} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
              </button>
            </div>
            <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              Edit Address
            </div>
          </div>

          {/* Edit Form */}
          <div className="w-[358px] left-4 top-[95px] absolute flex flex-col items-center gap-[30px]">
            {/* State */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                State
              </div>
              <div className="relative w-full">
                <button
                  onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                  className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center"
                >
                  <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                    {editFormData.state}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 relative overflow-hidden">
                      <img src="/chevron-down-2.svg" alt="Dropdown" className="w-6 h-6" />
                    </div>
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
                          setEditFormData({ ...editFormData, state });
                          setIsStateDropdownOpen(false);
                        }}
                        className={`w-full px-7 py-3 text-left hover:bg-black/5 transition-colors ${
                          editFormData.state === state ? 'bg-black/10' : ''
                        }`}
                      >
                        <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                          {state}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LGA */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                LGA
              </div>
              <div className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="text"
                  value={editFormData.lga}
                  onChange={(e) => setEditFormData({ ...editFormData, lga: e.target.value })}
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* Farm Address */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Farm Address
              </div>
              <div className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <textarea
                  value={editFormData.farmAddress}
                  onChange={(e) => setEditFormData({ ...editFormData, farmAddress: e.target.value })}
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium resize-none"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                  rows={2}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAddress}
              className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 mb-8 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                Save
              </div>
            </button>
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
        </div>
      );
    }

    // Show add new location form if that section is active
    if (activeSection === 'add-new-location') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {/* Header */}
          <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveSection('address-book')} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
              </button>
            </div>
            <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              Add New Location
            </div>
          </div>

          {/* Add Form */}
          <div className="w-[358px] left-4 top-[95px] absolute flex flex-col items-center gap-[30px]">
            {/* State */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                State
              </div>
              <div className="relative w-full">
                <button
                  onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                  className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center"
                >
                  <div className={`text-brand-colors-RootBlack text-base font-medium ${!addFormData.state ? 'opacity-50' : ''}`} style={{ fontFamily: 'MadaniArabic-Medium' }}>
                    {addFormData.state || 'Enter your state'}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 relative overflow-hidden">
                      <img src="/chevron-down-2.svg" alt="Dropdown" className="w-6 h-6" />
                    </div>
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
                          setAddFormData({ ...addFormData, state });
                          setIsStateDropdownOpen(false);
                        }}
                        className={`w-full px-7 py-3 text-left hover:bg-black/5 transition-colors ${
                          addFormData.state === state ? 'bg-black/10' : ''
                        }`}
                      >
                        <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                          {state}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LGA */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                LGA
              </div>
              <div className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <input
                  type="text"
                  value={addFormData.lga}
                  onChange={(e) => setAddFormData({ ...addFormData, lga: e.target.value })}
                  placeholder="Enter LGA"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                />
              </div>
            </div>

            {/* Farm Address */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-[11px] text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Farm Address
              </div>
              <div className="w-full px-5 py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
                <textarea
                  value={addFormData.farmAddress}
                  onChange={(e) => setAddFormData({ ...addFormData, farmAddress: e.target.value })}
                  placeholder="Enter farm address"
                  className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack resize-none"
                  style={{ fontFamily: 'MadaniArabic-Medium' }}
                  rows={2}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveNewLocation}
              className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 mb-8 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                Save
              </div>
            </button>
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
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
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
    }

    // Show change language form if that section is active
    if (activeSection === 'change-language') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {/* Header */}
          <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveSection('')} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
              </button>
            </div>
            <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              Change Language
            </div>
          </div>

          {/* Language Options */}
          <div className="w-[358px] left-4 top-[95px] absolute flex flex-col items-center gap-[30px]">
            {/* English */}
            <div
              className="w-full px-3 py-4 bg-black/5 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-black/10 transition-colors"
              onClick={() => handleLanguageSelect('English')}
            >
              <div className="text-black text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                English
              </div>
              <div className={`w-6 h-6 relative overflow-hidden rounded-full border border-brand-colors-SproutGreen ${selectedLanguage === 'English' ? 'bg-brand-colors-SproutGreen' : ''}`}>
                {selectedLanguage === 'English' && (
                  <div className="w-5 h-5 left-0.5 top-0.5 absolute bg-brand-colors-SproutGreen rounded-full" />
                )}
              </div>
            </div>

            {/* Igbo */}
            <div
              className="w-full px-3 py-4 bg-black/5 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-black/10 transition-colors"
              onClick={() => handleLanguageSelect('Igbo')}
            >
              <div className="text-black text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Igbo
              </div>
              <div className={`w-6 h-6 relative overflow-hidden rounded-full border border-brand-colors-SproutGreen ${selectedLanguage === 'Igbo' ? 'bg-brand-colors-SproutGreen' : ''}`}>
                {selectedLanguage === 'Igbo' && (
                  <div className="w-5 h-5 left-0.5 top-0.5 absolute bg-brand-colors-SproutGreen rounded-full" />
                )}
              </div>
            </div>

            {/* Yoruba */}
            <div
              className="w-full px-3 py-4 bg-black/5 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-black/10 transition-colors"
              onClick={() => handleLanguageSelect('Yoruba')}
            >
              <div className="text-black text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Yoruba
              </div>
              <div className={`w-6 h-6 relative overflow-hidden rounded-full border border-brand-colors-SproutGreen ${selectedLanguage === 'Yoruba' ? 'bg-brand-colors-SproutGreen' : ''}`}>
                {selectedLanguage === 'Yoruba' && (
                  <div className="w-5 h-5 left-0.5 top-0.5 absolute bg-brand-colors-SproutGreen rounded-full" />
                )}
              </div>
            </div>

            {/* Hausa */}
            <div
              className="w-full px-3 py-4 bg-black/5 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-black/10 transition-colors"
              onClick={() => handleLanguageSelect('Hausa')}
            >
              <div className="text-black text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                Hausa
              </div>
              <div className={`w-6 h-6 relative overflow-hidden rounded-full border border-brand-colors-SproutGreen ${selectedLanguage === 'Hausa' ? 'bg-brand-colors-SproutGreen' : ''}`}>
                {selectedLanguage === 'Hausa' && (
                  <div className="w-5 h-5 left-0.5 top-0.5 absolute bg-brand-colors-SproutGreen rounded-full" />
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveLanguage}
              className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 mb-8 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                Save
              </div>
            </button>
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
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
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
    }

    // Show change password form if that section is active
    if (activeSection === 'change-password') {
      return (
        <div className="w-full h-full relative bg-brand-colors-SteamWhite">
          {passwordChangeStep === 'form' ? (
            <>
              {/* Header - Only for form step */}
              <div className="w-full p-5 left-0 top-0 absolute bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <button onClick={() => {
                    setPasswordChangeStep('form');
                    setActiveSection('');
                  }} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                  Change Password
                </div>
              </div>
              {/* Content Area for Form */}
              <div className="w-[358px] left-4 top-[113px] absolute flex flex-col items-center gap-[50px]">
                {/* Old Password Section */}
                <div className="w-full flex flex-col items-center gap-5">
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      Old Password
                    </div>
                    <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your Old password"
                        className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                        style={{ fontFamily: 'MadaniArabic-Medium' }}
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

                  {/* Forgot Password Link */}
                  <div className="text-center">
                    <span className="text-brand-colors-RootBlack text-sm font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      Forgot your password?{' '}
                    </span>
                    <button className="text-brand-colors-SproutGreen text-sm font-medium hover:underline" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      click here
                    </button>
                  </div>
                </div>

                {/* New Password Section */}
                <div className="w-full flex flex-col gap-[30px]">
                  {/* New Password */}
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      New Password
                    </div>
                    <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your New password"
                        className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                        style={{ fontFamily: 'MadaniArabic-Medium' }}
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
                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      Confirm Password
                    </div>
                    <div className="w-full px-[30px] py-[14px] bg-black/5 overflow-hidden rounded-[30px] border-2 border-black/5 flex justify-between items-center">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Retype your New password"
                        className="w-full bg-transparent outline-none border-none text-brand-colors-RootBlack text-base font-medium placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
                        style={{ fontFamily: 'MadaniArabic-Medium' }}
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

                  {/* Change Button */}
                  <button
                    onClick={handleChangePassword}
                    className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 mb-8 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
                  >
                    <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                      Change
                    </div>
                  </button>
                </div>
              </div>
            </>
          ) : (
              /* OTP Verification Step */
              <>
                {/* Back Button - Top Left Corner (Header Position) */}
                <div className="w-full p-5 left-0 top-0 absolute flex items-center">
                  <button
                    onClick={() => setPasswordChangeStep('form')}
                    className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
                  </button>
                </div>

                {/* Main OTP Content */}
                <div className="w-[358px] left-4 top-[100px] absolute flex flex-col justify-center items-center gap-7">
                  {/* Header Section */}
                  <div className="w-full flex flex-col items-center gap-6">
                    <div className="text-brand-colors-RootBlack text-2xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                      Verification Code
                    </div>
                    <div className="w-full text-center text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                      We have sent a verification code to +234-902-266-5965
                    </div>
                  </div>

                  {/* OTP Input and Actions */}
                  <div className="w-full flex flex-col items-center gap-6">
                    {/* OTP Input Fields */}
                    <div className="flex justify-center items-center gap-3">
                      {[1, 2, 3, 4].map((digit) => (
                        <input
                          key={digit}
                          type="text"
                          maxLength={1}
                          className="w-[52px] h-[52px] p-1 bg-black/5 rounded-lg border-2 border-black/5 flex flex-col justify-center items-center gap-1 text-center text-xl font-bold focus:border-brand-colors-SproutGreen focus:outline-none"
                          style={{ fontFamily: 'MadaniArabic-Bold' }}
                        />
                      ))}
                    </div>

                    {/* Actions Section */}
                    <div className="w-full flex flex-col items-center gap-3">
                      {/* Verify Button */}
                      <button
                        onClick={handleCompletePasswordChange}
                        className="w-full min-w-0 sm:min-w-[160px] min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
                      >
                        <div className="text-brand-colors-SteamWhite text-base font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                          Verify Phone Number
                        </div>
                      </button>

                      {/* Resend Code Text */}
                      <div className="w-full text-center text-xs font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                        <span className="text-brand-colors-RootBlack">
                          Didn't receive the verification code? it could take a bit of time, request a new code in{' '}
                        </span>
                        <span className="text-brand-colors-SproutGreen">60</span>
                        <span className="text-brand-colors-RootBlack"> seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          )}

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
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
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
    }

    // Settings menu view
    return (
      <div className="w-full h-full bg-brand-colors-SteamWhite overflow-hidden rounded-[20px] flex flex-col gap-2.5">
        {/* Settings Header */}
        <div className="w-full pt-5 pb-5 bg-white/80 shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex items-start gap-3">
          <div className="flex items-center gap-2.5">
            <button onClick={onBack} className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-brand-colors-RootBlack text-sm font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
              {headerTitle}
            </div>
            <div className="w-[331px] text-brand-colors-RootBlack text-xl font-bold" style={{ fontFamily: 'MadaniArabic-Bold' }}>
              {headerSubtitle}
            </div>
          </div>
        </div>

        {/* Settings Menu Items */}
        <div className="w-full flex flex-col gap-5">
          {settingsMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="w-full h-12 px-10 py-3 bg-brand-colors-SteamWhite rounded-[20px] flex items-center gap-2.5 hover:bg-black/5 transition-colors"
            >
              <div className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                {item.label}
              </div>
            </button>
          ))}
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
        {variant === 'desktop' ? (
          <DeleteAccountModal
            isOpen={showDeleteAccountModal}
            onClose={() => setShowDeleteAccountModal(false)}
            onConfirm={handleDeleteAccount}
          />
        ) : (
          <MobileDeleteModal
            isOpen={showDeleteAccountModal}
            type="account"
            onClose={() => setShowDeleteAccountModal(false)}
            onConfirm={handleDeleteAccount}
          />
        )}

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    );
  }

  // Desktop Version (existing code)
  return (
    <div className="w-full max-w-full lg:max-w-[1129px] min-h-[980px] relative bg-brand-colors-SteamWhite rounded-[20px]">
      {/* Header */}
      {showHeader && (
        <div className="w-full px-4 sm:px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
          <div className="inline-flex flex-col justify-start items-start gap-4">
            <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
              {headerTitle}
            </div>
            <div className="w-80 justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">
              {headerSubtitle}
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <button
              onClick={onNotificationClick}
              className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center hover:bg-gray-50 transition-colors"
            >
              <img className="w-6 h-6" src="/notification-icon.svg" alt="Notifications" />
            </button>
            <button
              onClick={onProfileClick}
              className="hover:opacity-80 transition-opacity"
            >
              <img className="w-10 h-10 rounded-full object-cover" src="/profile image.png" alt="Profile" />
            </button>
          </div>
        </div>
      )}

      {/* Settings Menu Sidebar */}
      <div className={`w-full sm:w-80 h-[824px] px-2.5 py-5 left-0 sm:left-[40px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] inline-flex flex-col justify-start items-start gap-5 overflow-hidden ${
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
      <div className={`w-full sm:w-[693px] h-[824px] left-0 sm:left-[396px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden relative ${
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
                      <img
                        src="/location-icon.svg"
                        alt="Location"
                        className="w-4 h-4"
                      />
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

      {/* Delete Account Modal - Desktop Only */}
      {variant === 'desktop' && (
        <DeleteAccountModal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}

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