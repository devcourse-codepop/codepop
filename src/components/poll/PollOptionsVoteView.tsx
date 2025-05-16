import { useState, useEffect } from "react";
import { Theme } from "../../types/darkModeTypes";
import { dark } from "../../utils/darkModeUtils";
import { useParams } from "react-router-dom";
import { voteComments, deleteComments } from "../../api/post/post";
import { useAuthStore } from "../../stores/authStore";

interface PollOption {
  id: number;
  text: string;
}

interface CommentType {
  _id: string;
  comment: string;
  userId?: string;
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
  const { user } = useAuthStore();

  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [myCommentId, setMyCommentId] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState(() =>
    options.map((opt) => ({
      ...opt,
      voteCount: 0,
    }))
  );

  useEffect(() => {
    const myUserId = user?._id;

    const myVoteComment = comments.find((c) => {
      try {
        const parsed = JSON.parse(c.comment);
        return parsed.type === "vote" && parsed.userId === myUserId;
      } catch {
        return false;
      }
    });

    if (myVoteComment) {
      try {
        const parsed = JSON.parse(myVoteComment.comment);
        setSelectedOptionId(Number(parsed.selectedOptionId));
        setMyCommentId(myVoteComment._id);
      } catch {
        setSelectedOptionId(null);
        setMyCommentId(null);
      }
    } else {
      setSelectedOptionId(null);
      setMyCommentId(null);
    }

    // 옵션별 투표 수 갱신
    setPollOptions(
      options.map((opt) => ({
        ...opt,
        voteCount: comments.filter((c) => {
          try {
            const parsed = JSON.parse(c.comment);
            return (
              parsed.type === "vote" &&
              Number(parsed.selectedOptionId) === opt.id
            );
          } catch {
            return false;
          }
        }).length,
      }))
    );
  }, [comments, options, user?._id]);

  const totalVotes = pollOptions.reduce((acc, cur) => acc + cur.voteCount, 0);

  const handleVote = async (optionId: number) => {
    if (!postId) return;

    try {
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

      const { data } = await voteComments(
        postId,
        String(optionId),
        String(user?._id)
      );
      setSelectedOptionId(optionId);
      setMyCommentId(data._id);
      setPollOptions((prev) =>
        prev.map((opt) =>
          opt.id === optionId ? { ...opt, voteCount: opt.voteCount + 1 } : opt
        )
      );
      if (onVoted) onVoted();
    } catch (err) {
      console.error("❌ 투표 처리 실패", err);
    }
  };

  const maxVoteCount = Math.max(...pollOptions.map((opt) => opt.voteCount));
  const topOptionIds = pollOptions
    .filter((opt) => opt.voteCount === maxVoteCount)
    .map((opt) => opt.id);

  return (
    <div className='flex flex-col gap-3'>
      {pollOptions.map((option) => {
        const ratio =
          totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
        const isSelected = option.id === selectedOptionId;
        const isTop = topOptionIds.includes(option.id);

        const bgColor = dark(theme) ? "#8c8c8c" : "#d1d6db";
        const topColor = dark(theme) ? "#1e1e1e" : "#60AfF7";
        const barColor = isTop ? topColor : bgColor;

        const borderColor = dark(theme)
          ? isSelected
            ? "border-2 border-neutral-600"
            : "border-2 border-[#1e1e1e]"
          : isSelected
          ? "border-gray-400"
          : "border-gray-300";

        const hoverBg = dark(theme)
          ? "hover:bg-[#2c2c2c]"
          : "hover:bg-gray-100";

        const textColor = dark(theme) ? "text-white" : "text-gray-800";
        const subTextColor = dark(theme) ? "text-gray-300" : "text-gray-600";

        return (
          <div key={option.id} className='flex flex-col gap-2'>
            <div
              onClick={() => handleVote(option.id)}
              className={`relative px-4 py-2 border rounded flex justify-between items-center cursor-pointer transition overflow-hidden ${borderColor} ${hoverBg}`}
            >
              <div
                className='absolute left-0 top-0 h-full transition-all duration-300'
                style={{
                  width: `${ratio}%`,
                  backgroundColor: barColor,
                }}
              />
              <span className={`z-10 ${textColor}`}>{option.text}</span>
              <span className={`z-10 text-sm ${subTextColor}`}>
                {option.voteCount}표 ({ratio.toFixed(1)}%)
              </span>
            </div>
          </div>
        );
      })}
      <div
        className={`mt-4  font-medium ${
          dark(theme) ? "text-[#ffffff]" : "text-gray-700"
        }`}
      >
        Total Votes: {totalVotes}
      </div>
    </div>
  );
}
