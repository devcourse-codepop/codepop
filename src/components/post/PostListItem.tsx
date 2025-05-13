import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
//import CodeIcon from '../../assets/CodeEditIcon.svg';
import { Post } from '../../types';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import NotLoginModal from './NotLoginModal';
import DOMPurify from 'dompurify';
import DeletedUserModal from './DeletedUserModal';
import { useChannelItemStore } from '../../stores/channelStore';

export default function PostListItem(props: Post) {
  const { _id, title, image, author, likes, comments, createdAt, channel } =
    props;
  const { channels } = useChannelItemStore();
  // const params = useParams();
  // const channel = params.channelId;

  const navigate = useNavigate();

  // const divRef = useRef<HTMLDivElement | null>(null);

  // const [currentWidth, setCurrentWidth] = useState(0);

  const user = useAuthStore((state) => state.user);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  let codes;

  const removeImgTags = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const imgs = doc.querySelectorAll('img');
    imgs.forEach((img) => img.remove());

    // const codes = doc.querySelectorAll('pre');
    codes = doc.querySelectorAll('pre');
    codes.forEach((code) => {
      code.remove();
    });

    return doc.body.innerHTML;
  };

  const setCodeCount = () => {
    if (codes.length > 0) return codes.length;
  };

  // const getDatetimeFormat = () => {
  //   const date = dayjs(createdAt).add(9, 'hour');
  //   return date.format('YYYY.MM.DD');
  // };

  const getElapsedTime = () => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(createdAt).add(9, 'hour');
    // const now = dayjs();
    // const writeTime = dayjs(createdAt);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    // return `${Math.floor(gap / 86400)}일 전`;
    return writeTime.format('YYYY.MM.DD');
  };

  const clickPostHandler = () => {
    if (user) {
      if (!author) {
        setIsUserModalOpen(true);
      } else {
        channels.map((cha) => {
          if (cha.id === channel._id) {
            navigate(`${cha.to}/post/${_id}`);
          }
        });
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const closeLoginModalHanlder = () => {
    setIsLoginModalOpen(false);
  };

  const closeUserModalHanlder = () => {
    setIsUserModalOpen(false);
  };

  // useEffect(() => {
  //   if (divRef.current) {
  //     const width = divRef.current.offsetWidth;
  //     console.log('width:', width);
  //     setCurrentWidth(width);
  //   }
  // }, []);

  return (
    <>
      <div
        className="w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative"
        // ref={divRef}
      >
        <div className="flex justify-between h-[85px] pl-3 pt-2.5">
          <Avatar
            name={author?.fullName}
            email={author?.email}
            image={author?.image}
            isOnline={author?.isOnline}
          />
        </div>
        <div
          className={twMerge(
            'flex justify-between px-[55px] py-[15px] gap-[55px] cursor-pointer',
            !image && 'py-[23px]'
          )}
          onClick={clickPostHandler}
        >
          <div
            className={twMerge(
              'flex flex-col justify-center w-full gap-[22px] ',
              image && 'max-w-[635px]'
            )}
          >
            <div className="postTitle text-[18px] font-semibold truncate">
              {JSON.parse(title).title}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  removeImgTags(JSON.parse(title).content)
                ),
              }}
              className="postContent text-[15px] font-normal line-clamp-5"
            />
            {/* {setCodeCount() > 0 && (
              <div className="flex justify-end text-[14px] opacity-70">
                +<span className="text-[#ff0000]">{setCodeCount()}</span>개의
                코드 블록
              </div>
            )} */}
          </div>
          {image && (
            <div className="border border-[#e0e0e0] rounded-[5px]">
              <img src={image} className="w-[226px] h-[226px]" />
            </div>
          )}
        </div>
        <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
          {/* {getDatetimeFormat()} */}
          {getElapsedTime()}
        </div>
        <hr className="mx-[18px] text-[#b2b2b2]" />
        {/* <div className="flex justify-between h-[59px]"> */}
        <div
          className={twMerge(
            'flex h-[59px]',
            setCodeCount() > 0 ? 'justify-between' : 'justify-end'
          )}
        >
          {/* {setCodeCount() > 0 && (
            <div className="flex justify-center items-center text-[14px] opacity-70">
              +<span className="text-[#ff0000]">{setCodeCount()}</span>개의 코드
              블록
            </div>
          )} */}
          {/* {setCodeCount() > 0 && (
            <div className="flex justify-center items-center text-[14px]">
              <img
                src={CodeIcon}
                alt="코드 아이콘"
                className="mr-2 opacity-60"
              />
              +<span className="text-[#ff0000]">{setCodeCount()}</span>
            </div>
          )} */}
          {setCodeCount() > 0 && (
            <div className="flex justify-center items-center text-[14px] opacity-70 ml-5">
              +<span className="text-[#ff0000]">{setCodeCount()}</span>개의 코드
              블록
            </div>
          )}
          <LikeComment
            likeCount={likes.length}
            commentCount={comments.length}
            postId={_id}
            postUserId={author?._id}
            likes={likes}
          />
        </div>
      </div>
      {isLoginModalOpen && (
        <NotLoginModal closeLoginModalHanlder={closeLoginModalHanlder} />
      )}
      {isUserModalOpen && (
        <DeletedUserModal closeUserModalHanlder={closeUserModalHanlder} />
      )}
    </>
  );
}
