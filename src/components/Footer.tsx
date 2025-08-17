'use client';

import React from 'react';
import agrilinkLogo from '/agrilink-logo.png'; // Corrected import for Vite

const Footer = () => {
  return (
    <footer className="bg-[#0A2600] text-white py-16">
      {/* Top Section */}
      <div className="container mx-auto px-4 border-b border-gray-700 pb-8 mb-8">
        <div className="text-center md:text-left">
          <h2 className="mb-6 break-words" style={{ fontFamily: 'MadaniArabic-Bold, Cairo, Tajawal, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '32px', lineHeight: '50px', letterSpacing: '0%' }}>
            Connecting Farms, Empowering Markets. Join AgriLink NG Today!
          </h2>
          <p className="text-gray-300 mb-8 break-words" style={{ fontFamily: 'MadaniArabic-Medium, Cairo, Tajawal, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '20px', lineHeight: '37px', letterSpacing: '0%' }}>
            At Agrilink, we're committed to bridging the gap between farmers and buyers through direct, transparent, and stress-free trade. We're building a smarter agricultural economy, one fresh connection at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors w-full sm:w-auto">
              Farmers Sign Up
            </button>
            <button className="bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors w-full sm:w-auto">
              Buyers Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="md:col-span-2">
          <h4 className="font-bold text-lg mb-4">About Agrilink</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
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
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-green-500 transition-colors">Farmers Sign Up</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Buyers Sign Up</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="font-bold text-lg mb-4">Stay Connected</h4>
          <p className="text-gray-400 text-sm mb-4">
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
              className="mt-4 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-8">
            <a href="#" aria-label="Facebook" className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.985 11.988 11.985s11.987-5.367 11.987-11.985C24.004 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Use</a></li>
          <li><a href="#" className="hover:text-green-500 transition-colors">Disclaimer</a></li>
        </ul>
        <div className="mt-4 md:mt-0 text-gray-400 text-sm">
          Copyright 2025 © agrilink | All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
