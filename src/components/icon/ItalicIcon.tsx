import italicIcon from '../../assets/ItalicIcon.svg';
import italicIconWhite from '../../assets/ItalicIconWhite.svg';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function ItalicIcon({ theme }: { theme: Theme }) {
  return (
    <>
      <img
        src={dark(theme) ? italicIconWhite : italicIcon}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
      />
    </>
  );
}
