interface PollOption {
  id: number;
  text: string;
}

interface PollOptionsViewProps {
  options: PollOption[];
}

export default function PollOptionsView({ options }: PollOptionsViewProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <div
          key={option.id}
          className="px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700 cursor-default"
        >
          {option.text}
        </div>
      ))}
    </div>
  );
}
