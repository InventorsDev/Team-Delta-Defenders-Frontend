import React, { useState, useEffect, useRef } from 'react';
import '@/styles/fonts.css';

// Components
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import MyListings from '@/components/dashboard/MyListings';
import Chats from '@/components/dashboard/Chats';
import Settings from '@/components/dashboard/Settings';
import ProductCard, { ProductData } from '@/components/dashboard/ProductCard';
import NotificationItem, { NotificationData } from '@/components/dashboard/NotificationItem';
import NotificationDropdown from '@/components/ui/NotificationDropdown';
import StatsCard from '@/components/dashboard/StatsCard';
import MobileNotifications from '@/components/dashboard/MobileNotifications';
import MobileListings from '@/components/dashboard/MobileListings';
import MobileDashboard from '@/components/dashboard/MobileDashboard';
import MobileProductDetail from '@/components/dashboard/MobileProductDetail';
import MobileEditProduct from '@/components/dashboard/MobileEditProduct';
import MobileAddListing from '@/components/dashboard/MobileAddListing';

// Data
import { mockListings } from '@/data/mockProducts';

// Hooks
import { useScrollDetection } from '@/hooks/useScrollDetection';
import { mobileStatsCards, createDesktopStatsCards } from '@/data/mockStats';

// Hooks
import { useNotifications } from '@/hooks/useNotifications';
import { useFavorites } from '@/hooks/useFavorites';
import { useListings } from '@/hooks/useListings';

// Services
import { getUserData } from '@/services/auth/tokenStorage';


type ActiveView = 'dashboard' | 'listings' | 'chats' | 'settings' | 'product-detail' | 'edit-product' | 'add-listing';

const FarmerDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [uiState, setUiState] = useState({
    isMobileMenuOpen: false,
    showMobileNotifications: false,
    shouldTriggerAddListing: false
  });
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [businessName, setBusinessName] = useState<string>('Farmer');

  // Custom hooks for business logic
  const { notifications, markAsRead, handleNotificationClick } = useNotifications();
  const { favoriteProducts, toggleFavorite } = useFavorites();
  const { listings, activeListings, soldListings, deleteListing, editListing } = useListings();
  const isScrolled = useScrollDetection();

  // Fetch user data on component mount
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      // Use name as business name (backend doesn't have separate businessName field)
      setBusinessName(userData.name || 'Farmer');
      console.log('User data loaded:', userData);
      console.log('Display name:', userData.name);
    }
  }, []);

  // Helper functions to update UI state
  const updateUiState = (updates: Partial<typeof uiState>) => {
    setUiState(prev => ({ ...prev, ...updates }));
  };

  // Helper function to handle notification click from child components
  const handleNotificationClickFromChild = () => {
    setActiveView('dashboard');
    updateUiState({ showMobileNotifications: false });
  };

  // Create desktop stats cards with proper handlers
  const desktopStatsCards = createDesktopStatsCards(
    setActiveView,
    (trigger: boolean) => updateUiState({ shouldTriggerAddListing: trigger })
  );


  // Product card handlers
  const handleProductClick = (product: ProductData) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
  };

  const handleBackFromProductDetail = () => {
    setActiveView('listings');
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: ProductData) => {
    setSelectedProduct(product);
    setActiveView('edit-product');
  };

  const handleBackFromEditProduct = () => {
    setActiveView('product-detail');
  };

  const handleSaveProduct = (product: ProductData) => {
    console.log('Save product:', product);
    // TODO: Implement save functionality
    setActiveView('product-detail');
  };

  const handleDeleteFromDetail = (productId: number) => {
    deleteListing(productId);
    setActiveView('listings');
  };

  const handleAddNewListing = () => {
    setActiveView('add-listing');
  };

  const handleBackFromAddListing = () => {
    setActiveView('listings');
  };

  const handleSaveNewListing = (formData: any) => {
    console.log('Save new listing:', formData);
    // TODO: Implement save functionality
    setActiveView('listings');
  };




  // Old renderDashboardContent function removed - now inline

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Mobile Header */}
      {activeView !== 'product-detail' && activeView !== 'edit-product' && activeView !== 'add-listing' && (
        <div
          className="lg:hidden fixed top-0 left-0 right-0 z-30 w-full max-w-full transition-all duration-300"
          style={{
            background: isScrolled
              ? 'rgba(228, 253, 225, 0.30)'
              : 'rgba(228, 253, 225, 0.50)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
            boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'
          }}
        >
        <div className="w-full h-full p-4 flex flex-col gap-2.5 max-w-full">
          <div className="w-full flex flex-col gap-4 max-w-full">
            <div className="w-full flex justify-between items-center max-w-full">
              <div className="flex items-center flex-shrink-0">
                <img src="/Agrilink-logo-dark.svg" alt="Agrilink Logo" className="h-6" />
              </div>
              <button
                className="flex-shrink-0 h-10 px-4 py-3 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center text-sm"
                onClick={() => window.location.href = '/marketplace'}
              >
                <div className="text-white text-sm font-bold font-madani-bold whitespace-nowrap">Go to Marketplace</div>
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-2 max-w-full">
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  updateUiState({ showMobileNotifications: false });
                }}
                className={`flex-shrink-0 w-10 h-10 p-0.5 rounded-2xl flex items-center justify-center btn-shadow ${activeView === 'dashboard' && !uiState.showMobileNotifications ? 'bg-brand-colors-RootBlack' : 'bg-white'}`}
              >
                <img
                  src="/dashboard.svg"
                  alt="Dashboard"
                  className={`w-6 h-6 ${activeView === 'dashboard' && !uiState.showMobileNotifications ? 'icon-invert' : 'icon-normal'}`}
                />
              </button>
              <button
                onClick={() => {
                  setActiveView('listings');
                  updateUiState({ showMobileNotifications: false });
                }}
                className={`flex-shrink-0 w-10 h-10 p-0.5 rounded-2xl flex items-center justify-center btn-shadow ${activeView === 'listings' && !uiState.showMobileNotifications ? 'bg-brand-colors-RootBlack' : 'bg-white'}`}
              >
                <img
                  src="/listing.svg"
                  alt="Listings"
                  className={`w-6 h-6 ${activeView === 'listings' && !uiState.showMobileNotifications ? 'icon-invert' : 'icon-normal'}`}
                />
              </button>
              <button
                onClick={() => {
                  setActiveView('chats');
                  updateUiState({ showMobileNotifications: false });
                }}
                className={`flex-shrink-0 w-10 h-10 p-0.5 rounded-2xl flex items-center justify-center btn-shadow ${activeView === 'chats' && !uiState.showMobileNotifications ? 'bg-brand-colors-RootBlack' : 'bg-white'}`}
              >
                <img
                  src="/chat icon.svg"
                  alt="Chats"
                  className={`w-6 h-6 ${activeView === 'chats' && !uiState.showMobileNotifications ? 'icon-invert' : 'icon-normal'}`}
                />
              </button>
              <button
                onClick={() => {
                  updateUiState({ showMobileNotifications: !uiState.showMobileNotifications });
                }}
                className={`flex-shrink-0 w-10 h-10 p-0.5 rounded-2xl flex items-center justify-center btn-shadow ${uiState.showMobileNotifications ? 'bg-brand-colors-RootBlack' : 'bg-white'}`}
              >
                <img
                  src="/notification-icon.svg"
                  alt="Notifications"
                  className={`w-6 h-6 ${uiState.showMobileNotifications ? 'icon-invert' : 'icon-normal'}`}
                />
              </button>
              <button
                onClick={() => {
                  setActiveView('settings');
                  updateUiState({ showMobileNotifications: false });
                }}
                className="flex-shrink-0 w-10 h-10 p-0.5 rounded-2xl overflow-hidden btn-shadow"
              >
                <img className="w-full h-full rounded-full object-cover" src="/profile image.png" alt="Profile" />
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Sidebar */}
      <DashboardSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileMenuOpen={uiState.isMobileMenuOpen}
        setIsMobileMenuOpen={(isOpen: boolean) => updateUiState({ isMobileMenuOpen: isOpen })}
      />

      {/* Main Content Area */}
      <div className={`w-full lg:pl-64 xl:pl-80 bg-white lg:rounded-tr-3xl lg:rounded-br-3xl min-h-screen overflow-x-hidden ${(activeView === 'product-detail' || activeView === 'edit-product' || activeView === 'add-listing') ? 'pt-0' : 'pt-32 lg:pt-0'}`}>
        {uiState.showMobileNotifications && (
          <div className="lg:hidden">
            <MobileNotifications
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          </div>
        )}
        {!uiState.showMobileNotifications && activeView === 'dashboard' && (
          <>
            <div className="lg:hidden">
              <MobileDashboard
                businessName={businessName}
                onProductClick={handleProductClick}
                onViewAllListings={() => setActiveView('listings')}
                onSeeMoreTrending={() => setActiveView('listings')}
                onViewAllTestimonials={() => setActiveView('chats')}
              />
            </div>
            <div className="hidden lg:block p-3 overflow-y-auto">
              <div className="w-full max-w-full lg:max-w-[1129px] mx-auto bg-white rounded-[20px] p-3 sm:p-4 lg:p-6 space-y-3">
                {/* Top Header Section */}
                <div className="w-full bg-white/80 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex flex-col gap-4">
                    <div className="text-brand-colors-RootBlack text-base font-madani-medium">Welcome to your dashboard</div>
                    <div className="flex items-center gap-3">
                      <div><span className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Good Morning </span><span className="text-brand-colors-SproutGreen text-2xl font-normal font-['MadaniArabic-Bold']">{businessName}</span></div>
                      <img src="/si_sun-fill.svg" alt="Sun" className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-4">
                    <NotificationDropdown
                      buttonClassName="bg-white"
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
                    <button
                      onClick={() => setActiveView('settings')}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <img className="w-10 h-10 rounded-full object-cover" src="/profile image.png" alt="Profile" />
                    </button>
                  </div>
                </div>

                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.5fr_1fr] gap-4 sm:gap-6">
                  <StatsCard card={desktopStatsCards[0]} variant="desktop" />
                  <StatsCard card={desktopStatsCards[1]} variant="desktop" />
                  <StatsCard card={desktopStatsCards[2]} variant="desktop" />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* My Listings Section */}
                    <div className="flex flex-col gap-7">
                      <div className="flex justify-between items-center">
                        <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">My Listings</div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
                          <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:gap-5 gap-4 lg:overflow-x-auto">
                        {mockListings.slice(0, 3).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            variant="desktop"
                            onCardClick={handleProductClick}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Trending Farm Produce Section */}
                    <div className="flex flex-col gap-7">
                      <div className="flex justify-between items-center">
                        <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Trending Farm Produce</div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">See more</div>
                          <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="p-5 bg-white rounded-[20px] shadow-lg relative overflow-hidden">
                          <img className="absolute w-32 h-24 right-4 bottom-4 mix-blend-multiply" src="/tomatoes-trending-farm-produce.png" alt="Tomatoes" />
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-brand-colors-RootBlack">Tomatoes</h3>
                            <img src="/ph_trend-up-bold.svg" alt="Trend up" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Status:</span>
                            <span className="text-sm text-brand-colors-rootgrey">Demand </span>
                            <span className="text-sm font-medium text-brand-colors-RootBlack">up 15%</span>
                            <span className="text-sm text-brand-colors-rootgrey"> this week</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Avg price:</span>
                            <span className="text-base font-semibold text-brand-colors-RootBlack">₦39,500 </span>
                            <span className="text-sm text-brand-colors-rootgrey">per basket</span>
                          </div>
                          <div className="w-48">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Insight: </span>
                            <span className="text-sm text-brand-colors-rootgrey">Prices rising due to seasonal scarcity; great time to list your harvest!</span>
                          </div>
                        </div>
                        <div className="p-5 bg-white rounded-[20px] shadow-lg relative overflow-hidden">
                          <img className="absolute w-32 h-24 right-4 bottom-4 mix-blend-multiply" src="/maize-trending-farm-produce.png" alt="Maize" />
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-brand-colors-RootBlack">Maize</h3>
                            <img src="/ph_trend-down-bold.svg" alt="Trend down" className="w-5 h-5" />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Status:</span>
                            <span className="text-sm text-brand-colors-rootgrey">Demand </span>
                            <span className="text-sm font-medium text-brand-colors-RootBlack">down 10%</span>
                            <span className="text-sm text-brand-colors-rootgrey"> this week</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Avg price:</span>
                            <span className="text-base font-semibold text-brand-colors-RootBlack">₦12,000 </span>
                            <span className="text-sm text-brand-colors-rootgrey">per 50kg bag</span>
                          </div>
                          <div className="w-48">
                            <span className="text-sm font-medium text-brand-colors-RootBlack">Insight: </span>
                            <span className="text-sm text-brand-colors-rootgrey">Prices dropping slightly as harvest peaks; consider storing if possible.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Chats Section */}
                    <div className="flex flex-col gap-7">
                      <div className="flex justify-between items-center">
                        <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Chats</div>
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setActiveView('chats')}>
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
                          <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {[
                          { name: "Ugonna Chibuike", message: "oga watin be last price", time: "5 mins", avatar: "/dashboard-chat-1.png" },
                          { name: "White Tapes", message: "How fresh is the pepper", time: "30 mins", avatar: "/dashboard-chat-2.png" },
                          { name: "Tunde Ednut", message: "How fresh is the pepper", time: "3 hrs", avatar: "/dashboard-chat-3.png" }
                        ].map((chat, index) => (
                          <div key={index} className="px-3 py-2 bg-white rounded-[20px] flex items-start gap-3">
                            <img className="w-9 h-9 rounded-full object-cover" src={chat.avatar} alt={chat.name} />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-brand-colors-RootBlack">{chat.name}</div>
                              <div className="text-xs text-brand-colors-rootgrey">{chat.message}</div>
                            </div>
                            <div className="text-xs text-brand-colors-rootgrey">{chat.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="flex flex-col gap-7">
                      <div className="flex justify-between items-center">
                        <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Testimonials</div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
                          <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="p-4 bg-white rounded-[20px] shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-2.png" alt="White Tapes" />
                          <div>
                            <div className="text-base font-medium text-brand-colors-RootBlack">White Tapes</div>
                            <div className="text-xs text-brand-colors-rootgrey">Fashion Designer</div>
                          </div>
                        </div>
                        <p className="text-sm text-brand-colors-RootBlack italic">
                          "I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised."
                        </p>
                        <div className="flex items-center gap-1 mt-3">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {!uiState.showMobileNotifications && activeView === 'listings' && (
          <>
            <div className="lg:hidden">
              <MobileListings
                favoriteProducts={favoriteProducts}
                onDeleteClick={deleteListing}
                onProductClick={handleProductClick}
                onAddClick={handleAddNewListing}
              />
            </div>
            <div className="hidden lg:block">
              <MyListings
                onDeleteListing={deleteListing}
                onCreateListing={() => {}}
                shouldTriggerAdd={uiState.shouldTriggerAddListing}
                onAddTriggered={() => updateUiState({ shouldTriggerAddListing: false })}
                onProfileClick={() => setActiveView('settings')}
              />
            </div>
          </>
        )}
        {!uiState.showMobileNotifications && activeView === 'chats' && (
          <div className="lg:hidden h-full">
            <Chats
              variant="mobile"
              onProfileClick={() => setActiveView('settings')}
            />
          </div>
        )}
        {!uiState.showMobileNotifications && activeView === 'chats' && (
          <div className="hidden lg:block h-full">
            <Chats
              variant="desktop"
              onProfileClick={() => setActiveView('settings')}
            />
          </div>
        )}
        {!uiState.showMobileNotifications && activeView === 'settings' && (
          <>
            <div className="lg:hidden h-full">
              <Settings
                variant="mobile"
                showHeader={false}
                onBack={() => setActiveView('dashboard')}
                onNotificationClick={handleNotificationClickFromChild}
                onProfileClick={() => setActiveView('settings')}
              />
            </div>
            <div className="hidden lg:block h-full">
              <Settings
                variant="desktop"
                showHeader={true}
                onNotificationClick={handleNotificationClickFromChild}
                onProfileClick={() => setActiveView('settings')}
              />
            </div>
          </>
        )}
        {!uiState.showMobileNotifications && activeView === 'product-detail' && (
          <MobileProductDetail
            product={selectedProduct}
            isOpen={true}
            onClose={handleBackFromProductDetail}
            onEdit={handleEditProduct}
            onDelete={handleDeleteFromDetail}
          />
        )}
        {!uiState.showMobileNotifications && activeView === 'edit-product' && (
          <MobileEditProduct
            product={selectedProduct}
            isOpen={true}
            onClose={handleBackFromEditProduct}
            onSave={handleSaveProduct}
            onDelete={handleDeleteFromDetail}
          />
        )}
        {!uiState.showMobileNotifications && activeView === 'add-listing' && (
          <MobileAddListing
            onBack={handleBackFromAddListing}
            onSave={handleSaveNewListing}
          />
        )}
      </div>

    </div>
  );
};

export default FarmerDashboard;