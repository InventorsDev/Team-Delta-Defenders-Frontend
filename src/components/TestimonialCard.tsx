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
    <div className="flex-shrink-0 w-80 lg:w-96 bg-white rounded-3xl overflow-hidden shadow-lg border border-green-200 flex flex-col h-96">
      {/* Image Section */}
      <div className="h-48 w-full flex-shrink-0">
        <img 
          src={imageSrc}
          alt={`${name} testimonial`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Text Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-gray-700 text-base font-medium italic mb-4 line-clamp-4 overflow-hidden">
          "{quote}"
        </p>
        <div className="text-gray-800">
          <h4 className="font-bold text-primary">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;