'use client';

import React, { useState } from 'react';
// The image import is no longer needed since we are referencing the public folder directly.

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-green-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <h4 className="text-lg font-semibold text-gray-800">
          {question}
        </h4>
        <span className={`text-green-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="mt-2 text-base text-gray-600 pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Is AgriLink NG free to use?",
      answer: "Yes! Creating an account and connecting with farmers or buyers is completely free. We don't charge any hidden fees, you deal direct.",
    },
    {
      question: "How do I know the person I'm chatting with is real?",
      answer: "We employ a verification process for all users to ensure a trustworthy community. Always use the in-app chat to communicate and arrange meetings in public places.",
    },
    {
      question: "How does payment work?",
      answer: "AgriLink NG facilitates the connection between farmers and buyers. All payment transactions are handled directly between the parties, ensuring full control over your deal.",
    },
    {
      question: "Can I use AgriLink on my phone?",
      answer: "Yes, our website is fully mobile-responsive, allowing you to access all features on your smartphone or tablet for a seamless experience on the go.",
    },
    {
      question: "What if I have a problem with a deal?",
      answer: "While we don't manage transactions directly, our support team is available to mediate and offer guidance on resolving disputes. You can contact us through the 'Help' section of the website.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Heading and Image */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-20 h-1 bg-green-500 rounded-full mb-4"></div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Got Questions? We've Got <br></br>Answers.
          </h2>
          <div className="relative w-full max-w-lg mt-8 hidden lg:block">
            {/* The img src is updated to point to the public directory */}
            <img
              src="/FAQ.png"
              alt="A large question mark illustration"
              className="rounded-40px shadow-lg w-[535px] h-[662px]"
            />
          </div>
        </div>

        {/* Right Column: FAQ List */}
        <div className="mt-8 lg:mt-0">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
