import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal-details');
  const [selectedState, setSelectedState] = useState<string>('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState<boolean>(false);
  
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

  const settingsMenuItems = [
    { id: 'personal-details', label: 'Personal details' },
    { id: 'address-book', label: 'Address Book' },
    { id: 'change-language', label: 'Change Language' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'delete-account', label: 'Delete Account' }
  ];

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setIsStateDropdownOpen(false);
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
      case 'delete-account':
        return 'Delete Account';
      default:
        return 'Personal Details';
    }
  };

  return (
    <div className="w-[1129px] h-[980px] relative bg-brand-colors-SteamWhite rounded-[20px]">
      {/* Header */}
      <div className="w-[1129px] px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
        <div className="inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">
            Manage Your Preferences
          </div>
          <div className="w-80 justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">
            Your Settings
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5">
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/design/assets/icons folder/notification icon.svg" alt="Notifications" className="w-6 h-6" />
              </div>
            </div>
          </div>
          <img className="w-10 h-10 rounded-full" src="/design/assets/dashboard & marketplace assets/profile image.png" alt="Profile" />
        </div>
      </div>

      {/* Settings Menu Sidebar */}
      <div className="w-80 h-[824px] px-2.5 py-5 left-[40px] top-[126px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
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
      <div className="w-[693px] h-[824px] left-[396px] top-[126px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden relative">
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
                placeholder="Enter your Full name"
                className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Business Name */}
          <div data-property-1="alternate default" className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Business Name
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input
                type="text"
                placeholder="Enter your Business Name"
                className="w-full bg-transparent outline-none border-none placeholder:text-brand-colors-RootBlack placeholder:opacity-50 text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

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
                placeholder="Enter your phone number"
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
                placeholder="Enter your email address"
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
      </div>
    </div>
  );
};

export default Settings;