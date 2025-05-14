import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { getAuthorPostData, getPostData } from '../../api/post/post';
import commentWhite from '../../assets/images/comment/commentWhite.svg';
import commentIcon from '../../assets/images/comment/comment-outline.svg';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

interface ProfileRightProps extends UserPostInfo {
  theme: Theme;
}

export default function ProfileRight({
  userData,
  selectedTab,
  theme,
}: ProfileRightProps) {
  const userId = userData?._id;
  const [userPostData, setUserPostData] = useState<Post[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  // selectedTab이 변경될 때마다 각 탭에 맞는 데이터를 가져옴
  useEffect(() => {
    setCurrentPage(1);
    const fetchData = async () => {
      switch (selectedTab) {
        case 'posts':
          return fetchUserPosts();
        case 'likes':
          return fetchLikedPosts();
        case 'comments':
          return fetchCommentedPosts();
      }
    };
    fetchData();
  }, [selectedTab]);

  const fetchUserPosts = async () => {
    if (!userData?.posts) return;
    const { data } = await getAuthorPostData(userId || '');
    setUserPostData(data);
  };

  // 좋아요 목록을 시간순 정렬 후 해당 post들을 가져와 표시
  const fetchLikedPosts = async () => {
    if (!userData?.likes) return;
    const sortedLikes = [...userData.likes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const likedPostIds = sortedLikes.map((like) => like.post);
    const likedPosts = await Promise.all(
      likedPostIds.map((postId) => getPostData(postId).then((res) => res.data))
    );
    setUserPostData(likedPosts);
  };

  // 댓글단 게시글에 몇 번 댓글 단지와 최근 댓글 달았는 지 확인 후, 최신 댓글 기준으로 정렬
  const fetchCommentedPosts = async () => {
    if (!userData?.comments) return;

    const sortedComments = [...userData.comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const commentCountMap = new Map<string, number>();
    const latestCommentTimeMap = new Map<string, string>();

    sortedComments.forEach((comment) => {
      const count = commentCountMap.get(comment.post) || 0;
      commentCountMap.set(comment.post, count + 1);

      if (!latestCommentTimeMap.has(comment.post)) {
        latestCommentTimeMap.set(comment.post, comment.createdAt);
      }
    });

    const uniquePostIds = Array.from(commentCountMap.keys());
    const commentPosts = await Promise.all(
      uniquePostIds.map((postId) => getPostData(postId).then((res) => res.data))
    );

    const postsWithCommentData = commentPosts.map((post) => ({
      ...post,
      myCommentCount: commentCountMap.get(post._id) || 0,
      latestCommentAt: latestCommentTimeMap.get(post._id) || '',
    }));

    postsWithCommentData.sort(
      (a, b) =>
        new Date(b.latestCommentAt).getTime() -
        new Date(a.latestCommentAt).getTime()
    );

    setUserPostData(postsWithCommentData);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    userPostData?.slice(indexOfFirstPost, indexOfLastPost) || [];

  const tabLabels: Record<string, string> = {
    posts: '작성한 글',
    likes: '좋아요한 글',
    comments: '댓글 단 글',
  };

  const emptyText: Record<string, string> = {
    posts: '게시글을 작성해 주세요.',
    likes: '좋아요를 누른 게시글이 없습니다.',
    comments: '댓글을 단 게시글이 없습니다.',
  };

  const getChannelInfo = (name: string) => {
    const info = {
      Vote: { id: 3, label: '골라봐', bg: 'bg-[#60A7F7]' },
      MysteryCode: { id: 1, label: '이게 왜 되지?', bg: 'bg-[#10215C]' },
      Default: { id: 2, label: '이거 왜 안 쓰지?', bg: 'bg-[#3380DE]' },
    };
    return info[name as keyof typeof info] || info.Default;
  };

  return (
    <div className="ml-[26px] ">
      <p
        className={`mt-[40px] font-semibold text-[18px] ${
          dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
        }`}
      >
        {tabLabels[selectedTab]}
      </p>

      <div
        className={`mt-[31px] w-[682px] min-h-[365px] ${
          dark(theme) ? 'text-[#ffffff]' : ''
        }`}
      >
        {userPostData && userPostData.length === 0 && (
          <p
            className={`text-center whitespace-pre-line text-sm py-45 border-t-2 leading-[3rem] ${
              dark(theme)
                ? 'border-t-white/60 text-[#ffffff]/60'
                : 'text-gray-500 '
            }`}
          >
            {emptyText[selectedTab]}
          </p>
        )}

        {currentPosts.map((post, i) => {
          const { id, label, bg } = getChannelInfo(post.channel.name);
          return (
            <div
              key={post._id}
              className={`relative flex flex-col gap-2 border-b-2 
                ${
                  i !== currentPosts.length - 1
                    ? dark(theme)
                      ? 'border-b-white/30'
                      : 'border-b-black/30'
                    : dark(theme)
                    ? 'border-b-white/60'
                    : 'border-b-black/60'
                }
                ${
                  i === 0
                    ? dark(theme)
                      ? 'border-t-2 border-t-white/60'
                      : 'border-t-2 border-t-black/60'
                    : ''
                } 
                ${selectedTab === 'comments' ? 'py-[6px]' : 'py-4'}`}
            >
              <div className="relative flex items-center py-0.5">
                <div
                  className={`absolute left-0 rounded-[28px] border text-[12px] font-bold ml-2 text-white px-[10px] py-[3px] cursor-pointer ${bg}`}
                  onClick={() => navigate(`/channel/${id}`)}
                >
                  {label}
                </div>

                <div
                  className="ml-[130px] flex flex-col cursor-pointer justify-center"
                  onClick={() => navigate(`/channel/${id}/post/${post._id}`)}
                >
                  <p className="font-semibold text-[15px] truncate max-w-[430px]">
                    {JSON.parse(post.title).title}
                  </p>

                  {selectedTab === 'comments' && post.comments.length > 0 && (
                    <div className="mt-1 text-[12px] text-gray-700 flex">
                      <img
                        src={dark(theme) ? commentWhite : commentIcon}
                        className="w-5 h-5"
                      />
                      <p
                        className={`ml-[5px] ${
                          dark(theme) ? 'text-[#ffffff]' : ''
                        }`}
                      >
                        +{post.myCommentCount}개
                      </p>
                    </div>
                  )}
                </div>

                <p className="absolute right-0 top-1/2 -translate-y-1/2 w-[100px] font-normal  text-right text-[13px] pr-[15px]">
                  {post.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {userPostData && userPostData.length > postsPerPage && (
        <div
          className={`mt-8 flex justify-center ${
            dark(theme) ? 'text-[#ffffff]' : ''
          }`}
        >
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={userPostData.length}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
            prevPageText={
              <span className="text-xl leading-none flex items-center justify-center">
                ‹
              </span>
            }
            nextPageText={
              <span className="text-xl leading-none flex items-center justify-center">
                ›
              </span>
            }
            firstPageText={
              <span className="text-xl leading-none flex items-center justify-center">
                «
              </span>
            }
            lastPageText={
              <span className="text-xl leading-none flex items-center justify-center">
                »
              </span>
            }
            innerClass="flex gap-2 text-sm"
            itemClass="px-3 py-1 rounded-[5px] cursor-pointer"
            activeClass={`bg-[#1E293B] text-white ${
              dark(theme) ? 'bg-[#1e1e1e]' : ''
            }`}
          />
        </div>
      )}
    </div>
  );
}
