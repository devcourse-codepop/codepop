export default function PostSkeleton() {
  return (
    <>
      <div className=" w-full h-auto bg-white p-4 rounded-md animate-pulse space-y-4">
        {/* 사용자 */}
        <div className="flex h-[85px] gap-3 m-2 mb-0">
          <div className="w-[50px] h-[50px] bg-gray-200 rounded-[50%]" />
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 rounded w-[120px] h-[20px]" />
            <div className="bg-gray-200 rounded w-[120px] h-[17px]" />
          </div>
        </div>
        {/* 본문 */}
        <div className="h-[150px] bg-gray-100 rounded" />
        <hr className="mx-[18px] text-[#b2b2b2]" />
        {/* 하단 */}
        <div className="flex justify-between">
          <div className="h-[40px] bg-gray-200 rounded w-[123px]" />
          <div className="h-[40px] bg-gray-200 rounded w-[123px]" />
        </div>
      </div>
    </>
  );
}
