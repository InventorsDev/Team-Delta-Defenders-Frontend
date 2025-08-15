import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/midpage-cta-bg.png"
          alt="Nigerian farmland landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(120,65%,20%)]/60 to-[hsl(120,65%,25%)]/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="mr-3 flex items-center">
                <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/agrilink-logo.png"
                    alt="Agrilink Logo"
                    className="w-8 h-8 object-contain"
                  />
                </span>
              </div>
              <span className="text-3xl font-bold text-white ml-2">agrilink</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Why Wait? Start Connecting & Trading 
              <span className="text-green-300"> Smarter Today.</span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              AgriLink NG is already helping farmers and buyers across Nigeria link up directly. No middlemen, no extra charges — just real conversations and better deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-full"
              >
                Farmers Sign Up
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-black text-lg px-8 py-4 rounded-full border-none"
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