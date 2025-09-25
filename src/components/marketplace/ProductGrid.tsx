import React from 'react';
import '@/styles/fonts.css';
import { Product } from '@/data/marketplaceProducts';

interface ProductGridProps {
  products: Product[];
  isSearchActive: boolean;
  searchTerm: string;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isSearchActive,
  searchTerm,
  onProductClick
}) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-root-black font-madani-bold">
          {isSearchActive ? `Search Results for "${searchTerm}" (${products.length})` : 'Hot in the Market'}
        </div>
        {isSearchActive && (
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:border-transparent">
            <option>Sort by: Latest Listing</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Popularity</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 w-full">
        {products.map((product, index) => (
          <button
            key={index}
            data-property-1="buyers card"
            onClick={() => onProductClick(product)}
            className="w-full aspect-[217/340] relative bg-white rounded-xl lg:rounded-2xl overflow-hidden border-none p-0 cursor-pointer transition-all duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg btn-shadow-lg"
            style={{maxWidth: '280px', margin: '0 auto'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0px 8px 40px 8px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 4px 30px 5px rgba(0, 0, 0, 0.08)';
            }}
          >
            <div className="absolute top-2 left-2 right-2 h-[41%] overflow-hidden rounded-lg">
              <img className="w-full h-full object-cover rounded-lg" src={product.image} alt={product.name} />
            </div>
            <div className="absolute top-[50%] left-2 right-2 text-sm lg:text-base font-medium leading-tight text-ellipsis overflow-hidden whitespace-nowrap text-root-grey font-madani-medium">
              {product.name}
            </div>
            <div className="absolute top-[59%] left-2 flex items-baseline gap-1">
              <div className="text-base lg:text-lg font-medium leading-tight text-root-black font-madani-medium">{product.price}</div>
              <div className="text-xs font-light text-root-black font-madani-light">Per Unit</div>
            </div>
            <div className="absolute bottom-6 left-2 flex items-center gap-1 max-w-[60%]">
              <div className="flex items-center">
                <img
                  src="/location-icon.svg"
                  alt="Location"
                  className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0"
                />
              </div>
              <div className="text-xs font-light leading-tight overflow-hidden text-ellipsis whitespace-nowrap text-root-black font-madani-light">
                {product.location}
              </div>
            </div>
            <div className="absolute top-[69.5%] left-2 right-2 h-[15%] overflow-hidden text-xs leading-tight font-light text-root-black font-madani-light" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
              {product.description}
            </div>
            <div className="absolute bottom-6 right-2 flex items-center gap-1">
              <div className="text-sm lg:text-base font-medium text-root-black font-madani-medium">{product.rating}</div>
              <div className="flex items-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;