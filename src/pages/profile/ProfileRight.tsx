import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { getAuthorPostData, getPostData } from '../../api/post/post';
import comment from '../../assets/images/comment-outline.svg';
import { useNavigate } from 'react-router-dom';

export default function ProfileRight({ userData, selectedTab }: UserPostInfo) {
  const userId = userData?._id;
  const [userPostData, setUserPostData] = useState<Post[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setCurrentPage(1);
      if (selectedTab === 'posts') {
        const { data } = await getAuthorPostData(userId || '');
        setUserPostData(data);
      }

      if (selectedTab === 'likes' && userData?.likes) {
        const sortedLikes = [...userData.likes].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const likedPostIds = sortedLikes.map((like) => like.post);

        const likedPosts = await Promise.all(
          likedPostIds.map(async (postId) => {
            const { data } = await getPostData(postId);
            return data;
          })
        );

        setUserPostData(likedPosts);
      }

      if (selectedTab === 'comments' && userData?.comments) {
        const sortedComments = [...userData.comments].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const latestCommentsMap = new Map<string, Comment>();
        const commentCountMap = new Map<string, number>();

        for (const comment of sortedComments) {
          if (!latestCommentsMap.has(comment.post)) {
            latestCommentsMap.set(comment.post, comment);
          }

          commentCountMap.set(comment.post, (commentCountMap.get(comment.post) || 0) + 1);
        }

        const uniquePostIds = Array.from(latestCommentsMap.keys());

        const commentPosts = await Promise.all(
          uniquePostIds.map(async (postId) => {
            const { data }: { data: Post } = await getPostData(postId);
            return data;
          })
        );

        const postsWithMyLatestComment = commentPosts.map((post) => {
          const myComment = latestCommentsMap.get(post._id);
          const myCommentCount = Math.max(commentCountMap.get(post._id) || 0, 0);

          return {
            ...post,
            comments: myComment ? [myComment] : [],
            myCommentCount,
          };
        });

        setUserPostData(postsWithMyLatestComment);
      }
    };

    fetchData();
  }, [selectedTab]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPostData?.slice(indexOfFirstPost, indexOfLastPost) || [];

  return (
    <div className='ml-[26px] '>
      <p className='mt-[40px] font-semibold text-[18px]'>
        {selectedTab === 'posts' && '작성한 글'}
        {selectedTab === 'likes' && '좋아요한 글'}
        {selectedTab === 'comments' && '댓글 단 글'}
      </p>

      <div className='mt-[31px] w-[682px] min-h-[365px]'>
        {userPostData && userPostData.length === 0 && (
          <p className='text-center whitespace-pre-line text-gray-500 text-sm py-45 border-t-2 leading-[3rem]'>
            {selectedTab === 'posts'
              ? '게시글을 작성해 주세요.'
              : selectedTab === 'likes'
              ? '좋아요를 누른 게시글이 없습니다. '
              : '댓글을 단 게시글이 없습니다. '}
          </p>
        )}

        {currentPosts.map((userPosts, i) => (
          <div
            key={userPosts._id}
            className={`relative flex flex-col gap-2  border-b-2   ${
              i !== currentPosts.length - 1 ? 'border-b-black/30' : ''
            }
            ${i === currentPosts.length - 1 ? 'border-b-black/60' : ''}  
             ${i === 0 ? 'border-t-2 border-t-black/60' : ''} 
            ${selectedTab === 'comments' ? 'py-[6px]' : 'py-4'}`}
          >
            <div className='relative flex items-center py-0.5 align-middle'>
              <div
                className={`absolute left-0 rounded-[28px] border text-[12px] font-bold ml-2 text-white px-[10px] py-[3px] cursor-pointer
          ${
            userPosts.channel.name === 'Vote'
              ? 'bg-[#60A7F7]'
              : userPosts.channel.name === 'MysteryCode'
              ? 'bg-[#10215C]'
              : 'bg-[#3380DE]'
          }`}
                onClick={() => {
                  if (userPosts.channel.name === 'Vote') {
                    navigate('/channel/3');
                  } else if (userPosts.channel.name === 'MysteryCode') {
                    navigate('/channel/1');
                  } else {
                    navigate('/channel/2');
                  }
                }}
              >
                {userPosts.channel.name === 'Vote'
                  ? '골라봐'
                  : userPosts.channel.name === 'MysteryCode'
                  ? '이게 왜 되지?'
                  : '이거 왜 안 쓰지?'}
              </div>

              <div
                className='ml-[130px] flex flex-col cursor-pointer align-middle justify-center'
                onClick={() => {
                  if (userPosts.channel.name === 'Vote') {
                    navigate(`/channel/3/post/${userPosts._id}`);
                  } else if (userPosts.channel.name === 'MysteryCode') {
                    navigate(`/channel/1/post/${userPosts._id}`);
                  } else {
                    navigate(`/channel/2/post/${userPosts._id}`);
                  }
                }}
              >
                <p className='font-semibold text-[15px] truncate max-w-[430px]'>{JSON.parse(userPosts.title).title}</p>

                {selectedTab === 'comments' && userPosts.comments.length > 0 && (
                  <div className='mt-1 text-[12px] text-gray-700 flex'>
                    <img src={comment} />
                    {<p className='ml-[5px]'>+{userPosts.myCommentCount}개</p>}
                  </div>
                )}
              </div>

              <p className='absolute right-0 top-1/2 -translate-y-1/2 w-[100px] text-right font-normal text-[13px] ml-2 shrink-0 pr-[15px] flex '>
                {userPosts.createdAt.slice(0, 10)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {userPostData && userPostData.length > postsPerPage && (
        <div className='mt-8 flex justify-center align-middle'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postsPerPage}
            totalItemsCount={userPostData.length}
            pageRangeDisplayed={6}
            onChange={handlePageChange}
            prevPageText={<span className='text-xl leading-none flex items-center justify-center'>‹</span>}
            nextPageText={<span className='text-xl leading-none flex items-center justify-center'>›</span>}
            firstPageText={<span className='text-xl leading-none flex items-center justify-center'>«</span>}
            lastPageText={<span className='text-xl leading-none flex items-center justify-center'>»</span>}
            innerClass='flex gap-2 text-sm'
            itemClass='px-3 py-1  rounded-[5px] cursor-pointer'
            activeClass='bg-[#1E293B]  text-white'
          />
        </div>
      )}
    </div>
  );
}
