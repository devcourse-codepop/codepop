import boldIcon from '../../assets/images/editor/BoldIcon.svg';
import boldIconWhite from '../../assets/images/editor/BoldIconWhite.svg';
import { Theme } from '../../types/ darkModeTypes';

export default function BoldIcon({ theme }: { theme: Theme }) {
  return (
    <img
      src={`${theme.name === 'Dark' ? boldIconWhite : boldIcon}`}
      className="w-[30px] h-[30px] inline-block cursor-pointer p-1"
    />
  );
}
