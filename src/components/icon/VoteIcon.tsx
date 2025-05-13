import voteIcon from '../../assets/VoteIcon.svg';
import voteIconWhite from '../../assets/VoteIconWhite.svg';

interface Theme {
  name: string;
}

export default function VoteIcon({ theme }: { theme: Theme }) {
  return (
    <>
      <img
        src={`${theme.name === 'Dark' ? voteIconWhite : voteIcon}`}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
      />
    </>
  );
}
