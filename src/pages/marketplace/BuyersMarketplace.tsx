import React from 'react';
import { Link } from 'react-router-dom';

const BuyersMarketplace = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-[1512px] px-24 py-2.5 bg-green-100/50 inline-flex justify-between items-center">
        <div className="w-36 h-12 relative flex items-center">
          <img 
            src="/Agrilink-logo-dark.svg" 
            alt="AgriLink Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="flex justify-start items-center gap-4">
          <Link to="/farmer-dashboard">
            <div data-property-1="Default" className="min-w-40 min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors">
              <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">Sell Your Product</div>
            </div>
          </Link>
          <Link to="/marketplace">
            <div className="w-10 h-10 p-[3px] bg-brand-colors-RootBlack rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5 hover:bg-brand-colors-RootBlack/80 transition-colors">
              <img 
                src="/market place icon.svg" 
                alt="Marketplace" 
                className="w-6 h-6"
              />
            </div>
          </Link>
          <Link to="/notifications">
            <div className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5 hover:bg-gray-100 transition-colors">
              <img 
                src="/notification-icon.svg" 
                alt="Notifications" 
                className="w-6 h-6"
              />
            </div>
          </Link>
          <Link to="/profile">
            <div className="w-10 h-10 rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0px_4px_30px_5px_rgba(0,0,0,0.25)] transition-shadow">
              <img 
                src="/profile image.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Main content area - ready for additional sections */}
      <div className="flex-1">
        {/* Future sections will go here */}
      </div>
    </div>
  );
};

export default BuyersMarketplace;