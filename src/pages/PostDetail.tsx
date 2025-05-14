import { useLocation, useParams } from 'react-router-dom';
import ChannelName from '../components/channel/ChannelName';
import PostDetailItem from '../components/post/PostDetailItem';
import WriteCommentItem from '../components/post/WriteCommentItem';
import { getPostList } from '../api/post/post';
import { usePostStore } from '../stores/postStore';
import { useEffect, useRef, useState } from 'react';
import { Post } from '../types';

export default function PostDetail() {
  const params = useParams();
  const channel = params.channelId;
  const post = params.postId;

  const location = useLocation();

  // 채널 id 값 받아오기
  const channelIdList = usePostStore((state) => state.channelIdList);

  // 댓글 작성 컴포넌트를 나타내는 div 요소
  const commentRef = useRef<HTMLDivElement | null>(null);

  // 게시글 상태
  const [postItem, setPostItem] = useState<Post | null>(null);

  // 댓글 작성할 때마다 useEffect를 재실행하기 위한 트리거
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const updateReloadTrigger = () => {
    setReloadTrigger((reloadTrigger) => reloadTrigger + 1);
  };

  // 해당 게시글만 필터링
  const filteringItem = (data: Post[]) => {
    for (const res of data) {
      if (res._id === post) {
        setPostItem(structuredClone(res));
      }
    }
  };

  // 게시글 목록 불러오기 (게시글 id에 해당하는 게시글만 필터링)
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
  }, [reloadTrigger]);

  // 댓글 아이콘 클릭 후 현재 페이지 접근 시, 댓글 작성 컴포넌트가 화면에 보이도록 스크롤 조정
  useEffect(() => {
    if (location.state?.scrollToComment && postItem) {
      const timeout = setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          });
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [location.state, commentRef, postItem]);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-end pb-[30px]">
          <ChannelName channelId={String(channel)} />
        </div>
        {postItem && (
          <div className="flex flex-col gap-[30px] max-h-[calc(100vh-100px-120px)] overflow-auto scroll-custom">
            {/* <PostDetailItem key={postItem?._id} {...postItem} /> */}
            <PostDetailItem
              {...postItem}
              updateReloadTrigger={updateReloadTrigger}
            />
            <div ref={commentRef}>
              <WriteCommentItem
                channelId={String(channel)}
                postId={String(post)}
                postUserId={postItem.author._id}
                updateReloadTrigger={updateReloadTrigger}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
