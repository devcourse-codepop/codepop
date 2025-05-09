import { axiosInstance } from "../axios";

export const getAuthorPostData = (userId: string) => {
  return axiosInstance.get<Post[]>(`/posts/author/${userId}`);
};

export const getPostData = (postId: string) => {
  return axiosInstance.get<Post>(`/posts/${postId}`);
};
