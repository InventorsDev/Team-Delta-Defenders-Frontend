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
      {/* Desktop Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:block hidden"
          style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          onClick={onClose}
        />
      )}

      {/* Desktop Slide-in Panel from Right */}
      <div
        className={`hidden lg:block z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '729px',
          background: 'var(--brand-colors-SteamWhite, white)',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'fixed',
          right: 0,
          top: 0,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: 'var(--brand-colors-SteamWhite, white)',
            overflow: 'auto',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20
          }}
        >
          {/* Main Product Image */}
          <img
            style={{
              width: 404,
              height: 276,
              left: 30,
              top: 30,
              position: 'absolute',
              borderRadius: 10,
              objectFit: 'cover'
            }}
            src={product.image}
            alt={product.name}
          />

          {/* Product Image Thumbnails */}
          <div style={{
            width: 404,
            left: 30,
            top: 322,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 16,
            display: 'inline-flex'
          }}>
            <img style={{flex: '1 1 0', height: 89, borderRadius: 10, border: '3px var(--brand-colors-SproutGreen, #84C62C) solid', objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{flex: '1 1 0', height: 89, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
          </div>

          {/* Carousel Controls */}
          <div style={{
            width: 404,
            paddingLeft: 10,
            paddingRight: 10,
            left: 30,
            top: 133,
            position: 'absolute',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'inline-flex'
          }}>
            <div style={{
              width: 50,
              height: 50,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              transform: 'rotate(180deg)',
              transformOrigin: 'top left',
              background: 'rgba(255, 255, 255, 0.70)',
              overflow: 'hidden',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex'
            }}>
              {/* Replace with left arrow SVG or icon */}
              <img src="/chevron-left.svg" alt="Previous" style={{width: 24, height: 24}} />
            </div>
            <div style={{
              width: 50,
              height: 50,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 10,
              background: 'rgba(255, 255, 255, 0.70)',
              overflow: 'hidden',
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex'
            }}>
              {/* Replace with right arrow SVG or icon */}
              <img src="/chevron-right.svg" alt="Next" style={{width: 24, height: 24}} />
            </div>
          </div>

          {/* Seller Title */}
          <div style={{
            left: 457,
            top: 111,
            position: 'absolute',
            color: 'var(--brand-colors-RootBlack, #182605)',
            fontSize: 24,
            fontFamily: 'MadaniArabic-Bold',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}>
            Seller
          </div>

          {/* Product Details Section */}
          <div style={{
            width: 404,
            left: 30,
            top: 441,
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 30,
            display: 'inline-flex'
          }}>
            {/* Product Name */}
            <div style={{
              alignSelf: 'stretch',
              color: 'var(--brand-colors-RootBlack, #182605)',
              fontSize: 32,
              fontFamily: 'MadaniArabic-Bold',
              fontWeight: '400',
              lineHeight: '50px',
              wordWrap: 'break-word'
            }}>
              {product.name}
            </div>
            {/* Price */}
            <div style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              gap: 4,
              display: 'inline-flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 24,
                fontFamily: 'MadaniArabic-Bold',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                {product.price}
              </div>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Per Unit
              </div>
            </div>
            {/* Average Market Price */}
            <div data-property-1="Default" style={{
              padding: 10,
              background: 'var(--brand-colors-HarvestMist, #E4FDE1)',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Average market price ₦36,000
              </div>
            </div>
            {/* Category */}
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 12,
              display: 'flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Category:
              </div>
              <div style={{
                alignSelf: 'stretch',
                color: 'var(--brand-colors-rootgrey, #8B9281)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Vegetables
              </div>
            </div>
            {/* Location */}
            <div style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 4,
              display: 'inline-flex'
            }}>
              <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
                display: 'flex'
              }}>
                <img src="/location-icon.svg" alt="Location" style={{width: 24, height: 24}} />
              </div>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                {product.location}
              </div>
            </div>
            {/* Farm Address */}
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 12,
              display: 'flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Farm Address:
              </div>
              <div style={{
                alignSelf: 'stretch',
                color: 'var(--brand-colors-rootgrey, #8B9281)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Plot 15, Igbogbo Road, {product.location}, Nigeria
              </div>
            </div>
            {/* Description */}
            <div style={{
              alignSelf: 'stretch',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 12,
              display: 'flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Description:
              </div>
              <div style={{
                alignSelf: 'stretch',
                color: 'var(--brand-colors-rootgrey, #8B9281)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                {product.description}
              </div>
            </div>
          </div>
          {/* Seller Card */}
          <div style={{
            width: 259,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            left: 457,
            top: 139,
            position: 'absolute',
            background: 'var(--brand-colors-SteamWhite, white)',
            boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)',
            borderRadius: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 15,
            display: 'inline-flex'
          }}>
            <img style={{width: 40, height: 40}} src="/profile image.png" alt="Seller" />
            <div style={{
              width: 160,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 14,
              display: 'inline-flex'
            }}>
              <div style={{
                alignSelf: 'stretch',
                color: 'var(--brand-colors-RootBlack, #182605)',
                fontSize: 20,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                lineHeight: '37px',
                wordWrap: 'break-word'
              }}>
                Anosikay Farms
              </div>
              <div style={{
                color: 'var(--brand-colors-rootgrey, #8B9281)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                2y 3m on agrilink
              </div>
              <div style={{
                color: 'var(--brand-colors-rootgrey, #8B9281)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Medium',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                +234 902 266 5965
              </div>
              <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 6,
                display: 'inline-flex'
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src="/star.svg"
                    alt="Star"
                    style={{
                      width: 24,
                      height: 24,
                      filter: star <= Number(product.rating) ? 'brightness(1)' : 'grayscale(1) opacity(0.3)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Safety Tips */}
          <div style={{
            width: 262,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20,
            paddingBottom: 20,
            left: 454,
            top: 479,
            position: 'absolute',
            background: 'var(--brand-colors-SteamWhite, white)',
            boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)',
            borderRadius: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 15,
            display: 'inline-flex'
          }}>
            <div style={{
              flex: '1 1 0',
              color: 'var(--brand-colors-rootgrey, #8B9281)',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Medium',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Avoid paying in advance, even for delivery<br />
              Meet with seller at a safe public place<br />
              Inspect the item and ensure it’s exactly what you want<br />
              Only pay if you’re satisfied
            </div>
          </div>
          {/* Action Buttons */}
          <div data-property-1="alternate" style={{
            width: 259,
            minWidth: 160,
            minHeight: 40,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 12,
            paddingBottom: 12,
            left: 457,
            top: 304,
            position: 'absolute',
            background: 'var(--brand-colors-HarvestMist, #E4FDE1)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex'
          }}>
            <div style={{
              color: 'var(--brand-colors-RootBlack, #182605)',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Bold',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Rate Seller
            </div>
          </div>
          <div data-property-1="warning" style={{
            width: 259,
            minWidth: 160,
            minHeight: 40,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 12,
            paddingBottom: 12,
            left: 457,
            top: 354,
            position: 'absolute',
            background: 'var(--brand-colors-pepper-red, #FF3D00)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex'
          }}>
            <div style={{
              color: 'var(--brand-colors-SteamWhite, white)',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Bold',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Report Misconduct
            </div>
          </div>
          {/* Safety Tips Title */}
          <div style={{
            left: 454,
            top: 441,
            position: 'absolute',
            color: 'var(--brand-colors-RootBlack, #182605)',
            fontSize: 24,
            fontFamily: 'MadaniArabic-Bold',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}>
            Safety Tips
          </div>
          {/* Farmer Account CTA */}
          <div style={{
            width: 262,
            padding: 20,
            left: 454,
            top: 695,
            position: 'absolute',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)',
            boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)',
            borderRadius: 20,
            backgroundImage: 'url(/marketplace-cta.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 28,
            display: 'inline-flex'
          }}>
            <div style={{
              alignSelf: 'stretch',
              textAlign: 'center',
              color: 'var(--brand-colors-SteamWhite, white)',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Medium',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}>
              Do you have produce to sell, create your farmer account and start posting
            </div>
            <div data-property-1="Default" style={{
              alignSelf: 'stretch',
              minWidth: 160,
              minHeight: 40,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: 'var(--brand-colors-SproutGreen, #84C62C)',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-SteamWhite, white)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Bold',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Get Farmers Account
              </div>
            </div>
          </div>
          {/* Vertical Accent Bar */}
          <div style={{
            width: 5,
            height: 56,
            left: 729,
            top: 96,
            position: 'absolute',
            background: 'var(--brand-colors-SproutGreen, #84C62C)',
            borderRadius: 99
          }} />
          {/* Top Action Bar */}
          <div style={{
            width: 262,
            padding: 5,
            left: 454,
            top: 30,
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.70)',
            borderRadius: 99,
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 16,
            display: 'inline-flex'
          }}>
            <div data-property-1="Default" style={{
              flex: '1 1 0',
              minWidth: 160,
              minHeight: 40,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: 'var(--brand-colors-SproutGreen, #84C62C)',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex'
            }}>
              <div style={{
                color: 'var(--brand-colors-SteamWhite, white)',
                fontSize: 16,
                fontFamily: 'MadaniArabic-Bold',
                fontWeight: '400',
                wordWrap: 'break-word'
              }}>
                Chat Seller
              </div>
            </div>
            <div style={{
              padding: 10,
              background: 'var(--brand-colors-SteamWhite, white)',
              boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)',
              borderRadius: 22,
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 10,
              display: 'flex'
            }}>
              <button onClick={onClose} style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#182605" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          {/* Testimonials Section */}
          <div style={{
            width: 404,
            left: 30,
            top: 921,
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 30,
            display: 'inline-flex'
          }}>
            {/* ...testimonials content as needed... */}
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Panel from Right */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: '100vw',
          maxWidth: '100vw',
          backgroundColor: 'white',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }}
      >
        {/* Mobile-First Product Detail View */}
        <div style={{width: '100%', minHeight: '100vh', position: 'relative', background: 'white', overflow: 'visible', padding: '60px 16px 80px 16px', boxSizing: 'border-box'}}>

          {/* Main Product Image */}
          <img
            style={{width: '100%', maxWidth: '358px', height: '276px', marginLeft: 'auto', marginRight: 'auto', display: 'block', borderRadius: 10, objectFit: 'cover'}}
            src={product.image}
            alt={product.name}
          />

          {/* Product Image Thumbnails */}
          <div style={{width: '100%', maxWidth: '358px', margin: '16px auto 0', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>
            <img style={{width: 75, height: 75, borderRadius: 10, border: '3px #84C62C solid', objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{width: 75, height: 75, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{width: 75, height: 75, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
            <img style={{width: 75, height: 75, borderRadius: 10, objectFit: 'cover'}} src={product.image} alt="thumbnail" />
          </div>

          {/* Product Details Section */}
          <div style={{width: '100%', maxWidth: '358px', margin: '47px auto 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 30, display: 'flex'}}>

            {/* Product Name */}
            <div style={{alignSelf: 'stretch', color: '#182605', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
              {product.name}
            </div>

            {/* Price */}
            <div style={{justifyContent: 'flex-start', alignItems: 'flex-end', gap: 4, display: 'inline-flex'}}>
              <div style={{color: '#182605', fontSize: 24, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
                {product.price}
              </div>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Per Unit
              </div>
            </div>

            {/* Average Market Price */}
            <div style={{padding: 10, background: '#E4FDE1', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Average market price ₦36,000
              </div>
            </div>

            {/* Category */}
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Category:
              </div>
              <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Vegetables
              </div>
            </div>

            {/* Location */}
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
              <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
                <img src="/location-icon.svg" alt="Location" style={{width: 24, height: 24}} />
              </div>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                {product.location}
              </div>
            </div>

            {/* Farm Address */}
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Farm Address:
              </div>
              <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Plot 15, Igbogbo Road, {product.location}, Nigeria
              </div>
            </div>

            {/* Description */}
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
              <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Description:
              </div>
              <div style={{alignSelf: 'stretch', color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                {product.description}
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div style={{width: '100%', maxWidth: '358px', margin: '50px auto 0', color: '#182605', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
            Seller
          </div>

          {/* Seller Card */}
          <div style={{width: '100%', maxWidth: '358px', margin: '12px auto 0', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'flex', boxSizing: 'border-box'}}>
            <img style={{width: 40, height: 40}} src="/profile image.png" alt="Seller" />
            <div style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Anosikay Farms
              </div>
              <div style={{color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                2y 3m on agrilink
              </div>
              <div style={{color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                +234 902 266 5965
              </div>
              <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src="/star.svg"
                    alt="Star"
                    style={{
                      width: 20,
                      height: 20,
                      filter: star <= 4 ? 'brightness(0) saturate(100%) invert(84%) sepia(78%) saturate(2500%) hue-rotate(2deg) brightness(105%) contrast(102%)' : 'brightness(0) saturate(100%) invert(64%) sepia(8%) saturate(1092%) hue-rotate(58deg) brightness(96%) contrast(88%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <button style={{width: '100%', maxWidth: '358px', margin: '20px auto 0', display: 'block', minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#E4FDE1', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', boxSizing: 'border-box'}}>
            <div style={{color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
              Rate Seller
            </div>
          </button>

          <button style={{width: '100%', maxWidth: '358px', margin: '10px auto 0', display: 'block', minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#FF3D00', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, border: 'none', cursor: 'pointer', boxSizing: 'border-box'}}>
            <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
              Report Misconduct
            </div>
          </button>

          {/* Safety Tips Section */}
          <div style={{width: '100%', maxWidth: '358px', margin: '50px auto 0', color: '#182605', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
            Safety Tips
          </div>

          <div style={{width: '100%', maxWidth: '358px', margin: '12px auto 0', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 15, display: 'flex', boxSizing: 'border-box'}}>
            <ul style={{flex: '1 1 0', color: '#8B9281', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word', margin: 0, paddingLeft: 20, listStyleType: 'disc'}}>
              <li style={{marginBottom: 8}}>Avoid paying in advance, even for delivery</li>
              <li style={{marginBottom: 8}}>Meet with seller at a safe public place</li>
              <li style={{marginBottom: 8}}>Inspect the item and ensure it's exactly what you want</li>
              <li style={{marginBottom: 0}}>Only pay if you're satisfied</li>
            </ul>
          </div>

          {/* Farmer Account CTA */}
          <div style={{width: '100%', maxWidth: '358px', height: 150, margin: '30px auto 0', backgroundImage: 'url(/marketplace-cta.png)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', overflow: 'hidden', boxSizing: 'border-box'}}>
            {/* Overlay */}
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.40)', borderRadius: 20}} />

            {/* Content */}
            <div style={{position: 'relative', zIndex: 1, padding: 20, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 28, display: 'flex'}}>
              <div style={{alignSelf: 'stretch', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                Do you have produce to sell, creat your farmer account and start posting
              </div>
              <button style={{alignSelf: 'stretch', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', border: 'none', cursor: 'pointer'}}>
                <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
                  Get Farmers Account
                </div>
              </button>
            </div>
          </div>

          {/* Testimonials Section */}
          <div style={{width: '100%', maxWidth: '358px', margin: '30px auto 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 30, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', height: 24, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
              <div style={{color: '#182605', fontSize: 20, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
                Testimonials
              </div>
              <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex', cursor: 'pointer'}}>
                <div style={{color: '#182605', fontSize: 14, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                  View All
                </div>
                <img
                  src="/chevron-right-2.svg"
                  alt="Arrow right"
                  style={{width: 16, height: 16}}
                />
              </div>
            </div>

            {/* Testimonial Cards */}
            {[
              { name: 'White Tapes', role: 'Fashion Designer' },
              { name: 'Fatima Alabi', role: 'Buyer' },
              { name: 'Thunde Ednut', role: 'Store Owner' }
            ].map((testimonial, index) => (
              <div key={index} style={{alignSelf: 'stretch', padding: 10, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', overflow: 'hidden', borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
                <div style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex'}}>
                  <img style={{width: 40, height: 40, borderRadius: 9999, flexShrink: 0}} src="/profile image.png" alt={testimonial.name} />
                  <div style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
                    <div style={{width: '100%', color: '#182605', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>
                      {testimonial.name}
                    </div>
                    <div style={{width: '100%', color: '#8B9281', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word'}}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div style={{width: '100%', color: '#182605', fontSize: 14, fontFamily: 'Montserrat', fontStyle: 'italic', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word'}}>
                  "I found the freshest tomatoes I've ever bought through AgriLink. Your farm's produce was top quality, and it arrived just as promised. Thank you for making it so easy to buy directly from you, I'll definitely order again!"
                </div>
                <div style={{width: '100%', justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src="/star.svg"
                      alt="Star"
                      style={{
                        width: 24,
                        height: 24,
                        filter: 'brightness(0) saturate(100%) invert(84%) sepia(78%) saturate(2500%) hue-rotate(2deg) brightness(105%) contrast(102%)'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div style={{width: '100%', maxWidth: '390px', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 255, 255, 0.70)', borderRadius: 99, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex', zIndex: 100, boxSizing: 'border-box'}}>
            <button style={{flex: '1 1 0', minWidth: 160, minHeight: 40, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, background: '#84C62C', borderRadius: 30, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', border: 'none', cursor: 'pointer'}}>
              <div style={{color: 'white', fontSize: 16, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>
                Chat Seller
              </div>
            </button>
            <div style={{padding: 10, background: 'white', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 22, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex', cursor: 'pointer'}} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#182605" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailView;