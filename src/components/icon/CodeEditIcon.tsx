import codeEditIcon from '../../assets/images/editor/code-edition-icon.svg';
import codeEditIconWhite from '../../assets/images/editor/code-edition-icon-white.svg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';

export default function CodeEditIcon({
  onClick,
  theme,
}: {
  onClick?: () => void;
  theme: Theme;
}) {
  return (
    <>
      <img
        src={dark(theme) ? codeEditIconWhite : codeEditIcon}
        className="w-[35px] h-[35px] inline-block cursor-pointer p-1 stroke-[1.5]"
        onClick={onClick}
      />
    </>
  );
}
