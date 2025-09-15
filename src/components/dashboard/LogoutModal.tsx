import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[699px] h-[613px] relative bg-brand-colors-SteamWhite overflow-hidden rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[531px] left-[84px] top-1/2 -translate-y-1/2 absolute flex flex-col justify-start items-center gap-[30px]">
          <div className="self-stretch flex flex-col justify-start items-center gap-3">
            <div className="w-[208px] h-[200px]">
              <img
                style={{width: '100%', height: '100%'}}
                src="/logout-popup.png"
                alt="Logout confirmation"
              />
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-6">
              <div className="text-center text-brand-colors-RootBlack text-[32px] font-['MadaniArabic-Bold'] leading-[50px]">
                Are you sure you want to logout?
              </div>
              <div className="self-stretch text-center text-brand-colors-rootgrey text-xl font-['MadaniArabic-Medium'] leading-[37px]">
                You'll need to sign in again to access your dashboard and listings
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-4">
            <button
              onClick={onClose}
              className="h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] flex justify-center items-center gap-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="text-brand-colors-RootBlack text-base font-['MadaniArabic-Bold']">
                Cancel
              </div>
            </button>
            <button
              onClick={onConfirm}
              className="h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 border-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="text-brand-colors-SteamWhite text-base font-['MadaniArabic-Bold']">
                Yes, Logout
              </div>
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-[50px] h-[50px] left-[620px] top-[30px] absolute bg-brand-colors-SteamWhite shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] rounded-full flex justify-center items-center gap-2.5 border-none cursor-pointer hover:bg-gray-50 transition-colors"
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

export default LogoutModal;