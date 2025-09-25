import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "What are you looking for today?", 
  onSearch 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      data-property-1="Default"
      className="w-full h-full p-1 sm:p-1.5 bg-white rounded-full flex items-center gap-2 sm:gap-4 border-2 border-white z-10"
      style={{
        background: '#ffffff',
        backgroundColor: '#ffffff !important',
        opacity: 1
      }}
    >
      <div
        className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full flex items-center gap-2"
        style={{
          background: '#ffffff',
          backgroundColor: '#ffffff !important',
          opacity: 1
        }}
      >
        <img src="/search icon.svg" alt="Search" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base lg:text-lg placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-lg"
          style={{
            color: 'var(--brand-colors-rootgrey, #8B9281)',
            fontFamily: 'MadaniArabic-Medium',
            fontWeight: '400'
          }}
        />
      </div>
      <button
        data-property-1="Default"
        onClick={handleSearch}
        className="h-10 sm:h-12 lg:h-14 xl:h-15 min-w-16 sm:min-w-32 lg:min-w-40 xl:min-w-50 px-3 sm:px-6 py-2 sm:py-3 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center cursor-pointer border-none text-white text-xs sm:text-sm lg:text-base font-bold transition-all hover:bg-brand-colors-SoilBlush"
        style={{
          background: '#84C62C',
          backgroundColor: '#84C62C !important',
          fontFamily: 'MadaniArabic-Bold',
          fontWeight: '400',
          opacity: 1
        }}
      >
        <span className="hidden sm:inline">Search</span>
        <img src="/search icon.svg" alt="Search" className="w-4 h-4 sm:hidden" />
      </button>
    </div>
  );
};

export default SearchBar;