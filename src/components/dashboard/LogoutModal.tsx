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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-brand-colors-SteamWhite rounded-[20px] w-full max-w-[699px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center min-h-[500px] p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-[531px] flex flex-col justify-start items-center gap-6 sm:gap-8">
            <div className="w-full flex flex-col justify-start items-center gap-3 sm:gap-4">
              <img
                className="w-[150px] h-[144px] sm:w-[180px] sm:h-[173px] lg:w-[208px] lg:h-[200px]"
                src="/logout-popup.webp"
                alt="Logout confirmation"
              />
              <div className="w-full flex flex-col justify-start items-center gap-4 sm:gap-6">
                <div className="text-center text-brand-colors-RootBlack font-madani-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight sm:leading-[50px]">
                  Are you sure you want to logout?
                </div>
                <div className="w-full text-center text-brand-colors-rootgrey font-madani-medium text-base sm:text-lg lg:text-[20px] leading-normal sm:leading-[37px] px-2">
                  You'll need to sign in again to access your dashboard and listings
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
              <button
                onClick={onClose}
                className="h-[50px] sm:h-[60px] w-full sm:min-w-[180px] lg:min-w-[200px] px-4 sm:px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-HarvestMist/80 transition-colors"
              >
                <div className="text-brand-colors-RootBlack text-sm sm:text-base font-madani-bold">
                  Cancel
                </div>
              </button>
              <button
                onClick={onConfirm}
                className="h-[50px] sm:h-[60px] w-full sm:min-w-[180px] lg:min-w-[200px] px-4 sm:px-6 py-3 bg-brand-colors-SproutGreen rounded-[30px] flex justify-center items-center gap-2.5 hover:bg-brand-colors-SproutGreen/90 transition-colors"
              >
                <div className="text-brand-colors-SteamWhite text-sm sm:text-base font-madani-bold">
                  Yes, Logout
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] absolute top-3 right-3 sm:top-4 sm:right-4 bg-brand-colors-SteamWhite rounded-full flex justify-center items-center gap-2.5 hover:shadow-lg transition-shadow"
          style={{
            boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)'
          }}
        >
          <img
            src="/close icon.svg"
            alt="Close"
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ filter: 'invert(36%) sepia(69%) saturate(2083%) hue-rotate(338deg) brightness(97%) contrast(106%)' }}
          />
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;