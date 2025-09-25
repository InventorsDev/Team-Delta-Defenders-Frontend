import React from 'react';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md h-auto p-5 relative bg-brand-colors-SteamWhite rounded-[20px] flex flex-col gap-2.5">
        <div className="w-full flex flex-col items-center gap-[30px]">
          <div className="w-full flex flex-col items-center gap-3">
            <img
              className="w-[100px] h-[100px]"
              src="/delete-popup.png"
              alt="Delete Warning"
            />
            <div className="w-full flex flex-col items-center gap-6">
              <div className="text-center text-brand-colors-RootBlack text-xl font-madani-bold">
                Delete this product?
              </div>
              <div className="w-full text-center text-brand-colors-rootgrey text-base font-madani-medium">
                Once deleted, this product will be removed from your listings and buyers will no longer see it. This action cannot be undone.
              </div>
            </div>
          </div>
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
              onClick={onConfirm}
              className="flex-1 h-[44px] px-4 py-3 bg-brand-colors-pepper-red rounded-[30px] flex items-center justify-center hover:bg-brand-colors-pepper-red/90 transition-colors"
            >
              <div className="text-brand-colors-SteamWhite text-sm font-madani-bold">
                Yes, Delete
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeleteProductModal;