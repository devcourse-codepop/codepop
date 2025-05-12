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

// export const postComments = (formData: FormData) => {
//   return axiosInstance.post('/comments/create', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };

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

export const getPopularPostData = async (channelId: string) => {
  const response = await axiosInstance.get(`/posts/channel/${channelId}`);
  const sortPost = response.data.sort((a: Post, b: Post) => {
    if (b.likes.length - a.likes.length !== 0)
      return b.likes.length - a.likes.length;
    else return b.comments.length - a.comments.length;
  });

  return sortPost;
};

export const postNotifications = (
  notificationType: string,
  notificationTypeId: string,
  userId: string,
  postId: string
) => {
  return axiosInstance.post('/notifications/create', {
    notificationType,
    notificationTypeId,
    userId,
    postId,
  });
};
