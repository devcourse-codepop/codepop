import Avatar from '../avatar/Avatar';
import LikeComment from '../reaction/LikeComment';
import menuIcon from '../../assets/MenuIcon.svg';
import { useEffect, useRef, useState } from 'react';
import { Comment, Post } from '../../types';
import dayjs from 'dayjs';
import { getPostList } from '../../api/post/post';
import { usePostStore } from '../../stores/postStore';
import { useNavigate, useParams } from 'react-router-dom';
import CommentListItem from './CommentListItem';
import { useAuthStore } from '../../stores/authStore';
import DOMPurify from 'dompurify';
import CheckDeleteModal from './CheckDeleteModal';

export default function PostDetailItem(props: Post) {
  // image,
  const { _id, title, author, likes, comments, createdAt } = props;

  const params = useParams();
  const channel = params.channelId;
  const post = params.postId;

  const navigate = useNavigate();

  //const divRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const channelIdList = usePostStore((state) => state.channelIdList);

  const user = useAuthStore((state) => state.user);

  //const [currentWidth, setCurrentWidth] = useState(0);

  const [commentListItem, setCommentListItem] = useState<Comment[]>([]);

  const [isUser, setIsUser] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const clickMenuHandler = () => {
    setIsOpen(!isOpen);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editCodeStyle = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const codes = doc.querySelectorAll('pre');
    const codeStr = '<span>&lt;/&gt;</span>';
    codes.forEach((code) => {
      code.style.backgroundColor = '#ececec';
      code.style.padding = '20px';
      code.style.paddingTop = '2px';
      code.style.marginTop = '10px';
      code.style.marginBottom = '10px';
      code.style.borderRadius = '8px';
      code.innerHTML = codeStr + '<br/><br/>' + code.innerHTML;

      const span = code.querySelector('span');
      span!.style.fontSize = '12px';
      span!.style.opacity = '30%';
      span!.style.marginLeft = '-9px';
    });

    return doc.body.innerHTML;
  };

  const getDatetimeSortFormat = (update: string): string => {
    const date = dayjs(update).add(9, 'hour');
    return date.format('YYYY-MM-DD HH:mm:ss');
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

  const checkPostUser = () => {
    if (author._id === user?._id) {
      setIsUser(true);
    }
  };

  const filteringItem = (data: Post[]) => {
    for (const res of data) {
      if (res._id === post) {
        setCommentListItem(res.comments);
      }
    }
  };

  const getPostItem = async () => {
    try {
      const { data } = await getPostList(channelIdList[Number(channel) - 1]);
      filteringItem(data);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  const clickUpdateHandler = () => {
    navigate(`/channel/${channel}/update/${post}`);
  };

  const clickDeleteHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModalHanlder = () => {
    setIsDeleteModalOpen(false);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      getPostItem();
      checkPostUser();
    }
  }, [user]);

  // useEffect(() => {
  //   if (divRef.current) {
  //     const width = divRef.current.offsetWidth;
  //     console.log('width:', width);
  //     setCurrentWidth(width);
  //   }
  // }, []);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeHandler();
      }
    };

    window.addEventListener('mousedown', clickHandler);
    return () => window.removeEventListener('mousedown', clickHandler);
  }, [modalRef]);

  return (
    <>
      <div
        className="w-full h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative"
        //ref={divRef}
      >
        <div className="flex justify-between h-[85px] pl-3 pt-2.5">
          <Avatar
            name={author.fullName}
            email={author.email}
            image={author.image}
            isOnline={author.isOnline}
          />
          {/* 사용자 이름과 글쓴이 이름이 일치할 경우 */}
          {isUser && (
            <>
              <div
                onClick={clickMenuHandler}
                className="w-9 h-9 pr-2.5 cursor-pointer"
              >
                <img src={menuIcon} />
              </div>
              {isOpen && (
                // shadow-[1px_2px_3px_rgba(0,0,0,0.25)]
                <div
                  className="flex flex-col w-[91px] h-[70px] rounded-[2px] border border-[#e5e5e5] absolute top-8 right-4"
                  ref={modalRef}
                >
                  <div
                    className="flex justify-center items-center text-[12px] h-[34px] cursor-pointer"
                    onClick={clickUpdateHandler}
                  >
                    수정하기
                  </div>
                  <hr className="opacity-10" />
                  <div
                    className="flex justify-center items-center text-[12px] text-[#FF0404] h-[34px] cursor-pointer"
                    onClick={clickDeleteHandler}
                  >
                    삭제하기
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col px-[55px] py-[15px] gap-[22px]">
          <div className="text-[20px] font-semibold">
            {JSON.parse(title).title}
          </div>
          {/* w-[500px] */}
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                editCodeStyle(JSON.parse(title).content)
              ),
            }}
            className="text-[15px] font-normal"
          />
          {/* {image && (
            <div>
              <img
                src={image}
                className="max-w-[626px] max-h-[626px] border border-[#e0e0e0] rounded-[5px]"
              />
            </div>
          )} */}
        </div>
        <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
          {/* {getDatetimeFormat()} */}
          {getElapsedTime()}
        </div>
        <hr className="mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">
          <LikeComment
            likeCount={likes.length}
            commentCount={comments.length}
            postId={_id}
            postUserId={author._id}
            likes={likes}
          />
        </div>
        <div>
          {commentListItem.length === 0 && (
            // <div className="flex flex-col justify-center items-center gap-5 text-sm font-medium pb-12">
            //   <div>댓글이 없습니다!</div>
            //   <div>새로운 댓글을 작성해 보세요!</div>
            // </div>
            <></>
          )}
          {commentListItem.length !== 0 &&
            [...commentListItem]
              .sort(
                (a, b) =>
                  new Date(getDatetimeSortFormat(a.updatedAt)).getTime() -
                  new Date(getDatetimeSortFormat(b.updatedAt)).getTime()
              )
              .map((item) => <CommentListItem key={item._id} {...item} />)}
        </div>
      </div>
      {isDeleteModalOpen && (
        <CheckDeleteModal
          type="POST"
          channel={String(channel)}
          _id={_id}
          closeDeleteModalHanlder={closeDeleteModalHanlder}
        />
      )}
    </>
  );
}
