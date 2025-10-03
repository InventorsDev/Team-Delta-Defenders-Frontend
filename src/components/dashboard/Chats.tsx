import React, { useState } from 'react';
import ChatItem, { ChatData } from './ChatItem';
import MobileChatDetail from './MobileChatDetail';
import NotificationDropdown from '../ui/NotificationDropdown';
import { mockChats } from '@/data/mockChats';
import { Chat } from '@/types';
import { formatRelativeTime } from '@/lib/formatters';

const ChatDetailView: React.FC<{ chat: ChatData; onClose: () => void; showCloseButton?: boolean }> = ({ chat, onClose, showCloseButton = true }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 bg-white bg-opacity-80 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={chat.avatar}
              alt={chat.name}
            />
            <div className="flex flex-col">
              <span className="text-brand-colors-RootBlack text-base font-medium font-['MadaniArabic-Medium']">
                {chat.name}
              </span>
              <span className="text-brand-colors-RootBlack text-xs font-light font-['MadaniArabic-Light']">
                {chat.timestamp}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 relative">
              <img src="/phone.svg" alt="Call" className="w-6 h-6" />
            </button>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 px-5 py-4 overflow-y-auto space-y-4">
          {/* User Message - Left */}
          <div className="flex justify-start">
            <div className="max-w-sm px-4 py-3 bg-[#D3AB9E] text-white rounded-t-3xl rounded-br-3xl">
              <span className="text-base font-medium font-['MadaniArabic-Medium']">
                hello, good morning sir
              </span>
            </div>
          </div>

          {/* Farmer Reply - Right */}
          <div className="flex flex-col items-end space-y-2">
            <span className="text-xs text-gray-500 font-light font-['MadaniArabic-Light']">
              replied to
            </span>
            <div className="max-w-sm px-4 py-3 bg-[#D3AB9E] opacity-30 text-white rounded-t-3xl rounded-br-3xl">
              <span className="text-base font-medium font-['MadaniArabic-Medium']">
                hello, good morning sir
              </span>
            </div>
            <div className="max-w-sm px-4 py-3 bg-[#84C62C] text-white rounded-t-3xl rounded-bl-3xl">
              <span className="text-base font-medium font-['MadaniArabic-Medium']">
                good morning sir
              </span>
            </div>
          </div>

          {/* User Message - Left */}
          <div className="flex flex-col items-start space-y-2">
            <span className="text-xs text-gray-500 font-light font-['MadaniArabic-Light']">
              replied to
            </span>
            <div className="max-w-sm px-4 py-3 bg-[#84C62C] opacity-30 text-white rounded-t-3xl rounded-bl-3xl">
              <span className="text-base font-medium font-['MadaniArabic-Medium']">
                good morning sir
              </span>
            </div>
            <div className="max-w-sm px-4 py-3 bg-[#D3AB9E] text-white rounded-t-3xl rounded-br-3xl">
              <span className="text-base font-medium font-['MadaniArabic-Medium']">
                can i see how fresh the tomatoes are, send a picture of it, thanks.
              </span>
            </div>
          </div>

          {/* Image Message - Right */}
          <div className="flex justify-end">
            <div className="max-w-sm p-1 bg-[#84C62C] rounded-t-3xl rounded-bl-3xl">
              <img 
                className="w-64 h-40 rounded-lg object-cover" 
                src="/listing-1-detailed-3.webp" 
                alt="Shared image"
              />
            </div>
          </div>

          {/* Audio Message - Right */}
          <div className="flex justify-end">
            <div className="max-w-sm px-4 py-3 bg-[#84C62C] text-white rounded-t-3xl rounded-bl-3xl">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white bg-opacity-5 rounded-full">
                <button className="flex items-center justify-center">
                  <img src="/play icon.svg" alt="Play" className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-1">
                  {[4, 8, 10, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 10, 8, 4].map((height, index) => (
                    <div 
                      key={index}
                      className="w-1 bg-white rounded-full"
                      style={{ height: `${height}px` }}
                    ></div>
                  ))}
                </div>
                <span className="text-base font-medium font-['MadaniArabic-Medium']">
                  0:08
                </span>
              </div>
            </div>
          </div>

          {/* Typing Indicator - Left */}
          <div className="flex justify-start">
            <div className="px-4 py-3 bg-[#D3AB9E] rounded-t-3xl rounded-br-3xl">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input Toolbar */}
        <div className="w-full h-16 p-5 bg-brand-colors-SteamWhite rounded-bl-[20px] rounded-br-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] inline-flex justify-between items-center flex-shrink-0">
          <div className="flex justify-start items-center gap-3">
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/emoji%20icon.svg" alt="Emoji" className="w-6 h-6" />
              </div>
            </div>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type you message..."
              className="bg-transparent outline-none border-none justify-start text-brand-colors-rootgrey text-base font-normal font-['MadaniArabic-Medium'] placeholder-brand-colors-rootgrey flex-1"
            />
          </div>
          <div className="flex justify-start items-center gap-3">
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/mic-icon.svg" alt="Microphone" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/files%20icon.svg" alt="Files" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/image%20icon.svg" alt="Image" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

