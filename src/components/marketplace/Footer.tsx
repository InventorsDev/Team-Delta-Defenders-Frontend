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
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Categories Section */}
        <div className="md:col-span-1 text-left">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Categories</h4>
          <ul className="text-sm md:text-base space-y-2 leading-relaxed mb-0 md:mb-12" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '18px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Grains</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Legumes & Nuts</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Vegetables</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Fruits</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Root Crops</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Processed Goods</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Spices & Condiments</button></li>
          </ul>
          {/* AgriLink Logo - Desktop Only */}
          <Link to="/" className="hidden md:inline-block cursor-pointer">
            <img
              src="/Agrilink-logo-light.svg"
              alt="AgriLink Logo"
              style={{
                width: '140px',
                height: '45px',
                opacity: 1,
                transform: 'rotate(0deg)'
              }}
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1 text-left md:text-center">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Quick Links</h4>
          <ul className="text-sm md:text-base space-y-2 leading-relaxed mb-0 md:mb-8" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '18px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Farmers Sign Up</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Buyers Sign Up</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>How it Works</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>About Us</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Contact Us</button></li>
          </ul>
        </div>

        {/* Support & Help */}
        <div className="md:col-span-1 text-left md:text-center">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Support & Help</h4>
          <ul className="text-sm md:text-base space-y-2 leading-relaxed mb-0 md:mb-8" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '18px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%' }}>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Help Center / FAQs</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Contact Support</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Report an Issue</button></li>
            <li><button className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors text-left bg-transparent border-none p-0 cursor-pointer" style={{color: '#FFFFFF'}}>Guides</button></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="md:col-span-1 text-left">
          <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%', color: '#FFFFFF' }}>Stay Connected</h4>
          <p className="text-sm mb-4" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '18px', leadingTrim: 'cap-height', lineHeight: '24px', letterSpacing: '0%', color: '#FFFFFF' }}>
            Subscribe to get updates when new features or farmer listings go live.
          </p>
          <form className="flex flex-col items-start" onSubmit={handleSubscribe}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-colors-SproutGreen))]"
              style={{
                width: '100%',
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
              className="mt-4 bg-[hsl(var(--brand-colors-SproutGreen))] font-bold hover:bg-[hsl(var(--brand-colors-SoilBlush))] active:bg-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
              style={{
                width: '100%',
                height: '50px',
                minWidth: '200px',
                opacity: 1,
                borderRadius: '25px',
                gap: '10px',
                paddingTop: '10px',
                paddingRight: '20px',
                paddingBottom: '10px',
                paddingLeft: '20px',
                transform: 'rotate(0deg)',
                color: '#FFFFFF'
              }}
            >
              Subscribe
            </button>
          </form>
          {/* Social Media Icons */}
          <div className="hidden md:flex justify-end mt-24">
            <div className="flex space-x-3">
              <button aria-label="Facebook" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
                <img
                  src="/facebook-fill 2.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </button>
              <button aria-label="X" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
                <img
                  src="/X-icon.svg"
                  alt="X (Twitter)"
                  className="w-5 h-5"
                />
              </button>
              <button aria-label="LinkedIn" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
                <img
                  src="/linkedin-icon.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </button>
              <button aria-label="Instagram" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
                <img
                  src="/Instagram-icon.svg"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </button>
              <button aria-label="YouTube" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
                <img
                  src="/Youtube-icon.svg"
                  alt="YouTube"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logo and Social Icons */}
      <div className="md:hidden container mx-auto px-4 mt-8 mb-0">
        <div className="flex justify-between items-center">
          {/* AgriLink Logo */}
          <Link to="/" className="cursor-pointer">
            <img
              src="/Agrilink-logo-light.svg"
              alt="AgriLink Logo"
              style={{
                width: '100px',
                height: '32px',
                opacity: 1,
                transform: 'rotate(0deg)'
              }}
            />
          </Link>

          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <button aria-label="Facebook" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
              <img
                src="/facebook-fill 2.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
            <button aria-label="X" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
              <img
                src="/X-icon.svg"
                alt="X (Twitter)"
                className="w-5 h-5"
              />
            </button>
            <button aria-label="LinkedIn" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
              <img
                src="/linkedin-icon.svg"
                alt="LinkedIn"
                className="w-5 h-5"
              />
            </button>
            <button aria-label="Instagram" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
              <img
                src="/Instagram-icon.svg"
                alt="Instagram"
                className="w-5 h-5"
              />
            </button>
            <button aria-label="YouTube" className="hover:opacity-75 transition-opacity border-none cursor-pointer bg-transparent p-0">
              <img
                src="/Youtube-icon.svg"
                alt="YouTube"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Border Line */}
      <div className="container mx-auto px-4 mt-8">
        <div className="border-t border-gray-700"></div>
      </div>

      {/* Bottom Text */}
      <div className="container mx-auto px-4 mt-4">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div style={{color: '#FFFFFF'}}>Privacy Policy</div>
            <div style={{color: '#FFFFFF'}}>Terms of Use</div>
            <div style={{color: '#FFFFFF'}}>Disclaimer</div>
          </div>
          <div className="text-center" style={{color: '#FFFFFF'}}>
            Copyright 2025 © agrilink | All rights reserved
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div style={{color: '#FFFFFF'}}>Privacy Policy</div>
            <div style={{color: '#FFFFFF'}}>Terms of Use</div>
            <div style={{color: '#FFFFFF'}}>Disclaimer</div>
          </div>
          <div style={{color: '#FFFFFF'}}>Copyright 2025 © agrilink | All rights reserved</div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;