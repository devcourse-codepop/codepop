import boldIcon from '../../assets/BoldIcon.svg';
import boldIconWhite from '../../assets/BoldIconWhite.svg';

interface Theme {
  name: string;
}

export default function BoldIcon({ theme }: { theme: Theme }) {
  return (
    <img
      src={`${theme.name === 'Dark' ? boldIconWhite : boldIcon}`}
      className="w-[30px] h-[30px] inline-block cursor-pointer p-1"
    />
  );
}
