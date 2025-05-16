import imageIcon from '../../assets/images/editor/img-icon.svg';
import imageIconWhite from '../../assets/images/editor/img-icon-white.svg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';

export default function ImageIcon({
  onClick,
  theme,
}: {
  onClick?: () => void;
  theme: Theme;
}) {
  return (
    <>
      <img
        src={dark(theme) ? imageIconWhite : imageIcon}
        className="w-[25px] h-[25px] inline-block cursor-pointer"
        onClick={onClick}
      />
    </>
  );
}
