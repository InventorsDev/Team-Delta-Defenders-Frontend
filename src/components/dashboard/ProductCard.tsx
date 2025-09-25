import React from 'react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/formatters';

export interface ProductData {
  id: number;
  image: string;
  title: string;
  price: string;
  priceUnit: string;
  description?: string;
  location: string;
  alt: string;
  isFavorite?: boolean;
  trend?: string;
  trendPercentage?: string;
}

interface ProductCardProps {
  product: ProductData | Product;
  variant?: 'mobile-grid' | 'mobile-horizontal' | 'desktop' | 'feature';
  showDeleteButton?: boolean;
  onDeleteClick?: (id: string | number) => void;
  onCardClick?: (product: ProductData | Product) => void;
  className?: string;
}

function isProduct(product: ProductData | Product): product is Product {
  return typeof (product as Product).price === 'number';
}

function getProductDisplay(product: ProductData | Product) {
  if (isProduct(product)) {
    return {
      id: product.id,
      title: product.name,
      price: formatCurrency(product.price),
      priceUnit: `per ${product.unit}`,
      description: product.description,
      location: product.location,
      image: product.images[0] || '/placeholder-image.png',
      alt: product.name
    };
  }
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    priceUnit: product.priceUnit,
    description: product.description,
    location: product.location,
    image: product.image,
    alt: product.alt
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'mobile-grid',
  showDeleteButton = false,
  onDeleteClick,
  onCardClick,
  className = ''
}) => {
  const displayProduct = getProductDisplay(product);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick?.(displayProduct.id);
  };

  const handleCardClick = () => {
    onCardClick?.(product);
  };

  // Mobile Grid Variant
  if (variant === 'mobile-grid') {
    return (
      <div
        className={`bg-white shadow-lg rounded-2xl overflow-hidden relative cursor-pointer hover:shadow-xl transition-shadow ${className}`}
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            className="w-full h-32 object-cover"
            src={displayProduct.image}
            alt={displayProduct.alt}
          />
          {showDeleteButton && (
            <button
              className="absolute top-2 right-2 p-2 bg-white shadow-lg rounded-full hover:opacity-90 transition-opacity"
              onClick={handleDeleteClick}
            >
              <img
                src="/delete icon.svg"
                alt="Delete"
                className="w-4 h-4"
                style={{
                  filter: 'invert(23%) sepia(89%) saturate(7495%) hue-rotate(4deg) brightness(101%) contrast(107%)'
                }}
              />
            </button>
          )}
        </div>
        <div className="p-3">
          <div
            className="text-sm font-medium text-brand-colors-rootgrey mb-1 truncate"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
            title={displayProduct.title}
          >
            {displayProduct.title}
          </div>
          <div className="flex items-end gap-1 mb-2">
            <div
              className="text-base font-medium text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {displayProduct.price}
            </div>
            <div
              className="text-xs font-light text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Light' }}
            >
              {displayProduct.priceUnit}
            </div>
          </div>
          {displayProduct.description && (
            <div
              className="text-xs font-light text-brand-colors-RootBlack leading-tight mb-2"
              style={{
                fontFamily: 'MadaniArabic-Light',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
              title={displayProduct.description}
            >
              {displayProduct.description}
            </div>
          )}
          <div className="flex items-center gap-1">
            <img
              src="/location-icon.svg"
              alt="Location"
              className="w-4 h-4"
            />
            <div
              className="text-xs font-light text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Light' }}
            >
              {displayProduct.location}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Horizontal Scroll Variant
  if (variant === 'mobile-horizontal') {
    return (
      <div
        className={`flex-shrink-0 w-44 h-72 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow ${className}`}
        onClick={handleCardClick}
      >
        <div className="w-40 h-36 m-2 overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={displayProduct.image}
            alt={displayProduct.alt}
          />
        </div>
        <div
          className="px-2 mt-4 text-base font-medium text-brand-colors-rootgrey truncate"
          style={{ fontFamily: 'MadaniArabic-Medium' }}
          title={displayProduct.title}
        >
          {displayProduct.title}
        </div>
        <div className="px-2 mt-2 flex items-end gap-1">
          <div
            className="text-lg font-medium text-brand-colors-RootBlack"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            {displayProduct.price}
          </div>
          <div
            className="text-xs font-light text-brand-colors-RootBlack"
            style={{ fontFamily: 'MadaniArabic-Light' }}
          >
            {displayProduct.priceUnit}
          </div>
        </div>
        <div className="px-2 mt-2 flex items-center gap-1">
          <img
            src="/location-icon.svg"
            alt="Location"
            className="w-4 h-4"
          />
          <div
            className="text-xs font-light text-brand-colors-RootBlack"
            style={{ fontFamily: 'MadaniArabic-Light' }}
          >
            {displayProduct.location}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Variant
  if (variant === 'desktop') {
    return (
      <div
        className={`w-56 h-80 relative bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${className}`}
        onClick={handleCardClick}
      >
        <div className="w-48 h-36 left-[10px] top-[10px] absolute rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
          <img
            className="w-48 h-36 rounded-[10px] object-cover"
            src={displayProduct.image}
            alt={displayProduct.alt}
          />
        </div>
        <div
          className="w-48 left-[10px] top-[170px] absolute justify-start text-brand-colors-rootgrey text-base font-normal truncate"
          style={{ fontFamily: 'MadaniArabic-Medium' }}
          title={displayProduct.title}
        >
          {displayProduct.title}
        </div>
        <div className="left-[10px] top-[202px] absolute inline-flex justify-start items-baseline gap-1">
          <div
            className="justify-start text-brand-colors-RootBlack text-xl font-normal leading-9"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          >
            {displayProduct.price}
          </div>
          <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">
            {displayProduct.priceUnit}
          </div>
        </div>
        {displayProduct.description && (
          <div
            className="w-48 left-[10px] top-[237px] absolute text-xs font-light text-brand-colors-rootgrey leading-tight"
            style={{
              fontFamily: 'MadaniArabic-Light',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            title={displayProduct.description}
          >
            {displayProduct.description}
          </div>
        )}
        <div className="left-[10px] top-[275px] absolute inline-flex justify-start items-center gap-1">
          <img
            src="/location-icon.svg"
            alt="Location"
            className="w-6 h-6"
          />
          <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-light">
            {displayProduct.location}
          </div>
        </div>
      </div>
    );
  }

  // Feature Variant (for trending products)
  if (variant === 'feature') {
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow ${className}`}
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={displayProduct.image}
            alt={displayProduct.alt}
          />
          {(product as ProductData).trend && (
            <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {(product as ProductData).trend}
            </div>
          )}
        </div>
        <div className="p-4">
          <div
            className="text-lg font-medium text-brand-colors-RootBlack mb-2 truncate"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
            title={displayProduct.title}
          >
            {displayProduct.title}
          </div>
          <div className="flex items-end gap-1 mb-2">
            <div
              className="text-xl font-medium text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {displayProduct.price}
            </div>
            <div
              className="text-sm font-light text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Light' }}
            >
              {displayProduct.priceUnit}
            </div>
          </div>
          {displayProduct.description && (
            <div
              className="text-sm font-light text-brand-colors-RootBlack leading-tight mb-3"
              style={{
                fontFamily: 'MadaniArabic-Light',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
              title={displayProduct.description}
            >
              {displayProduct.description}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img
                src="/location-icon.svg"
                alt="Location"
                className="w-4 h-4"
              />
              <div
                className="text-sm font-light text-brand-colors-RootBlack"
                style={{ fontFamily: 'MadaniArabic-Light' }}
              >
                {displayProduct.location}
              </div>
            </div>
            {(product as ProductData).trendPercentage && (
              <div className="text-green-600 text-sm font-medium">
                {(product as ProductData).trendPercentage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductCard;