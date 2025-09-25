import React from 'react';

interface DeleteListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

const DeleteListingModal: React.FC<DeleteListingModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName = 'this product'
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[699px] h-[613px] relative bg-white overflow-hidden rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[531px] left-4 sm:left-[84px] top-[100px] absolute flex flex-col justify-start items-center gap-[25px]">
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <div className="w-[200px] h-[200px]">
              <img 
                style={{width: '100%', height: '100%'}}
                src="/delete-popup.png"
                alt="Delete confirmation"
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-5">
              <div className="text-center text-brand-colors-RootBlack text-[26px] font-['MadaniArabic-Bold'] leading-[40px]">
                Delete {productName}?
              </div>
              <div className="self-stretch text-center text-brand-colors-rootgrey text-lg font-['MadaniArabic-Medium'] leading-[30px] px-4">
                Once deleted, this product will be removed from your listings and buyers will no longer see it. This action cannot be undone.
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4 mt-4">
            <button 
              onClick={onClose}
              className="h-[60px] min-w-0 sm:min-w-[200px] px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] flex justify-center items-center gap-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="text-brand-colors-RootBlack text-base font-['MadaniArabic-Bold']">
                Cancel
              </div>
            </button>
            <button 
              onClick={onConfirm}
              className="h-[60px] min-w-0 sm:min-w-[200px] px-6 py-3 bg-brand-colors-pepper-red rounded-[30px] flex justify-center items-center gap-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="text-white text-base font-['MadaniArabic-Bold']">
                Yes, Delete
              </div>
            </button>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-[50px] h-[50px] left-[620px] top-[30px] absolute bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] rounded-full flex justify-center items-center gap-2.5 border-none cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img 
            src="/close icon.svg" 
            alt="Close" 
            className="w-6 h-6"
            style={{ filter: 'invert(36%) sepia(69%) saturate(2083%) hue-rotate(338deg) brightness(97%) contrast(106%)' }}
          />
        </button>
      </div>
    </div>
  );
};

export default DeleteListingModal;