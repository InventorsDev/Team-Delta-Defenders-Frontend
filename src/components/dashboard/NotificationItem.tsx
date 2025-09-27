import React from 'react';

export interface NotificationData {
  id: string | number;
  avatar: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type?: 'message' | 'alert' | 'reminder' | 'approval' | 'review';
}

interface NotificationItemProps {
  notification: NotificationData;
  variant?: 'mobile' | 'desktop';
  onClick?: (notification: NotificationData) => void;
  onMarkAsRead?: (id: string | number) => void;
  className?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  variant = 'desktop',
  onClick,
  onMarkAsRead,
  className = ''
}) => {
  const handleClick = () => {
    onClick?.(notification);
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id);
    }
  };

  // Mobile Variant
  if (variant === 'mobile') {
    return (
      <div
        className={`w-full px-2.5 py-2.5 bg-white rounded-lg flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
        onClick={handleClick}
      >
        <div className="w-full flex items-start gap-3">
          <div className="w-10 h-10 relative flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={notification.avatar}
              alt="Profile"
            />
            {!notification.isRead && (
              <div className="w-5 h-5 absolute left-6 top-5 bg-brand-colors-SproutGreen rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-3 min-w-0">
            <div
              className="text-base font-medium text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {notification.title}
            </div>
            <div
              className="text-xs font-light text-brand-colors-rootgrey leading-relaxed"
              style={{ fontFamily: 'MadaniArabic-Light' }}
            >
              {notification.message}
            </div>
          </div>
        </div>
        <div
          className="text-xs font-light text-brand-colors-RootBlack whitespace-nowrap ml-2 flex-shrink-0"
          style={{ fontFamily: 'MadaniArabic-Light' }}
        >
          {notification.timestamp}
        </div>
      </div>
    );
  }

  // Desktop Variant
  return (
    <div
      className={`w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 relative flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={notification.avatar}
            alt="Profile"
          />
          {!notification.isRead && (
            <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
          <div className="text-brand-colors-RootBlack text-base font-madani-medium">
            {notification.title}
          </div>
          <div className="text-brand-colors-rootgrey text-xs font-madani-light leading-relaxed">
            {notification.message}
          </div>
        </div>
      </div>
      <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">
        {notification.timestamp}
      </div>
    </div>
  );
};

export default NotificationItem;