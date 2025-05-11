interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface PollResultProps {
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export default function PollResult({
  question,
  options,
  totalVotes,
}: PollResultProps) {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      {options.map((opt) => {
        const percent = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
        return (
          <div key={opt.id} className="mb-2">
            <div className="flex justify-between mb-1">
              <span>{opt.text}</span>
              <span className="font-semibold">{percent.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-blue-500 h-4 rounded"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
      <p className="text-gray-600 mt-4">{totalVotes} votes • Final results</p>
    </div>
  );
}
