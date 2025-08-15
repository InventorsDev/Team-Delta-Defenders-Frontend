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
      className="bg-gradient-to-b from-[hsl(120,65%,20%)] to-[hsl(120,65%,25%)] text-white py-20 lg:py-32 relative bg-[url('/hero-bg.png')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl text-left">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            No Middleman Wahala<br />
            Chat Farmers Directly!
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl">
            Connect straight to farmers, price am your way, and get your produce fresh-fresh. Easy talk, easy deal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
            >
              Farmers Sign Up
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-black border-white hover:bg-white hover:text-primary text-lg px-8 py-3"
            >
              Buyers Sign Up
            </Button>
          </div>

          {/* Partners Section */}
          <div className="mt-16 text-center max-w-4xl">
            <p className="text-white text-center mb-6 text-sm uppercase tracking-wide">
              In Collaboration With
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-lg text-2xl"
                >
                  {partner.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;