interface ChatsProps {
  showHeader?: boolean;
  variant?: 'mobile' | 'desktop';
  onProfileClick?: () => void;
  context?: 'dashboard' | 'marketplace';
}

const Chats: React.FC<ChatsProps> = ({ showHeader = true, variant = 'desktop', onProfileClick, context = 'dashboard' }) => {
  // Convert Chat data to ChatData format
  const convertToChatsData = (chats: Chat[]): ChatData[] => {
    return chats.map(chat => ({
      id: chat.id,
      name: chat.participants.find(p => p.role === 'buyer')?.name || 'Unknown User',
      avatar: chat.participants.find(p => p.role === 'buyer')?.avatar || '/default-avatar.png',
      lastMessage: chat.lastMessage.content,
      timestamp: formatRelativeTime(chat.lastMessage.timestamp),
      isRead: chat.lastMessage.read,
      unreadCount: chat.unreadCount
    }));
  };

  const chatData = convertToChatsData(mockChats);

  // For desktop, start with no chat selected to show empty state; for mobile, start with none
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);
  const [selectedMobileChat, setSelectedMobileChat] = useState<ChatData | null>(null);

  const handleChatClick = (chat: ChatData) => {
    setSelectedChat(chat);
  };

  const handleCloseDetail = () => {
    // Allow closing chat detail to return to empty state
    setSelectedChat(null);
  };

  const handleMobileChatClick = (chat: ChatData) => {
    setSelectedMobileChat(chat);
  };

  const handleMobileBackClick = () => {
    setSelectedMobileChat(null);
  };

  // Mobile Version
  if (variant === 'mobile') {
    // Show chat detail view if a chat is selected
    if (selectedMobileChat) {
      return (
        <MobileChatDetail
          chat={selectedMobileChat}
          onBack={handleMobileBackClick}
        />
      );
    }

    // Show chat list view
    return (
      <div className="w-full h-full bg-white flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="w-full pt-4 pb-4 px-5 bg-white flex flex-col gap-4 flex-shrink-0">
          <div className="flex flex-col gap-3">
            <div
              className="text-sm font-medium text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              Respond to recent chats
            </div>
            <div
              className="text-xl font-bold text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Bold' }}
            >
              Your Inbox
            </div>
          </div>
          {/* Search Bar */}
          <div className="w-full p-3 bg-black/5 rounded-[30px] border border-black/5 flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#8B9281" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="#8B9281" strokeWidth="2"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none border-none text-base text-brand-colors-rootgrey placeholder-brand-colors-rootgrey"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            />
          </div>
        </div>

        {/* Chat List - Scrollable */}
        <div className="flex-1 w-full px-4 pb-4 overflow-y-auto">
          <div className="space-y-3">
            {chatData.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                onClick={handleMobileChatClick}
                className="shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Version - matches the provided design structure
  return (
    <>
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: var(--brand-colors-SproutGreen, #84C62C);
            border-radius: 10px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(132, 198, 44, 0.8);
          }
          .custom-scroll {
            scrollbar-width: thin;
            scrollbar-color: var(--brand-colors-SproutGreen, #84C62C) rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
      <div className="w-full h-full bg-white rounded-[20px] overflow-hidden">
        {/* Header */}
        {showHeader && (
          <div className="w-full px-10 py-7 bg-white flex justify-between items-center flex-shrink-0">
            <div className="flex flex-col gap-4">
              <div className="text-brand-colors-RootBlack text-base font-madani-medium">Respond to recent chats</div>
              <div className="text-brand-colors-RootBlack text-2xl font-madani-bold">Your Inbox</div>
            </div>
            <div className="flex items-center gap-4">
              <NotificationDropdown
                onMarkAllAsRead={() => {
                  console.log('Mark all as read');
                }}
                onOpenNotifications={() => {
                  console.log('Open notifications');
                }}
                onNotificationClick={(notification) => {
                  console.log('Notification clicked:', notification);
                }}
              />
              <button
                onClick={onProfileClick}
                className="hover:opacity-80 transition-opacity"
              >
                <img className="w-10 h-10 rounded-full object-cover" src="/profile image.webp" alt="Profile" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content - Side by side layout */}
        <div className="flex gap-5 px-16 pb-10 h-[814px] justify-center">
          {/* Chat List - Fixed width 455px */}
          <div className="w-[455px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] flex flex-col overflow-hidden mt-10">
            {/* Header for Marketplace */}
            {context === 'marketplace' && (
              <div className="px-5 py-4 bg-white flex-shrink-0">
                <div className="flex flex-col gap-2">
                  <div className="text-brand-colors-RootBlack text-sm font-madani-medium">
                    Respond to recent chats
                  </div>
                  <div className="text-brand-colors-RootBlack text-xl font-madani-bold">
                    Your Inbox
                  </div>
                </div>
              </div>
            )}
            {/* Search */}
            <div className="px-5 py-2.5 bg-white/80 flex-shrink-0">
              <div className="w-full p-3 bg-black/5 rounded-[30px] border border-black/5 flex items-center gap-2">
                <div className="w-6 h-6">
                  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#8B9281" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="#8B9281" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-brand-colors-rootgrey text-xl font-madani-medium">Search</div>
              </div>
            </div>

            {/* Chat Items */}
            <div className="flex-1 px-5 py-2.5 overflow-y-auto custom-scroll">
              <div className="space-y-5">
                {chatData.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-[20px] flex items-start gap-3 cursor-pointer transition-all duration-200 ${
                      selectedChat?.id === chat.id
                        ? 'bg-brand-colors-SproutGreen/10 border border-brand-colors-SproutGreen/30 shadow-md'
                        : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                    }`}
                    onClick={() => handleChatClick(chat)}
                  >
                    <img className="w-10 h-10 rounded-full" src={chat.avatar} alt={chat.name} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-base font-madani-medium truncate ${!chat.isRead ? 'text-black font-semibold' : 'text-brand-colors-RootBlack'}`}>
                        {chat.name}
                      </div>
                      <div className={`text-xs font-madani-light truncate ${!chat.isRead ? 'text-black' : 'text-brand-colors-rootgrey'}`}>
                        {chat.lastMessage}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs font-madani-light text-brand-colors-RootBlack">{chat.timestamp}</div>
                      {!chat.isRead && chat.unreadCount && (
                        <div className="w-5 h-5 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center">
                          <div className="text-white text-xs font-madani-medium">{chat.unreadCount}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Detail - Fixed width 700px */}
          <div className="w-[700px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] flex flex-col overflow-hidden mt-10">
            {selectedChat ? (
              <ChatDetailView
                chat={selectedChat}
                onClose={handleCloseDetail}
                showCloseButton={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <img
                    className="w-[200px] h-[200px] object-contain"
                    src="/empty-state-messages.webp"
                    alt="No messages selected"
                    onError={(e) => {
                      // Fallback to SVG if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.outerHTML = `
                        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                  <div className="text-center">
                    <div className="text-brand-colors-RootBlack text-[32px] font-madani-bold leading-[50px] mb-6">Your Messages</div>
                    <div className="text-brand-colors-rootgrey text-xl font-madani-medium">Click on a chat to open here.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;