import { create } from "zustand";

type PollOption = {
  id: number;
  text: string;
  votes: number;
};

type VoteState = {
  pollId: string;
  options: PollOption[];
  votedOptionId: number | null;
  totalVotes: number;
  hasVoted: boolean;
  setVote: (pollId: string, optionId: number) => void;
  loadFromLocalStorage: () => void;
};

export const useVoteStore = create<VoteState>((set, get) => ({
  pollId: "",
  options: [],
  votedOptionId: null,
  totalVotes: 0,
  hasVoted: false,

  setVote: (pollId, optionId) => {
    const current = get();
    const updatedOptions = current.options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    const totalVotes = updatedOptions.reduce((sum, opt) => sum + opt.votes, 0);

    const voteData = {
      pollId,
      options: updatedOptions,
      votedOptionId: optionId,
      totalVotes,
      hasVoted: true,
    };

    localStorage.setItem(`poll_${pollId}`, JSON.stringify(voteData));
    set({ ...voteData });
  },

  loadFromLocalStorage: () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("poll_")
    );
    if (keys.length > 0) {
      const data = JSON.parse(localStorage.getItem(keys[0]) || "{}");
      set({ ...data });
    }
  },
}));
