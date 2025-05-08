import { create } from 'zustand';

interface User {
  _id: string;
  fullName: string;
  email: string;
  coverImage: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
}

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const storeToken = localStorage.getItem('token');

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  accessToken: storeToken,
  user: null,

  login: (accessToken) => {
    localStorage.setItem('token', accessToken);
    set({ accessToken, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ accessToken: null, isLoggedIn: false, user: null });
  },

  setUser: (userData) => {
    const user = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      coverImage: userData.coverImage,
      role: userData.role,
      emailVerified: true,
      banned: true,
      isOnline: true,
    };
    localStorage.setItem('id', userData._id);
    set({ user });
  },
}));
