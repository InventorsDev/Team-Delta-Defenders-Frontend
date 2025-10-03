import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/midpage-cta.webp"
          alt="Nigerian farmland landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'hsla(0, 0%, 0%, 0.5)' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="mr-2 sm:mr-3 flex items-center">
                <Link to="/" className="cursor-pointer">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/agrilink-logo.webp"
                      alt="Agrilink Logo"
                      className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                    />
                  </span>
                </Link>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white ml-2">agrilink</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Why Wait? Start Connecting & Trading 
              <span className="text-[hsl(var(--brand-colors-SproutGreen))]"> Smarter Today.</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              AgriLink NG is already helping farmers and buyers across Nigeria link up directly. No middlemen, no extra charges — just real conversations and better deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-[hsl(var(--brand-colors-SoilBlush))] text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto transition-colors duration-200"
              >
                Farmers Sign Up
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-black hover:bg-[hsl(var(--brand-colors-SoilBlush))] hover:text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-none w-full sm:w-auto transition-colors duration-200"
                style={{ background: 'rgba(228, 253, 225, 1)' }}
              >
                Buyers Sign Up
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;