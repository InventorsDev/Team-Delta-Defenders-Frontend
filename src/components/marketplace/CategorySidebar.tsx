import React from 'react';
import '@/styles/fonts.css';
import { Category } from '@/data/marketplaceCategories';

interface CategorySidebarProps {
  categories: Category[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:flex sticky top-20 w-full p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl shadow-lg flex-col gap-3 btn-shadow-lg self-start z-40" style={{height: 'fit-content', maxHeight: 'calc(100vh - 5rem)'}}>
        {categories.map((category, index) => (
          <div
            key={index}
            data-property-1="default"
            className="w-full px-4 py-2 lg:py-3 flex items-center gap-3 lg:gap-4 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors bg-white"
          >
            {category.icon.startsWith('/') ? (
              <img className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-md object-cover flex-shrink-0" src={category.icon} alt={category.name} />
            ) : (
              <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-md bg-gray-100 flex items-center justify-center text-xl lg:text-2xl flex-shrink-0">
                {category.icon}
              </div>
            )}
            <div className="text-base lg:text-lg xl:text-xl font-medium leading-tight text-root-black font-madani-medium">
              {category.name}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden w-full">
        {/* Grid container for 3x3 layout */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {categories.slice(0, 6).map((category, index) => (
            <div
              key={index}
              data-property-1="Default"
              className="w-full aspect-[110/132] p-2.5 bg-white rounded-[20px] flex-col justify-start items-center gap-4 flex cursor-pointer"
              style={{
                boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)'
              }}
            >
              {category.icon.startsWith('/') ? (
                <img
                  className="w-[60px] h-[60px] rounded-[5px] object-cover"
                  src={category.icon}
                  alt={category.name}
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-[5px] bg-gray-100 flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
              )}
              <div
                className="flex-1 flex items-center justify-center text-center text-[#182605] font-madani-medium font-normal leading-tight px-1"
                style={{
                  fontSize: category.name === 'Grains' ? '16px' : '14px',
                  wordWrap: 'break-word'
                }}
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>

        {/* Last row with single left-aligned item */}
        {categories.length > 6 && (
          <div className="flex justify-start">
            <div
              data-property-1="Default"
              className="w-[110px] h-[132px] p-2.5 bg-white rounded-[20px] flex-col justify-start items-center gap-4 inline-flex cursor-pointer"
              style={{
                boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)'
              }}
            >
              {categories[6].icon.startsWith('/') ? (
                <img
                  className="w-[60px] h-[60px] rounded-[5px] object-cover"
                  src={categories[6].icon}
                  alt={categories[6].name}
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-[5px] bg-gray-100 flex items-center justify-center text-2xl">
                  {categories[6].icon}
                </div>
              )}
              <div
                className="self-stretch text-center text-[#182605] font-madani-medium font-normal leading-tight"
                style={{
                  fontSize: categories[6].name === 'Grains' ? '16px' : '14px',
                  wordWrap: 'break-word'
                }}
              >
                {categories[6].name}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySidebar;