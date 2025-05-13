import codeEditIcon from '../../assets/CodeEditIcon.svg';
import codeEditIconWhite from '../../assets/CodeEditIconWhite.svg';

interface Theme {
  name: string;
}

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
        src={`${theme.name === 'Dark' ? codeEditIconWhite : codeEditIcon}`}
        className="w-[30px] h-[30px] inline-block cursor-pointer p-1"
        onClick={onClick}
      />
    </>
  );
}
