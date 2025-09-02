import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

const AuthLayout = ({ children, title, subtitle, showBackToHome = true }: AuthLayoutProps) => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/design/assets/authentication pages assest/leaf background 1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Left Box Layout */}
      <div 
        className="absolute flex flex-col"
        style={{
          width: '535px',
          height: '844px',
          justifyContent: 'space-between',
          top: '69px',
          left: '100px',
          opacity: 1
        }}
      >
        <div className="text-white">
          <h2 
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'MadaniArabic-Bold' }}
          >
            Join Nigeria's Leading Agricultural Platform
          </h2>
          <p 
            className="text-lg opacity-90"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            Connect directly with farmers and buyers. No middleman wahala, just fresh deals and fair prices.
          </p>
        </div>
        
        <div className="text-white text-sm opacity-75">
          <p style={{ fontFamily: 'MadaniArabic-Medium' }}>
            © 2024 AgriLink. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Form Box */}
      <div 
        className="absolute bg-white shadow-2xl overflow-y-auto"
        style={{
          width: '646px',
          height: '844px',
          top: '69px',
          left: '756px',
          borderRadius: '30px',
          opacity: 1
        }}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-8">
              <img
                src="/Agrilink-logo.svg"
                alt="AgriLink Logo"
                className="h-12 w-auto mx-auto"
              />
            </Link>
            
            <h1 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'MadaniArabic-Bold' }}
            >
              {title}
            </h1>
            
            {subtitle && (
              <p 
                className="text-gray-600 text-lg"
                style={{ fontFamily: 'MadaniArabic-Medium' }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Back to Home */}
          {showBackToHome && (
            <div className="text-center mt-6">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-[hsl(var(--brand-colors-SproutGreen))] transition-colors"
                style={{ fontFamily: 'MadaniArabic-Medium' }}
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;