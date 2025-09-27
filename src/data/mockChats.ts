import { Chat, Message, User } from '@/types';

const mockUsers: User[] = [
  {
    id: 'buyer-1',
    name: 'Ugonna Chibuike',
    email: 'ugonna@example.com',
    role: 'buyer',
    avatar: '/dashboard-chat-1.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-2',
    name: 'White Tapes',
    email: 'white@example.com',
    role: 'buyer',
    avatar: '/dashboard-chat-2.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-3',
    name: 'Tunde Ednut',
    email: 'tunde@example.com',
    role: 'buyer',
    avatar: '/dashboard-chat-3.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-4',
    name: 'Fatima Alabi',
    email: 'fatima@example.com',
    role: 'buyer',
    avatar: '/dashboard-chat-4.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-5',
    name: 'Frank Edward',
    email: 'frank@example.com',
    role: 'buyer',
    avatar: '/dashboard-chat-5.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-6',
    name: 'Anozie Kelvin',
    email: 'anozie@example.com',
    role: 'buyer',
    avatar: '/chat-6.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-7',
    name: 'Wahab Akintola',
    email: 'wahab@example.com',
    role: 'buyer',
    avatar: '/chat-7.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-8',
    name: 'Osaro John',
    email: 'osaro@example.com',
    role: 'buyer',
    avatar: '/chat-8.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'buyer-9',
    name: 'Pascal Favour',
    email: 'pascal@example.com',
    role: 'buyer',
    avatar: '/profile image.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const farmer: User = {
  id: 'farmer-1',
  name: 'John Farmer',
  email: 'john@example.com',
  role: 'farmer',
  avatar: '/farmer-avatar.png',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participants: [farmer, mockUsers[0]],
    lastMessage: {
      id: 'msg-1',
      chatId: 'chat-1',
      senderId: 'buyer-1',
      content: 'oga watin be last price',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'chat-2',
    participants: [farmer, mockUsers[1]],
    lastMessage: {
      id: 'msg-2',
      chatId: 'chat-2',
      senderId: 'buyer-2',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'chat-3',
    participants: [farmer, mockUsers[2]],
    lastMessage: {
      id: 'msg-3',
      chatId: 'chat-3',
      senderId: 'buyer-3',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'chat-4',
    participants: [farmer, mockUsers[3]],
    lastMessage: {
      id: 'msg-4',
      chatId: 'chat-4',
      senderId: 'buyer-4',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      read: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'chat-5',
    participants: [farmer, mockUsers[4]],
    lastMessage: {
      id: 'msg-5',
      chatId: 'chat-5',
      senderId: 'buyer-5',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1
  },
  {
    id: 'chat-6',
    participants: [farmer, mockUsers[5]],
    lastMessage: {
      id: 'msg-6',
      chatId: 'chat-6',
      senderId: 'buyer-6',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0
  },
  {
    id: 'chat-7',
    participants: [farmer, mockUsers[6]],
    lastMessage: {
      id: 'msg-7',
      chatId: 'chat-7',
      senderId: 'buyer-7',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0
  },
  {
    id: 'chat-8',
    participants: [farmer, mockUsers[7]],
    lastMessage: {
      id: 'msg-8',
      chatId: 'chat-8',
      senderId: 'buyer-8',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0
  },
  {
    id: 'chat-9',
    participants: [farmer, mockUsers[8]],
    lastMessage: {
      id: 'msg-9',
      chatId: 'chat-9',
      senderId: 'buyer-9',
      content: 'How fresh is the pepper',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      type: 'text'
    },
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0
  }
];

export const getUnreadChats = (): Chat[] => {
  return mockChats.filter(chat => chat.unreadCount > 0);
};

export const getUnreadCount = (): number => {
  return mockChats.reduce((total, chat) => total + chat.unreadCount, 0);
};