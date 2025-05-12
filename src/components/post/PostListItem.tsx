



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

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export default function PostListItem(props: Post) {
  const { _id, title, image, author, likes, comments, updatedAt } = props;

  const parsed = JSON.parse(title); // { title, content, pollOptions? }
  const { title: parsedTitle, content: parsedContent, pollOptions } = parsed;

  const [options, setOptions] = useState<PollOption[]>(
    (pollOptions || []).map((opt: PollOption) => ({
      ...opt,
      votes: typeof opt.votes === "number" ? opt.votes : 0,
    }))
  );

  const [hasVoted, setHasVoted] = useState(false);
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const params = useParams();
  const channel = params.channelId;

  const navigate = useNavigate();
const handleVote = (id: number) => {
    const updated = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setOptions(updated);
    setHasVoted(true);
  };
<<<<<<< HEAD
  

  const getDatetimeFormat = () => {
    return dayjs(updatedAt).format("YYYY.MM.DD");
=======
  // const divRef = useRef<HTMLDivElement | null>(null);

  // const [currentWidth, setCurrentWidth] = useState(0);

  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getDatetimeFormat = () => {
    const date = dayjs(updatedAt).add(9, 'hour');
    return date.format('YYYY.MM.DD');
>>>>>>> d541d4578ed8df6f136e6eac275ea1cf502d55dc
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
<<<<<<< HEAD
    <div className="w-full h-auto rounded-[5px] bg-white shadow-md relative">
      {/* 작성자 */}
      <div className="flex justify-between h-[85px] pl-3 pt-2.5">
        <Avatar
          name={author?.fullName}
          email={author?.email}
          image={author?.image}
          isOnline={author?.isOnline}
        />
      </div>

      {/* 제목, 내용, 이미지, 투표 */}
      <div
        className={twMerge(
          "flex justify-between px-[55px] py-[15px] gap-[55px] cursor-pointer",
          !image && "py-[23px]"
        )}
        onClick={clickPostHandler}
      >
=======
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
>>>>>>> d541d4578ed8df6f136e6eac275ea1cf502d55dc
        <div
          className={twMerge(
            "flex flex-col justify-center gap-[22px]",
            !image && "w-full"
          )}
        >
<<<<<<< HEAD
          <h2 className="text-[18px] font-semibold">{parsedTitle}</h2>
          <p className="text-[15px] font-normal opacity-70 w-[500px] whitespace-pre-wrap">
            {parsedContent}
          </p>

          {/* 투표 */}
          {options.length > 0 && (
            <div className="mt-4 w-full max-w-[500px]">
              <h3 className="font-medium mb-2">투표</h3>
              {options.map((opt) => {
                const percentage =
                  totalVotes > 0
                    ? ((opt.votes / totalVotes) * 100).toFixed(1)
                    : "0";
                return hasVoted ? (
                  <div key={opt.id} className="mb-2">
                    <div className="text-sm font-medium mb-1">{opt.text}</div>
                    <div className="w-full bg-gray-200 rounded h-4 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      {percentage}% ({opt.votes}표)
                    </div>
                  </div>
                ) : (
                  <button
                    key={opt.id}
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 클릭 방지
                      handleVote(opt.id);
                    }}
                    className="w-full border px-4 py-2 rounded mb-2 text-left bg-gray-100 hover:bg-gray-200"
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 이미지 */}
        {image && (
          <div className="border border-[#e0e0e0] rounded-[5px]">
            <img
              src={image}
              className="w-[226px] h-[226px] object-cover rounded"
              alt="post"
            />
          </div>
        )}
      </div>

      {/* 작성일 */}
      <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
        {getDatetimeFormat()}
      </div>

      <hr className="mx-[18px] text-[#b2b2b2]" />

      {/* 반응 */}
      <div className="h-[59px]">
        <LikeComment
          likeCount={likes.length}
          commentCount={comments.length}
          postId={_id}
          likes={likes}
        />
      </div>
    </div>
=======
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
          {getDatetimeFormat()}
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
      {isModalOpen && <NotLoginModal closeModalHanlder={closeModalHanlder} />}
    </>
>>>>>>> d541d4578ed8df6f136e6eac275ea1cf502d55dc
  );
}
