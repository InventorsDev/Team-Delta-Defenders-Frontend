import React, { useState } from 'react';
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
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handleClearAll = () => {
    setSelectedRatings([]);
    onClearAll();
  };
  return (
    <div
      className="w-full p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl shadow-lg flex flex-col gap-5 btn-shadow-lg"
    >
      {/* Filter Header */}
      <div className="w-full flex justify-between items-center">
        <div className="text-lg lg:text-xl font-bold text-root-black font-madani-bold">Filters</div>
        <button
          onClick={handleClearAll}
          className="text-sm font-medium bg-transparent border-none cursor-pointer hover:underline text-sprout-green font-madani-medium"
        >
          Clear All
        </button>
      </div>

      {/* Crop Types Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-xl font-medium text-root-black font-madani-medium">Crop Type</div>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="opacity-0 absolute w-6 h-6 cursor-pointer"
                checked={selectedCategories.includes(category.name)}
                onChange={() => onCategoryToggle(category.name)}
                tabIndex={-1}
              />
              <div
                data-property-1="default"
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  background: '#fff',
                  borderRadius: 4,
                  border: '1px solid #8B9281',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  margin: 0
                }}
              >
                <img
                  src={
                    selectedCategories.includes(category.name)
                      ? "/checkbox-checked.svg"
                      : "/checkbox.svg"
                  }
                  alt={selectedCategories.includes(category.name) ? "Checked" : "Unchecked"}
                  style={{
                    width: '24px',
                    height: '24px',
                    display: 'block',
                    padding: 0,
                    margin: 0
                  }}
                />
              </div>
            </label>
            <div
              style={{
                color: selectedCategories.includes(category.name) ? '#182605' : '#8B9281', // RootBlack when checked, rootgrey when unchecked
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                lineHeight: '37px',
                wordWrap: 'break-word'
              }}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-xl font-medium text-root-black font-madani-medium">Price Range</div>
        <div className="w-full flex items-center gap-2">
          <div className="flex-1">
            {minPrice ? (
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent"
              />
            ) : (
              <div
                data-property-1="unclicked"
                style={{width: '100%', height: '38px', padding: '8px 12px', background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}
                onClick={() => document.getElementById('minPriceInput')?.focus()}
              >
                <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: 1.4, wordWrap: 'break-word'}}>Min</div>
                <input
                  id="minPriceInput"
                  type="number"
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(e.target.value)}
                  style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}}
                />
              </div>
            )}
          </div>
          <div className="text-sm text-root-black">-</div>
          <div className="flex-1">
            {maxPrice ? (
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent"
              />
            ) : (
              <div
                data-property-1="unclicked"
                style={{width: '100%', height: '38px', padding: '8px 12px', background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}
                onClick={() => document.getElementById('maxPriceInput')?.focus()}
              >
                <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: 1.4, wordWrap: 'break-word'}}>Max</div>
                <input
                  id="maxPriceInput"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(e.target.value)}
                  style={{opacity: 0, position: 'absolute', pointerEvents: 'none'}}
                />
              </div>
            )}
          </div>
        </div>

        {/* Set Price Button */}
        <button
          data-property-1="Default"
          style={{width: '100%', height: '100%', paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', border: 'none', cursor: 'pointer'}}
          onClick={() => {
            // Handle set price functionality here
            console.log('Set price clicked', { minPrice, maxPrice });
          }}
        >
          <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>Set Price</div>
        </button>
      </div>

      {/* Location Filter */}
      <div className="w-full flex flex-col gap-3">
        <div className="text-xl font-medium text-root-black font-madani-medium">Location</div>
        <div data-property-1="closed" style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex', position: 'relative'}}>
          <div
            style={{alignSelf: 'stretch', height: 60, paddingLeft: 30, paddingRight: 30, background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: 30, outline: '2px rgba(0, 0, 0, 0.05) solid', outlineOffset: '-2px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px', wordWrap: 'break-word'}}>
              {selectedLocation === 'All' ? 'All Locations' : selectedLocation}
            </div>
            <div data-property-1="down" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
              <img
                src="/chevron-down-2.svg"
                alt="Dropdown arrow"
                style={{
                  width: 24,
                  height: 24,
                  transform: isLocationDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              />
            </div>
          </div>

          {/* Dropdown Options */}
          {isLocationDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: 15,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {locationOptions.map((location, index) => (
                <div
                  key={location}
                  style={{
                    padding: '15px 30px',
                    cursor: 'pointer',
                    borderBottom: index < locationOptions.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    color: '#182605',
                    fontSize: 16,
                    fontFamily: 'MadaniArabic-Medium',
                    fontWeight: '400',
                    background: selectedLocation === location ? 'rgba(132, 198, 44, 0.1)' : 'transparent'
                  }}
                  onClick={() => {
                    onLocationChange(location);
                    setIsLocationDropdownOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLocation !== location) {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLocation !== location) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {location === 'All' ? 'All Locations' : location}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="w-full flex flex-col gap-3 mt-4">
        <div className="text-xl font-medium text-root-black font-madani-medium">Rating</div>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <label className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="opacity-0 absolute w-6 h-6 cursor-pointer"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingToggle(rating)}
              />
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  position: 'relative',
                  background: '#fff',
                  borderRadius: 4,
                  border: '1px solid #8B9281',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  margin: 0
                }}
              >
                <img
                  src={
                    selectedRatings.includes(rating)
                      ? "/checkbox-checked.svg"
                      : "/checkbox.svg"
                  }
                  alt={selectedRatings.includes(rating) ? "Checked" : "Unchecked"}
                  style={{
                    width: '24px',
                    height: '24px',
                    display: 'block',
                    padding: 0,
                    margin: 0
                  }}
                />
              </div>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src="/star.svg"
                  alt="Star"
                  style={{
                    width: 24,
                    height: 24,
                    display: 'block',
                    opacity: i < rating ? 1 : 0.2 // Highlight stars up to the rating
                  }}
                />
              ))}
              <span style={{
                color: '#8B9281',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                marginLeft: 8
              }}>
                Above
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;