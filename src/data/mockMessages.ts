import { MessageData } from '@/components/dashboard/ChatMessage';

export const createMockConversation = (chatId: string | number): MessageData[] => {
  // Default conversation for Ugonna Chibuike
  if (chatId === 1 || chatId === 'ugonna') {
    return [
      {
        id: 1,
        type: 'text',
        content: 'hello, good morning sir',
        sender: 'user',
        timestamp: '10:30 AM'
      },
      {
        id: 2,
        type: 'text',
        content: 'good morning sir',
        sender: 'farmer',
        timestamp: '10:32 AM',
        replyTo: {
          content: 'hello, good morning sir',
          sender: 'user'
        }
      },
      {
        id: 3,
        type: 'text',
        content: 'can i see how fresh the tomatoes are send a picture of it thanks',
        sender: 'user',
        timestamp: '10:35 AM',
        replyTo: {
          content: 'good morning sir',
          sender: 'farmer'
        }
      },
      {
        id: 4,
        type: 'image',
        content: '',
        sender: 'farmer',
        timestamp: '10:40 AM',
        imageUrl: '/listing-1-detailed-3.png'
      },
      {
        id: 5,
        type: 'audio',
        content: '',
        sender: 'farmer',
        timestamp: '10:42 AM',
        audioData: {
          duration: '0:08',
          waveform: [4, 8, 10, 10, 12, 14, 16, 18, 20, 18, 16, 14, 12, 10, 10, 8, 4]
        }
      },
      {
        id: 6,
        type: 'typing',
        content: '',
        sender: 'farmer',
        timestamp: 'now'
      }
    ];
  }

  // Generic conversation for other chats
  return [
    {
      id: 1,
      type: 'text',
      content: 'How fresh is the pepper',
      sender: 'user',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      type: 'text',
      content: 'Very fresh sir, harvested this morning',
      sender: 'farmer',
      timestamp: '2:32 PM'
    },
    {
      id: 3,
      type: 'text',
      content: 'Can you show me photos?',
      sender: 'user',
      timestamp: '2:35 PM'
    },
    {
      id: 4,
      type: 'typing',
      content: '',
      sender: 'farmer',
      timestamp: 'now'
    }
  ];
};

export const mockMessages: MessageData[] = createMockConversation(1);