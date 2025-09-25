import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';

interface DashboardSidebarProps {
  activeView: 'dashboard' | 'listings' | 'chats' | 'settings';
  setActiveView: (view: 'dashboard' | 'listings' | 'chats' | 'settings') => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}

const AgrilinkLogo = () => (
  <div className="flex items-center gap-2">
    <Link to="/" className="cursor-pointer">
      <img src="/Agrilink-logo-dark.svg" alt="Agrilink Logo" className="h-12" />
    </Link>
  </div>
);

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeView,
  setActiveView,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen
}) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const navigationItems = [
    {
      id: 'dashboard' as const,
      icon: 'dashboard.svg',
      label: 'Dashboard'
    },
    {
      id: 'listings' as const,
      icon: 'listing.svg',
      label: 'My Listings'
    },
    {
      id: 'chats' as const,
      icon: 'chat icon.svg',
      label: 'Chats'
    },
    {
      id: 'settings' as const,
      icon: 'settings icon.svg',
      label: 'Settings'
    }
  ];

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Close the modal first
    setIsLogoutModalOpen(false);

    // Clear any authentication data (localStorage, sessionStorage, etc.)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to landing page
    navigate('/', { replace: true });
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen?.(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-brand-colors-HarvestMist lg:rounded-tl-[20px] lg:rounded-bl-[20px] p-4 pb-8 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:max-h-screen lg:overflow-y-auto
        w-80 lg:w-64 xl:w-80
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setIsMobileMenuOpen?.(false)}
          className="p-2 rounded-lg hover:bg-brand-colors-SproutGreen/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="mb-8 lg:mb-12 relative">
        <AgrilinkLogo />
        <div className="w-32 lg:w-40 h-32 lg:h-40 absolute -top-2 right-0 overflow-hidden">
          <img src="/lsicon_leaf-outline.png" alt="Leaf outline" className="w-24 lg:w-32 h-16 lg:h-24 right-[2px] top-[2px] absolute object-contain" style={{
            filter: 'invert(47%) sepia(94%) saturate(568%) hue-rotate(81deg) brightness(94%) contrast(88%)'
          }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setIsMobileMenuOpen?.(false);
              }}
              className={`
                w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl flex items-center gap-2 lg:gap-3 transition-all
                ${isActive
                  ? 'bg-brand-colors-SproutGreen/30 text-brand-colors-RootBlack'
                  : 'text-brand-colors-RootBlack hover:bg-brand-colors-SproutGreen/10'
                }
              `}
            >
              {typeof Icon === 'string' ? (
                <img src={`/${Icon}`} alt={item.label} className="h-5 w-5 lg:h-6 lg:w-6" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
              <span
                className="text-base lg:text-lg font-medium"
                style={{ fontFamily: 'MadaniArabic-Medium' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-xl flex items-center gap-2 lg:gap-3 text-brand-colors-RootBlack hover:bg-red-100 transition-all mt-4"
        >
          <img src="/logout icon.svg" alt="Logout" className="h-5 w-5 lg:h-6 lg:w-6" />
          <span
            className="text-base lg:text-lg font-medium"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            Logout
          </span>
        </button>
      </nav>

      {/* Bottom Promotional Card */}
      <div className="mt-4 hidden lg:block xl:block">
        <div className="bg-white rounded-xl shadow-md p-3 lg:p-4 text-center w-full max-w-64 mx-auto flex flex-col justify-between">
          <div className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mx-auto mb-2 lg:mb-3 rounded-lg overflow-hidden">
            <img
              src="/farmers-dashoard-sidebar .png"
              alt="Fresh Produce"
              className="w-full h-full object-contain"
            />
          </div>
          <h3
            className="text-xs lg:text-sm font-bold mb-1 lg:mb-2 text-brand-colors-RootBlack"
            style={{ fontFamily: 'MadaniArabic-Bold' }}
          >
            Need to Buy Fresh Produce Too?
          </h3>
          <p
            className="text-xs text-gray-600 mb-2 lg:mb-3"
            style={{ fontFamily: 'MadaniArabic-Regular' }}
          >
            Switch to the Buyers Marketplace
          </p>
          <Link to="/marketplace">
            <Button
              className="w-full text-xs py-1.5 lg:py-2 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 text-white"
              style={{ fontFamily: 'MadaniArabic-Bold' }}
              onClick={() => setIsMobileMenuOpen?.(false)}
            >
              Go to Marketplace
            </Button>
          </Link>
        </div>
      </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default DashboardSidebar;