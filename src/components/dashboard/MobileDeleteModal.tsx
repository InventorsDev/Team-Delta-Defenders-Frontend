import React from 'react';
import '@/styles/fonts.css';
import { ProductData } from './ProductCard';

interface MobileDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id?: number) => void;
  type: 'account' | 'listing';
  product?: ProductData | null;
}

const MobileDeleteModal: React.FC<MobileDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  product
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'listing' && product) {
      onConfirm(product.id);
    } else {
      onConfirm();
    }
    onClose();
  };

  const getContent = () => {
    if (type === 'listing') {
      return {
        title: 'Delete this product?',
        description: 'This product will be removed from your listings permanently.',
        confirmText: 'Yes, Delete',
        icon: product?.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
        ) : (
          <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )
      };
    } else {
      return {
        title: 'Delete Account?',
        description: 'Are you sure you want to delete your account? This action cannot be undone, and all your listings, chats, and data will be permanently removed.',
        confirmText: 'Yes, Delete',
        icon: (
          <img
            src="/delete-popup.png"
            alt="Delete Account"
            className="w-[100px] h-[100px] object-cover"
          />
        )
      };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-[20px] p-5 relative flex flex-col gap-2.5">

          {/* Content Container */}
          <div className="w-full flex flex-col items-center gap-[30px]">
            <div className="w-full flex flex-col items-center gap-3">
              {/* Icon */}
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                {content.icon}
              </div>

              {/* Text Content */}
              <div className="w-full flex flex-col items-center gap-6">
                <div className="text-center text-brand-colors-RootBlack text-xl font-madani-bold">
                  {content.title}
                </div>
                <div className="w-full text-center text-brand-colors-rootgrey text-base font-madani-medium">
                  {content.description}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-[44px] px-4 py-3 bg-brand-colors-HarvestMist rounded-[30px] flex items-center justify-center hover:bg-brand-colors-HarvestMist/80 transition-colors"
              >
                <div className="text-brand-colors-RootBlack text-sm font-madani-bold">
                  Cancel
                </div>
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 h-[44px] px-4 py-3 bg-brand-colors-pepper-red rounded-[30px] flex items-center justify-center hover:bg-brand-colors-pepper-red/90 transition-colors"
              >
                <div className="text-brand-colors-SteamWhite text-sm font-madani-bold">
                  {content.confirmText}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDeleteModal;