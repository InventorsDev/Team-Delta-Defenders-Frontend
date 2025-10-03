const ProblemSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1 flex justify-center">
            <img
              src="/problem-image.webp"
              alt="Problem illustration"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-lg object-cover rounded-3xl"
              style={{
                aspectRatio: '586/730',
              }}
            />
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <div className="max-w-xl">
              <div className="flex items-center mb-2">
                <span className="w-16 sm:w-20 h-2 bg-primary rounded-full mr-3"></span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                The Problem? Too Many Hands,<br />Too Much Wahala
              </h2>
              <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">
                    1
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    Farmers struggle to find genuine buyers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3 sm:mr-4 text-sm sm:text-base">
                    2
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    Buyers pay more because middlemen chop their share.
                  </span>
                </li>
              </ul>
              <div className="mt-6 sm:mt-8 italic text-muted-foreground text-sm sm:text-base">
                "Too much stress to buy and sell product the smart way"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;