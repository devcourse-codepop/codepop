interface ChannelNameProps {
  subtitle: string;
  title: string;
}

export default function ChannelName({ subtitle, title }: ChannelNameProps) {
  return (
    <div className="flex p-4 gap-3">
      <div className="h-15 w-1 bg-blue-500 rounded-sm" />
      <div className="flex flex-col items-start self-center">
        <p className="text-sm">{subtitle}</p>
        <p className="text-base font-bold">{title}</p>
      </div>
    </div>
  );
}
