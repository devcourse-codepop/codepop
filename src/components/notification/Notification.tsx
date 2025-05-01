import notiBox from "../../assets/NotiBox.svg";
import redDot from "../../assets/RedDotIcon.svg";
export default function Notification() {
  return (
    <>
      <div className="relative gap-3 p-4">
        <img src={notiBox} />
        <div className="absolute top-25 left-10 flex items-center gap-3 p-2 text-xs">
          <img src={redDot} />
          [사용자] 님이 당신의 게시물을 좋아합니다.
        </div>
        <div className="absolute top-35 left-10 flex items-center gap-3 p-2 text-xs">
          <img src={redDot} />
          [사용자] 님이 당신의 게시물에
          <br /> 댓글을 남겼습니다.
        </div>
      </div>
    </>
  );
}
