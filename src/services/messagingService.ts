// Messaging service for Team Delta Defenders Backend API
import { api, ApiResponse } from './api';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender_name?: string;
  receiver_name?: string;
}

export interface SendMessageRequest {
  receiver_id: string;
  content: string;
}

export interface ChatHistory {
  participant_id: string;
  participant_name: string;
  last_message: Message;
  unread_count: number;
  messages: Message[];
}

export class MessagingService {
  private static instance: MessagingService;
  private websocket: WebSocket | null = null;
  private messageListeners: Set<(message: Message) => void> = new Set();

  static getInstance(): MessagingService {
    if (!MessagingService.instance) {
      MessagingService.instance = new MessagingService();
    }
    return MessagingService.instance;
  }

  // Send a message
  async sendMessage(data: SendMessageRequest): Promise<Message> {
    try {
      const response = await api.post<Message>('/messages', data);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error('Failed to send message');
    } catch (error) {
      throw error;
    }
  }

  // Get chat history with a specific user
  async getChatHistory(userId: string): Promise<Message[]> {
    try {
      const response = await api.get<Message[]>(`/messages/${userId}`);

      if (response.success && response.data) {
        return response.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  // Get all chat conversations for current user
  async getConversations(): Promise<ChatHistory[]> {
    try {
      const response = await api.get<ChatHistory[]>('/messages/conversations');

      if (response.success && response.data) {
        return response.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  // Connect to WebSocket for real-time messaging
  connectWebSocket(authToken: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = import.meta.env.VITE_WS_URL ||
          import.meta.env.VITE_API_URL?.replace(/^https?/, 'ws').replace('/api', '/ws') ||
          'ws://localhost:8000/ws';

        this.websocket = new WebSocket(`${wsUrl}/chat?token=${authToken}`);

        this.websocket.onopen = () => {
          console.log('WebSocket connected for messaging');
          resolve();
        };

        this.websocket.onmessage = (event) => {
          try {
            const message: Message = JSON.parse(event.data);
            this.notifyMessageListeners(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.websocket.onclose = () => {
          console.log('WebSocket disconnected');
          this.websocket = null;
        };

        this.websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // Disconnect WebSocket
  disconnectWebSocket(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  // Add listener for real-time messages
  addMessageListener(listener: (message: Message) => void): void {
    this.messageListeners.add(listener);
  }

  // Remove message listener
  removeMessageListener(listener: (message: Message) => void): void {
    this.messageListeners.delete(listener);
  }

  // Notify all listeners of new message
  private notifyMessageListeners(message: Message): void {
    this.messageListeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        console.error('Error in message listener:', error);
      }
    });
  }

  // Send message via WebSocket (for real-time)
  sendMessageRealtime(data: SendMessageRequest): boolean {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(data));
      return true;
    }
    return false;
  }

  // Mark messages as read
  async markMessagesAsRead(userId: string): Promise<void> {
    try {
      await api.post(`/messages/${userId}/read`);
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const messagingService = MessagingService.getInstance();