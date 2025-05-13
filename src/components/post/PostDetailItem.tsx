import Avatar from "../avatar/Avatar";
import LikeComment from "../reaction/LikeComment";
import menuIcon from "../../assets/MenuIcon.svg";
import { useEffect, useState } from "react";
import { Comment, Post } from "../../types";
import dayjs from "dayjs";
import { deletePosts, getPostList } from "../../api/post/post";
import { usePostStore } from "../../stores/postStore";
import { useNavigate, useParams } from "react-router-dom";
import CommentListItem from "./CommentListItem";
import { useAuthStore } from "../../stores/authStore";
import DOMPurify from "dompurify";

export default function PostDetailItem(props: Post) {
  // image,
  const { _id, title, author, likes, comments, updatedAt } = props;

  const params = useParams();
  const channel = params.channelId;
  const post = params.postId;

  const navigate = useNavigate();

  //const divRef = useRef<HTMLDivElement | null>(null);

  const channelIdList = usePostStore((state) => state.channelIdList);

  const user = useAuthStore((state) => state.user);

  //const [currentWidth, setCurrentWidth] = useState(0);

  const [commentListItem, setCommentListItem] = useState<Comment[]>([]);

  const [isUser, setIsUser] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const clickMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  const editCodeStyle = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const codes = doc.querySelectorAll("pre");
    codes.forEach((code) => {
      code.style.backgroundColor = "#ececec";
      code.style.padding = "20px";
      code.style.marginTop = "10px";
      code.style.marginBottom = "10px";
      code.style.borderRadius = "8px";
    });

    return doc.body.innerHTML;
  };

  const getDatetimeSortFormat = (update: string): string => {
    const date = dayjs(update).add(9, "hour");
    return date.format("YYYY-MM-DD");
  };

  const getDatetimeFormat = () => {
    const date = dayjs(updatedAt).add(9, "hour");
    return date.format("YYYY.MM.DD");
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

  const clickDeleteHandler = async () => {
    try {
      const { data } = await deletePosts(_id);
      console.log(data);
      window.location.href = `/channel/${channel}`;
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
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
                <div className="flex flex-col w-[91px] h-[70px] rounded-[2px] border border-[#e5e5e5] absolute top-8 right-4">
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
          {getDatetimeFormat()}
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
    </>
  );
}
