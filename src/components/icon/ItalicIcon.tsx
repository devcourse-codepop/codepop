import italicIcon from '../../assets/images/editor/ItalicIcon.svg';
import italicIconWhite from '../../assets/images/editor/ItalicIconWhite.svg';
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
