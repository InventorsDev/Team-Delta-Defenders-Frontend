import { useState, useCallback } from 'react';
import { NotificationData } from '@/components/dashboard/NotificationItem';
import { mockNotifications } from '@/data/mockNotifications';

// Helper function to get avatar based on notification type
const getAvatarForNotification = (type: string, title: string): string => {
  // For chat/buyer messages, use appropriate avatar
  if (title.toLowerCase().includes('buyer') || title.toLowerCase().includes('message')) {
    return '/dashboard-chat-1.png';
  }
  // For reviews, use reviewer avatar
  if (title.toLowerCase().includes('review')) {
    return '/dashboard-chat-2.png';
  }
  // For system notifications, use default avatar
  return '/profile image.png';
};

// Helper function to format timestamp
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  // For older notifications, show the date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

// Transform mock notifications to NotificationData format
const transformNotifications = () => {
  return mockNotifications.map(notification => ({
    id: notification.id,
    avatar: getAvatarForNotification(notification.type, notification.title),
    title: notification.title,
    message: notification.message,
    timestamp: formatTimestamp(notification.timestamp),
    isRead: notification.read,
    type: notification.type as 'message' | 'alert' | 'reminder' | 'approval' | 'review'
  }));
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>(transformNotifications());

  const markAsRead = useCallback((notificationId: string | number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, []);

  const handleNotificationClick = useCallback((notification: NotificationData) => {
    console.log('Notification clicked:', notification);
    // TODO: Navigate to appropriate screen based on notification type
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    handleNotificationClick,
    unreadCount
  };
};