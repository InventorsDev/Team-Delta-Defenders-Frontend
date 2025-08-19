'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import { useIsMobile } from '@/hooks/use-mobile';


import image1 from '/image1.png';
import image2 from '/image2.png';
import image3 from '/image3.png';
import image4 from '/image4.png';
import image5 from '/image5.png';


const testimonials = [
  {
    quote: "Since I joined AgriLink, I no dey struggle to find buyers for my tomatoes. I just list my tomatoes, and people dey message me sharp sharp.",
    imageSrc: image1,
    name: "Tunde, Restaurant Owner",
    location: "Enugu",
  },
  {
    quote: "AgriLink made it so easy for me to find fresh produce directly from the source. The quality is top-notch and the prices are fair. Highly recommended!",
    imageSrc: image2,
    name: "Chinelo, Tomato Farmer",
    location: "Lagos",
  },
  {
    quote: "This platform has revolutionized how I sell my yams. I can now reach a wider market and get better prices without a middleman.",
    imageSrc: image3,
    name: "Luke, Yam Farmer",
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
];

const TestimonialsSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1100) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => {
      const maxIndex = testimonials.length - cardsToShow;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => {
      const maxIndex = testimonials.length - cardsToShow;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };
  
  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Main Layout Container */}
      <div 
        className="flex flex-col items-center text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8"
      >
        {/* Header with Navigation */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left">
              <div className="w-16 sm:w-20 md:w-24 h-2 mb-2 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Trusted by Farmers and Buyers <br className="hidden sm:block" /> Across Nigeria
              </h2>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex self-end sm:self-auto" style={{ gap: '10px' }}>
              <button 
                onClick={prevTestimonial}
                className="flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '40px',
                  opacity: 1,
                  background: 'var(--brand-colors-SproutGreen, rgba(132, 198, 44, 1))',
                  padding: '0',
                  transform: 'rotate(0deg)'
                }}
                aria-label="Previous testimonial"
              >
                <img 
                  src="/chevron-left.svg" 
                  alt="Previous" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl"
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '40px',
                  opacity: 1,
                  background: 'var(--brand-colors-SproutGreen, rgba(132, 198, 44, 1))',
                  padding: '0',
                  transform: 'rotate(0deg)'
                }}
                aria-label="Next testimonial"
              >
                <img 
                  src="/chevron-right.svg" 
                  alt="Next" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Carousel */}
        <div className="relative w-full max-w-6xl mt-8 sm:mt-12">
          
          {/* Testimonial Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentTestimonialIndex * (320 + 24)}px)` 
              }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  imageSrc={testimonial.imageSrc}
                  name={testimonial.name}
                  location={testimonial.location}
                />
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
