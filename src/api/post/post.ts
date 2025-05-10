import { axiosInstance } from "../axios";

export const getAuthorPostData = (userId: string) => {
  return axiosInstance.get<Post[]>(`/posts/author/${userId}`);
};

export const getPostData = (postId: string) => {
  return axiosInstance.get<Post>(`/posts/${postId}`);
};

export const getPopularPostData = async (channelId: string) => {
  const response = await axiosInstance.get(`/posts/channel/${channelId}`);
  const sortPost = response.data.sort((a: Post, b: Post) => {
    const aLike = a.likes.length + a.comments.length;
    const bLike = b.likes.length + b.comments.length;

    return bLike - aLike === 0
      ? b.comments.length - a.comments.length
      : bLike - aLike;
  });

  return sortPost;
};
