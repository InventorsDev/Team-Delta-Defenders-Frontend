const ProblemSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1 flex justify-center">
            <img 
              src="/problem-image.png" 
              alt="Problem illustration" 
              className="shadow-lg object-cover"
              style={{
                width: '586px',
                height: '730px',
                borderRadius: '40px',
                opacity: 1,
                transform: 'rotate(0deg)'
              }}
            />
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <div className="max-w-xl">
              <div className="flex items-center mb-2">
                <span className="w-20 h-2 bg-primary rounded-full mr-3"></span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                The Problem? Too Many Hands,<br />Too Much Wahala
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4">
                    1
                  </span>
                  <span className="text-lg text-muted-foreground">
                    Farmers struggle to find genuine buyers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-4">
                    2
                  </span>
                  <span className="text-lg text-muted-foreground">
                    Buyers pay more because middlemen chop their share.
                  </span>
                </li>
              </ul>
              <div className="mt-8 italic text-muted-foreground text-base">
                “Too much stress to buy and sell product the smart way”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;