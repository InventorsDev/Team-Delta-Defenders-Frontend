import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal-details');

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
      <div className="w-[693px] h-[925px] left-[396px] top-[126px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)]">
        {/* Content Header */}
        <div className="w-[693px] p-5 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
          <div className="justify-start text-black text-2xl font-normal font-['MadaniArabic-Bold']">
            Personal Details
          </div>
        </div>

        {/* Profile Picture */}
        <div className="w-24 h-24 left-[295px] top-[76px] absolute rounded-[10px] overflow-hidden">
          <img className="w-24 h-24 left-0 top-0 absolute rounded-[99px]" src="https://placehold.co/103x103" alt="Profile" />
          <div className="w-6 h-6 left-[75px] top-[5px] absolute bg-brand-colors-HarvestMist rounded-[99px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] inline-flex justify-center items-center gap-2.5">
            <div className="flex justify-center items-center gap-1.5">
              <div className="w-4 h-4 relative overflow-hidden">
                <div className="w-2.5 h-2.5 left-[3.38px] top-[2.55px] absolute bg-black/25"></div>
                <div className="w-2 h-2 left-[3.38px] top-[4.14px] absolute bg-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="w-[553px] left-[70px] top-[219px] absolute inline-flex flex-col justify-start items-center gap-7">
          {/* Full Name */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Full Name
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input 
                type="text" 
                defaultValue="Kenechukwu Anosike"
                className="w-full bg-transparent outline-none border-none justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Business Name */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="self-stretch h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Business Name
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input 
                type="text" 
                defaultValue="Anosikay Farms"
                className="w-full bg-transparent outline-none border-none justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* State */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              State
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-between items-center overflow-hidden">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">
                Lagos
              </div>
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-3 h-1.5 left-[6px] top-[9px] absolute outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Phone Number
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input 
                type="tel" 
                defaultValue="09022665965"
                className="w-full bg-transparent outline-none border-none justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Email */}
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[506px] h-2.5 justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium']">
              Email
            </div>
            <div className="self-stretch h-14 px-7 bg-black/5 rounded-[30px] outline outline-2 outline-offset-[-2px] outline-black/5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <input 
                type="email" 
                defaultValue="anosikekenechukwu2023@gmail.com"
                className="w-full bg-transparent outline-none border-none justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="self-stretch h-14 min-w-48 px-6 py-3 bg-brand-colors-rootgrey rounded-[30px] inline-flex justify-center items-center gap-2.5">
            <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">
              Saved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;