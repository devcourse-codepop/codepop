import { useState } from 'react';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';
import { useParams } from 'react-router-dom';
import { voteComments, deleteComments } from '../../api/post/post';

interface PollOption {
  id: number;
  text: string;
}

interface CommentType {
  _id: string;
  comment: string;
}

interface PollOptionsViewProps {
  options: PollOption[];
  theme: Theme;
  comments: CommentType[];
  onVoted?: () => void;
}

export default function PollOptionsVoteView({
  options,
  theme,
  comments,
  onVoted,
}: PollOptionsViewProps) {
  const { postId } = useParams<{ postId: string }>();
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [myCommentId, setMyCommentId] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState(() =>
    options.map((opt) => ({
      ...opt,
      voteCount: comments.filter((c) => {
        try {
          const parsed = JSON.parse(c.comment);
          return (
            parsed.type === 'vote' && Number(parsed.selectedOptionId) === opt.id
          );
        } catch {
          return false;
        }
      }).length,
    }))
  );

  const totalVotes = pollOptions.reduce((acc, cur) => acc + cur.voteCount, 0);

  const handleVote = async (optionId: number) => {
    if (!postId) return;

    try {
      // 같은 항목 다시 클릭 => 삭제 후 해제
      if (selectedOptionId === optionId && myCommentId) {
        await deleteComments(myCommentId);
        setSelectedOptionId(null);
        setMyCommentId(null);
        setPollOptions((prev) =>
          prev.map((opt) =>
            opt.id === optionId ? { ...opt, voteCount: opt.voteCount - 1 } : opt
          )
        );
        if (onVoted) onVoted();
        return;
      }

      // 기존 댓글 삭제 (다른 항목을 누른 경우)
      if (myCommentId) {
        await deleteComments(myCommentId);
        setPollOptions((prev) =>
          prev.map((opt) =>
            opt.id === selectedOptionId
              ? { ...opt, voteCount: opt.voteCount - 1 }
              : opt
          )
        );
      }

      const { data } = await voteComments(postId, String(optionId));

      setSelectedOptionId(optionId);
      setMyCommentId(data._id);
      setPollOptions((prev) =>
        prev.map((opt) =>
          opt.id === optionId ? { ...opt, voteCount: opt.voteCount + 1 } : opt
        )
      );
      if (onVoted) onVoted();
    } catch (err) {
      console.error('❌ 투표 처리 실패', err);
    }
  };

  const maxVoteCount = Math.max(...pollOptions.map((opt) => opt.voteCount));
  const topOptionIds = pollOptions
    .filter((opt) => opt.voteCount === maxVoteCount)
    .map((opt) => opt.id);

  return (
    <div className="flex flex-col gap-3">
      {pollOptions.map((option) => {
        const ratio =
          totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
        const isSelected = option.id === selectedOptionId;
        const isTop = topOptionIds.includes(option.id);

        return (
          <div key={option.id} className="flex flex-col gap-2">
            <div
              onClick={() => handleVote(option.id)}
              className={`relative px-4 py-2  border border-gray-300 rounded flex justify-between items-center cursor-pointer transition overflow-hidden ${
                isSelected ? 'border-gray-400' : 'hover:bg-gray-100'
              }`}
            >
              <div
                className="absolute left-0 top-0 h-full transition-all duration-300"
                style={{
                  width: `${ratio}%`,
                  backgroundColor: isTop ? '#60A7F7' : '#d1d5db',
                }}
              />
              <span className="z-10">{option.text}</span>
              <span className="z-10 text-sm text-gray-600">
                {option.voteCount}표 ({ratio.toFixed(1)}%)
              </span>
            </div>
          </div>
        );
      })}
      <div
        className={`mt-4  font-medium ${
          dark(theme) ? 'text-[#ffffff]' : 'text-gray-700'
        }`}
      >
        Total Votes: {totalVotes}
      </div>
    </div>
  );
}
