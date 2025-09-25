import React from 'react';
import '@/styles/fonts.css';
import { Link } from 'react-router-dom';
import NotificationDropdown from '../ui/NotificationDropdown';

type ActiveView = 'marketplace' | 'chats' | 'settings';

interface MarketplaceHeaderProps {
  isScrolled: boolean;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  isScrolled,
  activeView,
  setActiveView
}) => {
  return (
    <div
      className={`w-full transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 z-50' : 'relative'}`}
      style={{
        background: isScrolled
          ? 'rgba(228, 253, 225, 0.30)'
          : 'rgba(228, 253, 225, 0.50)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      {/* Desktop Header */}
      <div className="hidden lg:block py-2.5">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 flex justify-between items-center">
          <Link to="/marketplace" className="flex items-center">
            <img src="/Agrilink-logo-dark.svg" alt="Agrilink Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/farmer-dashboard">
              <div className="min-w-40 min-h-10 px-6 py-3 rounded-3xl flex justify-center items-center" style={{background: '#84C62C'}}>
                <div className="text-base font-madani-bold text-steam-white">Sell Your Product</div>
              </div>
            </Link>
            <button
              onClick={() => setActiveView('marketplace')}
              className={`w-10 h-10 p-1 rounded-full flex justify-center items-center cursor-pointer btn-shadow ${activeView === 'marketplace' ? 'ring-2 ring-brand-colors-SproutGreen' : ''}`}
              style={{background: activeView === 'marketplace' ? '#84C62C' : '#182605'}}
            >
              <img src="/market place icon.svg" alt="Marketplace" className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveView('chats')}
              className={`w-10 h-10 p-1 rounded-full flex justify-center items-center cursor-pointer btn-shadow ${activeView === 'chats' ? 'ring-2 ring-brand-colors-SproutGreen' : ''}`}
              style={{background: activeView === 'chats' ? '#84C62C' : 'white'}}
            >
              <img
                src="/chat icon.svg"
                alt="Chat"
                className={`w-6 h-6 ${activeView === 'chats' ? 'icon-invert' : 'icon-normal'}`}
              />
            </button>
            <NotificationDropdown
              buttonClassName="!bg-white"
              onMarkAllAsRead={() => console.log('Mark all as read - marketplace')}
              onOpenNotifications={() => console.log('Open notifications - marketplace')}
              onNotificationClick={(notification) => console.log('Notification clicked - marketplace:', notification)}
            />
            <button
              onClick={() => setActiveView('settings')}
              className={`cursor-pointer ${activeView === 'settings' ? 'ring-2 ring-brand-colors-SproutGreen rounded-full' : ''}`}
            >
              <img className="w-10 h-10 rounded-full" src="/profile image.png" alt="Profile" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden w-full h-full p-4 flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch flex flex-col justify-start items-end gap-4">
          {/* Top Row - Logo and Sell Button */}
          <div className="self-stretch flex justify-between items-center">
            <Link to="/marketplace" className="flex items-center">
              <img src="/Agrilink-logo-dark.svg" alt="Agrilink Logo" className="h-6 w-auto" />
            </Link>
            <Link to="/farmer-dashboard">
              <button
                className="min-w-[160px] min-h-[40px] px-6 py-3 rounded-[30px] flex justify-center items-center gap-2.5"
                style={{ backgroundColor: '#84C62C' }}
              >
                <div className="text-white text-base font-madani-bold">
                  Sell Your Product
                </div>
              </button>
            </Link>
          </div>

          {/* Bottom Row - Navigation Icons */}
          <div className="self-stretch flex justify-between items-center">
            {/* Marketplace Icon */}
            <button
              onClick={() => setActiveView('marketplace')}
              className="w-10 h-10 p-[3px] rounded-[20px] flex justify-center items-center gap-2.5 transition-colors"
              style={{
                backgroundColor: activeView === 'marketplace' ? '#182605' : 'white',
                boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'
              }}
            >
              <img
                src="/market place icon.svg"
                alt="Marketplace"
                className="w-6 h-6"
                style={{
                  filter: activeView === 'marketplace'
                    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                    : 'brightness(0) saturate(100%) invert(14%) sepia(69%) saturate(1083%) hue-rotate(71deg) brightness(91%) contrast(106%)'
                }}
              />
            </button>

            {/* Chat Icon */}
            <button
              onClick={() => setActiveView('chats')}
              className="w-10 h-10 p-[3px] rounded-[20px] flex justify-center items-center gap-2.5 transition-colors"
              style={{
                backgroundColor: activeView === 'chats' ? '#182605' : 'white',
                boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'
              }}
            >
              <img
                src="/chat icon.svg"
                alt="Chat"
                className="w-6 h-6"
                style={{
                  filter: activeView === 'chats'
                    ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
                    : 'brightness(0) saturate(100%) invert(14%) sepia(69%) saturate(1083%) hue-rotate(71deg) brightness(91%) contrast(106%)'
                }}
              />
            </button>

            {/* Notifications */}
            <div
              className="w-10 h-10 p-[3px] rounded-[20px] flex justify-center items-center gap-2.5"
              style={{
                backgroundColor: 'white',
                boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'
              }}
            >
              <NotificationDropdown
                buttonClassName="!w-6 !h-6 !p-0 !bg-transparent !shadow-none"
                onMarkAllAsRead={() => console.log('Mark all as read - marketplace')}
                onOpenNotifications={() => console.log('Open notifications - marketplace')}
                onNotificationClick={(notification) => console.log('Notification clicked - marketplace:', notification)}
              />
            </div>

            {/* Profile */}
            <button
              onClick={() => setActiveView('settings')}
              className="cursor-pointer transition-all"
            >
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="/profile image.png"
                alt="Profile"
                style={{
                  outline: activeView === 'settings' ? '2px solid #84C62C' : 'none',
                  outlineOffset: activeView === 'settings' ? '2px' : '0'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;