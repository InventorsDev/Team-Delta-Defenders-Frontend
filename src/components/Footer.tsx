'use client';

import React from 'react';
import agrilinkLogo from '/agrilink-logo.png'; // Corrected import for Vite

const Footer = () => {
  return (
    <footer className="bg-[#0A2600] text-white py-16">
      {/* Top Section */}
      <div className="container mx-auto px-4 border-b border-gray-700 pb-8 mb-8">
        <div className="text-center md:text-left">
          <h2 className="mb-6 break-words" style={{ fontFamily: 'MadaniArabic-Bold, sans-serif', fontWeight: 700, fontStyle: 'normal', fontSize: '32px', lineHeight: '50px', letterSpacing: '0%' }}>
            Connecting Farms, Empowering Markets. Join AgriLink NG Today!
          </h2>
          <p className="text-gray-300 mb-8 break-words" style={{ fontFamily: 'MadaniArabic-Medium, sans-serif', fontWeight: 500, fontStyle: 'normal', fontSize: '20px', lineHeight: '37px', letterSpacing: '0%' }}>
            At Agrilink, we're committed to bridging the gap between farmers and buyers through direct, transparent, and stress-free trade. We're building a smarter agricultural economy, one fresh connection at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              className="bg-green-500 text-white font-bold hover:bg-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
              style={{
                width: '200px',
                height: '60px',
                minWidth: '200px',
                gap: '10px',
                opacity: 1,
                borderRadius: '30px',
                paddingTop: '12px',
                paddingRight: '24px',
                paddingBottom: '12px',
                paddingLeft: '24px'
              }}
            >
              Farmers Sign Up
            </button>
            <button 
              className="bg-gray-200 text-gray-900 font-bold hover:bg-[hsl(var(--brand-colors-SoilBlush))] hover:text-white transition-colors"
              style={{
                width: '200px',
                height: '60px',
                minWidth: '200px',
                gap: '10px',
                opacity: 1,
                borderRadius: '30px',
                paddingTop: '12px',
                paddingRight: '24px',
                paddingBottom: '12px',
                paddingLeft: '24px'
              }}
            >
              Buyers Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="md:col-span-2">
          <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>About Agrilink</h4>
          <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '20px', leadingTrim: 'cap-height', lineHeight: '37px', letterSpacing: '0%' }}>
            AgriLink NG is a digital platform that connects farmers and buyers directly, making it easier to trade fresh produce without middlemen. Simple, fast, and trusted across Nigeria.
          </p>
          <div className="mt-8 flex items-center">
            {/* Corrected img tag for Vite */}
            <img
              src={agrilinkLogo}
              alt="AgriLink Logo"
              className="w-24 h-auto"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Farmers Sign Up</a></li>
            <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Buyers Sign Up</a></li>
            <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', leadingTrim: 'cap-height', lineHeight: '100%', letterSpacing: '0%' }}>Stay Connected</h4>
          <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', fontSize: '20px', leadingTrim: 'cap-height', lineHeight: '37px', letterSpacing: '0%' }}>
            Subscribe to get updates when new features or farmer listings go live.
          </p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-lg border border-green-500 bg-white-900 text-black placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-[hsl(var(--brand-colors-SoilBlush))] transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-8">
            <a href="#" aria-label="Facebook" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors">
              <img 
                src="/facebook-fill 2.svg" 
                alt="Facebook" 
                className="w-5 h-5"
              />
            </a>
            <a href="#" aria-label="X" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors">
              <img 
                src="/X-icon.svg" 
                alt="X (Twitter)" 
                className="w-5 h-5"
              />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors">
              <img 
                src="/linkedin-icon.svg" 
                alt="LinkedIn" 
                className="w-5 h-5"
              />
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors">
              <img 
                src="/Instagram-icon.svg" 
                alt="Instagram" 
                className="w-5 h-5"
              />
            </a>
            <a href="#" aria-label="YouTube" className="w-10 h-10 bg-gray-700 hover:bg-[hsl(var(--brand-colors-SoilBlush))] rounded-full flex items-center justify-center text-white transition-colors">
              <img 
                src="/Youtube-icon.svg" 
                alt="YouTube" 
                className="w-5 h-5"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Terms of Use</a></li>
          <li><a href="#" className="hover:text-[hsl(var(--brand-colors-SoilBlush))] transition-colors">Disclaimer</a></li>
        </ul>
        <div className="mt-4 md:mt-0 text-gray-400 text-sm">
          Copyright 2025 © agrilink | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
