import codeEditIcon from '../../assets/images/editor/CodeEditIcon.svg';
import codeEditIconWhite from '../../assets/images/editor/CodeEditionIconWhite.svg';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

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
        className="w-[30px] h-[30px] inline-block cursor-pointer p-1"
        onClick={onClick}
      />
    </>
  );
}
