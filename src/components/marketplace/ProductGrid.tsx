import React from 'react';
import '@/styles/fonts.css';
import { Product } from '@/data/marketplaceProducts';

export type SortOption = 'popularity' | 'price_low' | 'price_high' | 'rating';

interface ProductGridProps {
  products: Product[];
  isSearchActive: boolean;
  searchTerm: string;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isSearchActive,
  searchTerm,
  onProductClick
}) => {
  const [isSortPopupOpen, setIsSortPopupOpen] = React.useState(false);
  const [selectedSort, setSelectedSort] = React.useState<SortOption>('popularity');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = React.useState(false);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [minPrice, setMinPrice] = React.useState<string>('');
  const [maxPrice, setMaxPrice] = React.useState<string>('');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('All');
  const [selectedRatingFilter, setSelectedRatingFilter] = React.useState<number | null>(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = React.useState(false);

  const locationOptions = [
    'All',
    'Lagos',
    'Abuja',
    'Kano',
    'Ibadan',
    'Port Harcourt',
    'Benin City',
    'Maiduguri',
    'Zaria',
    'Aba',
    'Jos'
  ];

  const sortOptions = [
    { id: 'popularity' as SortOption, label: 'Popularity' },
    { id: 'price_low' as SortOption, label: 'Lowest Price' },
    { id: 'price_high' as SortOption, label: 'Highest Price' },
    { id: 'rating' as SortOption, label: 'Rating' },
  ];

  const handleSortOptionSelect = (option: SortOption) => {
    setSelectedSort(option);
    setIsSortPopupOpen(false);
  };

  const categories = ['Grains', 'Legumes & Nuts', 'Vegetables', 'Fruits', 'Root crops', 'Processed goods', 'Spices & Condiments'];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFilterSave = () => {
    // Apply filters and close popup
    setIsFilterPopupOpen(false);
  };

  const handleFilterCancel = () => {
    // Reset filters and close popup
    setIsFilterPopupOpen(false);
  };
  return (
    <div className={`flex-1 ${isSearchActive ? 'pb-20 lg:pb-0' : ''}`}>
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-root-black font-madani-bold">
          {isSearchActive ? `Search Results for "${searchTerm}" (${products.length})` : 'Hot in the Market'}
        </div>
        {isSearchActive && (
          <select className="hidden lg:block px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent">
            <option>Sort by: Latest Listing</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Popularity</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6 w-full">
        {products.map((product, index) => (
          <button
            key={index}
            data-property-1="buyers card"
            onClick={() => onProductClick(product)}
            className="w-full aspect-[217/340] relative bg-white rounded-xl lg:rounded-2xl overflow-hidden border-none p-0 cursor-pointer transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg btn-shadow-lg"
            style={{maxWidth: '280px', margin: '0 auto'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0px 8px 40px 8px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 4px 30px 5px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div className="absolute top-2 left-2 right-2 h-[41%] overflow-hidden rounded-lg">
              <img className="w-full h-full object-cover rounded-lg" src={product.image} alt={product.name} />
            </div>
            <div className="absolute top-[50%] left-2 right-2 text-sm lg:text-base font-medium leading-tight text-ellipsis overflow-hidden whitespace-nowrap text-left text-root-grey font-madani-medium">
              {product.name}
            </div>
            <div className="absolute top-[59%] left-2 flex items-baseline gap-1">
              <div className="text-base lg:text-lg font-medium leading-tight text-root-black font-madani-medium">{product.price}</div>
              <div className="text-xs font-light text-root-black font-madani-light">Per Unit</div>
            </div>
            <div className="absolute bottom-6 left-2 flex items-center gap-1 max-w-[60%]">
              <div className="flex items-center">
                <img
                  src="/location-icon.svg"
                  alt="Location"
                  className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
                />
              </div>
              <div className="text-xs font-light leading-tight overflow-hidden text-ellipsis whitespace-nowrap text-root-black font-madani-light">
                {product.location}
              </div>
            </div>
            <div className="absolute top-[69.5%] left-2 right-2 h-[15%] overflow-hidden text-xs leading-tight font-light text-root-black font-madani-light">
              <div className="line-clamp-2 lg:line-clamp-3 text-left">
                {product.description}
              </div>
            </div>
            <div className="absolute bottom-6 right-2 flex items-center gap-1">
              <div className="text-sm lg:text-base font-medium text-root-black font-madani-medium">{product.rating}</div>
              <div className="flex items-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Search Filter & Sort Buttons */}
      {isSearchActive && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-colors-SproutGreen p-3">
          <div className="flex gap-2 w-full">
            <button
              className="flex-1 bg-brand-colors-HarvestMist rounded-full py-3 px-6 font-madani-bold text-brand-colors-RootBlack hover:opacity-90 transition-opacity"
              onClick={() => setIsSortPopupOpen(true)}
            >
              Sort
            </button>
            <button
              className="flex-1 bg-brand-colors-HarvestMist rounded-full py-3 px-6 font-madani-bold text-brand-colors-RootBlack hover:opacity-90 transition-opacity"
              onClick={() => setIsFilterPopupOpen(true)}
            >
              Filter
            </button>
          </div>
        </div>
      )}

      {/* Sort Popup */}
      {isSortPopupOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
            onClick={() => setIsSortPopupOpen(false)}
          />

          {/* Popup */}
          <div
            className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white overflow-hidden transition-transform duration-300 ${
              isSortPopupOpen ? 'transform translate-y-0' : 'transform translate-y-full'
            }`}
            style={{
              borderTopLeftRadius: '50px',
              borderTopRightRadius: '50px'
            }}
          >
            {/* Handle bar */}
            <div className="mx-auto" style={{width: '60px', height: '10px', marginTop: '30px'}}>
              <div style={{width: '100%', height: '100%', background: '#182605', borderRadius: '5px'}} />
            </div>

            {/* Header */}
            <div className="w-full px-4 py-2 flex justify-between items-center"
                 style={{paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', marginTop: '20px'}}>
              <div className="text-xl font-madani-bold text-root-black">sort by</div>
              <button
                onClick={() => setIsSortPopupOpen(false)}
                className="w-6 h-6 flex items-center justify-center relative"
              >
                <div className="absolute w-3 h-0.5 bg-root-black transform rotate-45" style={{backgroundColor: '#182605'}} />
                <div className="absolute w-3 h-0.5 bg-root-black transform -rotate-45" style={{backgroundColor: '#182605'}} />
              </button>
            </div>

            {/* Sort Options */}
            <div className="w-full px-4 py-5 flex flex-col gap-2.5"
                 style={{paddingLeft: '16px', paddingRight: '16px', paddingTop: '20px', paddingBottom: '20px'}}>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortOptionSelect(option.id)}
                  className={`w-full px-6 py-3 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedSort === option.id
                      ? 'bg-brand-colors-HarvestMist'
                      : 'bg-white'
                  }`}
                >
                  <div className="text-sm font-madani-bold text-root-black">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Filter Popup - Full Screen */}
      {isFilterPopupOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ${
            isFilterPopupOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
          style={{ height: '100vh', overflow: 'auto' }}
        >
          <div className="w-full h-full flex flex-col gap-5">
            {/* Header */}
            <div className="w-full p-5 bg-white flex justify-between items-center">
              <div className="text-xl font-madani-bold text-root-black">Filter</div>
              <button
                onClick={handleFilterCancel}
                className="w-6 h-6 flex items-center justify-center relative"
              >
                <div className="absolute w-3 h-0.5 transform rotate-45" style={{backgroundColor: '#182605'}} />
                <div className="absolute w-3 h-0.5 transform -rotate-45" style={{backgroundColor: '#182605'}} />
              </button>
            </div>

            {/* Categories Section */}
            <div className="w-full bg-white flex flex-col">
              <div className="w-full p-5 bg-white flex items-center gap-2.5">
                <div className="text-xl font-madani-bold text-root-black">Categories</div>
              </div>
              <div className="w-full py-5 bg-white flex flex-col">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className="w-full p-5 bg-white flex items-center gap-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 relative rounded border" style={{
                        backgroundColor: selectedCategories.includes(category) ? '#84C62C' : 'white',
                        borderColor: selectedCategories.includes(category) ? '#84C62C' : '#8B9281'
                      }}>
                        {selectedCategories.includes(category) && (
                          <img
                            src="/checkbox-checked.svg"
                            alt="Checked"
                            className="w-4 h-3 absolute left-1 top-1.5"
                          />
                        )}
                      </div>
                      <div className={`text-base font-madani-medium ${
                        selectedCategories.includes(category) ? 'text-brand-colors-RootBlack' : 'text-brand-colors-rootgrey'
                      }`}
                      style={{
                        color: selectedCategories.includes(category) ? '#182605' : '#8B9281'
                      }}>
                        {category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="w-full bg-white flex flex-col">
              <div className="w-full p-5 bg-white flex items-center gap-2.5">
                <div className="text-xl font-madani-bold text-root-black">Price range</div>
              </div>
              <div className="w-full p-5 bg-white flex items-center gap-5">
                <div className="flex-1 h-12 relative flex items-center justify-center"
                     style={{padding: '10px', background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: '20px'}}>
                  <input
                    type="text"
                    placeholder=""
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-transparent text-center text-base font-madani-medium focus:outline-none"
                    style={{color: minPrice ? '#182605' : '#8B9281'}}
                  />
                  {!minPrice && (
                    <div className="absolute inset-0 flex items-center justify-center text-base font-madani-medium pointer-events-none"
                         style={{color: '#8B9281'}}>
                      Min
                    </div>
                  )}
                </div>
                <div className="flex-1 h-12 relative flex items-center justify-center"
                     style={{padding: '10px', background: 'rgba(0, 0, 0, 0.05)', overflow: 'hidden', borderRadius: '20px'}}>
                  <input
                    type="text"
                    placeholder=""
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-transparent text-center text-base font-madani-medium focus:outline-none"
                    style={{color: maxPrice ? '#182605' : '#8B9281'}}
                  />
                  {!maxPrice && (
                    <div className="absolute inset-0 flex items-center justify-center text-base font-madani-medium pointer-events-none"
                         style={{color: '#8B9281'}}>
                      Max
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full p-5 bg-white flex items-center gap-2.5">
                <button className="flex-1 min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-3xl flex items-center justify-center gap-4"
                        style={{backgroundColor: '#84C62C'}}>
                  <div className="text-base font-madani-bold text-white">Set Price</div>
                </button>
              </div>
            </div>

            {/* Location Section */}
            <div className="w-full flex flex-col">
              <div className="w-full h-14 p-5 bg-white flex items-center gap-2.5">
                <div className="text-xl font-madani-bold text-root-black">Location</div>
              </div>
              <div className="w-full p-5 bg-white flex items-center gap-2.5">
                <div className="w-full relative flex flex-col justify-start items-start">
                  <button
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="w-full flex justify-between items-center"
                    style={{
                      height: '60px',
                      paddingLeft: '30px',
                      paddingRight: '30px',
                      background: 'rgba(0, 0, 0, 0.05)',
                      overflow: 'hidden',
                      borderRadius: '30px',
                      outline: '2px rgba(0, 0, 0, 0.05) solid',
                      outlineOffset: '-2px'
                    }}>
                    <div className="text-base font-madani-medium"
                         style={{color: '#182605'}}>
                      {selectedLocation}
                    </div>
                    <div className="flex items-center justify-start gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img
                          src="/chevron-down-2.svg"
                          alt="Dropdown"
                          className={`w-6 h-6 transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Dropdown Options */}
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 z-10 max-h-60 overflow-y-auto">
                      {locationOptions.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`w-full px-7 py-4 text-left text-base font-madani-medium hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl ${
                            selectedLocation === location ? 'bg-brand-colors-HarvestMist' : ''
                          }`}
                          style={{
                            color: selectedLocation === location ? '#182605' : '#8B9281',
                            backgroundColor: selectedLocation === location ? '#E4FDE1' : 'transparent'
                          }}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="w-full bg-white flex flex-col">
              <div className="w-full p-5 bg-white flex items-center gap-2.5">
                <div className="text-xl font-madani-bold text-root-black">Rating</div>
              </div>
              <div className="w-full py-5 bg-white flex flex-col">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRatingFilter(rating)}
                    className="w-full p-5 bg-white flex items-center gap-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 relative rounded border" style={{
                        backgroundColor: selectedRatingFilter === rating ? '#84C62C' : 'white',
                        borderColor: selectedRatingFilter === rating ? '#84C62C' : '#8B9281'
                      }}>
                        {selectedRatingFilter === rating && (
                          <img
                            src="/checkbox-checked.svg"
                            alt="Checked"
                            className="w-4 h-3 absolute left-1 top-1.5"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="w-6 h-6 flex items-center justify-center">
                              <img
                                src="/star.svg"
                                alt="Star"
                                className="w-5 h-5"
                                style={{
                                  filter: star <= rating
                                    ? 'brightness(0) saturate(100%) invert(84%) sepia(78%) saturate(2500%) hue-rotate(2deg) brightness(105%) contrast(102%)'
                                    : 'brightness(0) saturate(100%) invert(64%) sepia(8%) saturate(1092%) hue-rotate(58deg) brightness(96%) contrast(88%)'
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        {rating < 5 && (
                          <div className="text-base font-madani-medium" style={{color: '#8B9281'}}>above</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="w-full px-3 py-2.5 bg-white shadow-lg flex items-center gap-2 mt-auto">
              <button
                onClick={handleFilterCancel}
                className="flex-1 min-h-10 px-6 py-3 bg-brand-colors-HarvestMist rounded-3xl flex items-center justify-center gap-4"
                style={{backgroundColor: '#E4FDE1'}}
              >
                <div className="text-base font-madani-bold text-root-black">Cancel</div>
              </button>
              <button
                onClick={handleFilterSave}
                className="flex-1 min-h-10 px-6 py-3 bg-brand-colors-SproutGreen rounded-3xl flex items-center justify-center gap-4"
                style={{backgroundColor: '#84C62C'}}
              >
                <div className="text-base font-madani-bold text-white">Save</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;