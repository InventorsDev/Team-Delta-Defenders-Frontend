import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, MessageCircle, BarChart3, TrendingUp } from 'lucide-react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import CreateListingModal from '@/components/dashboard/CreateListingModal';
import MyListings from '@/components/dashboard/MyListings';

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
  const [listings, setListings] = useState(mockListings);

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

  const renderDashboardContent = () => (
    <div className="w-[1129px] h-[1165px] relative bg-brand-colors-SteamWhite rounded-[20px] overflow-hidden">
      {/* Top Header Section */}
      <div className="w-[1129px] px-10 py-7 left-0 top-0 absolute bg-white/80 inline-flex justify-between items-start">
        <div className="inline-flex flex-col justify-start items-start gap-4">
          <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Welcome to your dashboard</div>
          <div className="inline-flex justify-start items-center gap-3">
            <div className="justify-start"><span className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Good Morning </span><span className="text-brand-colors-SproutGreen text-2xl font-normal font-['MadaniArabic-Bold']">Anosikay Farms</span></div>
            <div className="w-6 h-6 relative overflow-hidden">
              <div className="w-6 h-6 left-0 top-0 absolute bg-black"></div>
              <div className="w-6 h-6 left-0 top-0 absolute bg-amber-400"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className="w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5">
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-4 left-[2.25px] top-[1.25px] absolute bg-brand-colors-RootBlack"></div>
                <div className="w-3.5 h-5 left-[9.52px] top-[1.25px] absolute bg-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
          <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" alt="Profile" />
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
          <img className="w-52 h-48 left-[58px] top-0 absolute" src="https://placehold.co/206x200" />
        </div>
        <div className="w-52 left-[30px] top-[67px] absolute justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Add your fresh produce and start reaching buyers today.</div>
        <div data-property-1="Default" className="w-48 h-14 min-w-48 px-6 py-3 left-[14px] top-[153px] absolute bg-brand-colors-SproutGreen rounded-[30px] inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Bold']">Add New Product</div>
        </div>
      </div>

      {/* Third Stats Card - Today's Tip */}
      <div data-property-1="Default" className="w-80 h-60 left-[753px] top-[133px] absolute bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="w-80 h-60 left-[-1px] top-0 absolute bg-lime-950/70"></div>
        <div className="left-[30px] top-[30px] absolute justify-start text-brand-colors-SteamWhite text-xl font-normal font-['MadaniArabic-Bold']">Today's Tip</div>
        <div className="w-72 left-[30px] top-[67px] absolute justify-start text-brand-colors-SteamWhite text-base font-normal font-['MadaniArabic-Medium']">Harvest early in the morning to keep your produce fresher for longer, cooler temps reduce wilting and spoilage!</div>
      </div>

      {/* My Listings Section */}
      <div className="w-[693px] left-[40px] top-[415px] absolute inline-flex flex-col justify-start items-start gap-7">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">My Listings</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">View All</div>
            <div data-property-1="right" className="flex justify-start items-center gap-2.5">
              <div className="w-0 h-6 relative origin-top-left rotate-90 overflow-hidden">
                <div className="w-1.5 h-3 left-[9px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-5">
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px]" src="https://placehold.co/197x140" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Basket of Tomatoes</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-end gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦35,000 </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-4 h-3.5 left-[4px] top-[7.50px] absolute bg-brand-colors-RootBlack"></div>
                  <div className="w-3.5 h-4 left-[4.50px] top-[2px] absolute opacity-30 bg-brand-colors-RootBlack"></div>
                </div>
              </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Ojo, Lagos</div>
            </div>
          </div>
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px]" src="https://placehold.co/197x140" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Basket of Fresh Pepper (Atarodo)</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-end gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦50,000 </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-4 h-3.5 left-[4px] top-[7.50px] absolute bg-brand-colors-RootBlack"></div>
                  <div className="w-3.5 h-4 left-[4.50px] top-[2px] absolute opacity-30 bg-brand-colors-RootBlack"></div>
                </div>
              </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Ojo, Lagos</div>
            </div>
          </div>
          <div data-property-1="Default" className="w-56 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
              <img className="w-48 h-36 rounded-[10px]" src="https://placehold.co/197x140" />
            </div>
            <div className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Sack of Onions (50kg)</div>
            <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-end gap-1">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Medium'] leading-9">₦60,500 </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Per Unit</div>
            </div>
            <div className="left-[10px] top-[237px] absolute inline-flex justify-start items-center gap-1">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 relative overflow-hidden">
                  <div className="w-4 h-3.5 left-[4px] top-[7.50px] absolute bg-brand-colors-RootBlack"></div>
                  <div className="w-3.5 h-4 left-[4.50px] top-[2px] absolute opacity-30 bg-brand-colors-RootBlack"></div>
                </div>
              </div>
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">Ojo, Lagos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Farm Produce Section */}
      <div className="w-[693px] left-[40px] top-[800px] absolute inline-flex flex-col justify-start items-start gap-7">
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Trending Farm Produce</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">See more</div>
            <div data-property-1="right" className="flex justify-start items-center gap-2.5">
              <div className="w-0 h-6 relative origin-top-left rotate-90 overflow-hidden">
                <div className="w-1.5 h-3 left-[9px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-5">
          <div className="w-80 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <img className="w-40 h-28 left-[177px] top-[162px] absolute" src="https://placehold.co/159x118" />
            <div className="w-48 left-[20px] top-[128px] absolute inline-flex flex-col justify-center items-start gap-4">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Insight:</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Prices rising due to seasonal scarcity; great time to list your harvest!</div>
            </div>
            <div className="left-[20px] top-[96px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Avg price: </div>
              <div className="justify-start"><span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">₦39,500 </span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">per basket</span></div>
            </div>
            <div className="left-[20px] top-[64px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Status: </div>
              <div className="justify-start"><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Demand </span><span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">up 15%</span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']"> this week</span></div>
            </div>
            <div className="left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Bold']">Tomatoes</div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-3.5 left-[1.12px] top-[4.12px] absolute bg-brand-colors-SproutGreen"></div>
              </div>
            </div>
          </div>
          <div className="w-80 h-72 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
            <img className="w-40 h-28 left-[177px] top-[162px] absolute" src="https://placehold.co/159x118" />
            <div className="w-48 left-[20px] top-[128px] absolute inline-flex flex-col justify-center items-start gap-4">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Insight:</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Prices dropping slightly as harvest peaks; consider storing if possible.</div>
            </div>
            <div className="left-[20px] top-[96px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Avg price: </div>
              <div className="justify-start"><span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">₦12,000 </span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">per 50kg bag</span></div>
            </div>
            <div className="left-[20px] top-[64px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">Status: </div>
              <div className="justify-start"><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']">Demand </span><span className="text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">down 10%</span><span className="text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium']"> this week</span></div>
            </div>
            <div className="left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-2">
              <div className="justify-start text-brand-colors-RootBlack text-xl font-normal font-['MadaniArabic-Bold']">Maize</div>
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-3.5 left-[1.12px] top-[5.62px] absolute bg-brand-colors-pepper-red"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chats Section */}
      <div className="w-80 left-[753px] top-[415px] absolute inline-flex flex-col justify-start items-end gap-7">
        <div className="self-stretch h-6 inline-flex justify-between items-center">
          <div className="justify-start text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Chats</div>
          <div data-property-1="Default" className="flex justify-start items-center gap-1">
            <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">View All</div>
            <div data-property-1="right" className="flex justify-start items-center gap-2.5">
              <div className="w-0 h-6 relative origin-top-left rotate-90 overflow-hidden">
                <div className="w-1.5 h-3 left-[9px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full" src="https://placehold.co/36x36" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Ugonna Chibuike</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">oga watin be last price</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">5 mins</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full" src="https://placehold.co/36x36" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">White Tapes</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">30 mins</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full" src="https://placehold.co/36x36" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Tunde Ednut</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">3 hrs</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full" src="https://placehold.co/36x36" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Fatima Alabi</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">3 hrs</div>
              <div className="w-4 h-4 bg-brand-colors-SproutGreen rounded-[99px] flex flex-col justify-center items-center">
                <div className="justify-start text-brand-colors-SteamWhite text-xs font-normal font-['MadaniArabic-Medium']">1</div>
              </div>
            </div>
          </div>
          <div data-property-1="unread" className="w-80 px-3 py-2 bg-brand-colors-SteamWhite rounded-[20px] inline-flex justify-start items-start gap-3">
            <div className="flex-1 flex justify-start items-start gap-3">
              <img className="w-9 h-9 rounded-full" src="https://placehold.co/36x36" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-sm font-normal font-['MadaniArabic-Medium']">Frank Edward</div>
                <div className="self-stretch justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">How fresh is the pepper</div>
              </div>
            </div>
            <div className="self-stretch inline-flex flex-col justify-between items-end">
              <div className="justify-start text-brand-colors-RootBlack text-xs font-normal font-['MadaniArabic-Light']">1 day</div>
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
            <div className="justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">View All</div>
            <div data-property-1="right" className="flex justify-start items-center gap-2.5">
              <div className="w-0 h-6 relative origin-top-left rotate-90 overflow-hidden">
                <div className="w-1.5 h-3 left-[9px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-brand-colors-RootBlack"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 h-60 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="left-[10px] top-[10px] absolute inline-flex justify-start items-center gap-3">
            <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" />
            <div className="w-28 inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-start text-brand-colors-RootBlack text-base font-normal font-['MadaniArabic-Medium']">White Tapes</div>
              <div className="self-stretch justify-start text-brand-colors-rootgrey text-xs font-normal font-['MadaniArabic-Light']">Fashion Designer</div>
            </div>
          </div>
          <div className="w-80 left-[10px] top-[70px] absolute justify-start text-brand-colors-RootBlack text-sm font-normal font-['Montserrat'] leading-tight">"I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised. Thank you for making it so easy to buy directly from you, I'll definitely order again!"</div>
          <div className="left-[10px] top-[200px] absolute inline-flex justify-start items-center gap-1.5">
            <div className="flex justify-center items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-5 h-5 left-[2px] top-[2px] absolute bg-yellow-400"></div>
              </div>
            </div>
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
        {activeView === 'chats' && (
          <div className="text-center py-20 px-10">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600">Messages</h2>
            <p className="text-gray-500">Chat functionality coming soon</p>
          </div>
        )}
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