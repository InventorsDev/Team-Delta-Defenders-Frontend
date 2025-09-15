import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface DashboardSidebarProps {
  activeView: 'dashboard' | 'listings' | 'chats' | 'settings';
  setActiveView: (view: 'dashboard' | 'listings' | 'chats' | 'settings') => void;
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
  setActiveView 
}) => {
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
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="w-80 h-screen bg-brand-colors-HarvestMist rounded-tl-[20px] rounded-bl-[20px] p-4 pb-8 flex flex-col">
      {/* Logo */}
      <div className="mb-12 relative">
        <AgrilinkLogo />
        <div className="w-40 h-40 absolute -top-2 right-0 overflow-hidden">
          <img src="/lsicon_leaf-outline.png" alt="Leaf outline" className="w-32 h-24 right-[2px] top-[2px] absolute object-contain" style={{
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
              onClick={() => setActiveView(item.id)}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all
                ${isActive 
                  ? 'bg-brand-colors-SproutGreen/30 text-brand-colors-RootBlack' 
                  : 'text-brand-colors-RootBlack hover:bg-brand-colors-SproutGreen/10'
                }
              `}
            >
              {typeof Icon === 'string' ? (
                <img src={`/${Icon}`} alt={item.label} className="h-6 w-6" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
              <span 
                className="text-lg font-medium"
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
          className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-brand-colors-RootBlack hover:bg-red-100 transition-all mt-4"
        >
          <img src="/logout icon.svg" alt="Logout" className="h-6 w-6" />
          <span 
            className="text-lg font-medium"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            Logout
          </span>
        </button>
      </nav>

      {/* Bottom Promotional Card */}
      <div className="mt-4">
        <div className="bg-white rounded-xl shadow-md p-4 text-center w-64 h-64 mx-auto flex flex-col justify-between">
          <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden">
            <img 
              src="/farmers-dashoard-sidebar .png" 
              alt="Fresh Produce" 
              className="w-full h-full object-contain"
            />
          </div>
          <h3 
            className="text-sm font-bold mb-2 text-brand-colors-RootBlack"
            style={{ fontFamily: 'MadaniArabic-Bold' }}
          >
            Need to Buy Fresh Produce Too?
          </h3>
          <p 
            className="text-xs text-gray-600 mb-3"
            style={{ fontFamily: 'MadaniArabic-Regular' }}
          >
            Switch to the Buyers Marketplace
          </p>
          <Link to="/marketplace">
            <Button
              className="w-full text-xs py-2 bg-brand-colors-SproutGreen hover:bg-brand-colors-SproutGreen/90 text-white"
              style={{ fontFamily: 'MadaniArabic-Bold' }}
            >
              Go to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;