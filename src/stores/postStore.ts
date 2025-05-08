import { create } from 'zustand';

interface PostStore {
  channelIdList: string[];
}

export const usePostStore = create<PostStore>(() => ({
  channelIdList: [
    '681b84d4437f722b6908ab61',
    '681b850d437f722b6908ab65',
    '681b8570437f722b6908ab69',
  ],
}));
