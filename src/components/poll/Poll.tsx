import { useEffect } from "react";
import { useVoteStore } from "../../stores/voteStore";

type PollOption = {
  id: number;
  text: string;
  votes: number;
};

type Props = {
  pollId: string;
  question: string;
  options: PollOption[];
};

export default function Poll({ pollId, question, options }: Props) {
  const {
    pollId: storedId,
    options: storedOptions,
    votedOptionId,
    hasVoted,
    totalVotes,
    setVote,
    loadFromLocalStorage,
  } = useVoteStore();

  useEffect(() => {
    loadFromLocalStorage();
    if (!storedOptions.length || storedId !== pollId) {
      const initialData = {
        pollId,
        options,
        votedOptionId: null,
        totalVotes: 0,
        hasVoted: false,
      };
      localStorage.setItem(`poll_${pollId}`, JSON.stringify(initialData));
    }
  }, []);

  const handleVote = (id: number) => {
    if (!hasVoted) {
      setVote(pollId, id);
    }
  };

  const showOptions = hasVoted ? storedOptions : options;
  const total = hasVoted
    ? totalVotes
    : showOptions.reduce((a, b) => a + b.votes, 0);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      {showOptions.map((opt) => {
        const percent = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
        const isSelected = opt.id === votedOptionId;

        return (
          <button
            key={opt.id}
            onClick={() => handleVote(opt.id)}
            disabled={hasVoted}
            className={`w-full border p-2 mb-2 rounded text-left relative ${
              isSelected ? "bg-blue-100 border-blue-400" : "bg-gray-100"
            }`}
          >
            <span>{opt.text}</span>
            {hasVoted && (
              <div className="text-sm text-gray-600 mt-1">
                {percent}% ({opt.votes}표)
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
