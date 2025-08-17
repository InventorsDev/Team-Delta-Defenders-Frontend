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
            <p className="text-gray-700 text-center mb-6 text-sm uppercase tracking-wide">
              In Collaboration With
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: "Partner 1", logo: "🌱" },
                { name: "Partner 2", logo: "🚜" },
                { name: "Partner 3", logo: "🌾" },
                { name: "Partner 4", logo: "🥕" },
              ].map((partner, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center w-16 h-16 bg-white/60 rounded-lg text-2xl shadow-sm"
                >
                  {partner.logo}
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
