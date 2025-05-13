import ChannelName from '../components/channel/ChannelName';
import PostListItem from '../components/post/PostListItem';
import postBtn from '../assets/PostBtn.svg';
import topBtn2 from '../assets/images/topBtn2.png';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostList, getSearchPostList } from '../api/post/post';
import { usePostStore } from '../stores/postStore';
import { Post } from '../types';
import dayjs from 'dayjs';
import { useAuthStore } from '../stores/authStore';

interface Theme {
  name: string;
}

export default function PostList({ theme }: { theme: Theme }) {
  const params = useParams();
  const channel = params.channelId;

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const channelIdList = usePostStore((state) => state.channelIdList);

  const [isLogin, setIsLogin] = useState(false);
  const [postListItem, setPostListItem] = useState<Post[]>([]);

  const [input, setInput] = useState('');
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [select, setSelect] = useState('recent');
  const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const [showTopButton, setShowTopButton] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getDatetimeFormat = (update: string): string => {
    const date = dayjs(update);
    return date.format('YYYY-MM-DD HH:mm:ss');
  };

  const scrollHandler = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scrollTop = scrollElement.scrollTop;
      setShowTopButton(scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const createNewPost = () => {
    navigate(`/channel/${channel}/write`);
  };

  const filteringItem = (data: Post[]) => {
    const temp = [];
    for (const item of postListItem) {
      for (const res of data) {
        if (item._id === res._id) {
          temp.push(item);
        }
      }
    }
    setPostListItem(temp);
  };

  const clickSearchHandler = async () => {
    try {
      const { data } = await getSearchPostList(input);
      filteringItem(data);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  const getPostListItem = async () => {
    try {
      const { data } = await getPostList(channelIdList[Number(channel) - 1]);
      console.log(data);
      setPostListItem(data);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  useEffect(() => {
    if (user) setIsLogin(true);
    getPostListItem();
  }, [user]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', scrollHandler);
      }
    };
  }, []);

  return (
    <>
      {/* mx-[60px] h-[calc(100vh-100px)] */}
      <div className="flex ">
        {/* w-full ml-[50px]  */}
        <div className="w-full ">
          <div className="flex justify-between items-end pb-[30px]">
            <div>
              <ChannelName channelId={String(channel)} theme={theme} />
            </div>
            <div className="flex gap-2.5">
              {/* <SearchPost /> */}
              <div className="w-[205px] h-[31px] flex items-center bg-white rounded-[5px] px-2.5 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => changeInputHandler(e)}
                  placeholder="검색"
                  className="flex-grow text-[11px] outline-none placeholder-[#989898]"
                />
                <Search
                  className="w-[19.94px] h-[19.94px] text-[#86879C] cursor-pointer"
                  onClick={clickSearchHandler}
                />
              </div>
              {/* <DropSort /> */}
              <select
                value={select}
                onChange={(e) => changeSelectHandler(e)}
                className="w-[86px] h-[31px] bg-white pl-[11px] py-1.5 rounded-[5px] cursor-pointer text-[11px]"
              >
                <option value="recent">최신순</option>
                <option value="popular">인기순</option>
              </select>
            </div>
          </div>
          {/* max-h-[605px] */}
          <div
            className="flex flex-col gap-[30px] pb-5 max-h-[calc(100vh-100px-120px)] overflow-auto"
            ref={scrollRef}
          >
            {postListItem.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-5 text-lg font-semibold pt-16 opacity-60">
                <div>게시글이 없습니다!</div>
                <div>새로운 게시글을 작성해 보세요!</div>
              </div>
            )}
            {postListItem.length !== 0 &&
              select === 'recent' &&
              [...postListItem]
                .sort(
                  (a, b) =>
                    new Date(getDatetimeFormat(b.createdAt)).getTime() -
                    new Date(getDatetimeFormat(a.createdAt)).getTime()
                )
                .map((item) => (
                  <PostListItem key={item._id} {...item} theme={theme} />
                ))}
            {postListItem.length !== 0 &&
              select === 'popular' &&
              [...postListItem]
                .sort((a, b) => {
                  if (b.likes.length - a.likes.length !== 0)
                    return b.likes.length - a.likes.length;
                  else return b.comments.length - a.comments.length;
                })
                .map((item) => (
                  <PostListItem key={item._id} {...item} theme={theme} />
                ))}
          </div>
        </div>
      </div>
      {showTopButton && (
        <div className="absolute right-[39%] bottom-[38px] cursor-pointer flex justify-center items-center w-14 h-14 rounded-[50%] bg-white shadow-[1px_3px_3px_rgba(0,0,0,0.25)]">
          <img
            src={topBtn2}
            onClick={scrollToTop}
            alt="top 버튼"
            className="w-5 h-5"
          />
        </div>
      )}
      {isLogin && (
        <div className="absolute right-35 bottom-5 cursor-pointer">
          <img src={postBtn} onClick={createNewPost} alt="게시글 작성 버튼" />
        </div>
      )}
    </>
  );
}
