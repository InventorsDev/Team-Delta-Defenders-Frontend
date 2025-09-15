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
      style={{
        width: '100%', 
        height: '100%', 
        padding: 5, 
        background: '#ffffff', 
        backgroundColor: '#ffffff !important',
        borderRadius: 99, 
        outline: '2px #ffffff solid', 
        outlineOffset: '-2px', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 16, 
        display: 'inline-flex',
        opacity: 1,
        zIndex: 1
      }}
    >
      <div 
        style={{
          flex: '1 1 0', 
          paddingLeft: 24, 
          paddingRight: 24, 
          paddingTop: 12, 
          paddingBottom: 12, 
          background: '#ffffff', 
          backgroundColor: '#ffffff !important',
          borderRadius: 30, 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          gap: 8, 
          display: 'flex',
          opacity: 1
        }}
      >
        <img src="/search icon.svg" alt="Search" style={{width: 24, height: 24}} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{
            flex: '1 1 0',
            color: 'var(--brand-colors-rootgrey, #8B9281)',
            fontSize: 20,
            fontFamily: 'MadaniArabic-Medium',
            fontWeight: '400',
            lineHeight: '37px',
            wordWrap: 'break-word',
            background: 'transparent',
            border: 'none',
            outline: 'none'
          }}
        />
      </div>
      <div 
        data-property-1="Default" 
        onClick={handleSearch}
        style={{
          height: 60, 
          minWidth: 200, 
          paddingLeft: 24, 
          paddingRight: 24, 
          paddingTop: 12, 
          paddingBottom: 12, 
          background: '#84C62C', 
          backgroundColor: '#84C62C !important',
          borderRadius: 30, 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 10, 
          display: 'flex',
          cursor: 'pointer',
          opacity: 1,
          border: 'none'
        }}
      >
        <div 
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontFamily: 'MadaniArabic-Bold',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}
        >
          Search
        </div>
      </div>
    </div>
  );
};

export default SearchBar;