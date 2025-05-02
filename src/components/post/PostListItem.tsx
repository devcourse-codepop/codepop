import Avatar from "../avatar/Avatar";
import LikeComment from "../reaction/LikeComment";

export default function PostListItem({
  title,
  updatedAt,
}: {
  title: { title: string; content: string; tag: string };
  updatedAt: string;
}) {
  // const getDatetimeFormat = () => {
  //   const date = dayjs(updatedAt);
  //   return date.format("YYYY.MM.DD");
  // };

  return (
    <>
      <div className="max-w-[999px] h-auto rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="h-[85px] pl-3 pt-2.5">
          <Avatar
            name="사용자"
            email="user123@gmail.com"
            image="../src/assets/images/avatar.svg"
          />
        </div>
        <div className="flex flex-col">
          <div className="pt-[19px] pl-[55px] pb-[12px] text-[20px] font-semibold">
            {title.title}
          </div>
          <div className="pt-[11px] pl-[55px] pb-[23px] text-[15px] font-normal">
            {title.content}
          </div>
          <div className="flex justify-end pr-5 pb-[9px] text-[#808080] text-sm font-light">
            {updatedAt}
            {/* {getDatetimeFormat()} */}
          </div>
        </div>
        <hr className="max-w-[963px] mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">
          <LikeComment likeCount={12} commentCount={10} />
        </div>
      </div>
    </>
  );
}
