import { twMerge } from 'tailwind-merge';

interface ChannelNameProps {
  channelId: string;
}

export default function ChannelName({ channelId }: ChannelNameProps) {
  const titleList = [
    { subtitle: '"이거 왜 되지?"', title: '미스터리 코드 공유 채널' },
    { subtitle: '"이거 왜 안 쓰지?"', title: '데스크 셋업 공유 채널' },
    { subtitle: '"골라봐"', title: '선택의 갈림길에서 함께 답을 찾는 채널' },
  ];

  return (
    <div className="flex gap-3">
      <div
        className={twMerge(
          'h-15 w-1 bg-blue-500 rounded-sm ',
          channelId === '1' && 'bg-[#10215c]',
          channelId === '2' && 'bg-[#3380de]',
          channelId === '3' && 'bg-[#60a7f7]'
        )}
      />
      <div className="flex flex-col items-start self-center">
        <p className="text-[17px] opacity-70">
          {titleList[Number(channelId) - 1].subtitle}
        </p>
        <p className="text-[25px] font-bold">
          {titleList[Number(channelId) - 1].title}
        </p>
      </div>
    </div>
  );
}
