import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'farmer-1',
    title: 'New Buyer Message',
    message: 'You have a new message from Chinedu — check your chat to respond quickly!',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/chats'
  },
  {
    id: '2',
    userId: 'farmer-1',
    title: 'Price Alert',
    message: 'The price of tomatoes in your area has increased by 15%. Consider updating your listings.',
    type: 'warning',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/listings'
  },
  {
    id: '3',
    userId: 'farmer-1',
    title: 'Profile Completion Reminder',
    message: 'Complete your profile to increase buyer trust and get more sales opportunities.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/settings'
  },
  {
    id: '4',
    userId: 'farmer-1',
    title: 'New Review Received',
    message: 'Adebayo left a 5-star review for your Fresh Pepper listing. Great job!',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/listings'
  },
  {
    id: '5',
    userId: 'farmer-1',
    title: 'Approved Listing',
    message: 'Great news! Your listing for \'Fresh Red Tomatoes\' has been approved and is now live for buyers',
    type: 'success',
    read: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/listings'
  },
  {
    id: '6',
    userId: 'farmer-1',
    title: 'Payment Received',
    message: 'You received ₦45,000 payment for your Sweet Potatoes order from Kemi.',
    type: 'success',
    read: true,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    userId: 'farmer-1',
    title: 'Inventory Low',
    message: 'Your Yam Tubers inventory is running low. Add more stock to avoid missing sales.',
    type: 'warning',
    read: true,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/listings'
  },
  {
    id: '8',
    userId: 'farmer-1',
    title: 'New Buyer Interest',
    message: 'A buyer is interested in bulk purchase of your Maize. Check your messages.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    actionUrl: '/dashboard/chats'
  },
  {
    id: '9',
    userId: 'farmer-1',
    title: 'Market Insights',
    message: 'New market report available: Vegetable prices are trending up this season.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    userId: 'farmer-1',
    title: 'Weekly Summary',
    message: 'Your weekly sales summary is ready. You made ₦125,000 this week!',
    type: 'success',
    read: true,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const getUnreadNotifications = (): Notification[] => {
  return mockNotifications.filter(notification => !notification.read);
};

export const getRecentNotifications = (limit: number = 5): Notification[] => {
  return mockNotifications.slice(0, limit);
};