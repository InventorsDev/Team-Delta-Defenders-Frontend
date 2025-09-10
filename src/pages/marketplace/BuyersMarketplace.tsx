import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';

const BuyersMarketplace = () => {
  const categories = [
    { icon: '🌾', name: 'Grains' },
    { icon: '🥜', name: 'Legumes & Nuts' },
    { icon: '🥬', name: 'Vegetables' },
    { icon: '🍎', name: 'Fruits' },
    { icon: '🥔', name: 'Root crops' },
    { icon: '🍯', name: 'Processed goods' },
    { icon: '🌶️', name: 'Spices & Condiments' }
  ];

  const products = [
    {
      name: 'Basket of Tomatoes',
      price: '₦35,000',
      location: 'Ojo, Lagos',
      rating: '4.5',
      description: 'Fresh basket of tomatoes - Farm direct picked fresh from farm, these ripe, juicy red tomatoes are perfect for cooking stew',
      image: 'https://placehold.co/197x140'
    },
    {
      name: 'Basket of Fresh Pepper (Atarodo)',
      price: '₦50,000',
      location: 'Ikorodu, Lagos',
      rating: '3.5',
      description: 'Hot and flavorful peppers to spice up your meals. Carefully handpicked and sorted for freshness.',
      image: 'https://placehold.co/197x140'
    },
    {
      name: 'Sack of Onions (50kg)',
      price: '₦50,500',
      location: 'Ojo, Lagos',
      rating: '4.0',
      description: 'Firm, aromatic onions ideal for everyday cooking. Long shelf life when stored in a cool, dry place.',
      image: 'https://placehold.co/197x140'
    },
    {
      name: 'Sack of Sweet Potatoes (50kg)',
      price: '₦20,000',
      location: 'Kano Municipal, Kano',
      rating: '4.5',
      description: 'Sweet, creamy, and packed with nutrients. Great for roasting, frying, or boiling. Direct from farm to your kitchen.',
      image: 'https://placehold.co/197x140'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full py-2.5" style={{background: 'rgba(228, 253, 225, 0.50)'}}>
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
      <div className="py-16 mt-8 relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-8 right-8 lg:left-24 lg:right-24" style={{backgroundImage: 'url(/marketplace-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px'}}></div>
        <div className="absolute top-0 bottom-0 left-8 right-8 lg:left-24 lg:right-24" style={{backgroundColor: 'hsla(114, 88%, 94%, 0.6)', borderRadius: '10px'}}></div>
        <div className="px-16 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Left side content */}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h1 style={{width: '100%', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 60, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', lineHeight: '72px', wordWrap: 'break-word'}}>Find Fresh Produce Near You</h1>
                <p style={{width: '100%', height: '100%', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px', wordWrap: 'break-word'}}>Search thousands of farm-fresh listings directly from Nigerian farmers.</p>
              </div>
              <SearchBar 
                placeholder="What are you looking for today?"
                onSearch={(query) => console.log('Searching for:', query)}
              />
            </div>
          </div>
          
          {/* Right side visual */}
          <div className="flex-shrink-0">
            <img 
              src="/marketplace-hero-image.svg" 
              alt="Fresh produce basket with vegetables and fruits" 
              style={{width: '100%', height: '100%'}}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-8 lg:px-24 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="text-lg font-medium text-green-900">{category.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-green-900 mb-8">Hot in the Market</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="w-full h-40 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-600 font-medium mb-2">{product.name}</h3>
                    <div className="flex items-end gap-1 mb-4">
                      <span className="text-xl font-medium text-green-900">{product.price}</span>
                      <span className="text-sm text-green-900">Per Unit</span>
                    </div>
                    <p className="text-sm text-green-900 mb-4 line-clamp-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm text-green-900">
                        <span>📍</span>
                        <span>{product.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-green-900">{product.rating}</span>
                        <span className="text-yellow-400">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-green-900 text-white py-16">
        <div className="px-8 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">🌱 agrilink</h3>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-900 cursor-pointer">f</div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-900 cursor-pointer">t</div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-900 cursor-pointer">i</div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-900 cursor-pointer">y</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">CATEGORIES</h4>
              <div className="space-y-3">
                {categories.slice(0, 4).map((category, index) => (
                  <div key={index} className="cursor-pointer hover:text-green-300">{category.name}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">QUICK LINKS</h4>
              <div className="space-y-3">
                <div className="cursor-pointer hover:text-green-300">Market Place</div>
                <div className="cursor-pointer hover:text-green-300">Settings</div>
                <div className="cursor-pointer hover:text-green-300">Chats</div>
                <div className="cursor-pointer hover:text-green-300">Dashboard</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Stay Connected</h4>
              <p className="mb-4 text-sm">Subscribe to get updates when new features or farmer listings go live.</p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-full text-green-900 outline-none"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-6 mb-4 md:mb-0">
              <div className="cursor-pointer hover:text-green-300">Privacy Policy</div>
              <div className="cursor-pointer hover:text-green-300">Terms of Use</div>
              <div className="cursor-pointer hover:text-green-300">Disclaimer</div>
            </div>
            <div className="text-sm">Copyright 2025 © agrilink | All rights reserved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersMarketplace;