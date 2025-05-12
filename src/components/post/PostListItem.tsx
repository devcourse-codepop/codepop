import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
import { Post } from '../../types';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import NotLoginModal from './NotLoginModal';
import DOMPurify from 'dompurify';

export default function PostListItem(props: Post) {
  const { _id, title, image, author, likes, comments, updatedAt } = props;

  const params = useParams();
  const channel = params.channelId;

  const navigate = useNavigate();

  // const divRef = useRef<HTMLDivElement | null>(null);

  // const [currentWidth, setCurrentWidth] = useState(0);

  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeImgTags = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const imgs = doc.querySelectorAll('img');
    imgs.forEach((img) => img.remove());

    const codes = doc.querySelectorAll('pre');
    codes.forEach((code) => code.remove());

    return doc.body.innerHTML;
  };

  const getDatetimeFormat = () => {
    const date = dayjs(updatedAt).add(9, 'hour');
    return date.format('YYYY.MM.DD');
  };

  const getTitleSubstr = () => {
    const totalLength = image ? 35 : 53;
    //const totalLength = Math.floor(currentWidth / 26);
    if (removeImgTags(JSON.parse(title).title).length > totalLength) {
      const newStr =
        removeImgTags(JSON.parse(title).title).substr(0, totalLength) + ' ...';
      console.log(newStr);
      return newStr;
    }
    return removeImgTags(JSON.parse(title).title);
  };

  const getContentSubstr = () => {
    const totalLength = 250;
    //const lineChangeLength = 55;
    //let count = 0;
    if (removeImgTags(JSON.parse(title).content).length > totalLength) {
      const newStr =
        removeImgTags(JSON.parse(title).content).substr(0, totalLength) +
        ' ...';
      // for (let i = 0; i < newStr.length; i++) {
      //   count++;
      //   if (count === lineChangeLength) {
      //     newStr = newStr.slice(0, i) + '\n' + newStr.slice(i);
      //     count = 0;
      //     i = i + 1;
      //   }
      // }
      console.log(newStr);
      return newStr;
    }
    return removeImgTags(JSON.parse(title).content);
  };

  const clickPostHandler = () => {
    if (user) {
      navigate(`/channel/${channel}/post/${_id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModalHanlder = () => {
    setIsModalOpen(false);
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
            <div className="postTitle text-[18px] font-semibold">
              {getTitleSubstr()}
            </div>
            {/* w-[500px] */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getContentSubstr()),
              }}
              className="postContent text-[15px] font-normal"
            />
          </div>
          {image && (
            <div className="border border-[#e0e0e0] rounded-[5px]">
              <img src={image} className="w-[226px] h-[226px]" />
            </div>
          )}
        </div>
        <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
          {getDatetimeFormat()}
        </div>
        <hr className="mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">
          <LikeComment
            likeCount={likes.length}
            commentCount={comments.length}
            postId={_id}
            postUserId={author?._id}
            likes={likes}
          />
        </div>
      </div>
      {isModalOpen && <NotLoginModal closeModalHanlder={closeModalHanlder} />}
    </>
  );
}
