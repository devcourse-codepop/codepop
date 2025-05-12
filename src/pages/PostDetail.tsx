import { useParams } from 'react-router-dom';
import ChannelName from '../components/channel/ChannelName';
import PostDetailItem from '../components/post/PostDetailItem';
import WriteCommentItem from '../components/post/WriteCommentItem';
import { getPostList } from '../api/post/post';
import { usePostStore } from '../stores/postStore';
import { useEffect, useState } from 'react';
import { Post } from '../types';

export default function PostDetail() {
  const params = useParams();
  const channel = params.channelId;
  const post = params.postId;

  const channelIdList = usePostStore((state) => state.channelIdList);

  const [postItem, setPostItem] = useState<Post | null>(null);

  const filteringItem = (data: Post[]) => {
    for (const res of data) {
      if (res._id === post) {
        setPostItem(res);
      }
    }
  };

  const getPostItem = async () => {
    try {
      const { data } = await getPostList(channelIdList[Number(channel) - 1]);
      filteringItem(data);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  useEffect(() => {
    getPostItem();
  }, []);

  return (
    <>
      {/* ml-[50px] */}
      <div className="w-full">
        <div className="flex justify-between items-end pb-[30px]">
          <ChannelName channelId={String(channel)} />
        </div>
        {/* max-h-[605px] */}
        {postItem && (
          <div className="flex flex-col gap-[30px] max-h-[calc(100vh-100px-120px)] overflow-auto">
            <PostDetailItem key={postItem?._id} {...postItem} />
            <WriteCommentItem
              channelId={String(channel)}
              postId={String(post)}
              postUserId={postItem.author._id}
            />
          </div>
        )}
      </div>
    </>
  );
}
