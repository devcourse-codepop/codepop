// import avatar from '../../assets/images/avatar.svg';

interface AvatarProps {
  name: string;
  email: string;
  image: string;
}

export default function Avatar({ name, email, image }: AvatarProps) {
  return (
    <div className="flex  items-center gap-4 p-4 ">
      <img src={image} alt="사용자" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs opacity-60">{email}</span>
      </div>
    </div>
  );
}
