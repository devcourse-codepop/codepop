import imageIcon from '../../assets/ImageIcon.svg';
import imageIconWhite from '../../assets/ImageIconWhite.svg';

interface Theme {
  name: string;
}

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
        src={`${theme.name === 'Dark' ? imageIconWhite : imageIcon}`}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
        onClick={onClick}
      />
    </>
  );
}
