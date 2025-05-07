import { useState } from "react";
import PollCreator from "./PollCreater";
import PollResult from "./pollResult";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export default function Poll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const handleCreate = (q: string, opts: PollOption[]) => {
    setQuestion(q);
    setOptions(opts);
  };

  const handleVote = (id: number) => {
    const updatedOptions = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setOptions(updatedOptions);
    setTotalVotes((prev) => prev + 1);
    setHasVoted(true);
  };

  if (!question) {
    return <PollCreator onCreate={handleCreate} />;
  }

  if (hasVoted) {
    return (
      <PollResult
        question={question}
        options={options}
        totalVotes={totalVotes}
      />
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      {options.map((opt) => (
        <button
          key={opt.id}
          className="w-full border p-2 mb-2 rounded hover:bg-blue-50"
          onClick={() => handleVote(opt.id)}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}
