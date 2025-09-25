import React from 'react';

export interface ChatData {
  id: string | number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
  unreadCount?: number;
}

interface ChatItemProps {
  chat: ChatData;
  onClick?: (chat: ChatData) => void;
  className?: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    onClick?.(chat);
  };

  return (
    <div
      className={`w-full px-3 py-2 bg-white rounded-[20px] flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
      onClick={handleClick}
    >
      {/* Avatar */}
      <img
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        src={chat.avatar}
        alt={`${chat.name} avatar`}
      />

      {/* Chat Content */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        {/* Name */}
        <div
          className="text-base font-medium text-brand-colors-RootBlack truncate"
          style={{ fontFamily: 'MadaniArabic-Medium' }}
        >
          {chat.name}
        </div>

        {/* Last Message */}
        <div
          className={`text-xs font-light leading-tight truncate ${
            chat.isRead ? 'text-brand-colors-rootgrey' : 'text-brand-colors-RootBlack'
          }`}
          style={{ fontFamily: 'MadaniArabic-Light' }}
          title={chat.lastMessage}
        >
          {chat.lastMessage}
        </div>
      </div>

      {/* Timestamp and Unread Indicator */}
      <div className="flex flex-col items-end justify-between h-full gap-3 flex-shrink-0">
        {/* Timestamp */}
        <div
          className="text-xs font-light text-brand-colors-RootBlack whitespace-nowrap"
          style={{ fontFamily: 'MadaniArabic-Light' }}
        >
          {chat.timestamp}
        </div>

        {/* Unread Count Badge */}
        {!chat.isRead && chat.unreadCount && (
          <div className="w-5 h-5 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center">
            <div
              className="text-white text-xs font-medium"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {chat.unreadCount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;