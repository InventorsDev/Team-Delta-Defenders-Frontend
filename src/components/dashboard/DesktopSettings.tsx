import React, { useState, useEffect } from 'react';
import DeleteAccountModal from './DeleteAccountModal';
import LogoutModal from './LogoutModal';
import NotificationDropdown from '../ui/NotificationDropdown';
import Toast from '../ui/Toast';
import { useToast } from '../../hooks/useToast';

interface DesktopSettingsProps {
  showHeader?: boolean;
  context?: 'dashboard' | 'marketplace';
}

type SettingsCategory =
  | 'personal-details'
  | 'change-language'
  | 'change-password'
  | 'address-book'
  | 'logout'
  | 'delete-account';

const DesktopSettings: React.FC<DesktopSettingsProps> = ({
  showHeader = true,
  context = 'dashboard'
}) => {
  const { toasts, showSuccess, showError, removeToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<SettingsCategory>('personal-details');
  const [formData, setFormData] = useState({
    fullName: 'Kenechukwu Anosike',
    businessName: 'Anosikay Farms',
    state: 'Lagos',
    phoneNumber: '09022665965',
    email: 'anosikekenechukwu2023@gmail.com'
  });


  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
    'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  // Delete Account Modal state
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // Logout Modal state
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [isPersonalDetailsStateDropdownOpen, setIsPersonalDetailsStateDropdownOpen] = useState(false);

  // Change Language state
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Change Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Address Book state (only for dashboard context)
  const [addressView, setAddressView] = useState<'list' | 'edit' | 'add'>('list');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      location: 'Lagos',
      address: 'Plot 15, Igbogbo Road, Ojo, Lagos State, Nigeria'
    }
  ]);
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
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  const getSettingsCategories = () => {
    if (context === 'dashboard') {
      return [
        { id: 'personal-details' as SettingsCategory, label: 'Personal details' },
        { id: 'address-book' as SettingsCategory, label: 'Address Book' },
        { id: 'change-language' as SettingsCategory, label: 'Change Language' },
        { id: 'change-password' as SettingsCategory, label: 'Change Password' },
        { id: 'delete-account' as SettingsCategory, label: 'Delete Account' },
      ];
    } else {
      return [
        { id: 'personal-details' as SettingsCategory, label: 'Personal details' },
        { id: 'change-language' as SettingsCategory, label: 'Change Language' },
        { id: 'change-password' as SettingsCategory, label: 'Change Password' },
        { id: 'logout' as SettingsCategory, label: 'Logout' },
        { id: 'delete-account' as SettingsCategory, label: 'Delete Account' },
      ];
    }
  };

  const settingsCategories = getSettingsCategories();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsPersonalDetailsStateDropdownOpen(false);
        if (context === 'dashboard') {
          setIsStateDropdownOpen(false);
        }
      }
    };

    if (isPersonalDetailsStateDropdownOpen || (context === 'dashboard' && isStateDropdownOpen)) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPersonalDetailsStateDropdownOpen, isStateDropdownOpen, context]);

  const handleDeleteAccount = () => {
    setShowDeleteAccountModal(false);
    // In a real app, you would call an API to delete the account
    console.log('Account deletion confirmed');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSaveLanguage = () => {
    if (selectedLanguage !== 'English') {
      showError('This language is not yet available');
    } else {
      showSuccess('Language saved successfully');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // In a real app, you would call an API to change the password
    console.log('Password change requested');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password changed successfully');
  };


  const renderPersonalDetails = () => (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full p-5 bg-white/80 border-b border-gray-100 flex-shrink-0">
        <div className="text-black text-2xl font-madani-bold">
          Personal Details
        </div>
      </div>

      {/* Content Area */}
      <div className="px-[70px] py-8">
        <div className="flex flex-col items-center gap-8">
          {/* Profile Image Upload - Centered */}
          <div className="w-[104px] h-[103px] overflow-hidden rounded-[10px] border-2 border-brand-colors-RootBlack relative">
            <img
              className="w-[104px] h-[103px] absolute left-0 top-0 opacity-20 bg-gray-300 rounded-[10px] object-cover"
              src="https://placehold.co/104x103"
              alt="Profile placeholder"
            />
            <div className="absolute left-[40px] top-[40px] flex items-center justify-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-[14px] h-[14px] absolute left-[5px] top-[5px] border-2 border-brand-colors-RootBlack" />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full max-w-[553px] flex flex-col gap-[30px]">
          {/* Full Name */}
          <div className="w-full flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
              Full Name
            </div>
            <div className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your Full name"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* Business Name */}
          <div className="w-full flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
              Business Name
            </div>
            <div className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your Business Name"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* State */}
          <div className="w-full flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
              State
            </div>
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsPersonalDetailsStateDropdownOpen(!isPersonalDetailsStateDropdownOpen)}
                className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between hover:bg-black/10 transition-colors"
              >
                <div className={`text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] ${!formData.state ? 'opacity-50' : ''}`}>
                  {formData.state || 'Select your state'}
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <img
                    src="/chevron-down-2.svg"
                    alt="Dropdown"
                    className={`w-6 h-6 transition-transform ${isPersonalDetailsStateDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isPersonalDetailsStateDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[20px] shadow-lg z-10 max-h-60 overflow-y-auto">
                  {nigerianStates.map((state) => (
                    <button
                      key={state}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInputChange('state', state);
                        setIsPersonalDetailsStateDropdownOpen(false);
                      }}
                      className={`w-full px-7 py-3 text-left hover:bg-black/5 transition-colors ${
                        formData.state === state ? 'bg-black/10' : ''
                      }`}
                    >
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">
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
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
              Phone Number
            </div>
            <div className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
              Email
            </div>
            <div className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center gap-2.5">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="w-full h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5">
            <div className="text-brand-colors-SteamWhite text-base font-madani-bold">
              Saved
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );




  const renderChangeLanguage = () => (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 w-full p-5 bg-white/80 border-b border-gray-100">
        <div className="text-black text-2xl font-madani-bold">Change Language</div>
      </div>

      {/* Language Options */}
      <div className="px-[70px] py-8">
        <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {['English', 'Igbo', 'Yoruba', 'Hausa'].map((language) => (
            <div
              key={language}
              className="w-full px-6 py-4 bg-black/5 rounded-[20px] flex justify-between items-center cursor-pointer hover:bg-black/10 transition-colors"
              onClick={() => handleLanguageSelect(language)}
            >
              <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
                {language}
              </div>
              <div className={`w-6 h-6 relative overflow-hidden rounded-full border-2 border-brand-colors-SproutGreen ${selectedLanguage === language ? 'bg-brand-colors-SproutGreen' : ''}`}>
                {selectedLanguage === language && (
                  <div className="w-5 h-5 absolute left-0.5 top-0.5 bg-brand-colors-SproutGreen rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveLanguage}
          className="w-fit px-8 py-4 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
        >
          <div className="text-white text-base font-madani-bold">
            Save Language
          </div>
        </button>
        </div>
      </div>
    </div>
  );

  const renderChangePassword = () => (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 w-full p-5 bg-white/80 border-b border-gray-100">
        <div className="text-black text-2xl font-madani-bold">Change Password</div>
      </div>

      {/* Password Form */}
      <div className="px-[70px] py-8">
        <div className="flex flex-col gap-[30px]">
        {/* Current Password */}
        <div className="flex flex-col gap-5">
          <div className="text-brand-colors-RootBlack text-xl font-madani-medium">Current Password</div>
          <div className="h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between">
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px]"
            />
            <button
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
        <div className="flex flex-col gap-5">
          <div className="text-brand-colors-RootBlack text-xl font-madani-medium">New Password</div>
          <div className="h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px]"
            />
            <button
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
        <div className="flex flex-col gap-5">
          <div className="text-brand-colors-RootBlack text-xl font-madani-medium">Confirm New Password</div>
          <div className="h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px]"
            />
            <button
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

        {/* Password Requirements */}
        <div className="flex flex-col gap-3">
          <div className="text-brand-colors-rootgrey text-base font-madani-medium">
            Password Requirements:
          </div>
          <ul className="text-brand-colors-rootgrey text-sm font-madani-medium ml-4">
            <li>• At least 8 characters long</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
          </ul>
        </div>

        {/* Save Button */}
        <button
          onClick={handleChangePassword}
          className="w-fit px-8 py-4 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
        >
          <div className="text-white text-base font-madani-bold">
            Change Password
          </div>
        </button>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Handle actual logout logic here
    console.log('User logged out');
  };

  // Address Book handlers (only for dashboard context)
  const handleEditAddress = (address: any) => {
    setEditFormData({
      state: address.location,
      lga: '',
      farmAddress: address.address
    });
    setAddressView('edit');
  };

  const handleAddNewLocation = () => {
    setAddFormData({ state: '', lga: '', farmAddress: '' });
    setAddressView('add');
  };

  const handleBackToAddressList = () => {
    setAddressView('list');
  };

  const handleSaveAddress = () => {
    console.log('Address saved:', editFormData);
    setAddressView('list');
  };

  const handleSaveNewLocation = () => {
    if (addFormData.state && addFormData.farmAddress) {
      const newAddress = {
        id: addresses.length + 1,
        location: addFormData.state,
        address: addFormData.farmAddress
      };
      setAddresses([...addresses, newAddress]);
      setAddFormData({ state: '', lga: '', farmAddress: '' });
      setAddressView('list');
    }
  };

  // Address Book render functions (only for dashboard context)
  const renderAddressBook = () => {
    if (addressView === 'edit') {
      return renderEditAddress();
    }

    if (addressView === 'add') {
      return renderAddNewAddress();
    }

    // Default list view
    return (
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="w-full p-5 bg-white/80 border-b border-gray-100 flex-shrink-0">
          <div className="text-black text-2xl font-madani-bold">Address Book</div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-[70px] py-8">
          <div className="flex flex-col gap-9">
            {addresses.map((address) => (
              <div key={address.id} className="w-full px-6 pt-4 pb-7 bg-black/5 rounded-[30px] flex flex-col gap-5">
                <div className="w-full flex justify-between items-start">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/location-icon.svg"
                        alt="Location"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="text-brand-colors-RootBlack text-xl font-madani-medium leading-9">
                      {address.location}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] flex items-center gap-2.5 cursor-pointer hover:bg-brand-colors-HarvestMist/80 transition-colors"
                  >
                    <div className="text-brand-colors-RootBlack text-base font-madani-medium">
                      Edit
                    </div>
                  </button>
                </div>
                <div className="w-full flex flex-col gap-3.5">
                  <div className="text-black text-xl font-madani-medium leading-9">
                    Farm Address:
                  </div>
                  <div className="text-brand-colors-rootgrey text-xl font-madani-medium leading-9">
                    {address.address}
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Location Button */}
            <button
              onClick={handleAddNewLocation}
              className="w-full h-full px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5 cursor-pointer hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-base font-madani-bold">
                Add New Location
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEditAddress = () => (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full p-5 bg-white/80 border-b border-gray-100 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={handleBackToAddressList}
          className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
        </button>
        <div className="text-black text-2xl font-madani-bold">Edit Address</div>
      </div>

      {/* Content Area */}
      <div className="px-[70px] py-8">
        <div className="flex flex-col gap-[30px]">
          {/* State */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">State</div>
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between hover:bg-black/10 transition-colors"
              >
                <div className={`text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] ${!editFormData.state ? 'opacity-50' : ''}`}>
                  {editFormData.state || 'Select your state'}
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <img
                    src="/chevron-down-2.svg"
                    alt="Dropdown"
                    className={`w-6 h-6 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isStateDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[20px] shadow-lg z-10 max-h-60 overflow-y-auto">
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
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">
                        {state}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* LGA */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">LGA</div>
            <div className="h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center">
              <input
                type="text"
                value={editFormData.lga}
                onChange={(e) => setEditFormData({ ...editFormData, lga: e.target.value })}
                placeholder="Enter LGA"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* Farm Address */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">Farm Address</div>
            <div className="min-h-[80px] px-[30px] py-4 bg-black/5 rounded-[30px] border-2 border-black/5 flex items-start">
              <textarea
                value={editFormData.farmAddress}
                onChange={(e) => setEditFormData({ ...editFormData, farmAddress: e.target.value })}
                placeholder="Enter farm address"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAddress}
            className="w-full h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
          >
            <div className="text-brand-colors-SteamWhite text-base font-madani-bold">
              Save
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddNewAddress = () => (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full p-5 bg-white/80 border-b border-gray-100 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={handleBackToAddressList}
          className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
        </button>
        <div className="text-black text-2xl font-madani-bold">Add New Location</div>
      </div>

      {/* Content Area */}
      <div className="px-[70px] py-8">
        <div className="flex flex-col gap-[30px]">
          {/* State */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">State</div>
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                className="w-full h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center justify-between hover:bg-black/10 transition-colors"
              >
                <div className={`text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] ${!addFormData.state ? 'opacity-50' : ''}`}>
                  {addFormData.state || 'Select your state'}
                </div>
                <div className="w-6 h-6 relative overflow-hidden">
                  <img
                    src="/chevron-down-2.svg"
                    alt="Dropdown"
                    className={`w-6 h-6 transition-transform ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isStateDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[20px] shadow-lg z-10 max-h-60 overflow-y-auto">
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
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">
                        {state}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* LGA */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">LGA</div>
            <div className="h-[60px] px-[30px] bg-black/5 rounded-[30px] border-2 border-black/5 flex items-center">
              <input
                type="text"
                value={addFormData.lga}
                onChange={(e) => setAddFormData({ ...addFormData, lga: e.target.value })}
                placeholder="Enter LGA"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack"
              />
            </div>
          </div>

          {/* Farm Address */}
          <div className="flex flex-col gap-5">
            <div className="text-brand-colors-RootBlack text-xl font-madani-medium">Farm Address</div>
            <div className="min-h-[80px] px-[30px] py-4 bg-black/5 rounded-[30px] border-2 border-black/5 flex items-start">
              <textarea
                value={addFormData.farmAddress}
                onChange={(e) => setAddFormData({ ...addFormData, farmAddress: e.target.value })}
                placeholder="Enter farm address"
                className="w-full bg-transparent outline-none text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px] placeholder:opacity-50 placeholder:text-brand-colors-RootBlack resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBackToAddressList}
              className="flex-1 h-[60px] px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-HarvestMist/80 transition-colors"
            >
              <div className="text-brand-colors-RootBlack text-base font-madani-bold">
                Cancel
              </div>
            </button>
            <button
              onClick={handleSaveNewLocation}
              className="flex-1 h-[60px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
            >
              <div className="text-white text-base font-madani-bold">
                Add Location
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'personal-details':
        return renderPersonalDetails();
      case 'change-language':
        return renderChangeLanguage();
      case 'change-password':
        return renderChangePassword();
      case 'address-book':
        return context === 'dashboard' ? renderAddressBook() : renderPersonalDetails();
      case 'delete-account':
        return (
          <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 w-full p-5 bg-white/80 border-b border-gray-100">
              <div className="text-black text-2xl font-madani-bold">Delete Account</div>
            </div>

            {/* Content */}
            <div className="px-[70px] py-8">
              <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="text-brand-colors-RootBlack text-xl font-madani-medium">
                  Warning: This action cannot be undone
                </div>
                <div className="text-brand-colors-rootgrey text-base font-madani-medium leading-relaxed">
                  Deleting your account will permanently remove all your data, including your listings, chats, and profile information. This action cannot be reversed.
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-brand-colors-RootBlack text-lg font-madani-medium">
                  To delete your account:
                </div>
                <ul className="text-brand-colors-rootgrey text-base font-madani-medium leading-relaxed ml-4">
                  <li className="mb-2">• All your product listings will be removed from the marketplace</li>
                  <li className="mb-2">• Your chat history with buyers/sellers will be deleted</li>
                  <li className="mb-2">• Your profile and account settings will be permanently removed</li>
                  <li className="mb-2">• You will lose access to your account immediately</li>
                </ul>
              </div>

              <button
                onClick={() => setShowDeleteAccountModal(true)}
                className="w-fit px-8 py-4 bg-brand-colors-pepper-red rounded-[30px] flex items-center justify-center gap-2.5 hover:bg-brand-colors-pepper-red/90 transition-colors"
              >
                <div className="text-white text-base font-madani-bold">
                  Delete My Account
                </div>
              </button>
              </div>
            </div>
          </div>
        );
      default:
        return renderPersonalDetails();
    }
  };

  return (
    <div className="w-full h-full relative bg-white rounded-[20px] overflow-hidden">
      {/* Header */}
      {showHeader && (
        <div className="w-full px-10 py-[30px] bg-white/80 flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div className="text-brand-colors-RootBlack text-base font-madani-medium">Manage Your Preferences</div>
            <div className="text-brand-colors-RootBlack text-2xl font-madani-bold">Your Settings</div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationDropdown
              onMarkAllAsRead={() => {
                console.log('Mark all as read');
              }}
              onOpenNotifications={() => {
                console.log('Open notifications');
              }}
              onNotificationClick={(notification) => {
                console.log('Notification clicked:', notification);
              }}
            />
            <img className="w-10 h-10 rounded-full object-cover" src="/profile image.webp" alt="Profile" />
          </div>
        </div>
      )}

      {/* Main Content - 2 Columns */}
      <div className="flex gap-5 px-16 pb-10 justify-center">
        {/* Settings Categories - Fixed width 336px */}
        <div className="w-[336px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] flex flex-col mt-10">
          {/* Header for Marketplace */}
          {context === 'marketplace' && (
            <div className="px-5 py-4 bg-white flex-shrink-0">
              <div className="flex flex-col gap-2">
                <div className="text-brand-colors-RootBlack text-sm font-madani-medium">
                  Manage Your Preferences
                </div>
                <div className="text-brand-colors-RootBlack text-xl font-madani-bold">
                  Your Settings
                </div>
              </div>
            </div>
          )}
          {/* Categories List */}
          <div className="p-5 flex flex-col gap-5">
            {settingsCategories.map((category) => (
            <div
              key={category.id}
              className={`h-12 px-6 py-3 rounded-[20px] flex items-center cursor-pointer transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-black/8 shadow-sm'
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => {
                if (category.id === 'logout' && context === 'marketplace') {
                  setShowLogoutModal(true);
                } else {
                  setSelectedCategory(category.id);
                }
              }}
            >
              <div className="text-brand-colors-RootBlack text-xl font-madani-medium leading-[37px]">
                {category.label}
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Settings Content - Fixed width 693px */}
        <div className="w-[693px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] mt-10">
          {renderCategoryContent()}
        </div>
      </div>

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

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default DesktopSettings;