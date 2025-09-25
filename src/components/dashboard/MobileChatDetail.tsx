import React, { useState } from 'react';
import ChatMessage, { MessageData } from './ChatMessage';
import { ChatData } from './ChatItem';
import { createMockConversation } from '@/data/mockMessages';

interface MobileChatDetailProps {
  chat: ChatData;
  onBack: () => void;
  className?: string;
}

const MobileChatDetail: React.FC<MobileChatDetailProps> = ({
  chat,
  onBack,
  className = ''
}) => {
  const [messageInput, setMessageInput] = useState('');

  // Get conversation data for this chat
  const messages: MessageData[] = createMockConversation(chat.id);

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
    <div className={`fixed inset-0 w-full h-full bg-brand-colors-SteamWhite flex flex-col z-50 ${className}`}>
      {/* Header */}
      <div className="w-full p-5 bg-white/80 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src="/chevron-left-2.svg" alt="Back" className="w-6 h-6" />
          </button>

          {/* Chat Info */}
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={chat.avatar}
            alt={chat.name}
          />
          <div className="flex flex-col gap-3">
            <div
              className="text-sm font-medium text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {chat.name}
            </div>
            <div
              className="text-xs font-light text-brand-colors-RootBlack"
              style={{ fontFamily: 'MadaniArabic-Light' }}
            >
              4 mins
            </div>
          </div>
        </div>

        {/* Call Button */}
        <button className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <img src="/phone.svg" alt="Call" className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 px-4 py-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Message Input Toolbar */}
      <div className="w-full h-16 p-5 bg-brand-colors-SteamWhite shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-bl-[20px] rounded-br-[20px] flex justify-between items-center flex-shrink-0">
        {/* Left side - Emoji and Input */}
        <div className="flex items-center gap-3 flex-1">
          <button className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <img src="/emoji%20icon.svg" alt="Emoji" className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type you message..."
            className="bg-transparent outline-none border-none text-sm font-medium text-brand-colors-rootgrey placeholder-brand-colors-rootgrey flex-1"
            style={{ fontFamily: 'MadaniArabic-Medium' }}
          />
        </div>

        {/* Right side - Media buttons */}
        <div className="flex items-center gap-3">
          {/* Microphone */}
          <button className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <img src="/mic-icon.svg" alt="Microphone" className="w-6 h-6" />
          </button>

          {/* File Attachment */}
          <button className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <img src="/files%20icon.svg" alt="Attach File" className="w-6 h-6" />
          </button>

          {/* Camera/Image */}
          <button className="flex items-center gap-2.5 p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <img src="/image%20icon.svg" alt="Camera" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileChatDetail;