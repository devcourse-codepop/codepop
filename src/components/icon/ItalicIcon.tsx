import italicIcon from '../../assets/ItalicIcon.svg';
import italicIconWhite from '../../assets/ItalicIconWhite.svg';

interface Theme {
  name: string;
}

export default function ItalicIcon({ theme }: { theme: Theme }) {
  return (
    <>
      <img
        src={`${theme.name === 'Dark' ? italicIconWhite : italicIcon}`}
        className="w-[30px] h-[30px] inline-block cursor-pointer"
      />
    </>
  );
}
