import React, { useState, useEffect, useRef } from 'react';

interface Notification {
  id: string;
  type: 'message' | 'alert' | 'reminder' | 'approval' | 'review';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

interface NotificationDropdownProps {
  className?: string;
  buttonClassName?: string;
  notifications?: Notification[];
  onMarkAllAsRead?: () => void;
  onOpenNotifications?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Buyer Message',
    message: 'You have a new message from Chinedu — check your chat to respond quickly!',
    timestamp: '5 mins',
    isRead: false,
    avatar: '/dashboard-chat-1.webp'
  },
  {
    id: '2',
    type: 'alert',
    title: 'Price Alert',
    message: 'Maize prices have increased by 8% this week. Consider updating your listing',
    timestamp: '3 hrs',
    isRead: false,
    avatar: '/notif read.svg'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Profile Completion Reminder',
    message: 'Complete your profile to attract more buyers and boost your credibility.',
    timestamp: '6 hrs',
    isRead: false,
    avatar: '/dashboard-chat-3.webp'
  },
  {
    id: '4',
    type: 'message',
    title: 'New Buyer Message',
    message: 'You have a new message from Chinedu — check your chat to respond quickly!',
    timestamp: '16 hrs',
    isRead: false,
    avatar: '/notif read.svg'
  },
  {
    id: '5',
    type: 'approval',
    title: 'Approved Listing',
    message: 'Great news! Your listing for \'Fresh Red Tomatoes\' has been approved and is now live for buyers',
    timestamp: '1 day',
    isRead: true,
    avatar: '/dashboard-chat-5.webp'
  },
  {
    id: '6',
    type: 'review',
    title: 'New Review Received',
    message: 'You\'ve got a new review: \'Excellent quality and fast response!\' Check your profile to read more',
    timestamp: '2 days',
    isRead: true,
    avatar: '/notif read.svg'
  }
];

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  className = '',
  buttonClassName = '',
  notifications = defaultNotifications,
  onMarkAllAsRead,
  onOpenNotifications,
  onNotificationClick
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Handle click outside notification popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
        setIsNotificationMenuOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead?.();
    setIsNotificationMenuOpen(false);
  };

  const handleOpenNotifications = () => {
    onOpenNotifications?.();
    setIsNotificationMenuOpen(false);
    setIsNotificationOpen(false);
  };

  const handleNotificationClick = (notification: Notification) => {
    onNotificationClick?.(notification);
  };

  return (
    <div className={`relative ${className}`} ref={notificationRef}>
      <button
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        className={`w-10 h-10 p-[3px] bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors ${buttonClassName}`}
      >
        <div className="flex justify-start items-center gap-2.5">
          <img className="w-6 h-6" src="/notification-icon.svg" alt="Notifications" />
        </div>
      </button>

      {/* Notifications Popup */}
      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-96 h-[664px] bg-brand-colors-SteamWhite rounded-[20px] shadow-lg z-50 flex flex-col">
          {/* Header - Fixed */}
          <div className="p-5 flex flex-col gap-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="text-brand-colors-RootBlack text-2xl font-normal font-['MadaniArabic-Bold']">Notifications</div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsNotificationMenuOpen(!isNotificationMenuOpen);
                    }}
                    className="w-8 h-8 flex justify-center items-center gap-2.5 hover:bg-gray-100 hover:bg-opacity-80 p-1.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50 active:scale-95"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsNotificationMenuOpen(!isNotificationMenuOpen);
                      }
                    }}
                    aria-label="More notification options"
                    aria-expanded={isNotificationMenuOpen}
                    aria-haspopup="true"
                  >
                    <img src="/dot menu.svg" alt="Menu" className="w-5 h-5" />
                  </button>
                  
                  {/* Secondary Menu Popup */}
                  {isNotificationMenuOpen && (
                    <div className="w-60 h-28 absolute right-0 top-10 bg-brand-colors-SteamWhite rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] overflow-hidden z-20">
                      <button 
                        className="w-52 p-2.5 left-[16px] top-[16px] absolute bg-brand-colors-HarvestMist rounded-[10px] inline-flex justify-start items-center gap-2.5 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAllAsRead();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            handleMarkAllAsRead();
                          }
                        }}
                      >
                        <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-medium">Mark all as read</div>
                      </button>
                      <button 
                        className="w-52 p-2.5 left-[16px] top-[61px] absolute bg-brand-colors-SteamWhite rounded-[10px] inline-flex justify-start items-center gap-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-colors-SproutGreen focus:ring-opacity-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNotifications();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenNotifications();
                          }
                        }}
                      >
                        <div className="justify-start text-brand-colors-RootBlack text-xs font-madani-medium">Open notifications</div>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsNotificationOpen(false);
                    setIsNotificationMenuOpen(false);
                  }}
                  className="flex justify-start items-center gap-2.5 hover:bg-gray-100 p-1 rounded text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="inline-flex gap-3">
              <div className="p-2.5 bg-brand-colors-HarvestMist rounded-[20px] flex justify-center items-center gap-2.5">
                <div className="text-brand-colors-RootBlack text-base font-madani-medium">All</div>
              </div>
              <div className="p-2.5 rounded-[20px] flex justify-center items-center gap-2.5">
                <div className="text-brand-colors-RootBlack text-base font-madani-medium">Unread</div>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5">
            <div className="space-y-2 pb-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="w-full p-2.5 bg-brand-colors-SteamWhite rounded-[10px] flex justify-between items-start cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 relative flex-shrink-0">
                      <img className="w-10 h-10 rounded-full object-cover" src={notification.avatar} alt={notification.title} />
                      {!notification.isRead && (
                        <div className="w-5 h-5 left-[24px] top-[20px] absolute bg-brand-colors-SproutGreen rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-1 min-w-0">
                      <div className="text-brand-colors-RootBlack text-base font-madani-medium">{notification.title}</div>
                      <div className="text-brand-colors-rootgrey text-xs font-madani-light">{notification.message}</div>
                    </div>
                  </div>
                  <div className="text-brand-colors-RootBlack text-xs font-madani-light whitespace-nowrap ml-2 flex-shrink-0">{notification.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Button - Fixed */}
          <div className="p-5 pt-0 flex-shrink-0">
            <button
              onClick={handleOpenNotifications}
              className="w-full h-[60px] min-w-[200px] px-6 py-3 bg-brand-colors-HarvestMist rounded-[30px] inline-flex justify-center items-center gap-2.5 hover:bg-opacity-80 transition-colors"
              style={{
                opacity: 1,
                transform: 'rotate(0deg)'
              }}
            >
              <div className="text-brand-colors-RootBlack text-base font-madani-bold">See all notifications</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;