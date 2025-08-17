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
      className="text-white py-20 lg:py-32 relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsl(120, 65%, 20%, 0.3), hsl(120, 65%, 25%, 0.3)), url('/hero-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
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

        </div>
      </div>
    </section>
  );
};

export default Hero;