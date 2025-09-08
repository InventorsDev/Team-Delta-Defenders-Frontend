import React, { useState } from 'react';

interface ChatData {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: boolean;
}

const ChatDetailView: React.FC<{ chat: ChatData; onClose: () => void }> = ({ chat, onClose }) => {
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
    <div className="w-full h-full bg-white rounded-[20px] shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 bg-white bg-opacity-80 flex justify-between items-center border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img 
              className="w-10 h-10 rounded-full" 
              src={chat.avatar} 
              alt={chat.name}
            />
            <div className="flex flex-col">
              <span className="text-brand-colors-RootBlack text-base font-medium font-['MadaniArabic-Medium']">
                {chat.name}
              </span>
              <span className="text-brand-colors-RootBlack text-xs font-light font-['MadaniArabic-Light']">
                {chat.time}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 relative">
              <div className="w-4 h-3.5 absolute left-1 top-2 opacity-30 bg-brand-colors-RootBlack"></div>
              <div className="w-4.5 h-4.5 absolute left-0.5 top-0.5 bg-brand-colors-RootBlack"></div>
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
                src="/listing-1-detailed-3.png" 
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
                <img src="/design/assets/icons folder/emoji icon.svg" alt="Emoji" className="w-6 h-6" />
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
                <img src="/files icon.svg" alt="Files" className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-start items-center gap-2.5">
              <div className="w-6 h-6 relative overflow-hidden">
                <img src="/image icon.svg" alt="Image" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

const Chats: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);

  const chatData: ChatData[] = [
    { id: 'ugonna', name: 'Ugonna Chibuike', lastMessage: 'oga watin be last price', time: '5 mins', avatar: '/dashboard-chat-1.png', unread: true },
    { id: 'white-tapes', name: 'White Tapes', lastMessage: 'How fresh is the pepper', time: '30 mins', avatar: '/dashboard-chat-2.png', unread: true },
    { id: 'tunde', name: 'Tunde Ednut', lastMessage: 'How fresh is the pepper', time: '3 hrs', avatar: '/dashboard-chat-3.png', unread: true },
    { id: 'fatima', name: 'Fatima Alabi', lastMessage: 'How fresh is the pepper', time: '3 hrs', avatar: '/dashboard-chat-4.png', unread: true },
    { id: 'frank', name: 'Frank Edward', lastMessage: 'How fresh is the pepper', time: '1 day', avatar: '/dashboard-chat-5.png', unread: true },
    { id: 'anozie', name: 'Anozie kelvin', lastMessage: 'How fresh is the pepper', time: '1 day', avatar: '/chat-6.png' },
    { id: 'wahab', name: 'Wahab Akintola', lastMessage: 'How fresh is the pepper', time: '1 day', avatar: '/chat-7.png' },
    { id: 'osaro', name: 'Osaro John', lastMessage: 'How fresh is the pepper', time: '1 day', avatar: '/chat-8.png' },
    { id: 'pascal', name: 'Pascal Favour', lastMessage: 'How fresh is the pepper', time: '1 day', avatar: '/chat-9.svg' },
    { id: 'samuel', name: 'Samuel Johnson', lastMessage: 'When can I collect the yam?', time: '2 days', avatar: 'https://placehold.co/40x40' },
    { id: 'mary', name: 'Mary Okafor', lastMessage: 'Is the cassava still available?', time: '3 days', avatar: 'https://placehold.co/40x40' },
    { id: 'david', name: 'David Adebayo', lastMessage: 'Quality of the tomatoes please', time: '4 days', avatar: 'https://placehold.co/40x40' }
  ];

  const handleChatClick = (chat: ChatData) => {
    setSelectedChat(chat);
  };

  const handleCloseDetail = () => {
    setSelectedChat(null);
  };
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
      <div className="w-full h-screen bg-white rounded-[20px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-10 py-7 bg-white/80 flex justify-between items-center flex-shrink-0">
          <div className="flex flex-col gap-4">
            <div className="text-brand-colors-RootBlack text-base font-madani-medium">Respond to recent chats</div>
            <div className="text-brand-colors-RootBlack text-2xl font-madani-bold">Your Inbox</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 p-[3px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.15)] rounded-[20px] flex justify-center items-center">
              <img className="w-6 h-6" src="/design/assets/icons folder/notification icon.svg" alt="Notifications" />
            </div>
            <img className="w-10 h-10 rounded-full" src="/design/assets/dashboard & marketplace assets/profile image.png" alt="Profile" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-5 p-10 pt-0 overflow-hidden">
          {/* Chat List */}
          <div className="w-[455px] bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] flex flex-col overflow-hidden">
            {/* Search */}
            <div className="px-5 py-2.5 bg-white/80 flex-shrink-0">
              <div className="w-full p-3 bg-black/5 rounded-[30px] flex items-center gap-2">
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
                    className="p-3 bg-white rounded-[20px] flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleChatClick(chat)}
                  >
                    <img className="w-10 h-10 rounded-full" src={chat.avatar} alt={chat.name} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-base font-madani-medium truncate ${chat.unread ? 'text-black font-semibold' : 'text-brand-colors-RootBlack'}`}>
                        {chat.name}
                      </div>
                      <div className={`text-xs font-madani-light truncate ${chat.unread ? 'text-black' : 'text-brand-colors-rootgrey'}`}>
                        {chat.lastMessage}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xs font-madani-light text-brand-colors-RootBlack">{chat.time}</div>
                      {chat.unread && (
                        <div className="w-5 h-5 bg-brand-colors-SproutGreen rounded-full flex items-center justify-center">
                          <div className="text-white text-xs font-madani-medium">1</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Detail / Empty State */}
          <div className="flex-1">
            {selectedChat ? (
              <ChatDetailView chat={selectedChat} onClose={handleCloseDetail} />
            ) : (
              <div className="w-full h-full bg-white shadow-[0px_4px_30px_5px_rgba(0,0,0,0.08)] rounded-[20px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <img className="w-[200px] h-[200px]" src="/empty-state-messages.png" alt="Empty state" />
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