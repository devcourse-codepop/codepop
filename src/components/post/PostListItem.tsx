import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
import { Post } from '../../types';
import dayjs from 'dayjs';

export default function PostListItem(props: Post) {
  const { _id, title, image, author, likes, comments, updatedAt } = props;

  const getDatetimeFormat = () => {
    const date = dayjs(updatedAt);
    return date.format('YYYY.MM.DD');
  };

  return (
    <>
      <div className="w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] cursor-pointer relative">
        <div className="flex justify-between h-[85px] pl-3 pt-2.5">
          <Avatar
            name={author.fullName}
            email={author.email}
            image={author.image}
          />
        </div>
        <div className="flex flex-col">
          <div className="pt-[19px] px-[55px] pb-[12px] text-[18px] font-semibold">
            {JSON.parse(title).title}
          </div>
          <div className="pt-[11px] px-[55px] pb-[23px] text-[15px] font-normal opacity-70">
            {JSON.parse(title).content}
          </div>
          {image && (
            <div className="px-[55px] pb-[23px]">
              <img src={image} />
            </div>
          )}
          <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
            {getDatetimeFormat()}
          </div>
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
