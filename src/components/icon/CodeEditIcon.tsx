import codeEditIcon from '../../assets/CodeEditIcon.svg';

export default function CodeEditIcon({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <img
        src={codeEditIcon}
        className="w-[30px] h-[30px] inline-block cursor-pointer p-1"
        onClick={onClick}
      />
    </>
  );
}
