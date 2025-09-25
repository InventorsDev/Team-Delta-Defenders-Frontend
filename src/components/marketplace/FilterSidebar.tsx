import React from 'react';
import '@/styles/fonts.css';
import { Category } from '@/data/marketplaceCategories';
import { locationOptions } from '@/data/marketplaceLocations';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: string[];
  selectedLocation: string;
  minPrice: string;
  maxPrice: string;
  onCategoryToggle: (categoryName: string) => void;
  onLocationChange: (location: string) => void;
  onMinPriceChange: (price: string) => void;
  onMaxPriceChange: (price: string) => void;
  onClearAll: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategories,
  selectedLocation,
  minPrice,
  maxPrice,
  onCategoryToggle,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearAll
}) => {
  return (
    <div className="sticky top-20 w-full p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl shadow-lg flex flex-col gap-5 btn-shadow-lg" style={{height: 'fit-content'}}>
      {/* Filter Header */}
      <div className="w-full flex justify-between items-center">
        <div className="text-lg lg:text-xl font-bold text-root-black font-madani-bold">Filters</div>
        <button
          onClick={onClearAll}
          className="text-sm font-medium bg-transparent border-none cursor-pointer hover:underline text-sprout-green font-madani-medium"
        >
          Clear All
        </button>
      </div>

      {/* Crop Types Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-base font-medium text-root-black font-madani-medium">Crop Type</div>
        {categories.slice(0, 4).map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selectedCategories.includes(category.name)}
              onChange={() => onCategoryToggle(category.name)}
            />
            <div className="text-sm font-medium text-root-black font-madani-medium">{category.name}</div>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-base font-medium text-root-black font-madani-medium">Price Range</div>
        <div className="w-full flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent"
          />
          <div className="text-sm text-root-black">-</div>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-base font-medium text-root-black font-madani-medium">Rating</div>
        {[5, 4, 3, 2].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, starIndex) => (
                <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill={starIndex < rating ? "#FFC107" : "#E5E5E5"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              ))}
              <div className="text-sm font-medium ml-1 text-root-black font-madani-medium">& Above</div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-base font-medium text-root-black font-madani-medium">Location</div>
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent"
        >
          {locationOptions.map((location) => (
            <option key={location} value={location}>
              {location === 'All' ? 'All Locations' : location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;