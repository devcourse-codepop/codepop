import { create } from 'zustand';

interface User {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  coverImage: string;
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
}

interface AuthStore {
  isLoggedIn: boolean;
  isLoading: boolean;
  accessToken: string | null;
  user: User | null;
  login: (accessToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const storeToken = sessionStorage.getItem('token');

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  accessToken: storeToken,
  user: null,
  isLoading: true,

  login: (accessToken) => {
    sessionStorage.setItem('token', accessToken);
    set({ accessToken, isLoggedIn: true });
  },

  logout: () => {
    sessionStorage.removeItem('token');
    set({ accessToken: null, isLoggedIn: false, user: null, isLoading: false });
  },

  setUser: (userData) => {
    const user = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      image: userData.image,
      coverImage: userData.coverImage,
      role: userData.role,
      emailVerified: true,
      banned: true,
      isOnline: true,
    };
    set({ user, isLoading: false, isLoggedIn: true });
  },
}));
