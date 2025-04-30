import like from '../../assets/images/like-outline.svg';
import comment from '../../assets/images/comment-outline.svg';

export default function LikeComment() {
  return (
    <div className="flex items-center gap-5 p-4">
      <div className="flex items-center gap-1.5">
        <img src={like} alt="좋아요" className="w-5 h-5 " />
        <span className="text-sm">12</span>
      </div>

      <div className="flex items-center gap-[10px]">
        <img src={comment} alt="댓글" className="w-5 h-5 relative top-[1px]" />
        <span className="text-sm">10</span>
      </div>
    </div>
  );
}
