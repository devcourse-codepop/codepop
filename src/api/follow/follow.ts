import { axiosInstance } from '../axios';

export const postFollow = (userId: string) => {
  return axiosInstance.post<Follow>('/follow/create', { userId });
};
