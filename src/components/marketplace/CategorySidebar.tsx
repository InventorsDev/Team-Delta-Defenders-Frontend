import React from 'react';
import '@/styles/fonts.css';
import { Category } from '@/data/marketplaceCategories';

interface CategorySidebarProps {
  categories: Category[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ categories }) => {
  return (
    <div className="sticky top-20 w-full p-4 lg:p-5 bg-white rounded-xl lg:rounded-2xl shadow-lg flex flex-col gap-3 btn-shadow-lg" style={{height: 'fit-content'}}>
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
  );
};

export default CategorySidebar;