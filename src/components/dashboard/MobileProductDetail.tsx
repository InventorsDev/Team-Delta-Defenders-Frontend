import React, { useState } from 'react';
import { ProductData } from './ProductCard';
import DeleteProductModal from './DeleteProductModal';

interface MobileProductDetailProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: ProductData) => void;
  onDelete?: (productId: number) => void;
}

const MobileProductDetail: React.FC<MobileProductDetailProps> = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get images array, fallback to single image if needed
  const productImages = (product as any)?.images || [(product as any)?.image || product.image];
  const currentImage = productImages[currentImageIndex] || product.image;

  if (!product || !isOpen) return null;

  const handleEdit = () => {
    onEdit?.(product);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(product.id);
    setShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-auto">
      {/* Header with back button */}
      <div className="w-full h-20 px-5 py-4 bg-white/80 shadow-lg flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={onClose}
          className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <img
            src="/chevron-left-2.svg"
            alt="Back"
            className="w-6 h-6"
          />
        </button>
        <div className="text-xl font-madani-bold text-brand-colors-RootBlack">
          Product Details
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-4 pb-24">
        {/* Main Product Image */}
        <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={currentImage}
            alt={product.title || (product as any).name}
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex justify-start items-center gap-2 mb-6 overflow-x-auto">
          {productImages.map((image: string, index: number) => (
            <img
              key={index}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover cursor-pointer flex-shrink-0 ${
                currentImageIndex === index
                  ? 'border-3 border-brand-colors-SproutGreen'
                  : 'border border-gray-200'
              }`}
              src={image}
              alt={`${product.title || (product as any).name} thumbnail ${index + 1}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Product Details Content */}
        <div className="flex flex-col gap-6">
          {/* Product Title */}
          <div className="text-xl font-madani-bold text-brand-colors-RootBlack">
            {product.title || (product as any).name}
          </div>

          {/* Price */}
          <div className="flex items-end gap-1">
            <div className="text-2xl font-madani-bold text-brand-colors-RootBlack">
              {product.price}
            </div>
            <div className="text-sm font-madani-medium text-brand-colors-RootBlack">
              {product.priceUnit}
            </div>
          </div>

          {/* Average Market Price */}
          <div className="w-fit px-4 py-2 bg-brand-colors-HarvestMist rounded-full">
            <div className="text-sm font-madani-medium text-brand-colors-RootBlack">
              Average market price ₦36,000
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <img
              src="/location-icon.svg"
              alt="Location"
              className="w-6 h-6"
            />
            <div className="text-sm font-madani-medium text-brand-colors-RootBlack">
              {product.location}
            </div>
          </div>

          {/* Farm Address */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-madani-medium text-brand-colors-RootBlack">
              Farm Address:
            </div>
            <div className="text-sm font-madani-medium text-brand-colors-rootgrey">
              Plot 15, Igbogbo Road, {product.location}, Nigeria
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-madani-medium text-brand-colors-RootBlack">
              Description:
            </div>
            <div className="text-sm font-madani-medium text-brand-colors-rootgrey">
              {product.description || 'Fresh, juicy red tomatoes harvested at peak ripeness. Perfect for soups, stews, and sauces. Grown locally without harmful chemicals.'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-4 left-4 right-4 bg-white/20 rounded-full p-2 flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="flex-1 px-6 py-3 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center hover:bg-brand-colors-SproutGreen/90 transition-colors"
          >
            <div className="text-white text-base font-madani-bold">
              Edit
            </div>
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-3 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            <img
              src="/delete icon.svg"
              alt="Delete"
              className="w-6 h-6"
              style={{
                filter: 'invert(23%) sepia(89%) saturate(7495%) hue-rotate(4deg) brightness(101%) contrast(107%)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        productName={product.title}
      />
    </div>
  );
};

export default MobileProductDetail;