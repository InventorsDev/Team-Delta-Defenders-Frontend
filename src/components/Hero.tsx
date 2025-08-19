import { Button } from "@/components/ui/button";

const Hero = () => {
  const partners = [
    { name: "Partner 1", logo: "🌱" },
    { name: "Partner 2", logo: "🚜" },
    { name: "Partner 3", logo: "🌾" },
    { name: "Partner 4", logo: "🥕" },
  ];

  return (
    <section
      className="text-white py-12 sm:py-16 md:py-20 lg:py-32 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsl(120, 65%, 20%, 0.3), hsl(120, 65%, 25%, 0.3)), url('/hero-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <div className="max-w-4xl text-left">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            No Middleman Wahala<br />
            Chat Farmers Directly!
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-3xl">
            Connect straight to farmers, price am your way, and get your produce fresh-fresh. Easy talk, easy deal.
          </p>

          {/* Stats Text */}
          <p 
            className="text-white mb-6 sm:mb-8 text-base sm:text-lg md:text-xl"
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontStyle: 'italic',
              lineHeight: '1.4'
            }}
          >
            "100+ Farmers & Market Sellers already on agrilink"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto transition-colors duration-200"
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--brand-colors-SoilBlush, rgba(211, 171, 158, 1))';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '';
              }}
            >
              Farmers Sign Up
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-black border-white text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto transition-colors duration-200"
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--brand-colors-SoilBlush, rgba(211, 171, 158, 1))';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '';
              }}
            >
              Buyers Sign Up
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;