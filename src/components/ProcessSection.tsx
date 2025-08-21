import { UserPlus, Search, Handshake, Truck } from "lucide-react";

const ProcessCard = ({ title, description, number, isWide = false }) => {
  return (
    <div 
      className={`relative p-4 md:p-6 shadow-md overflow-hidden flex flex-col w-full ${
        isWide ? 'md:w-[757px] lg:w-[757px]' : 'md:w-[535px] lg:w-[535px]'
      } h-auto min-h-[300px] md:min-h-[409px]`}
      style={{
        borderRadius: '20px',
        opacity: 1,
        transform: 'rotate(0deg)',
        backgroundColor: '#E4FDE1'
      }}
    >
      {/* Background logo image */}
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-12 h-12 md:w-16 md:h-16 opacity-30 z-0">
        <img 
          src="/agrilink-logo.png" 
          alt="Agrilink Logo Background" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <span 
        className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-4xl md:text-6xl font-extrabold text-gray-200 z-0"
        style={{ 
          background: 'rgba(24, 38, 5, 0.36)' 
        }}
      >
        {number}
      </span>
      
      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-6 md:mt-10">
          {title}
        </h3>
        <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
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
    <section className="py-20 bg-accent/5" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Farm to Market in <span className="text-primary">4 Easy Steps</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Mobile: Stack all cards vertically */}
          <div className="flex flex-col md:hidden gap-4 w-full max-w-md">
            <ProcessCard {...steps[0]} />
            <ProcessCard {...steps[1]} />
            <ProcessCard {...steps[2]} />
            <ProcessCard {...steps[3]} />
          </div>
          
          {/* Desktop: Two rows with varying widths */}
          <div className="hidden md:flex flex-col items-center gap-4">
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