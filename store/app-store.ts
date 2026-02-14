import { create } from 'zustand';
import { User, Order } from '@/types';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface AppState {
  user: User | null;
  currentOrder: Order | null;
  notifications: Notification[];
  
  setUser: (user: User | null) => void;
  setCurrentOrder: (order: Order | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  logout: () => void;
}

// Helper function to get user from cookie
const getUserFromCookie = (): User | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(c => c.trim().startsWith('user='));
  
  if (!userCookie) return null;
  
  try {
    const userJson = decodeURIComponent(userCookie.split('=')[1]);
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

export const useAppStore = create<AppState>((set) => ({
  user: getUserFromCookie(),
  currentOrder: null,
  notifications: [],
  
  setUser: (user) => set({ user }),
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
  
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  logout: async () => {
    // Call logout API to clear server-side cookie
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    // Clear cookie
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Clear local state
    set({ user: null, currentOrder: null, notifications: [] });
  },
}));
