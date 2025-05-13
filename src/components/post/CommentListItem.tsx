import menuIcon from '../../assets/MenuIcon.svg';
import userImg from '../../assets/images/header/userImg.svg';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Comment } from '../../types';
import { useAuthStore } from '../../stores/authStore';
import { deleteComments } from '../../api/post/post';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

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

  const editCodeStyle = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const codes = doc.querySelectorAll('pre');
    codes.forEach((code) => {
      code.style.backgroundColor = '#ececec';
      code.style.padding = '20px';
      code.style.marginTop = '10px';
      code.style.marginBottom = '10px';
      code.style.borderRadius = '8px';
    });

    return doc.body.innerHTML;
  };

  const getElapsedTime = () => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(updatedAt).add(9, 'hour');
    // const now = dayjs();
    // const writeTime = dayjs(updatedAt);

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
          <div className="flex items-center gap-3 pl-4 pt-1">
            <img
              src={author.image ? author.image : userImg}
              alt="사용자"
              className="w-9 h-9 rounded-[50%]"
            />
            <span className="text-[13px] font-semibold">{author.fullName}</span>
            <span className="text-[11px] opacity-60 font-light">
              {getElapsedTime()}
            </span>
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
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                editCodeStyle(JSON.parse(comment).content)
              ),
            }}
            className="py-[11px] px-4 text-sm font-normal"
          />
        </div>
        <div className="flex justify-end items-center gap-1.5 px-4 pb-3"></div>
      </div>
    </>
  );
}
