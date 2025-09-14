import React from 'react';

interface Product {
  name: string;
  price: string;
  location: string;
  rating: string;
  description: string;
  image: string;
}

interface ProductDetailViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          onClick={onClose}
        />
      )}
      
      {/* Slide-in Panel */}
      <div 
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '800px',
          maxWidth: '90vw',
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: 'white', padding: '30px', boxSizing: 'border-box'}}>
          
          {/* Chat Seller Controls */}
          <div style={{width: 262, height: 50, padding: 5, background: 'rgba(255, 255, 255, 0.70)', borderRadius: 99, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex', position: 'absolute', top: 30, right: 30, zIndex: 20}}>
            <div data-property-1="Default" style={{flex: '1 1 0', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
              <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Chat Seller</div>
            </div>
            <div style={{padding: 10, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 22, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex', cursor: 'pointer'}} onClick={onClose}>
              <div data-property-1="closed" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#182605" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div style={{position: 'absolute', top: 100, right: 30, width: 280, flexDirection: 'column', gap: 20, display: 'flex', zIndex: 10}}>
            {/* Seller Label */}
            <div style={{color: '#182605', fontSize: 24, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Seller</div>
            
            {/* Seller Info Card */}
            <div style={{width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'inline-flex'}}>
              <img style={{width: 40, height: 40}} src="/profile image.png" alt="Farmer profile" />
              <div style={{width: 160, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 6, display: 'inline-flex'}}>
                <div style={{alignSelf: 'stretch', color: '#182605', fontSize: 20, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, lineHeight: '37px', wordWrap: 'break-word'}}>Anosikay Farms</div>
                <div style={{color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>2y 3m on agrilink</div>
                <div style={{color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>+234 902 266 5965</div>
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'inline-flex'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B9281" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{width: '100%', flexDirection: 'column', gap: 15, display: 'flex', alignItems: 'center'}}>
              <button style={{width: '100%', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#E4FDE1', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', border: 'none', cursor: 'pointer'}}>
                <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Rate Seller</div>
              </button>
              
              <button style={{width: '100%', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#FF3D00', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', border: 'none', cursor: 'pointer'}}>
                <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Report Misconduct</div>
              </button>
            </div>
            
            {/* Safety Tips */}
            <div style={{width: '100%', flexDirection: 'column', gap: 15, display: 'flex'}}>
              <div style={{color: '#182605', fontSize: 24, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Safety Tips</div>
              
              <div style={{width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'inline-flex'}}>
                <ul style={{width: '100%', color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word', margin: 0, padding: 0, paddingLeft: 20, listStyleType: 'disc'}}>
                  <li style={{marginBottom: 8}}>Avoid paying in advance, even for delivery</li>
                  <li style={{marginBottom: 8}}>Meet with seller at a safe public place</li>
                  <li style={{marginBottom: 8}}>Inspect the item and ensure it's exactly what you want</li>
                  <li style={{marginBottom: 0}}>Only pay if you're satisfied</li>
                </ul>
              </div>
            </div>
            
            {/* Farmer Account CTA */}
            <div style={{
              width: '100%', 
              height: '100%', 
              padding: 20, 
              backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(/marketplace-cta.png)', 
              backgroundSize: 'cover, cover',
              backgroundPosition: 'center, center',
              backgroundRepeat: 'no-repeat, no-repeat',
              boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', 
              borderRadius: 20, 
              flexDirection: 'column', 
              justifyContent: 'flex-start', 
              alignItems: 'flex-start', 
              gap: 28, 
              display: 'inline-flex'
            }}>
              <div style={{alignSelf: 'stretch', textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Do you have produce to sell, create your farmer account and start posting</div>
              <button style={{alignSelf: 'stretch', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', border: 'none', cursor: 'pointer'}}>
                <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>Get Farmers Account</div>
              </button>
            </div>
          </div>

          {/* Main Content Layout */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 30, paddingRight: 320}}>
            
            {/* Product Image Section */}
            <div style={{position: 'relative', width: '100%', maxWidth: 450}}>
              {/* Main Product Image */}
              <div style={{position: 'relative', width: '100%', height: 276, borderRadius: 10, overflow: 'hidden'}}>
                <img style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10}} src={product.image} alt={product.name} />
                
                {/* Image Navigation Arrows */}
                <div style={{position: 'absolute', top: '50%', left: 10, right: 10, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{width: 50, height: 50, backgroundColor: 'white', borderRadius: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'}}>
                    <img src="/chevron-left-2.svg" alt="Previous" style={{width: 20, height: 20}} />
                  </div>
                  <div style={{width: 50, height: 50, backgroundColor: 'white', borderRadius: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', cursor: 'pointer', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'}}>
                    <img src="/chevron-right-2.svg" alt="Next" style={{width: 20, height: 20}} />
                  </div>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div style={{width: '100%', marginTop: 16, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
                <img style={{flex: '1 1 0', height: 89, borderRadius: 10, border: '3px var(--brand-colors-SproutGreen, #84C62C) solid', objectFit: 'cover'}} src={product.image} alt={`${product.name} thumbnail 1`} />
                <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt={`${product.name} thumbnail 2`} />
                <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt={`${product.name} thumbnail 3`} />
                <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt={`${product.name} thumbnail 4`} />
              </div>
            </div>

            {/* Two Column Layout for Content */}
            <div style={{display: 'flex', gap: 30, flexWrap: 'wrap'}}>
              
              {/* Left Column - Product Details */}
              <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 30, display: 'inline-flex'}}>
                <div style={{alignSelf: 'stretch', color: '#182605', fontSize: 32, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, lineHeight: '50px', wordWrap: 'break-word'}}>{product.name}</div>
                
                {/* Price */}
                <div style={{justifyContent: 'flex-start', alignItems: 'flex-end', gap: 4, display: 'inline-flex'}}>
                  <div style={{color: '#182605', fontSize: 24, fontFamily: 'MadaniArabic-Bold, Arial, sans-serif', fontWeight: 700, wordWrap: 'break-word'}}>{product.price}</div>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Per Unit</div>
                </div>
                
                {/* Average Market Price */}
                <div style={{padding: 10, background: '#E4FDE1', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Average market price ₦36,000</div>
                </div>
                
                {/* Category */}
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Category:</div>
                  <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Vegetables</div>
                </div>
                
                {/* Location */}
                <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#182605" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z"/>
                  </svg>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>{product.location}</div>
                </div>
                
                {/* Farm Address */}
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Farm Address:</div>
                  <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Plot 15, Igbogbo Road, {product.location}, Nigeria</div>
                </div>
                
                {/* Description */}
                <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                  <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>Description:</div>
                  <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 16, fontFamily: 'MadaniArabic-Medium, Arial, sans-serif', fontWeight: 400, wordWrap: 'break-word'}}>{product.description}</div>
                </div>
              </div>

            </div>

            {/* Testimonials Section */}
            <div style={{width: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 30, display: 'flex', marginTop: 40}}>
              <div style={{alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 24, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>Testimonials</div>
                <div data-property-1="Default" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex', cursor: 'pointer'}}>
                  <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>View All</div>
                  <div data-property-1="right" style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex', position: 'relative'}}>
                    <div style={{width: 6, height: 12, outline: '2px var(--brand-colors-RootBlack, #182605) solid', outlineOffset: '-1px'}} />
                  </div>
                </div>
              </div>
              
              {/* Testimonial Cards */}
              {[
                { name: 'White Tapes', role: 'Fashion Designer' },
                { name: 'Fatima Alabi', role: 'Buyer' },
                { name: 'Thunde Ednut', role: 'Store Owner' }
              ].map((testimonial, index) => (
                <div key={index} style={{alignSelf: 'stretch', padding: 10, backgroundColor: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', overflow: 'hidden', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
                  <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                    <img style={{width: 40, height: 40, borderRadius: 9999}} src="/profile image.png" alt={testimonial.name} />
                    <div style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                      <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>{testimonial.name}</div>
                      <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word'}}>{testimonial.role}</div>
                    </div>
                  </div>
                  <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 14, fontFamily: 'Montserrat', fontStyle: 'italic', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word'}}>"I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised. Thank you for making it so easy to buy directly from you, I'll definitely order again!"</div>
                  <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'inline-flex'}}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailView;