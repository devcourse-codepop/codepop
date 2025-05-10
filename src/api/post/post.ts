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

export const postComments = (postId: string, comment: string) => {
  return axiosInstance.post('/comments/create', {
    postId,
    // comment,
    comment: JSON.stringify({
      content: comment,
      image: null,
    }),
  });
};

export const deleteComments = (commentId: string) => {
  return axiosInstance.delete('/comments/delete', {
    data: { id: commentId },
  });
};

export const deletePosts = (postId: string) => {
  return axiosInstance.delete('/posts/delete', {
    data: { id: postId },
  });
};

export const getAuthorPostData = (userId: string) => {
  return axiosInstance.get<Post[]>(`/posts/author/${userId}`);
};

export const getPostData = (postId: string) => {
  return axiosInstance.get<Post>(`/posts/${postId}`);
};
