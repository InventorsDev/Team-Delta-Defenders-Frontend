import React from 'react';
import '@/styles/fonts.css';
import SearchBar from '../SearchBar';

interface HeroSectionProps {
  isSearchActive: boolean;
  isScrolled: boolean;
  searchTerm: string;
  onSearch: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isSearchActive,
  isScrolled,
  searchTerm,
  onSearch
}) => {
  return (
    <div className={`${isSearchActive ? 'py-8' : 'py-16'} relative overflow-hidden ${isScrolled ? 'mt-20' : 'mt-8'} transition-all duration-500`}>
      <div className="absolute top-0 bottom-0 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 2xl:left-24 2xl:right-24" style={{backgroundImage: 'url(/marketplace-hero.webp)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px'}}></div>
      <div className="absolute top-0 bottom-0 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16 2xl:left-24 2xl:right-24" style={{backgroundColor: 'hsla(114, 88%, 94%, 0.6)', borderRadius: '10px'}}></div>
      <div className="px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-32 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10">
        {/* Left side content */}
        <div className="flex-1 max-w-2xl">
          <div className="flex flex-col gap-8">
            {!isSearchActive && (
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-root-black font-madani-bold">
                  Find Fresh Produce Near You
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-root-black font-madani-medium">
                  Search thousands of farm-fresh listings directly from Nigerian farmers.
                </p>
              </div>
            )}
            <SearchBar
              placeholder={isSearchActive && searchTerm ? searchTerm : "What are you looking for today?"}
              onSearch={onSearch}
            />
          </div>
        </div>

        {/* Right side visual */}
        {!isSearchActive && (
          <div className="flex-shrink-0">
            <img
              src="/marketplace-hero-image.svg"
              alt="Fresh produce basket with vegetables and fruits"
              style={{width: '100%', height: '100%'}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;