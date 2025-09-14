import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing with email:', email);
    setEmail('');
  };

  return (
    <footer className="text-white py-16" style={{ background: 'hsl(var(--brand-colors-RootBlack, 86 78% 8%))' }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Categories Section */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Categories</h4>
          <ul className="text-gray-400 text-sm space-y-2 leading-relaxed" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '14px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Grains</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Legumes & Nuts</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Vegetables</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Fruits</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Root Crops</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Processed Goods</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Spices & Condiments</button></li>
          </ul>
          
          {/* Footer Logo */}
          <div className="mt-8 flex justify-center md:justify-start">
            <Link to="/" className="cursor-pointer">
              <img
                src="/Agrilink-logo-light.svg"
                alt="AgriLink Logo"
                style={{
                  width: '186.49px',
                  height: '60px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1 text-center">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2 leading-relaxed" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '14px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><Link to="/marketplace" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Market Place</Link></li>
            <li><Link to="/farmer-dashboard" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Dashboard</Link></li>
            <li><Link to="/chat" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Chats</Link></li>
            <li><Link to="/settings" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Settings</Link></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Help Center</button></li>
          </ul>
        </div>

        {/* Support & Help */}
        <div className="md:col-span-1 text-center">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Support & Help</h4>
          <ul className="text-gray-400 text-sm space-y-2 leading-relaxed" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '14px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Help Center / FAQs</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Contact Support</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Report an Issue</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Guides</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Community</button></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Stay Connected</h4>
          <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '14px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            Subscribe to get updates when new features or farmer listings go live.
          </p>
          <form className="flex flex-col items-center md:items-start" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-colors-SproutGreen))]"
              style={{
                width: '280px',
                height: '50px',
                opacity: 1,
                borderRadius: '25px',
                gap: '10px',
                borderWidth: '2px',
                borderColor: 'var(--brand-colors-SproutGreen, hsla(86, 64%, 47%, 1))',
                paddingTop: '8px',
                paddingRight: '20px',
                paddingBottom: '8px',
                paddingLeft: '20px',
                background: 'hsl(var(--brand-colors-HarvestMist, 114 88% 94%))',
                transform: 'rotate(0deg)'
              }}
            />
            <button
              type="submit"
              className="mt-4 bg-[hsl(var(--brand-colors-SproutGreen))] text-white font-bold hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
              style={{
                width: '280px',
                height: '50px',
                minWidth: '200px',
                opacity: 1,
                borderRadius: '25px',
                gap: '10px',
                paddingTop: '10px',
                paddingRight: '20px',
                paddingBottom: '10px',
                paddingLeft: '20px',
                transform: 'rotate(0deg)'
              }}
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-8 justify-center md:justify-start">
            <button aria-label="Facebook" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors border-none cursor-pointer">
              <img 
                src="/facebook-fill 2.svg" 
                alt="Facebook" 
                className="w-5 h-5"
              />
            </button>
            <button aria-label="X" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors border-none cursor-pointer">
              <img 
                src="/X-icon.svg" 
                alt="X (Twitter)" 
                className="w-5 h-5"
              />
            </button>
            <button aria-label="LinkedIn" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors border-none cursor-pointer">
              <img 
                src="/linkedin-icon.svg" 
                alt="LinkedIn" 
                className="w-5 h-5"
              />
            </button>
            <button aria-label="Instagram" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors border-none cursor-pointer">
              <img 
                src="/Instagram-icon.svg" 
                alt="Instagram" 
                className="w-5 h-5"
              />
            </button>
            <button aria-label="YouTube" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors border-none cursor-pointer">
              <img 
                src="/Youtube-icon.svg" 
                alt="YouTube" 
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="container mx-auto px-8 mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-gray-400 text-sm">
          <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors bg-transparent border-none p-0 cursor-pointer">Privacy Policy</button></li>
          <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors bg-transparent border-none p-0 cursor-pointer">Terms of Use</button></li>
          <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors bg-transparent border-none p-0 cursor-pointer">Disclaimer</button></li>
        </ul>
        <div className="mt-4 md:mt-0 text-gray-400 text-sm">
          Copyright 2025 © agrilink | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;