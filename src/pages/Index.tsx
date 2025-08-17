import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="relative">
        <Hero />
        
        {/* Partners Box - part of hero section */}
        <div 
          className="absolute z-20 shadow-lg"
          style={{
            width: 'calc(100% - 198px)',
            height: '168px',
            bottom: '-84px',
            left: '99px',
            right: '99px',
            paddingTop: '40px',
            paddingBottom: '40px',
            gap: '20px',
            borderRadius: '20px',
            opacity: 1,
            transform: 'rotate(0deg)',
            background: 'var(--brand-colors-HarvestMist, rgba(228, 253, 225, 1))'
          }}
        >
          {/* Partners Section */}
          <div className="text-center h-full flex flex-col justify-center">
            <div className="flex items-center justify-center mb-6">
              <span 
                className="bg-primary"
                style={{
                  width: '100px',
                  height: '10px',
                  opacity: 1,
                  transform: 'rotate(0deg)',
                  borderRadius: '20px',
                  marginRight: '20px'
                }}
              ></span>
              <p className="text-gray-700 text-sm uppercase tracking-wide">
                In Collaboration With
              </p>
              <span 
                className="bg-primary"
                style={{
                  width: '100px',
                  height: '10px',
                  opacity: 1,
                  transform: 'rotate(0deg)',
                  borderRadius: '20px',
                  marginLeft: '20px'
                }}
              ></span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {Array.from({ length: 5 }, (_, index) => (
                <div 
                  key={index}
                  className="w-20 h-20 bg-white/60 rounded-lg shadow-sm flex items-center justify-center border-2 border-dashed border-gray-300"
                >
                  <img 
                    src={`/partner-${index + 1}.png`}
                    alt={`Partner ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-gray-400 text-sm hidden">
                    Partner {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '84px' }}>
        <ProblemSection />
      </div>
      <SolutionSection />
      <FeaturesSection />
      <CTASection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
