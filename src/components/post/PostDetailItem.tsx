import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
import voteBtn from '../../assets/VoteBtn.svg';
import menuIcon from '../../assets/MenuIcon.svg';
import { useState } from 'react';
import CommentListItem from './CommentListItem';
import profileImage from '../../assets/images/avatar.svg';

export default function PostDetailItem({
  title,
  updatedAt,
}: {
  title: { title: string; content: string };
  updatedAt: string;
}) {
  // const getDatetimeFormat = () => {
  //   const date = dayjs(updatedAt);
  //   return date.format("YYYY.MM.DD");
  // };

  const [isOpen, setIsOpen] = useState(false);
  const clickMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  // const [isLiking, setIsLiking] = useState(false);
  // const clickLikeHandler = () => {
  //   setIsLiking(!isLiking);
  // };

  const json = {
    content: '당연히 지피티 아닌가요,,?',
    likeCount: 12,
  };

  const arrCommentListItem = [
    <CommentListItem
      comment={json}
      author={{ fullName: '사용자2' }}
      updatedAt="1시간 전"
    />,
    <CommentListItem
      comment={json}
      author={{ fullName: '사용자2' }}
      updatedAt="1시간 전"
    />,
    <CommentListItem
      comment={json}
      author={{ fullName: '사용자2' }}
      updatedAt="1시간 전"
    />,
  ];

  return (
    <>
      <div className="w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative">
        <div className="flex justify-between h-[85px] pl-3 pt-2.5">
          <Avatar
            name="사용자"
            email="user123@gmail.com"
            image={profileImage}
          />
          {/* 사용자 이름과 글쓴이 이름이 일치할 경우 */}
          <div
            onClick={clickMenuHandler}
            className="w-9 h-9 pr-2.5 cursor-pointer"
          >
            <img src={menuIcon} />
          </div>
          {isOpen && (
            <div className="flex flex-col w-[91px] h-[70px] rounded-[2px] shadow-[1px_2px_3px_rgba(0,0,0,0.25)] absolute top-8 right-4">
              <div className="flex justify-center items-center text-[12px] h-[34px] cursor-pointer">
                수정하기
              </div>
              <hr className="opacity-10" />
              <div className="flex justify-center items-center text-[12px] text-[#FF0404] h-[34px] cursor-pointer">
                삭제하기
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="pt-[19px] px-[55px] pb-[12px] text-[20px] font-semibold">
            {title.title}
          </div>
          <div className="pt-[11px] px-[55px] pb-[23px] text-[15px] font-normal">
            {title.content}
          </div>
          <div className="px-[55px] pb-[23px]">
            <img src={voteBtn} />
          </div>
          <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
            {updatedAt}
            {/* {getDatetimeFormat()} */}
          </div>
        </div>
        <hr className="mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">
          {/* <LikeComment likeCount={12} commentCount={10} /> */}
        </div>
        <div>
          {arrCommentListItem.map((item) => item)}
          {/* <CommentListItem
            comment={json}
            author={{ fullName: '사용자2' }}
            updatedAt="1시간 전"
          /> */}
        </div>
      </div>
    </>
  );
}
