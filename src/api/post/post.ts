import { axiosInstance } from '../axios';

export const getPostList = (channelId: string) => {
  return axiosInstance.get(`/posts/channel/${channelId}`);
};

export const postLikes = (postId: string) => {
  return axiosInstance.post('/likes/create', {
    postId,
  });
};

export const deleteLikes = (postId: string) => {
  return axiosInstance.delete('/likes/create', {
    id: postId,
  });
};
