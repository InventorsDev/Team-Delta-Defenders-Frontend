'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


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
        {/* Header */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Trusted by Farmers and Buyers Across Nigeria
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 bg-green-500 rounded-full"></div>
        </div>

        {/* Images and Content Layout */}
        <div 
          className="relative w-full max-w-7xl mt-12 flex flex-col items-center"
        >
          {/* All testimonial images cluster - non-overlapping grid arrangement */}
          <div className="hidden md:block relative w-full h-[500px] flex justify-center items-center">
            {testimonials.map((testimonial, index) => {
              // Create a non-overlapping circular arrangement
              const radius = 200;
              const angleStep = (2 * Math.PI) / testimonials.length;
              const angle = index * angleStep;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div 
                  key={index}
                  className={`absolute overflow-hidden border-2 transition-all duration-500 cursor-pointer ${
                    index === currentTestimonialIndex 
                      ? 'border-green-500 border-4 z-20 shadow-xl scale-110' 
                      : 'border-green-300 hover:border-green-400 z-10 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    width: '100px',
                    height: '120px',
                    borderRadius: '16px',
                    transform: `translate(${x}px, ${y}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-50px',
                    marginTop: '-60px'
                  }}
                  onClick={() => setCurrentTestimonialIndex(index)}
                >
                  <img 
                    src={testimonial.imageSrc} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              );
            })}
          </div>
          
          {/* Mobile: Simple horizontal scroll */}
          <div className="md:hidden w-full overflow-x-auto pb-4">
            <div className="flex gap-4 px-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    index === currentTestimonialIndex 
                      ? 'border-green-500 border-4 shadow-xl scale-105' 
                      : 'border-green-300 hover:border-green-400 opacity-80'
                  }`}
                  style={{
                    width: '80px',
                    height: '100px',
                    borderRadius: '12px'
                  }}
                  onClick={() => setCurrentTestimonialIndex(index)}
                >
                  <img 
                    src={testimonial.imageSrc} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main testimonial content */}
          <div className="mt-8 md:mt-0 max-w-2xl mx-auto z-10 flex flex-col items-center">
            {/* Testimonial person image */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-500 mb-6">
              <img 
                src={currentTestimonial.imageSrc} 
                alt={currentTestimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-lg font-semibold text-gray-700 italic text-center">
              "{currentTestimonial.quote}"
            </p>
            <div className="mt-4 text-center">
              <h4 className="text-base font-bold text-gray-900">{currentTestimonial.name}</h4>
              <p className="text-sm text-gray-500">{currentTestimonial.location}</p>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-xl"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex ? 'bg-green-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-xl"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
