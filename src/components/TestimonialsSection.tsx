'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';


import image1 from '/image1.png';
import image2 from '/image2.png';
import image3 from '/image3.png';
import image4 from '/image4.png';
import image5 from '/image5.png';
import image6 from '/image6.png';
import image7 from '/image7.png';
import image8 from '/image8.png';
import image9 from '/image9.png';
import image10 from '/image10.png';
import image11 from '/image11.png';


const testimonials = [
  {
    quote: "Since I joined AgriLink, I no dey struggle to find buyers for my tomatoes. I just list my tomatoes, and people dey message me sharp sharp.",
    imageSrc: image1,
    name: "Chinelo, Tomato Farmer",
    location: "Enugu",
  },
  {
    quote: "AgriLink made it so easy for me to find fresh produce directly from the source. The quality is top-notch and the prices are fair. Highly recommended!",
    imageSrc: image2,
    name: "Tunde, Restaurant Owner",
    location: "Lagos",
  },
  {
    quote: "This platform has revolutionized how I sell my yams. I can now reach a wider market and get better prices without a middleman.",
    imageSrc: image3,
    name: "Aisha, Yam Farmer",
    location: "Oyo",
  },
  {
    quote: "AgriLink connect me with serious buyers. My cassava business don improve well well. No time for wahala with middlemen again!",
    imageSrc: image4,
    name: "Ibrahim, Cassava Farmer",
    location: "Kano",
  },
  {
    quote: "As a hotel owner, finding fresh vegetables was always a challenge. AgriLink made it so simple - direct contact with farmers, fair prices!",
    imageSrc: image5,
    name: "Grace, Hotel Owner",
    location: "Abuja",
  },
  {
    quote: "My pepper business don blow since I join this platform. Buyers dey come directly, and I dey sell everything fast fast.",
    imageSrc: image6,
    name: "Emeka, Pepper Farmer",
    location: "Anambra",
  },
  {
    quote: "This app changed my farming game completely. I now have steady buyers for my plantains and the payments are prompt.",
    imageSrc: image7,
    name: "Folake, Plantain Farmer",
    location: "Osun",
  },
  {
    quote: "AgriLink has been a blessing to my catering business. I get fresh ingredients directly from farmers at great prices.",
    imageSrc: image8,
    name: "Samuel, Caterer",
    location: "Rivers",
  },
  {
    quote: "Before AgriLink, selling my maize was stressful. Now I have multiple buyers contacting me directly. Very convenient!",
    imageSrc: image9,
    name: "Fatima, Maize Farmer",
    location: "Kaduna",
  },
  {
    quote: "My supermarket now gets the freshest produce directly from farms. Customers are happy and my profit margins improved.",
    imageSrc: image10,
    name: "David, Supermarket Owner",
    location: "Ogun",
  },
  {
    quote: "This platform don help my okra farming business. I dey get orders even before harvest. God bless AgriLink!",
    imageSrc: image11,
    name: "Mary, Okra Farmer",
    location: "Cross River",
  },
];

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Main Layout Container */}
      <div 
        className="flex flex-col items-center text-center py-16 px-4"
      >
        {/* Header with Navigation */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="w-24 h-2 mb-2 bg-green-500 rounded-full"></div>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                Trusted by Farmers and Buyers <br></br> Across Nigeria
              </h2>
            </div>
            
            {/* Navigation buttons aligned with 'Across Nigeria' text */}
            <div className="flex" style={{ gap: '10px', alignSelf: 'flex-end' }}>
              <button 
                onClick={prevTestimonial}
                className="flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '40px',
                  opacity: 1,
                  background: 'var(--brand-colors-SproutGreen, rgba(132, 198, 44, 1))'
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '40px',
                  opacity: 1,
                  background: 'var(--brand-colors-SproutGreen, rgba(132, 198, 44, 1))'
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Carousel */}
        <div className="relative w-full max-w-6xl mt-12">
          
          {/* Testimonial Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${Math.min(currentTestimonialIndex, testimonials.length - 3) * 33.33}%)` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-1/3 flex-shrink-0">
                  <TestimonialCard
                    quote={testimonial.quote}
                    imageSrc={testimonial.imageSrc}
                    name={testimonial.name}
                    location={testimonial.location}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonialIndex ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
