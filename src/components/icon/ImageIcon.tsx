import imageIcon from '../../assets/ImageIcon.svg';
import imageIconWhite from '../../assets/ImageIconWhite.svg';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

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
        className="w-[30px] h-[30px] inline-block cursor-pointer"
        onClick={onClick}
      />
    </>
  );
}
