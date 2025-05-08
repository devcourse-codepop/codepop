import ChannelName from '../components/channel/ChannelName';
// import Header from '../components/header/Header';
// import DropSort from '../components/post/DropSort';
import PostListItem from '../components/post/PostListItem';
// import SearchPost from '../components/post/SearchPost';
import ChannelBox from '../components/sidebar/ChannelBox';
import MemberBox from '../components/sidebar/MemberBox';
import postBtn from '../assets/PostBtn.svg';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPostList } from '../api/post/post';
import { usePostStore } from '../store/postStore';
import { axiosInstance } from '../api/axios';
import { Post } from '../types';

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
          title: '제목입니다',
          content: '내용입니다',
        }),
        image: null,
        channelId: channelIdList[Number(channel) - 1],
      });
      console.log(data);
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
      {/* <div className="">
        <Header />
      </div> */}
      {/* h-[calc(100vh-100px)] */}
      <div className="flex mx-[60px] relative ">
        <div className="flex flex-col gap-[50px] pb-[60px]">
          <ChannelBox channelId={String(channel)} />
          <MemberBox />
          {/* <div className="">
            <MemberBox />
          </div> */}
        </div>
        <div className="w-full ml-[50px] ">
          <div className="flex justify-between items-end pb-5">
            <div>
              <ChannelName
                subtitle='"이거 왜 되지?"'
                title="미스터리 코드 공유 채널"
                channelId="1"
              />
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
                <Search className="w-[19.94px] h-[19.94px] text-[#86879C]" />
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
          <div className="flex flex-col gap-[50px] max-h-[605px] overflow-auto">
            {select === 'recent' &&
              postListItem.map(function (item) {
                if (
                  JSON.parse(item.title).title.includes(input) ||
                  JSON.parse(item.title).content.includes(input)
                )
                  return <PostListItem key={item._id} {...item} />;
              })}
            {select === 'popular' &&
              postListItem
                .sort((a, b) => b.likes.length - a.likes.length)
                .map(function (item) {
                  if (
                    JSON.parse(item.title).title.includes(input) ||
                    JSON.parse(item.title).content.includes(input)
                  )
                    return <PostListItem key={item._id} {...item} />;
                })}
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
