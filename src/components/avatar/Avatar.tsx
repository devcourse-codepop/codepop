import avatar from '../../assets/images/avatar.svg';

export default function Avatar() {
  return (
    <div className="flex  items-center gap-4 p-4 ">
      <img src={avatar} alt="사용자" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">사용자</span>
        <span className="text-xs opacity-60">avatar123@gmail.com</span>
      </div>
    </div>
  );
}
