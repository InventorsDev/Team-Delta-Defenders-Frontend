import React, { useState } from 'react';
import '@/styles/fonts.css';
import ProductCard, { ProductData } from './ProductCard';
import { mockListings } from '@/data/mockProducts';
import DeleteProductModal from './DeleteProductModal';

interface MobileListingsProps {
  favoriteProducts: number[];
  onDeleteClick: (productId: number) => void;
  onProductClick: (product: ProductData) => void;
  onAddClick?: () => void;
}

const MobileListings: React.FC<MobileListingsProps> = ({
  favoriteProducts,
  onDeleteClick,
  onProductClick,
  onAddClick
}) => {
  const [deleteModalProduct, setDeleteModalProduct] = useState<ProductData | null>(null);

  const handleDeleteClick = (productId: number) => {
    const product = mockListings.find(p => p.id === productId);
    if (product) {
      setDeleteModalProduct(product);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModalProduct) {
      onDeleteClick(deleteModalProduct.id);
      setDeleteModalProduct(null);
    }
  };

  const handleCloseModal = () => {
    setDeleteModalProduct(null);
  };
  return (
    <div className="w-full min-h-screen bg-white p-4 pb-24 overflow-auto">
      {/* Header Section */}
      <div className="mb-6 pt-8">
        <div className="text-sm font-medium text-brand-colors-RootBlack mb-1 font-madani-medium">
          manage all your produce
        </div>
        <div className="text-xl font-bold text-brand-colors-RootBlack font-madani-bold">
          My Listings
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full px-4 py-3 mb-4 bg-black bg-opacity-5 rounded-full border border-black border-opacity-5 flex items-center gap-3">
        <img src="/search icon.svg" alt="Search" className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent border-none outline-none text-base font-medium text-brand-colors-rootgrey font-madani-medium"
        />
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto mb-6 pb-2">
        <button className="px-6 py-3 bg-brand-colors-HarvestMist rounded-2xl flex-shrink-0">
          <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
            popularity
          </div>
        </button>
        <button className="px-6 py-3 bg-white rounded-2xl shadow-lg flex-shrink-0">
          <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
            latest listing
          </div>
        </button>
        <button className="px-6 py-3 bg-white rounded-2xl shadow-lg flex-shrink-0">
          <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
            lowest price
          </div>
        </button>
        <button className="px-6 py-3 bg-white rounded-2xl shadow-lg flex-shrink-0">
          <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
            highest price
          </div>
        </button>
        <button className="px-6 py-3 bg-white rounded-2xl shadow-lg flex-shrink-0">
          <div className="text-base font-medium text-brand-colors-RootBlack font-madani-medium">
            rating
          </div>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mockListings.slice(0, 6).map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              isFavorite: favoriteProducts.includes(product.id)
            }}
            variant="mobile-grid"
            showDeleteButton={true}
            onDeleteClick={handleDeleteClick}
            onCardClick={onProductClick}
          />
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={onAddClick}
        className="fixed bottom-20 right-4 w-14 h-14 bg-brand-colors-SproutGreen shadow-xl rounded-full flex items-center justify-center z-50 hover:bg-brand-colors-SproutGreen/90 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Delete Modal */}
      <DeleteProductModal
        isOpen={!!deleteModalProduct}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        productName={deleteModalProduct?.title}
      />
    </div>
  );
};

export default MobileListings;