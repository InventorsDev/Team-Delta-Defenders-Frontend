import React from 'react';

export interface MessageData {
  id: string | number;
  type: 'text' | 'image' | 'audio' | 'typing';
  content: string;
  sender: 'user' | 'farmer';
  timestamp?: string;
  replyTo?: {
    content: string;
    sender: 'user' | 'farmer';
  };
  audioData?: {
    duration: string;
    waveform: number[];
  };
  imageUrl?: string;
}

interface ChatMessageProps {
  message: MessageData;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, className = '' }) => {
  const isFromUser = message.sender === 'user';
  const isFromFarmer = message.sender === 'farmer';

  // Base message bubble classes
  const bubbleClasses = `max-w-sm px-2.5 py-3.5 flex items-center gap-2.5 ${
    isFromUser
      ? 'bg-brand-colors-SoilBlush rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]'
      : 'bg-brand-colors-SproutGreen rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]'
  }`;

  const textClasses = `text-white text-sm font-medium flex-1 ${
    isFromFarmer ? 'text-right' : 'text-left'
  }`;

  // Text Message with Optional Reply
  if (message.type === 'text') {
    return (
      <div className={`flex ${isFromUser ? 'justify-start' : 'justify-end'} ${className}`}>
        <div className="flex flex-col gap-2 max-w-xs">
          {/* Reply indicator and quoted message */}
          {message.replyTo && (
            <>
              <div
                className={`text-xs font-light text-brand-colors-rootgrey ${
                  isFromUser ? 'text-left' : 'text-right'
                }`}
                style={{ fontFamily: 'MadaniArabic-Light' }}
              >
                replied to
              </div>
              <div className={`${bubbleClasses} opacity-30`}>
                <div className={textClasses} style={{ fontFamily: 'MadaniArabic-Medium' }}>
                  {message.replyTo.content}
                </div>
              </div>
            </>
          )}

          {/* Main message */}
          <div className={bubbleClasses}>
            <div className={textClasses} style={{ fontFamily: 'MadaniArabic-Medium' }}>
              {message.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Image Message
  if (message.type === 'image') {
    return (
      <div className={`flex ${isFromUser ? 'justify-start' : 'justify-end'} ${className}`}>
        <div className={`max-w-sm p-1.5 ${
          isFromUser
            ? 'bg-brand-colors-SoilBlush rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]'
            : 'bg-brand-colors-SproutGreen rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]'
        }`}>
          <img
            className="w-[250px] h-[150px] rounded-[5px] object-cover"
            src={message.imageUrl || '/placeholder-image.jpg'}
            alt="Shared image"
          />
        </div>
      </div>
    );
  }

  // Audio Message
  if (message.type === 'audio') {
    return (
      <div className={`flex ${isFromUser ? 'justify-start' : 'justify-end'} ${className}`}>
        <div className={bubbleClasses}>
          <div className="px-5 py-2.5 bg-white/5 rounded-full flex items-center gap-3">
            {/* Play button */}
            <button className="flex items-center justify-center">
              <img src="/play icon.svg" alt="Play" className="w-6 h-6" />
            </button>

            {/* Waveform */}
            <div className="flex items-center gap-1">
              {message.audioData?.waveform?.map((height, index) => (
                <div
                  key={index}
                  className="w-1 bg-white rounded-full"
                  style={{ height: `${height}px` }}
                />
              )) || (
                // Default waveform if no data provided
                [4, 8, 10, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 10, 8, 4].map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-white rounded-full"
                    style={{ height: `${height}px` }}
                  />
                ))
              )}
            </div>

            {/* Duration */}
            <div
              className="text-white text-sm font-medium"
              style={{ fontFamily: 'MadaniArabic-Medium' }}
            >
              {message.audioData?.duration || '0:08'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Typing Indicator
  if (message.type === 'typing') {
    return (
      <div className={`flex ${isFromUser ? 'justify-start' : 'justify-end'} ${className}`}>
        <div className={`max-w-sm px-2.5 py-3.5 flex items-center gap-2.5 ${
          isFromUser
            ? 'bg-brand-colors-SoilBlush rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]'
            : 'bg-brand-colors-SproutGreen rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]'
        }`}>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatMessage;