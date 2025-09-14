import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/marketplace/Footer';
import ProductDetailView from '../../components/marketplace/ProductDetailView';  

interface Product {
  name: string;
  price: string;
  location: string;
  rating: string;
  description: string;
  image: string;
}

const BuyersMarketplace = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedProduct(null);
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (query.trim()) {
      setIsSearchActive(true);
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setIsSearchActive(false);
      setFilteredProducts([]);
    }
  };

  const displayProducts = isSearchActive ? filteredProducts : products;

  const categories = [
    { icon: '/grains.png', name: 'Grains' },
    { icon: '/legumes.png', name: 'Legumes & Nuts' },
    { icon: '/vegetables.svg', name: 'Vegetables' },
    { icon: '/fruits.png', name: 'Fruits' },
    { icon: '/root-crops.png', name: 'Root crops' },
    { icon: '/processed-goods.png', name: 'Processed goods' },
    { icon: '/spices-and-condiments.png', name: 'Spices & Condiments' }
  ];

  const products = [
    {
      name: 'Basket of Tomatoes',
      price: '₦35,000',
      location: 'Ojo, Lagos',
      rating: '4.5',
      description: 'Fresh basket of tomatoes - Farm direct picked fresh from farm, these ripe, juicy red tomatoes are perfect for cooking stew',
      image: '/listing-1.png'
    },
    {
      name: 'Basket of Fresh Pepper (Atarodo)',
      price: '₦50,000',
      location: 'Ikorodu, Lagos',
      rating: '3.5',
      description: 'Hot and flavorful peppers to spice up your meals. Carefully handpicked and sorted for freshness.',
      image: '/listing-2.png'
    },
    {
      name: 'Sack of Onions (50kg)',
      price: '₦50,500',
      location: 'Ojo, Lagos',
      rating: '4.0',
      description: 'Firm, aromatic onions ideal for everyday cooking. Long shelf life when stored in a cool, dry place.',
      image: '/listing-3.png'
    },
    {
      name: 'Sack of Sweet Potatoes (50kg)',
      price: '₦20,000',
      location: 'Kano Municipal, Kano',
      rating: '4.5',
      description: 'Sweet, creamy, and packed with nutrients. Great for roasting, frying, or boiling. Direct from farm to your kitchen.',
      image: '/listing-4.png'
    },
    {
      name: 'Basket of Garden Eggs',
      price: '₦30,000',
      location: 'Ojo, Lagos',
      rating: '5.0',
      description: 'Fresh green and white garden eggs, perfect for traditional Nigerian dishes and stews.',
      image: '/listing-5.png'
    },
    {
      name: 'Bunch of Plantain (20–25 pieces)',
      price: '₦35,000',
      location: 'Akwa, Anambra',
      rating: '4.5',
      description: 'Ripe and semi-ripe plantains for frying, boiling, or roasting. Naturally sweet with a firm texture.',
      image: '/listing-6.png'
    },
    {
      name: '50kg Bag of Local Rice (Ofada)',
      price: '₦55,000',
      location: 'Abeokuta South, Ogun',
      rating: '4.5',
      description: 'Stone-free, aromatic Ofada rice with a rich, earthy flavor. Perfect for local delicacies.',
      image: '/listing-7.png'
    },
    {
      name: 'Basket of Okra',
      price: '₦21,500',
      location: 'Ojo, Lagos',
      rating: '4.5',
      description: 'Fresh, tender okra pods great for soups and stews. Rich in fiber and vitamins.',
      image: '/listing-8.png'
    },
    {
      name: 'Bag of Yellow Maize (50kg)',
      price: '₦55,000',
      location: 'Ado-Odo/Ota, Ogun',
      rating: '4.5',
      description: 'Premium dried yellow maize suitable for pap, cornmeal, or animal feed.',
      image: '/listing-9.png'
    },
    {
      name: 'Basket of Cucumbers',
      price: '₦35,000',
      location: 'Gboko, Benue',
      rating: '4.5',
      description: 'Crisp, refreshing cucumbers perfect for salads, smoothies, or snacking.',
      image: '/listing-10.png'
    },
    {
      name: 'Groundnuts (Bag, 25kg)',
      price: '₦25,000',
      location: 'Minna, Niger',
      rating: '4.5',
      description: 'Freshly harvested groundnuts, perfect for oil or snacks.',
      image: '/listing-11.png'
    },
    {
      name: 'Soybeans (50kg Bag)',
      price: '₦33,000',
      location: 'Zaria, Kaduna',
      rating: '4.5',
      description: 'High-protein soybeans, ideal for processing into soy milk.',
      image: '/listing-12.png'
    },
    {
      name: 'Cashew Nuts (5kg Pack)',
      price: '₦35,000',
      location: 'Ogbomosho North, Oyo',
      rating: '4.5',
      description: 'Handpicked cashew nuts, lightly dried, premium quality.',
      image: '/listing-13.png'
    },
    {
      name: 'Ugu (Bundle)',
      price: '₦1,000',
      location: 'Jos North, Plateau',
      rating: '4.5',
      description: 'Fresh green ugu leaves, harvested same day.',
      image: '/listing-14.png'
    },
    {
      name: 'Banana (Bunch)',
      price: '₦40,000',
      location: 'Nsukka, Enugu',
      rating: '4.5',
      description: 'Sweet ripe bananas, naturally grown without chemicals.',
      image: '/listing-15.png'
    },
    {
      name: 'Pineapple (Each)',
      price: '₦3,000',
      location: 'Eleme, Rivers',
      rating: '4.5',
      description: 'Juicy pineapples, handpicked and extra sweet.',
      image: '/listing-16.png'
    },
    {
      name: 'Watermelon (Large Size)',
      price: '₦3,500',
      location: 'Bida, Niger',
      rating: '4.5',
      description: 'Fresh, juicy watermelon with deep red flesh.',
      image: '/listing-17.png'
    },
    {
      name: 'Yam (Tubers, 10pcs)',
      price: '₦35,000',
      location: 'Idah, Kogi',
      rating: '4.0',
      description: 'Big Puna yams, great for pounded yam and porridge.',
      image: '/listing-18.png'
    },
    {
      name: 'Cassava (50kg Bag)',
      price: '₦35,000',
      location: 'Ughelli North, Delta',
      rating: '3.5',
      description: 'Freshly harvested cassava tubers for processing into garri.',
      image: '/listing-19.png'
    },
    {
      name: 'Palm Oil (25 Liters Jerrycan)',
      price: '₦35,000',
      location: 'Orlu, Imo',
      rating: '4.5',
      description: 'Locally processed palm oil, rich red color, no additives.',
      image: '/listing-20.png'
    },
    {
      name: 'Groundnut Oil (5 Liters Bottle)',
      price: '₦8,500',
      location: 'Ilorin South, Kwara',
      rating: '3.5',
      description: 'Pure groundnut oil, cholesterol-free and fresh.',
      image: '/listing-21.png'
    },
    {
      name: 'Ginger (Sack, 20kg)',
      price: '₦35,000',
      location: 'Kafanchan, Kaduna',
      rating: '3.5',
      description: 'Fresh ginger roots, aromatic and ideal for cooking or tea.',
      image: '/listing-22.png'
    },
    {
      name: 'Garlic (Bag, 10kg)',
      price: '₦35,000',
      location: 'Maiduguri, Borno',
      rating: '4.0',
      description: 'Organically grown garlic bulbs, strong flavor, long shelf life.',
      image: '/listing-23.png'
    },
    {
      name: 'Garri (50kg Bag)',
      price: '₦32,000',
      location: 'Sapele, Delta',
      rating: '3.0',
      description: 'Yellow garri, neatly processed and well-dried.',
      image: '/listing-24.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div 
        className={`w-full py-2.5 transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 z-50' : 'relative'}`}
        style={{
          background: isScrolled 
            ? 'rgba(228, 253, 225, 0.30)' 
            : 'rgba(228, 253, 225, 0.50)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'
        }}
      >
        <div className="px-8 lg:px-24 flex justify-between items-center">
          <Link to="/marketplace" className="flex items-center">
            <img src="/Agrilink-logo-dark.svg" alt="Agrilink Logo" className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/farmer-dashboard">
              <div className="min-w-40 min-h-10 px-6 py-3 rounded-3xl flex justify-center items-center" style={{background: '#84C62C'}}>
                <div className="text-base font-['MadaniArabic-Bold']" style={{color: 'white'}}>Sell Your Product</div>
              </div>
            </Link>
            <Link to="/marketplace">
              <div className="w-10 h-10 p-1 rounded-full flex justify-center items-center cursor-pointer" style={{background: '#182605', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'}}>
                <img src="/market place icon.svg" alt="Marketplace" className="w-6 h-6" />
              </div>
            </Link>
            <Link to="/chat">
              <div className="w-10 h-10 p-1 rounded-full flex justify-center items-center cursor-pointer" style={{background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'}}>
                <img src="/chat icon.svg" alt="Chat" className="w-6 h-6" />
              </div>
            </Link>
            <Link to="/notifications">
              <div className="w-10 h-10 p-1 rounded-full flex justify-center items-center cursor-pointer" style={{background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'}}>
                <img src="/notification-icon.svg" alt="Notifications" className="w-6 h-6" />
              </div>
            </Link>
            <Link to="/profile">
              <img className="w-10 h-10 rounded-full cursor-pointer" src="/profile image.png" alt="Profile" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className={`${isSearchActive ? 'py-8' : 'py-16'} relative overflow-hidden ${isScrolled ? 'mt-20' : 'mt-8'} transition-all duration-500`}>
        <div className="absolute top-0 bottom-0 left-8 right-8 lg:left-24 lg:right-24" style={{backgroundImage: 'url(/marketplace-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px'}}></div>
        <div className="absolute top-0 bottom-0 left-8 right-8 lg:left-24 lg:right-24" style={{backgroundColor: 'hsla(114, 88%, 94%, 0.6)', borderRadius: '10px'}}></div>
        <div className="px-16 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Left side content */}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-col gap-8">
              {!isSearchActive && (
                <div className="flex flex-col gap-6">
                  <h1 style={{width: '100%', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 60, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', lineHeight: '72px', wordWrap: 'break-word'}}>Find Fresh Produce Near You</h1>
                  <p style={{width: '100%', height: '100%', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px', wordWrap: 'break-word'}}>Search thousands of farm-fresh listings directly from Nigerian farmers.</p>
                </div>
              )}
              <SearchBar 
                placeholder={isSearchActive && searchTerm ? searchTerm : "What are you looking for today?"}
                onSearch={handleSearch}
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
      
      {/* Main Content */}
      <div className="px-8 lg:px-24 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar / Filter Sidebar */}
          <div className="w-full lg:w-96">
            {!isSearchActive ? (
              // Categories Sidebar
              <div className="sticky top-20" style={{width: '100%', height: 'fit-content', paddingTop: 20, paddingBottom: 20, background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', overflow: 'hidden', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 13, display: 'inline-flex'}}>
                {categories.map((category, index) => (
                  <div key={index} data-property-1="default" style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, background: 'var(--brand-colors-SteamWhite, white)', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex', cursor: 'pointer'}}>
                    {category.icon.startsWith('/') ? (
                      <img style={{width: 60, height: 60, borderRadius: 5}} src={category.icon} alt={category.name} />
                    ) : (
                      <div style={{width: 60, height: 60, borderRadius: 5, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>
                        {category.icon}
                      </div>
                    )}
                    <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px', wordWrap: 'break-word'}}>{category.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              // Filter Sidebar
              <div className="sticky top-20" style={{width: '100%', height: 'fit-content', paddingTop: 20, paddingBottom: 20, background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', overflow: 'hidden', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                {/* Filter Header */}
                <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                  <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', lineHeight: '37px'}}>Filters</div>
                  <button style={{color: 'var(--brand-colors-SproutGreen, #84C62C)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', background: 'none', border: 'none', cursor: 'pointer'}}>Clear All</button>
                </div>

                {/* Crop Types Filter */}
                <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400'}}>Crop Type</div>
                  {categories.slice(0, 4).map((category, index) => (
                    <div key={index} style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                      <input type="checkbox" style={{width: 16, height: 16}} />
                      <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400'}}>{category.name}</div>
                    </div>
                  ))}
                </div>

                {/* Price Range Filter */}
                <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400'}}>Price Range</div>
                  <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                    <input type="number" placeholder="Min" style={{flex: 1, padding: '8px 12px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px'}} />
                    <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 14}}>-</div>
                    <input type="number" placeholder="Max" style={{flex: 1, padding: '8px 12px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px'}} />
                  </div>
                </div>

                {/* Rating Filter */}
                <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400'}}>Rating</div>
                  {[5, 4, 3, 2].map((rating) => (
                    <div key={rating} style={{justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                      <input type="checkbox" style={{width: 16, height: 16}} />
                      <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
                        {[...Array(5)].map((_, starIndex) => (
                          <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill={starIndex < rating ? "#FFC107" : "#E5E5E5"} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                          </svg>
                        ))}
                        <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', marginLeft: '4px'}}>& Above</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Location Filter */}
                <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400'}}>Location</div>
                  <select style={{alignSelf: 'stretch', padding: '8px 12px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px', background: 'white'}}>
                    <option>All Locations</option>
                    <option>Lagos</option>
                    <option>Kano</option>
                    <option>Ogun</option>
                    <option>Anambra</option>
                    <option>Other States</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 32, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', lineHeight: '50px', wordWrap: 'break-word'}}>
                {isSearchActive ? `Search Results for "${searchTerm}" (${filteredProducts.length})` : 'Hot in the Market'}
              </div>
              {isSearchActive && (
                <select style={{padding: '8px 16px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px', background: 'white'}}>
                  <option>Sort by: Latest Listing</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Rating</option>
                  <option>Sort by: Popularity</option>
                </select>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product, index) => (
                <div 
                  key={index} 
                  data-property-1="buyers card" 
                  onClick={() => handleProductClick(product)}
                  style={{width: '217px', height: '340px', position: 'relative', background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', overflow: 'hidden', borderRadius: 20, cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0px 8px 40px 8px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0px 4px 30px 5px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{width: 197, height: 140, left: 10, top: 10, position: 'absolute', overflow: 'hidden', borderRadius: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <img style={{width: '100%', height: '100%', borderRadius: 10, objectFit: 'cover'}} src={product.image} alt={product.name} />
                  </div>
                  <div style={{width: 197, left: 10, top: 170, position: 'absolute', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}}>{product.name}</div>
                  <div style={{left: 10, top: 202, position: 'absolute', justifyContent: 'flex-start', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
                    <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px', wordWrap: 'break-word'}}>{product.price}</div>
                    <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word'}}>Per Unit</div>
                  </div>
                  <div style={{width: 143, left: 10, top: 308, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
                    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                      <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                        <div style={{width: 16, height: 14.50, left: 4, top: 7.50, position: 'absolute', background: 'var(--brand-colors-RootBlack, #182605)'}} />
                        <div style={{width: 15, height: 16.76, left: 4.50, top: 2, position: 'absolute', opacity: 0.30, background: 'var(--brand-colors-RootBlack, #182605)'}} />
                      </div>
                    </div>
                    <div style={{flex: '1 1 0', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word'}}>{product.location}</div>
                  </div>
                  <div style={{width: 197, height: 51, left: 10, top: 237, position: 'absolute', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>{product.description}</div>
                  <div style={{left: 161, top: 310, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
                    <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>{product.rating}</div>
                    <div style={{justifyContent: 'center', alignItems: 'center', gap: 8.33, display: 'flex'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      
      {/* Product Detail View */}
      <ProductDetailView 
        product={selectedProduct}
        isOpen={isDetailViewOpen}
        onClose={handleCloseDetailView}
      />
    </div>
  );
};

export default BuyersMarketplace;