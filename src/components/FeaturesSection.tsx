const FeatureCard = ({ title, description, number }) => {
  return (
    <div 
      className="relative p-6 shadow-md overflow-hidden flex flex-col"
      style={{
        width: '424px',
        height: '424px',
        borderRadius: '30px',
        opacity: 1,
        transform: 'rotate(0deg)',
        backgroundColor: '#E4FDE1'
      }}
    >
      {/* Background logo image */}
      <div className="absolute bottom-4 right-4 w-16 h-16 opacity-30 z-0">
        <img 
          src="/agrilink-logo.png" 
          alt="Agrilink Logo Background" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <span 
        className="absolute bottom-4 left-4 text-6xl font-extrabold text-gray-200 z-0"
        style={{ 
          background: 'rgba(24, 38, 5, 0.36)' 
        }}
      >
        {number}
      </span>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mt-10">
          {title}
        </h3>
        <p className="mt-2 text-base text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Market Place Listing",
      description: "Explore verified produce with images, prices, and availability.",
      number: 1,
    },
    {
      title: "In-App Chat",
      description: "Connect and chat with farmers or buyers instantly.",
      number: 2,
    },
    {
      title: "Search & Filters",
      description: "Find exactly what you want, by type, price or location.",
      number: 3,
    },
    {
      title: "Notifications",
      description: "Stay updated when a buyer messages or when fresh produce is listed.",
      number: 4,
    },
    {
      title: "Post-Harvest Tips",
      description: "Farmers get access to tips to improve their produce quality and reduce spoilage.",
      number: 5,
    },
  ];

  return (
    <section className="py-20 bg-background" id="benefits">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="w-10 h-1 bg-primary rounded-full mr-3"></span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Everything You Need to Buy and Sell Smarter
            </h2>
            <span className="w-10 h-1 bg-primary rounded-full ml-3"></span>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need for successful 
            agricultural trading, from listing to delivery.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-2 auto-rows-fr">
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-1.5">
          <div className="grid md:grid-cols-2 gap-2 auto-rows-fr">
            {features.slice(3).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;