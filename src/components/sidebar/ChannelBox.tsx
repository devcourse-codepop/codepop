// import { twMerge } from 'tailwind-merge';

export default function ChannelBox({ channelId }: { channelId: string }) {
  return (
    <>
      <div className="w-[291px] h-[211px] bg-white rounded-[10px] shadow-md font-semibold">
        <h2 className="text-[20px] font-medium text-[#595956] ml-7 mt-5 mb-[14px]">
          Channel
        </h2>
        <ul className="space-y-[13px]">
          <li className="flex items-start ml-[29px] relative">
            <span className="w-1 h-8 bg-[#10215C] rounded-sm mr-[7px]"></span>
            <span className="font-noto text-[16px] pt-1 cursor-pointer">
              이거 왜 되지?
            </span>
            {channelId === '1' ? (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[92px] h-[15px] bg-[#335BDE] opacity-15 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            ) : (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[92px] h-[15px] bg-[#335BDE] opacity-0 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            )}
            {/* <div
              className={twMerge(
                'absolute left-2.5 bottom-0.5 inline-block w-[92px] h-[15px] bg-[#335BDE] opacity-15 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30',
                channelId !== '2' && 'invisible'
              )}
            ></div> */}
          </li>
          <li className="flex items-start ml-[29px] relative">
            <span className="w-1 h-8 bg-[#3380DE] rounded-sm mr-[7px]"></span>
            <span className="text-[16px] pt-1 cursor-pointer">
              이거 왜 안 쓰지?
            </span>
            {channelId === '2' ? (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[110px] h-[15px] bg-[#335BDE] opacity-15 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            ) : (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[110px] h-[15px] bg-[#335BDE] opacity-0 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            )}
          </li>
          <li className="flex items-start ml-[29px] relative">
            <span className="w-1 h-8 bg-[#60A7F7] rounded-sm mr-[7px]"></span>
            <span className="text-[16px] pt-1 cursor-pointer">골라봐</span>
            {channelId === '3' ? (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[48px] h-[15px] bg-[#335BDE] opacity-15 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            ) : (
              <div className="absolute left-2.5 bottom-0.5 inline-block w-[48px] h-[15px] bg-[#335BDE] opacity-0 cursor-pointer transition-all duration-500 ease-in-out hover:opacity-30"></div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
