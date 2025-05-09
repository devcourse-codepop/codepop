type ChannelItemType = {
  id: string;
  name: string;
  to: string;
  color: string;
};

type ChannelType = {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type PopularType = {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image: Optional<string>;
  imagePublicId: Optional<string>;
  title: string;
  channel: Channel;
  author: User;
  createdAt: string;
  updatedAt: string;
};
