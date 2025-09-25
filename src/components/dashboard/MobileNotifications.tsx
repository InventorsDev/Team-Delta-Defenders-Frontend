import React from 'react';
import '@/styles/fonts.css';
import { NotificationData } from './NotificationItem';

interface MobileNotificationsProps {
  notifications: NotificationData[];
  onNotificationClick: (notification: NotificationData) => void;
}

const MobileNotifications: React.FC<MobileNotificationsProps> = ({
  notifications,
  onNotificationClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read clicked');
    setIsMenuOpen(false);
  };

  const handleOpenNotifications = () => {
    console.log('Open notifications clicked');
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <div
      style={{
        width: '100%',
        height: 124 + (6 * 76) + 20 + 60 + 20,
        position: 'relative',
        background: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 20
      }}
    >
      {/* Header with three dot menu */}
      <div
        style={{
          width: '90%',
          maxWidth: 340,
          height: 24,
          left: 20,
          top: 20,
          position: 'absolute',
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <div className="text-root-black text-xl font-madani-bold z-10">
          Notifications
        </div>
        <div
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,
            display: 'flex'
          }}
        >
          <div style={{ position: 'relative' }}>
            <button
              onClick={handleMenuToggle}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <img
                src="/dot menu.svg"
                alt="Menu"
                style={{
                  width: 24,
                  height: 24
                }}
              />
            </button>

            {/* Popup Menu */}
            {isMenuOpen && (
              <div
                style={{
                  width: 245,
                  height: 107,
                  position: 'absolute',
                  right: 0,
                  top: 30,
                  background: 'var(--brand-colors-SteamWhite, white)',
                  boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)',
                  overflow: 'hidden',
                  borderRadius: 20,
                  zIndex: 9999
                }}
              >
                <button
                  data-property-1="hover"
                  onClick={handleMarkAllAsRead}
                  style={{
                    width: 213,
                    padding: 10,
                    left: 16,
                    top: 16,
                    position: 'absolute',
                    background: 'var(--brand-colors-HarvestMist, #E4FDE1)',
                    borderRadius: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                    display: 'inline-flex',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    textBoxTrim: 'trim-both',
                    textBoxEdge: 'cap alphabetic',
                    color: 'var(--brand-colors-RootBlack, #182605)',
                    fontSize: 12,
                    fontFamily: 'MadaniArabic-Medium',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}>
                    Mark all as read
                  </div>
                </button>
                <button
                  data-property-1="Default"
                  onClick={handleOpenNotifications}
                  style={{
                    width: 213,
                    padding: 10,
                    left: 16,
                    top: 61,
                    position: 'absolute',
                    background: 'var(--brand-colors-SteamWhite, white)',
                    borderRadius: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                    display: 'inline-flex',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    textBoxTrim: 'trim-both',
                    textBoxEdge: 'cap alphabetic',
                    color: 'var(--brand-colors-RootBlack, #182605)',
                    fontSize: 12,
                    fontFamily: 'MadaniArabic-Medium',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}>
                    Open notifications
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          left: 20,
          top: 68,
          position: 'absolute',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 12,
          display: 'flex'
        }}
      >
        <div
          style={{
            padding: 10,
            background: '#E4FDE1',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'flex'
          }}
        >
          <div
            style={{
              color: '#182605',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Medium',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}
          >
            All
          </div>
        </div>
        <div
          style={{
            padding: 10,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'flex'
          }}
        >
          <div
            style={{
              color: '#182605',
              fontSize: 16,
              fontFamily: 'MadaniArabic-Medium',
              fontWeight: '400',
              wordWrap: 'break-word'
            }}
          >
            Unread
          </div>
        </div>
      </div>

      {/* Notification Items */}
      {notifications.slice(0, 6).map((notification, index) => (
        <div
          key={notification.id}
          data-property-1="Default"
          style={{
            width: '90%',
            maxWidth: 340,
            height: 60,
            padding: 10,
            left: 20,
            top: 124 + (index * 76),
            position: 'absolute',
            background: 'var(--brand-colors-SteamWhite, white)',
            borderRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            display: 'inline-flex',
            cursor: 'pointer'
          }}
          onClick={() => onNotificationClick(notification)}
        >
          <div
            style={{
              width: 281,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 12,
              display: 'flex'
            }}
          >
            <div
              data-property-1={!notification.isRead ? "unread" : "read"}
              style={{
                width: 40,
                height: 40,
                position: 'relative'
              }}
            >
              <img
                style={{
                  width: 40,
                  height: 40,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  borderRadius: 9999
                }}
                src={notification.avatar || "https://placehold.co/40x40"}
                alt={notification.title}
              />
              {!notification.isRead && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    left: 24,
                    top: 20,
                    position: 'absolute',
                    background: 'var(--brand-colors-SproutGreen, #84C62C)',
                    borderRadius: 9999
                  }}
                />
              )}
            </div>
            <div
              style={{
                flex: '1 1 0',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 4,
                display: 'inline-flex'
              }}
            >
              <div
                style={{
                  alignSelf: 'stretch',
                  textBoxTrim: 'trim-both',
                  textBoxEdge: 'cap alphabetic',
                  color: 'var(--brand-colors-RootBlack, #182605)',
                  fontSize: 16,
                  fontFamily: 'MadaniArabic-Medium',
                  fontWeight: '400',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '200px'
                }}
              >
                {notification.title}
              </div>
              <div
                style={{
                  alignSelf: 'stretch',
                  color: '#8B9281',
                  fontSize: 12,
                  fontFamily: 'MadaniArabic-Light',
                  fontWeight: '400',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '200px'
                }}
              >
                {notification.message}
              </div>
            </div>
          </div>
          <div
            style={{
              color: '#182605',
              fontSize: 12,
              fontFamily: 'MadaniArabic-Light',
              fontWeight: '400',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              minWidth: 'fit-content'
            }}
          >
            {notification.timestamp}
          </div>
        </div>
      ))}

      {/* See All Notifications Button */}
      <div
        style={{
          width: '90%',
          maxWidth: 340,
          height: 60,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          left: 20,
          top: 124 + (6 * 76) + 20,
          position: 'absolute',
          background: '#E4FDE1',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
          display: 'flex',
          cursor: 'pointer'
        }}
        onClick={() => {
          console.log('See all notifications clicked');
        }}
      >
        <div
          style={{
            color: '#182605',
            fontSize: 16,
            fontFamily: 'MadaniArabic-Bold',
            fontWeight: '400',
            wordWrap: 'break-word'
          }}
        >
          See all notification
        </div>
      </div>
    </div>
  );
};

export default MobileNotifications;