import { axiosInstance } from '../axios';

export const getAuthorPostData = (userId: string) => {
  return axiosInstance.get<Post[]>(`/posts/author/${userId}`);
};

export const getPostData = (userId: string) => {
  return axiosInstance.get<Post>(`/posts/${userId}`);
};
