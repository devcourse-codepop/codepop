import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
import { Post } from '../../types';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function PostListItem(props: Post) {
  const { _id, title, image, author, likes, comments, updatedAt } = props;

  const params = useParams();
  const channel = params.channelId;

  const navigate = useNavigate();

  const getDatetimeFormat = () => {
    const date = dayjs(updatedAt);
    return date.format('YYYY.MM.DD');
  };

  const getTitleSubstr = () => {
    const totalLength = 30;
    if (JSON.parse(title).title.length > totalLength) {
      const newStr = JSON.parse(title).title.substr(0, totalLength) + ' ...';
      console.log(newStr);
      return newStr;
    }
    return JSON.parse(title).title;
  };

  const getContentSubstr = () => {
    const totalLength = 250;
    const lineChangeLength = 55;
    let count = 0;
    if (JSON.parse(title).content.length > totalLength) {
      let newStr = JSON.parse(title).content.substr(0, totalLength) + ' ...';
      for (let i = 0; i < newStr.length; i++) {
        count++;
        if (count === lineChangeLength) {
          newStr = newStr.slice(0, i) + '\n' + newStr.slice(i);
          count = 0;
          i = i + 1;
        }
      }
      console.log(newStr);
      return newStr;
    }
    return JSON.parse(title).content;
  };

  const clickPostHandler = () => {
    navigate(`/channel/${channel}/post/${_id}`);
  };

  return (
    <>
      <div
        className="w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer relative"
        onClick={clickPostHandler}
      >
        <div className="flex justify-between h-[85px] pl-3 pt-2.5">
          <Avatar
            name={author.fullName}
            email={author.email}
            image={author.image}
          />
        </div>
        <div
          className={twMerge(
            'flex justify-between px-[55px] py-[15px] gap-[55px]',
            !image && 'py-[23px]'
          )}
        >
          <div className="flex flex-col justify-center gap-[22px] ">
            <div className="text-[18px] font-semibold">
              {/* {JSON.parse(title).title} */}
              {getTitleSubstr()}
            </div>
            {/* w-[500px] */}
            <div className="text-[15px] font-normal opacity-70 w-[500px]">
              {/* {JSON.parse(title).content} */}
              {getContentSubstr()}
            </div>
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
            likes={likes}
          />
        </div>
      </div>
    </>
  );
}
