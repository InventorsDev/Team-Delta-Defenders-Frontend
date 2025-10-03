
import { Link } from 'react-router-dom';

const ProcessCard = ({ title, description, number, isWide = false }) => {
  return (
    <div 
      className={`relative p-4 md:p-6 overflow-hidden flex flex-col w-full ${
        isWide ? 'md:w-[757px] lg:w-[757px]' : 'md:w-[535px] lg:w-[535px]'
      } h-auto min-h-[250px] sm:min-h-[280px] md:min-h-[350px] lg:min-h-[409px]`}
      style={{
        borderRadius: '15px',
        opacity: 1,
        transform: 'rotate(0deg)',
        background: 'hsl(var(--brand-colors-SteamWhite, 0 0% 100%))'
      }}
    >
      {/* Background logo image */}
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-12 h-12 md:w-16 md:h-16 opacity-30 z-0">
        <Link to="/" className="cursor-pointer">
          <img
            src="/agrilink-logo-steps-card.webp"
            alt="Agrilink Logo Background"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      
      <span 
        className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        style={{
          fontFamily: 'Montserrat',
          fontWeight: 700,
          fontStyle: 'normal',
          lineHeight: '0.8',
          letterSpacing: '0%',
          color: 'hsla(86, 78%, 8%, 0.36)'
        }}
      >
        {number}
      </span>
      
      <div className="relative z-10">
        <h3 className="text-gray-800 text-xl md:text-2xl lg:text-3xl" style={{ fontFamily: 'MadaniArabic-Bold', fontWeight: 400, fontStyle: 'normal', lineHeight: '1.4', letterSpacing: '0%' }}>
          {title}
        </h3>
        <p className="mt-2 text-gray-600 text-sm md:text-base lg:text-lg" style={{ fontFamily: 'MadaniArabic-Medium', fontWeight: 400, fontStyle: 'normal', lineHeight: '1.5', letterSpacing: '0%' }}>
          {description}
        </p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      number: "1",
      title: "Login as a Farmer or a Buyer",
      description: "Create your account and get verified. Choose your role and complete your profile with necessary details."
    },
    {
      number: "2", 
      title: "Farmers List Their Produce",
      description: "Farmers showcase their produce with photos and descriptions. Buyers browse and find exactly what they need."
    },
    {
      number: "3",
      title: "Negotiate, Agree & Seal the Deal",
      description: "Use our in-app chat to discuss terms, negotiate prices, and finalize the transaction details safely."
    },
    {
      number: "4",
      title: "Farmers Make Their Produce Ready",
      description: "Arrange pickup or delivery through our logistics partners. Complete the transaction and build your reputation."
    }
  ];

  return (
    <section className="py-20" id="how-it-works" style={{ background: 'hsl(var(--brand-colors-HarvestMist, 114 88% 94%))' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Farm to Market in <span className="text-primary">4 Easy Steps</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Mobile: Stack all cards vertically */}
          <div className="flex flex-col md:hidden gap-4 w-full max-w-sm px-4">
            <ProcessCard {...steps[0]} />
            <ProcessCard {...steps[1]} />
            <ProcessCard {...steps[2]} />
            <ProcessCard {...steps[3]} />
          </div>
          
          {/* Tablet: Stack all cards vertically with better spacing */}
          <div className="hidden md:flex lg:hidden flex-col items-center gap-4 w-full max-w-2xl">
            <ProcessCard {...steps[0]} />
            <ProcessCard {...steps[1]} />
            <ProcessCard {...steps[2]} />
            <ProcessCard {...steps[3]} />
          </div>
          
          {/* Desktop: Two rows with varying widths */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            {/* First Row - Cards 1 & 2 (Card 1 wider) */}
            <div className="flex gap-4">
              <ProcessCard {...steps[0]} isWide={true} />
              <ProcessCard {...steps[1]} />
            </div>
            
            {/* Second Row - Cards 3 & 4 (Card 4 wider) */}
            <div className="flex gap-4">
              <ProcessCard {...steps[2]} />
              <ProcessCard {...steps[3]} isWide={true} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;