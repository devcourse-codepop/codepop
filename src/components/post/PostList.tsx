export default function PostList({
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
      <div className="w-[999px] h-[308px] rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="h-[85px]">user section</div>
        <div className="relative h-[164px]">
          <div className="absolute top-[19px] left-[55px] text-[20px] font-semibold">
            {title.title}
          </div>
          <div className="absolute top-[72px] left-[55px] text-[15px] font-medium">
            {title.content}
          </div>
          <div className="absolute right-[20px] bottom-[9px] text-[#808080] text-sm font-light">
            {updatedAt}
            {/* {getDatetimeFormat()} */}
          </div>
        </div>
        <hr className="w-[963px] mx-[18px] text-[#b2b2b2]" />
        <div className="h-[59px]">icon section</div>
      </div>
    </>
  );
}
