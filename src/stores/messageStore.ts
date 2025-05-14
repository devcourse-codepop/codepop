import { create } from 'zustand';
import messageIcon from '../assets/images/message/messageIcon.svg';

interface Message {
  messageIcon: string;
  setMessageIcon: (icon: string) => void;
}

export const useMessageStore = create<Message>((set) => ({
  messageIcon: messageIcon,
  setMessageIcon: (icon) => set({ messageIcon: icon }),
}));
