import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, BarChart3, TrendingUp } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CreateListingModal from '@/components/dashboard/CreateListingModal';
import MyListings from '@/components/dashboard/MyListings';
import Chats from '@/components/dashboard/Chats';

// Mock data for demonstration
const mockListings = [
  {
    id: 1,
    produceType: 'Tomato',
    quantity: '50 bags',
    harvestDate: '2024-01-15',
    price: '₦5,000 per bag',
    status: 'Active',
    image: '/placeholder-tomato.jpg'
  },
  {
    id: 2,
    produceType: 'Maize',
    quantity: '100 bags',
    harvestDate: '2024-02-01',
    price: '₦8,000 per bag',
    status: 'Active',
    image: '/placeholder-maize.jpg'
  },
  {
    id: 3,
    produceType: 'Yam',
    quantity: '25 tubers',
    harvestDate: '2024-01-20',
    price: '₦500 per tuber',
    status: 'Sold',
    image: '/placeholder-yam.jpg'
  }
];

type ActiveView = 'dashboard' | 'listings' | 'chats' | 'settings';

const FarmerDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [listings, setListings] = useState(mockListings);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleCreateListing = (newListing: any) => {
    const listing = {
      id: Date.now(),
      ...newListing,
      status: 'Active'
    };
    setListings([listing, ...listings]);
    setIsCreateListingOpen(false);
  };

  const handleDeleteListing = (id: number) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const handleEditListing = (id: number, updatedListing: any) => {
    setListings(listings.map(listing => 
      listing.id === id ? { ...listing, ...updatedListing } : listing
    ));
  };

  const activeListings = listings.filter(listing => listing.status === 'Active');
  const soldListings = listings.filter(listing => listing.status === 'Sold');

  // Handle click outside notification popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
        setIsNotificationMenuOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const renderDashboardContent = () => (
    <div className="w-[1129px] h-[1165px] relative bg-brand-colors-SteamWhite rounded-[20px] overflow-hidden">
      {/* Top Header Section */}
      <div className="w-[1129px] px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
        <div className="inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-madani-medium">Welcome to your dashboard</div>
          <div className="inline-flex justify-start items-center gap-3">
            <div className="justify-start"><span className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Good Morning </span><span className="text-brand-colors-SproutGreen text-2xl font-normal font-['MadaniArabic-Bold']">Anosikay Farms</span></div>
            <img src="/si_sun-fill.svg" alt="Sun" className="w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-start items-center gap-2.5">
                <img className="w-6 h-6" src="/design/assets/icons folder/notification icon.svg" alt="Notifications" />
              </div>
            </button>

            {/* Notifications Popup */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-96 h-[664px] bg-brand-colors-SteamWhite rounded-[20px] shadow-lg z-50 flex flex-col">
                {/* Header - Fixed */}
                <div className="p-5 flex flex-col gap-4 flex-shrink-0">
                  <div className="flex justify-between items-center">
                    <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Notifications</div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsNotificationMenuOpen(!isNotificationMenuOpen);
                          }}
                          className="w-8 h-8 flex justify-center items-center gap-2.5 hover:bg-gray-100 hover:bg-opacity-80 p-1.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50 active:scale-95"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsNotificationMenuOpen(!isNotificationMenuOpen);
                            }
                          }}
                          aria-label="More notification options"
                          aria-expanded={isNotificationMenuOpen}
                          aria-haspopup="true"
                        >
                          <img src="/dot menu.svg" alt="Menu" className="w-5 h-5" />
                        </button>
                        
                        {/* Secondary Menu Popup */}
                        {isNotificationMenuOpen && (
                          <div className="w-60 h-28 absolute right-0 top-10 bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] overflow-hidden z-20">
                            <button 
                              data-property-1="hover" 
                              className="w-52 p-2.5 left-[16px] top-[16px] absolute bg-brand-colors-HarvestMist rounded-[10px] inline-flex justify-start items-center gap-2.5 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Mark all as read functionality
                                console.log('Mark all as read');
                                setIsNotificationMenuOpen(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Mark all as read');
                                  setIsNotificationMenuOpen(false);
                                }
                              }}
                            >
                              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-medium">Mark all as read</div>
                            </button>
                            <button 
                              data-property-1="Default" 
                              className="w-52 p-2.5 left-[16px] top-[61px] absolute bg-brand-colors-SteamWhite rounded-[10px] inline-flex justify-start items-center gap-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Open notifications functionality
                                console.log('Open notifications');
                                setIsNotificationMenuOpen(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Open notifications');
                                  setIsNotificationMenuOpen(false);
                                }
                              }}
                            >
                              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-medium">Open notifications</div>
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setIsNotificationOpen(false);
                          setIsNotificationMenuOpen(false);
                        }}
                        className="flex justify-start items-center gap-2.5 hover:bg-gray-100 p-1 rounded text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="inline-flex gap-3">
                    <div data-property-1="Default" className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] flex justify-center items-center gap-2.5">
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">All</div>
                    </div>
                    <div data-property-1="Variant2" className="p-2.5 rounded-[20px] flex justify-center items-center gap-2.5">
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">Unread</div>
                    </div>
                  </div>
                </div>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5">
                  <div className="space-y-2 pb-4">
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="unread" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-1.png" />
                          <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">New Buyer Message</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">You have a new message from Chinedu — check your chat to respond quickly!</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">5 mins</div>
                    </div>
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="unread" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10" src="/notif read.svg" />
                          <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">Price Alert</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">Maize prices have increased by 8% this week. Consider updating your listing</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">3 hrs</div>
                    </div>
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="unread" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-3.png" />
                          <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">Profile Completion Reminder</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">Complete your profile to attract more buyers and boost your credibility.</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">6 hrs</div>
                    </div>
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="unread" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10" src="/notif read.svg" />
                          <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">New Buyer Message</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">You have a new message from Chinedu — check your chat to respond quickly!</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">16 hrs</div>
                    </div>
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="read" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-5.png" />
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">Approved Listing</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">Great news! Your listing for 'Fresh Red Tomatoes' has been approved and is now live for buyers</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">1 day</div>
                    </div>
                    <div data-property-1="Default" className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div data-property-1="read" className="w-10 h-10 relative flex-shrink-0">
                          <img className="w-10 h-10" src="/notif read.svg" />
                        </div>
                        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                          <div className="text-brand-colors-RootBlack text-base font-madani-medium">New Review Received</div>
                          <div className="text-brand-colors-rootgrey text-xs font-madani-light">You've got a new review: 'Excellent quality and fast response!' Check your profile to read more</div>
                        </div>
                      </div>
                      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">2 days</div>
                    </div>
                  </div>
                </div>
                
                {/* Footer Button - Fixed */}
                <div className="p-5 pt-0 flex-shrink-0">
                  <button 
                    onClick={() => {
                      // Handle see all notifications functionality
                      console.log('See all notifications clicked');
                      setIsNotificationOpen(false);
                    }}
                    className="w-full h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] inline-flex justify-center items-center gap-2.5 hover:bg-opacity-80 transition-colors"
                    style={{
                      opacity: 1,
                      transform: 'rotate(0deg)'
                    }}
                  >
                    <div className="text-brand-colors-RootBlack text-base font-madani-bold">See all notifications</div>
                  </button>
                </div>
              </div>
            )}
          </div>
          <img className="w-10 h-10 rounded-full" src="/design/assets/dashboard & marketplace assets/profile image.png" alt="Profile" />
        </div>
      </div>

      {/* First Stats Card - Overview */}
      <div className="w-64 h-60 left-[40px] top-[132px] absolute bg-brand-colors-RootBlack rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="w-64 h-64 left-[-146px] top-[142px] absolute opacity-10 bg-brand-colors-SteamWhite rounded-full"></div>
        <div className="w-64 h-64 left-[134px] top-[-159px] absolute opacity-10 bg-brand-colors-SteamWhite rounded-full"></div>
        <div className="left-[30px] top-[30px] absolute justify-start text-brand-colors-SteamWhite text-xl font-normal font-['MadaniArabic-Bold']">Overview</div>
        <div className="w-48 left-[30px] top-[88px] absolute inline-flex justify-between items-start">
          <div className="inline-flex flex-col justify-start items-center gap-3">
            <div className="justify-start text-brand-colors-SteamWhite text-4xl font-normal font-['MadaniArabic-Bold'] leading-[60px]">5</div>
            <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Medium']">Chats</div>
          </div>
          <div className="w-16 inline-flex flex-col justify-start items-center gap-3">
            <div className="justify-start text-brand-colors-SteamWhite text-4xl font-normal font-['MadaniArabic-Bold'] leading-[60px]">10</div>
            <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Medium']">Listing</div>
          </div>
        </div>
      </div>

      {/* Second Stats Card - Ready to sell more */}
      <div className="w-[420px] h-60 left-[316px] top-[132px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)]">
        <div className="left-[30px] top-[30px] absolute justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Bold']">Ready to sell more</div>
        <div className="w-64 h-48 left-[164px] top-[34px] absolute">
          <div className="w-56 h-8 left-0 top-[162px] absolute bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(0,_0,_0,_0.20)_0%,_rgba(0,_0,_0,_0)_100%)] rounded-full"></div>
          <img className="w-52 h-48 left-[58px] top-0 absolute" src="/stats-card-2.png" />
        </div>
        <div className="w-52 left-[30px] top-[67px] absolute justify-start text-brand-colors-RootBlack text-base font-madani-medium">Add your fresh produce and start reaching buyers today.</div>
        <div data-property-1="Default" className="w-48 h-14 min-w-48 px-6 py-3 left-[14px] top-[153px] absolute bg-brand-colors-SproutGreen rounded-[30px] inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">Add New Product</div>
        </div>
      </div>

      {/* Third Stats Card - Today's Tip */}
      <div data-property-1="Default" className="w-80 h-60 left-[753px] top-[133px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
        <img className="w-80 h-60 left-[-1px] top-0 absolute object-cover" src="/stats-card-3.png" alt="Today's Tip Background" />
        <div className="w-80 h-60 left-[-1px] top-0 absolute" style={{ backgroundColor: 'hsla(86, 78%, 8%, 0.7)' }}></div>
        <div className="left-[30px] top-[30px] absolute justify-start text-brand-colors-SteamWhite text-xl font-normal font-['MadaniArabic-Bold']">Today's Tip</div>
        <div className="w-72 left-[30px] top-[67px] absolute justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Medium']">Harvest early in the morning to keep your produce fresher for longer, cooler temps reduce wilting and spoilage!</div>
      </div>

      {/* My Listings Section */}
      <div className="w-[693px] left-[40px] top-[415px] absolute inline-flex flex-col justify-start items-start gap-7">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">My Listings</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
            <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-5">
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px]" src="/listing-1.png" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Basket of Tomatoes</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-baseline gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦35,000</div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <img src="/location-icon.svg" alt="Location" className="w-6 h-6" />
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Ojo, Lagos</div>
            </div>
          </div>
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px] object-cover" src="/listing-2.png" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Basket of Fresh Pepper</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-baseline gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦50,000</div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <img src="/location-icon.svg" alt="Location" className="w-6 h-6" />
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Ojo, Lagos</div>
            </div>
          </div>
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px] object-cover" src="/listing-3.png" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Sack of Onions (50kg)</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-baseline gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦60,500</div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <img src="/location-icon.svg" alt="Location" className="w-6 h-6" />
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">Ojo, Lagos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Farm Produce Section */}
      <div className="w-[693px] left-[40px] top-[800px] absolute inline-flex flex-col justify-start items-start gap-7">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Trending Farm Produce</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">See more</div>
            <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-5">
          <div className="w-80 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <img className="w-40 h-28 left-[177px] top-[162px] absolute" src="/tomatoes-trending-farm-produce.png" />
            <div className="w-48 left-[20px] top-[128px] absolute inline-flex flex-col justify-center items-start gap-4">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Insight:</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Prices rising due to seasonal scarcity; great time to list your harvest!</div>
            </div>
            <div className="left-[20px] top-[96px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Avg price: </div>
              <div className="justify-start"><span className="text-brand-colors-RootBlack text-base font-madani-medium">₦39,500 </span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">per basket</span></div>
            </div>
            <div className="left-[20px] top-[64px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Status: </div>
              <div className="justify-start"><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Demand </span><span className="text-brand-colors-RootBlack text-base font-madani-medium">up 15%</span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']"> this week</span></div>
            </div>
            <div className="left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Bold']">Tomatoes</div>
              <img className="w-6 h-6" src="/ph_trend-up-bold.svg" alt="Trend up" />
            </div>
          </div>
          <div className="w-80 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <img className="w-40 h-28 left-[177px] top-[162px] absolute" src="/maize-trending-farm-produce.png" />
            <div className="w-48 left-[20px] top-[128px] absolute inline-flex flex-col justify-center items-start gap-4">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Insight:</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Prices dropping slightly as harvest peaks; consider storing if possible.</div>
            </div>
            <div className="left-[20px] top-[96px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Avg price: </div>
              <div className="justify-start"><span className="text-brand-colors-RootBlack text-base font-madani-medium">₦12,000 </span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">per 50kg bag</span></div>
            </div>
            <div className="left-[20px] top-[64px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">Status: </div>
              <div className="justify-start"><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Demand </span><span className="text-brand-colors-RootBlack text-base font-madani-medium">down 10%</span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']"> this week</span></div>
            </div>
            <div className="left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Bold']">Maize</div>
              <img className="w-6 h-6" src="/ph_trend-down-bold.svg" alt="Trend down" />
            </div>
          </div>
        </div>
      </div>

      {/* Chats Section */}
      <div className="w-80 left-[753px] top-[415px] absolute inline-flex flex-col justify-start items-end gap-7">
        <div className="self-stretch h-6 inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Chats</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
            <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full object-cover" src="/dashboard-chat-1.png" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Ugonna Chibuike</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-madani-light">oga watin be last price</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">5 mins</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full object-cover" src="/dashboard-chat-2.png" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">White Tapes</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-madani-light">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">30 mins</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full object-cover" src="/dashboard-chat-3.png" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Tunde Ednut</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-madani-light">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">3 hrs</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full object-cover" src="/dashboard-chat-4.png" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Fatima Alabi</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-madani-light">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">3 hrs</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full object-cover" src="/dashboard-chat-5.png" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Frank Edward</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-madani-light">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">1 day</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-80 left-[753px] top-[800px] absolute inline-flex flex-col justify-start items-end gap-7">
        <div className="self-stretch h-6 inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Testimonials</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-madani-medium">View All</div>
            <img src="/chevron-right-2.svg" alt="Chevron right" className="w-6 h-6" />
          </div>
        </div>
        <div className="w-80 h-60 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="left-[10px] top-[10px] absolute inline-flex justify-start items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-2.png" />
            <div className="w-28 inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-madani-medium">White Tapes</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-xs font-madani-light">Fashion Designer</div>
            </div>
          </div>
          <div className="w-80 left-[10px] top-[70px] absolute justify-start text-brand-colors-RootBlack text-sm font-normal font-['Montserrat'] leading-tight">"I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised. Thank you for making it so easy to buy directly from you, I'll definitely order again!"</div>
          <div className="left-[10px] top-[200px] absolute inline-flex justify-start items-center gap-1.5">
            <img src="/star.svg" alt="Star" className="w-6 h-6" />
            <img src="/star.svg" alt="Star" className="w-6 h-6" />
            <img src="/star.svg" alt="Star" className="w-6 h-6" />
            <img src="/star.svg" alt="Star" className="w-6 h-6" />
            <img src="/star.svg" alt="Star" className="w-6 h-6" />
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-tr-3xl rounded-br-3xl overflow-y-auto">
        {activeView === 'dashboard' && renderDashboardContent()}
        {activeView === 'listings' && (
          <MyListings 
            listings={listings}
            onDeleteListing={handleDeleteListing}
            onEditListing={handleEditListing}
            onCreateListing={() => setIsCreateListingOpen(true)}
          />
        )}
        {activeView === 'chats' && <Chats />}
        {activeView === 'settings' && (
          <div className="text-center py-20 px-10">
            <h2 className="text-2xl font-semibold text-gray-600">Settings</h2>
            <p className="text-gray-500">Settings panel coming soon</p>
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      <CreateListingModal 
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onSubmit={handleCreateListing}
      />
    </div>
  );
};

export default FarmerDashboard;