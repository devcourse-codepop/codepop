import { twMerge } from 'tailwind-merge';

interface ChannelNameProps {
  subtitle: string;
  title: string;
  channelId: string;
}

export default function ChannelName({
  subtitle,
  title,
  channelId,
}: ChannelNameProps) {
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
        <p className="text-sm">{subtitle}</p>
        <p className="text-base font-bold">{title}</p>
      </div>
    </div>
  );
}
