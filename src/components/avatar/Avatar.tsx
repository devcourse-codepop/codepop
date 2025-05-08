// import avatar from '../../assets/images/avatar.svg';
import userImg from '../../assets/images/header/userImg.svg';

interface AvatarProps {
  name: string;
  email: string;
  image: string;
}

export default function Avatar({ name, email, image }: AvatarProps) {
  return (
    <div className="flex  items-center gap-4 p-4 ">
      <img src={image ? image : userImg} alt="사용자" className="w-12 h-12" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs opacity-60">{email}</span>
      </div>
    </div>
  );
}
