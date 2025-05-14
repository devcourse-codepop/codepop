import { useState } from 'react';
import { updatePost } from '../../api/post/post';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

interface PollOptionsVoteViewProps {
  options: PollOption[];
  postId: string;
  channelId: string;
  originalTitle: string;
  originalContent: string;
  imageToDeletePublicId?: string | null;
  imageFile?: File | null;
  theme: Theme;
}

export default function PollOptionsVoteView({
  options,
  postId,
  originalTitle,
  originalContent,
  theme,
}: PollOptionsVoteViewProps) {
  const [pollOptions, setPollOptions] = useState<PollOption[]>(
    options.map((option) => ({
      ...option,
      voteCount: option.voteCount || 0,
    }))
  );
  const [totalVotes, setTotalVotes] = useState(
    options.reduce((acc, cur) => acc + (cur.voteCount || 0), 0)
  );
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

  const handleVote = async (id: string) => {
    let updatedOptions: PollOption[];

    if (votedOptionId === id) {
      // 👉 동일 옵션 다시 클릭 → 투표 취소
      updatedOptions = pollOptions.map((option) =>
        option.id === id
          ? { ...option, voteCount: option.voteCount - 1 }
          : option
      );
      setPollOptions(updatedOptions);
      setTotalVotes((prev) => prev - 1);
      setVotedOptionId(null);
    } else {
      // 👉 새 옵션 투표 (기존 투표가 있다면 교체)
      updatedOptions = pollOptions.map((option) => {
        if (option.id === id)
          return { ...option, voteCount: option.voteCount + 1 };
        if (option.id === votedOptionId)
          return { ...option, voteCount: option.voteCount - 1 };
        return option;
      });
      setPollOptions(updatedOptions);
      if (votedOptionId === null) {
        setTotalVotes((prev) => prev + 1); // 첫 투표인 경우에만 증가
      }
      setVotedOptionId(id);
    }

    // API 호출
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('channelId', '681b8570437f722b6908ab69');
    formData.append(
      'title',
      JSON.stringify({
        title: originalTitle,
        content: originalContent,
        pollOptions: updatedOptions,
      })
    );
    formData.append('imageToDeletePublicId', '');
    formData.append('image', '');

    console.log('📤 전송되는 FormData:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      await updatePost(formData);
      console.log('투표 반영 성공');
    } catch (err) {
      console.error('투표 반영 실패', err);
    }
  };

  const maxVoteCount = Math.max(...pollOptions.map((opt) => opt.voteCount));

  const topOptionIds = pollOptions
    .filter((opt) => opt.voteCount === maxVoteCount)
    .map((opt) => opt.id);

  return (
    <div className="flex flex-col gap-2">
      {pollOptions.map((option) => {
        const percentage =
          totalVotes === 0
            ? 0
            : Math.round((option.voteCount / totalVotes) * 100);

        const isTopOption = topOptionIds.includes(option.id);

        const bgColor = dark(theme) ? '#8C8C8C' : '#d1d5db';
        const topColor = dark(theme) ? '#1e1e1e' : '#3380DE';
        const barColor =
          totalVotes === 0 ? bgColor : isTopOption ? topColor : bgColor;

        const isVoted = option.id === votedOptionId;

        return (
          <div
            key={option.id}
            className={`relative rounded overflow-hidden cursor-pointer border ${
              dark(theme)
                ? isVoted
                  ? 'border-2.5 border-[#1e1e1e]'
                  : 'border-2 border-[#1e1e1e]'
                : isVoted
                ? 'border-gray-400'
                : 'border-gray-300'
            }`}
            onClick={() => handleVote(option.id)}
          >
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: barColor,
                transition: 'width 0.3s ease',
              }}
            />
            <div
              className={`relative flex justify-between items-center px-4 py-2  z-10 ${
                dark(theme) ? 'text-[#ffffff]' : 'text-gray-800'
              }`}
            >
              <span>{option.text}</span>
              <span>
                {option.voteCount} votes ({percentage}%)
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
