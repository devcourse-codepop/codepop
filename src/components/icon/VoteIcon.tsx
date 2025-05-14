import voteIcon from '../../assets/VoteIcon.svg';
import voteIconWhite from '../../assets/VoteIconWhite.svg';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function VoteIcon({ theme }: { theme: Theme }) {
  return (
    <>
      <img
        src={dark(theme) ? voteIconWhite : voteIcon}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
      />
    </>
  );
}
