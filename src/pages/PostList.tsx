import ChannelName from '../components/channel/ChannelName';
import PostListItem from '../components/post/PostListItem';
//import ChannelBox from '../components/sidebar/ChannelBox';
//import MemberBox from '../components/sidebar/MemberBox';
import postBtn from '../assets/PostBtn.svg';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPostList, getSearchPostList } from '../api/post/post';
import { usePostStore } from '../stores/postStore';
import { axiosInstance } from '../api/axios';
import { Post } from '../types';
import dayjs from 'dayjs';

export default function PostList() {
  const params = useParams();
  const channel = params.channelId;

  const channelIdList = usePostStore((state) => state.channelIdList);

  const [postListItem, setPostListItem] = useState<Post[]>([]);

  const [input, setInput] = useState('');
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [select, setSelect] = useState('recent');
  const changeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  const getDatetimeFormat = (update: string): string => {
    const date = dayjs(update);
    return date.format('YYYY-MM-DD');
  };

  // 임시
  //const [newChannel, setNewChannel] = useState([]);
  //const [upcoming, setUpcoming] = useState<MovieType[]>([]);

  // const createNewChannel = async () => {
  //   try {
  //     const { data } = await axiosInstance.post('/channels/create', {
  //       authRequired: false,
  //       description: 'code',
  //       name: 'mysteryCodeChannel',
  //     });
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e instanceof Error && e.message);
  //   }
  // };

  const createNewPost = async () => {
    try {
      const { data } = await axiosInstance.post('/posts/create', {
        title: JSON.stringify({
          title:
            '이 부분 모르겠어요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
          content:
            '어렵네용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
        }),
        image: null,
        channelId: channelIdList[Number(channel) - 1],
      });
      console.log(data);
      window.location.href = `/channel/${channel}`;
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  // const createNewChannel = async () => {
  //   try {
  //     const { data } = await axiosInstance.delete('/channels/delete', {
  //       id: '680b34ed77f8f312711be2d7',
  //     });
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e instanceof Error && e.message);
  //   }
  // };

  // const createNewChannel = async () => {
  //   try {
  //     const { data } = await axiosInstance.get('/channels/테스트용');
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e instanceof Error && e.message);
  //   }
  // };

  // const createNewChannel = async () => {
  //   try {
  //     const { data } = await axiosInstance.get(
  //       '/posts/author/6809706977f8f312711be0d6'
  //     );
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e instanceof Error && e.message);
  //   }
  // };

  // const createNewChannel = async () => {
  //   try {
  //     const { data } = await axiosInstance.post('/login', {
  //       email: 'admin@programmers.co.kr',
  //       password: 'programmers',
  //     });
  //     console.log(data);
  //   } catch (e) {
  //     console.log(e instanceof Error && e.message);
  //   }
  // };

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
    getPostListItem();
  }, []);

  return (
    <>
      {/* mx-[60px] h-[calc(100vh-100px)] */}
      <div className="flex relative ">
        {/* <div className="flex flex-col gap-[30px] pb-[60px]">
          <ChannelBox channelId={String(channel)} />
          <MemberBox />
        </div> */}

        {/* w-full ml-[50px]  */}
        <div className="">
          <div className="flex justify-between items-end pb-[30px]">
            <div>
              <ChannelName channelId={String(channel)} />
            </div>
            <div className="flex gap-2.5">
              {/* <SearchPost /> */}
              <div className="w-[205px] h-[31px]  flex items-center bg-white rounded-[5px] px-2.5 py-2">
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
          {/* max-h-[640px] */}
          <div className="flex flex-col gap-[30px] max-h-[605px] overflow-auto">
            {postListItem.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-5 text-lg font-bold pt-16">
                <div>게시글이 없습니다!</div>
                <div>새로운 게시글을 작성해 보세요!</div>
              </div>
            )}
            {/* {postListItem.length !== 0 &&
              select === 'recent' &&
              [...postListItem]
                .sort(
                  (a, b) =>
                    new Date(getDatetimeFormat(b.updatedAt)).getTime() -
                    new Date(getDatetimeFormat(a.updatedAt)).getTime()
                )
                .map(function (item) {
                  if (
                    JSON.parse(item.title).title.includes(input) ||
                    JSON.parse(item.title).content.includes(input)
                  )
                    return <PostListItem key={item._id} {...item} />;
                })}
            {postListItem.length !== 0 &&
              select === 'popular' &&
              [...postListItem]
                .sort((a, b) => b.likes.length - a.likes.length)
                .map(function (item) {
                  if (
                    JSON.parse(item.title).title.includes(input) ||
                    JSON.parse(item.title).content.includes(input)
                  )
                    return <PostListItem key={item._id} {...item} />;
                })} */}
            {postListItem.length !== 0 &&
              select === 'recent' &&
              [...postListItem]
                .sort(
                  (a, b) =>
                    new Date(getDatetimeFormat(b.updatedAt)).getTime() -
                    new Date(getDatetimeFormat(a.updatedAt)).getTime()
                )
                .map((item) => <PostListItem key={item._id} {...item} />)}
            {postListItem.length !== 0 &&
              select === 'popular' &&
              [...postListItem]
                .sort((a, b) => b.likes.length - a.likes.length)
                .map((item) => <PostListItem key={item._id} {...item} />)}
          </div>
        </div>
        <div className="absolute right-[-30px] bottom-7 cursor-pointer">
          {/* <img src={postBtn} alt="게시글 작성 버튼" /> */}
          <img src={postBtn} onClick={createNewPost} alt="게시글 작성 버튼" />
        </div>
      </div>
    </>
  );
}
