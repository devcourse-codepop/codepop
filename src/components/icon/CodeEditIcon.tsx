import codeEditIcon from '../../assets/CodeEditIcon.svg';
import codeEditIconWhite from '../../assets/CodeEditionIconWhite.svg';
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
