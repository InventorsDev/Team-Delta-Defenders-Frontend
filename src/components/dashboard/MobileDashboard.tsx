import React from 'react';
import StatsCard from './StatsCard';
import ProductCard, { ProductData } from './ProductCard';
import { mobileStatsCards } from '@/data/mockStats';
import { mockListings } from '@/data/mockProducts';

interface MobileDashboardProps {
  businessName: string;
  onProductClick: (product: ProductData) => void;
  onViewAllListings?: () => void;
  onViewAllTestimonials?: () => void;
  onSeeMoreTrending?: () => void;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({
  businessName,
  onProductClick,
  onViewAllListings,
  onViewAllTestimonials,
  onSeeMoreTrending
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-x-hidden overflow-y-hidden">
      {/* Header Section */}
      <div className="w-full pt-4 pb-4 px-5 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm flex flex-col gap-4 flex-shrink-0">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
            Welcome to your dashboard
          </div>
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>Good Morning </span>
              <span className="text-xl font-bold text-brand-colors-SproutGreen" style={{ fontFamily: 'MadaniArabic-Bold' }}>{businessName}</span>
            </div>
            <img src="/si_sun-fill.svg" alt="Sun" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 w-full px-4 pb-4 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-6">

      {/* Overview Card */}
      <StatsCard
        card={{
          ...mobileStatsCards[0],
          stats: [
            { value: 5, label: 'Chats' },
            { value: 10, label: 'Listing' }
          ]
        }}
        variant="mobile"
      />

      {/* Ready to Sell Card */}
      <StatsCard
        card={{
          ...mobileStatsCards[1],
          title: 'Ready to sell more',
          backgroundImage: '/stats-card-2.webp',
          description: 'Add your fresh produce and start reaching buyers today.',
          actionButton: {
            ...mobileStatsCards[1].actionButton!,
            text: 'Add New Product'
          }
        }}
        variant="mobile"
      />

      {/* Today's Tip Card */}
      <StatsCard
        card={{
          ...mobileStatsCards[2],
          title: 'Today\'s Tip',
          backgroundImage: '/stats-card-3.webp',
          backgroundOverlay: 'rgba(0, 0, 0, 0.7)',
          description: 'Harvest early in the morning to keep your produce fresher for longer, cooler temps reduce wilting and spoilage!'
        }}
        variant="mobile"
        className="mb-8"
      />

      {/* My Listings Section */}
      <div className="w-full mb-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
            My Listings
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={onViewAllListings}>
            <div className="text-sm font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
              View All
            </div>
            <img src="/chevron-right-2.svg" alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-1 px-1">
          {mockListings.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="mobile-horizontal"
              onCardClick={onProductClick}
            />
          ))}
        </div>
      </div>

      {/* Trending Farm Produce Section */}
      <div className="w-full mb-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
            Trending Farm Produce
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={onSeeMoreTrending}>
            <div className="text-sm font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
              See more
            </div>
            <img src="/chevron-right-2.svg" alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full h-72 bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <img className="absolute w-32 h-24 right-3 bottom-4" src="/tomatoes-trending-farm-produce.webp" alt="Tomatoes" />
            <div className="absolute left-5 top-6 bottom-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                  Tomatoes
                </div>
                <img src="/ph_trend-up-bold.svg" alt="Trend up" className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Status:
                </div>
                <div>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>Demand </span>
                  <span className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>up 15%</span>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}> this week</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Avg price:
                </div>
                <div>
                  <span className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>₦39,500 </span>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>per basket</span>
                </div>
              </div>
              <div className="w-40 flex flex-col gap-4">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Insight:
                </div>
                <div className="text-base font-medium text-brand-colors-rootgrey" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Prices rising due to seasonal scarcity; great time to list your harvest!
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-72 bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <img className="absolute w-32 h-24 right-3 bottom-4" src="/maize-trending-farm-produce.webp" alt="Maize" />
            <div className="absolute left-5 top-6 bottom-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
                  Maize
                </div>
                <img src="/ph_trend-down-bold.svg" alt="Trend down" className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Status:
                </div>
                <div>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>Demand </span>
                  <span className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>down 10%</span>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}> this week</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Avg price:
                </div>
                <div>
                  <span className="text-brand-colors-RootBlack text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>₦12,000 </span>
                  <span className="text-brand-colors-rootgrey text-base font-medium" style={{ fontFamily: 'MadaniArabic-Medium' }}>per 50kg bag</span>
                </div>
              </div>
              <div className="w-40 flex flex-col gap-4">
                <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Insight:
                </div>
                <div className="text-base font-medium text-brand-colors-rootgrey" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  Prices dropping slightly as harvest peaks; consider storing if possible.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full mb-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Bold' }}>
            Testimonials
          </div>
          <div className="flex items-center gap-1 cursor-pointer" onClick={onViewAllTestimonials}>
            <div className="text-sm font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
              View All
            </div>
            <img src="/chevron-right-2.svg" alt="Arrow" className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full p-3 bg-white rounded-2xl shadow-lg flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img className="w-10 h-10 rounded-full object-cover" src="/dashboard-chat-2.png" alt="Profile" />
            <div className="flex flex-col gap-2">
              <div className="text-base font-medium text-brand-colors-RootBlack" style={{ fontFamily: 'MadaniArabic-Medium' }}>
                White Tapes
              </div>
              <div className="text-xs font-light text-brand-colors-rootgrey" style={{ fontFamily: 'MadaniArabic-Light' }}>
                Fashion Designer
              </div>
            </div>
          </div>
          <div className="text-sm font-normal text-brand-colors-RootBlack leading-5" style={{ fontFamily: 'Montserrat', fontStyle: 'italic' }}>
            "I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised. Thank you for making it so easy to buy directly from you, I'll definitely order again!"
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;