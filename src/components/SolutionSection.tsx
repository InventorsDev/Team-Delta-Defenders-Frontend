import { Check, Smartphone, Users, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionSection = () => {
  const features = [
    {
      number: "1",
      text: "List your produce easily"
    },
    {
      number: "2",
      text: "Get paid fairly, no middleman wahala"
    },
    {
      number: "3",
      text: "Browse fresh produce across Nigeria"
    },
    {
      number: "4",
      text: "Negotiate and buy,  just how you ike it."
    }
  ];

  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div>
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                <span className="text-primary">Agrilink</span> - The Direct<br />
                Connection You Have Been<br />
                Waiting For
              </h2>
              

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {feature.number}
                    </div>
                    <p className="text-foreground font-medium pt-3">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>

              <p 
                className="mt-8"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: '20px',
                  lineHeight: '36px',
                  letterSpacing: '0%'
                }}
              >
                "No middlemen. No stories. Just direct connection and better deals" sign up now
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
                >
                  Farmers Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-black border-primary hover:bg-primary hover:text-white text-lg px-8 py-3"
                >
                  Buyers Sign Up
                </Button>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div>
            <div className="relative">
              <img 
                src="/solution-image.png"
                alt="Person using agrilink mobile app"
                className="shadow-lg object-cover"
                style={{
                  width: '587px',
                  height: '730px',
                  borderRadius: '40px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;