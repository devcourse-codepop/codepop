import voteIcon from '../../assets/images/editor/vote-icon.svg';
import voteIconWhite from '../../assets/images/editor/vote-icon-white.svg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';

export default function VoteIcon({ theme }: { theme: Theme }) {
  return (
    <>
      <img
        src={dark(theme) ? voteIconWhite : voteIcon}
        className="w-[30.5px] h-[30.5px] inline-block cursor-pointer"
      />
    </>
  );
}
