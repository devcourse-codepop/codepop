// import LikeComment from '../reaction/LikeComment';
// import likeClick from '../../assets/LikeClick.svg';
// import likeRed from '../../assets/images/LikeRed.svg';
import menuIcon from '../../assets/MenuIcon.svg';
import userImg from '../../assets/images/header/userImg.svg';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useAuthStore } from '../../stores/authStore';
import { deleteComments } from '../../api/post/post';
import { useParams } from 'react-router-dom';

export default function CommentListItem(props: Comment) {
  const { _id, comment, author, post, updatedAt } = props;

  const params = useParams();
  const channel = params.channelId;
  //const post = params.postId;

  const user = useAuthStore((state) => state.user);

  const [isUser, setIsUser] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const clickMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  // const [isLiking, setIsLiking] = useState(false);
  // const clickLikeHandler = () => {
  //   setIsLiking(!isLiking);
  // };

  const getElapsedTime = () => {
    // const now = dayjs().add(9, 'hour');
    const now = dayjs();
    const writeTime = dayjs(updatedAt);

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    // return `${Math.floor(gap / 86400)}일 전`;
    return writeTime.format('YYYY.MM.DD');
  };

  const checkCommentUser = () => {
    if (author._id === user?._id) {
      setIsUser(true);
    }
  };

  const clickDeleteHandler = async () => {
    try {
      const { data } = await deleteComments(_id);
      console.log(data);
      window.location.href = `/channel/${channel}/post/${post}`;
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  useEffect(() => {
    if (user) {
      checkCommentUser();
    }
  }, [user]);

  return (
    <>
      <div className="h-auto rounded-[5px] bg-white border border-[#b4b4b4] mx-7 mb-[30px] relative">
        <div className="flex justify-between pt-2.5">
          {/* <Avatar
            name="사용자"
            email="user123@gmail.com"
            image="../src/assets/images/avatar.svg"
          /> */}
          <div className="flex items-center gap-3 pl-4 pt-1">
            <img
              src={author.image ? author.image : userImg}
              alt="사용자"
              className="w-9 h-9"
            />
            {/* <div className="flex flex-col"> */}
            <span className="text-[13px] font-semibold">{author.fullName}</span>
            <span className="text-[11px] opacity-60 font-light">
              {getElapsedTime()}
            </span>
            {/* <span className="text-xs opacity-60">{email}</span> */}
            {/* </div> */}
          </div>
          {/* 사용자 이름과 댓쓴이 이름이 일치할 경우 */}
          {isUser && (
            <>
              <div
                onClick={clickMenuHandler}
                className="w-9 h-9 pr-2.5 cursor-pointer"
              >
                <img src={menuIcon} />
              </div>
              {isOpen && (
                <div
                  className="flex justify-center items-center text-[12px] text-[#FF0404] rounded-[2px] w-[91px] h-[34px] shadow-[1px_2px_3px_rgba(0,0,0,0.25)] cursor-pointer absolute top-8 right-4"
                  onClick={clickDeleteHandler}
                >
                  삭제하기
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col">
          {/* <div className="pt-[19px] px-[55px] pb-[12px] text-[20px] font-semibold">
            {title.title}
          </div> */}
          <div className="py-[11px] px-4 text-sm font-normal">
            {JSON.parse(comment).content}
          </div>
          {JSON.parse(comment).image && (
            <div className="px-[55px] pb-[23px]">
              <img src={JSON.parse(comment).image} />
            </div>
          )}

          {/* <div className="flex justify-end pr-4 text-[#808080] text-[12px] font-light">
            {updatedAt}
            {getDatetimeFormat()}
          </div> */}
        </div>
        {/* <hr className="mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">
          <LikeComment likeCount={12} commentCount={10} />
        </div> */}
        <div className="flex justify-end items-center gap-1.5 px-4 pb-3">
          {/* <img
            src={isLiking ? likeRed : likeClick}
            alt="좋아요"
            onClick={clickLikeHandler}
            className="w-[18px] h-[18px] cursor-pointer"
          />
          <span className="text-[13px]">{comment.likeCount}</span> */}

          {/* <LikeComment
            likeCount={likes.length}
            commentCount={comments.length}
            postId={_id}
            likes={likes}
          /> */}
        </div>
      </div>
    </>
  );
}
