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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[20px] shadow-2xl w-[574px] h-[814px] relative overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 bg-white bg-opacity-80 flex justify-between items-center border-b border-gray-100">
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
        <div className="flex-1 px-5 py-4 overflow-y-auto max-h-[650px] space-y-4">
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
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 rounded-b-[20px]">
          <div className="flex items-center gap-3">
            {/* Emoji Button */}
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-lg transition-colors">
              😊
            </button>

            {/* Text Input */}
            <div className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 bg-gray-50">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-transparent outline-none text-base font-medium font-['MadaniArabic-Medium'] text-brand-colors-RootBlack placeholder-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <img src="/files icon.svg" alt="Files" className="w-5 h-5" />
            </button>

            <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
              <img src="/mic-icon.svg" alt="Microphone" className="w-5 h-5" />
            </button>

            {/* Send Button - Only shows when there's text */}
            {messageInput.trim() && (
              <button 
                onClick={handleSendMessage}
                className="w-10 h-10 bg-[#84C62C] hover:bg-[#75B025] rounded-full flex items-center justify-center text-white text-lg transition-colors"
              >
                ➤
              </button>
            )}
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
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'var(--brand-colors-SteamWhite, white)', overflow: 'hidden', borderRadius: 20}}>
      <div style={{width: 1129, paddingLeft: 40, paddingRight: 40, paddingTop: 30, paddingBottom: 30, left: 0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.80)', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', wordWrap: 'break-word'}}>Respond to recent chats</div>
          <div style={{width: 331, textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 24, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', wordWrap: 'break-word'}}>Your Inbox</div>
        </div>
        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
          <div style={{width: 40, height: 40, padding: 3, background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.15)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
            <img style={{width: 24, height: 24}} src="/design/assets/icons folder/notification icon.svg" alt="Notifications" />
          </div>
          <img style={{width: 40, height: 40, borderRadius: 9999}} src="/design/assets/dashboard & marketplace assets/profile image.png" alt="Profile" />
        </div>
      </div>
      <div style={{width: 455, height: 814, left: 40, top: 126, position: 'absolute', background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20}}>
        <div style={{width: 455, height: 78, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, left: 0, top: 0, position: 'absolute', background: 'rgba(255, 255, 255, 0.80)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div data-property-1="Default" style={{width: '100%', height: '100%', padding: 12, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 30, outline: '1px rgba(0, 0, 0, 0.05) solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 24, height: 24, position: 'relative'}}>
              <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute', overflow: 'hidden'}}>
                <div style={{width: 0.84, height: 0.67, left: 12.08, top: 23.14, position: 'absolute'}} />
                <div style={{width: 19.11, height: 19.11, left: 2, top: 2, position: 'absolute', background: 'var(--brand-colors-RootBlack, #182605)'}} />
              </div>
            </div>
            <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: 37, wordWrap: 'break-word'}}>Search</div>
          </div>
        </div>
        <div style={{width: 415, height: 696, left: 20, top: 98, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex', overflowY: 'auto', paddingRight: 10}} className="custom-scroll">
          {chatData.map((chat) => (
            <div 
              key={chat.id}
              data-property-1={chat.unread ? "unread" : "read"}
              style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: 'var(--brand-colors-SteamWhite, white)', borderRadius: 20, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex', cursor: 'pointer'}}
              onClick={() => handleChatClick(chat)}
            >
              <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
                <img style={{width: 40, height: 40, borderRadius: 9999}} src={chat.avatar} alt={chat.name} />
                <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
                  <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: chat.unread ? '#000000' : 'var(--brand-colors-RootBlack, #182605)', fontSize: 16, fontFamily: 'MadaniArabic-Medium', fontWeight: chat.unread ? '600' : '400', wordWrap: 'break-word'}}>{chat.name}</div>
                  <div style={{alignSelf: 'stretch', textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: chat.unread ? '#000000' : 'var(--brand-colors-rootgrey, #8B9281)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: chat.unread ? '500' : '400', wordWrap: 'break-word'}}>{chat.lastMessage}</div>
                </div>
              </div>
              <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', display: 'inline-flex'}}>
                <div style={{textBoxTrim: 'trim-both', textBoxEdge: 'cap alphabetic', color: 'var(--brand-colors-RootBlack, #182605)', fontSize: 12, fontFamily: 'MadaniArabic-Light', fontWeight: '400', wordWrap: 'break-word'}}>{chat.time}</div>
                {chat.unread && (
                  <div style={{minWidth: 20, minHeight: 20, padding: '4px 6px', background: '#84C62C', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{color: 'white', fontSize: 12, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: 1}}>1</div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <div style={{width: 574, height: 814, left: 515, top: 126, position: 'absolute'}}>
        <div style={{width: '100%', height: '100%', background: 'var(--brand-colors-SteamWhite, white)', boxShadow: '0px 4px 30px 5px rgba(0, 0, 0, 0.08)', borderRadius: 20}}>
          <div style={{width: 287, left: 143, top: 197, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
            <img style={{width: 200, height: 200}} src="/empty-state-messages.png" />
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
              <div style={{width: '100%', textAlign: 'center', color: '#182605', fontSize: 32, fontFamily: 'MadaniArabic-Bold', fontWeight: '400', lineHeight: '50px'}}>Your Messages</div>
              <div style={{width: '100%', textAlign: 'center', color: '#8B9281', fontSize: 20, fontFamily: 'MadaniArabic-Medium', fontWeight: '400', lineHeight: '37px'}}>Click on a chat to open here.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Detail Modal */}
      {selectedChat && (
        <ChatDetailView chat={selectedChat} onClose={handleCloseDetail} />
      )}
    </div>
    </>
  );
};

export default Chats;