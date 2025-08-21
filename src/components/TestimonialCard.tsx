import React from 'react';

interface TestimonialCardProps {
  quote: string;
  imageSrc: string;
  name: string;
  location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  imageSrc,
  name,
  location,
}) => {
  return (
    <div 
      className="flex-shrink-0 bg-white overflow-hidden shadow-lg border border-green-200 relative"
      style={{
        width: '320px',
        height: '480px',
        borderRadius: '20px',
        opacity: 1,
        transform: 'rotate(0deg)'
      }}
    >
      {/* Full Card Image with Gradient Overlay */}
      <div className="w-full h-full relative">
        <img 
          src={imageSrc}
          alt={`${name} testimonial`}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(132, 198, 44, 0.8) 100%)'
          }}
        ></div>
        
        {/* Text Content Overlaid on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="text-white text-base font-medium italic mb-4 line-clamp-4 overflow-hidden">
            "{quote}"
          </p>
          <div className="text-white">
            <h4 className="font-bold text-white text-base">{name}</h4>
            <p className="text-sm text-white/90">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;