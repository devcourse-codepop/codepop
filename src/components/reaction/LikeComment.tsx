import likeClick from '../../assets/LikeClick.svg';
import likeRed from '../../assets/images/LikeRed.svg';
import comment from '../../assets/images/comment-outline.svg';
import { useEffect, useState } from 'react';
import { Like } from '../../types';
import { deleteLikes, postLikes } from '../../api/post/post';
import { useAuthStore } from '../../stores/authStore';

interface LikeCommentProps {
  likeCount: number;
  commentCount: number;
  postId: string;
  likes: Like[];
}

export default function LikeComment({
  likeCount,
  commentCount,
  postId,
  likes,
}: LikeCommentProps) {
  const [like, setLike] = useState(likeCount);
  const [checkLike, setCheckLike] = useState(false);
  const [likeId, setLikeId] = useState('');

  const user = useAuthStore((state) => state.user);

  const clickLikes = async () => {
    if (!checkLike) {
      setLike((like) => like + 1);
      setCheckLike(true);
      try {
        const { data } = await postLikes(postId);
        setLikeId(data._id);
      } catch (e) {
        console.log(e instanceof Error && e.message);
      }
    } else {
      setLike((like) => like - 1);
      setCheckLike(false);
      try {
        const { data } = await deleteLikes(likeId);
        console.log(data);
        setLikeId('');
      } catch (e) {
        console.log(e instanceof Error && e.message);
      }
    }
  };

  const checkClickLikes = () => {
    likes.forEach((like) => {
      // authStore에서 현재 로그인한 사용자의 id 값을 받아와서 like.user와 같은지 비교함.
      if (like.user === user?._id) {
        setCheckLike(true);
        setLikeId(like._id);
      }
    });
  };

  useEffect(() => {
    if (user && likes.length > 0) {
      checkClickLikes();
    }
  }, [user, likes]);

  return (
    <div className="flex justify-end items-center gap-5 p-4">
      <div className="flex items-center gap-1.5">
        <img
          src={checkLike ? likeRed : likeClick}
          alt="좋아요"
          className="w-5 h-5 cursor-pointer"
          onClick={clickLikes}
        />
        <span className="text-sm">{like}</span>
      </div>

      <div className="flex items-center gap-[10px]">
        <img src={comment} alt="댓글" className="w-5 h-5 relative top-[1px]" />
        <span className="text-sm">{commentCount}</span>
      </div>
    </div>
  );
}
