import { useState } from "react";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface PollCreatorProps {
  onCreate: (question: string, options: PollOption[]) => void;
}

export default function PollCreator({ onCreate }: PollCreatorProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const handleAddOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const handleChangeOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = () => {
    const pollOptions = options
      .filter((opt) => opt.trim() !== "")
      .map((text, idx) => ({ id: idx, text, votes: 0 }));
    if (question && pollOptions.length >= 2) {
      onCreate(question, pollOptions);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Create a Poll</h2>
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Poll question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="w-full border p-2 mb-2 rounded"
          placeholder={`Choice ${i + 1}`}
          value={opt}
          onChange={(e) => handleChangeOption(i, e.target.value)}
        />
      ))}
      {options.length < 4 && (
        <button
          className="text-blue-500 text-sm mb-2"
          onClick={handleAddOption}
        >
          + Add Option
        </button>
      )}
      <button
        className="bg-blue-500 text-white w-full p-2 rounded"
        onClick={handleCreate}
      >
        Create Poll
      </button>
    </div>
  );
}
