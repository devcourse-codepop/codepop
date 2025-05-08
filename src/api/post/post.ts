import { axiosInstance } from '../axios';

export const getPostList = (channelId: string) => {
  return axiosInstance.get(`/posts/channel/${channelId}`);
};

export const postLikes = (postId: string) => {
  return axiosInstance.post('/likes/create', {
    postId,
  });
};

export const deleteLikes = (likeId: string) => {
  return axiosInstance.delete('/likes/delete', {
    data: { id: likeId },
  });
};

export const getSearchPostList = (value: string) => {
  return axiosInstance.get(`/search/all/${value}`);
};
