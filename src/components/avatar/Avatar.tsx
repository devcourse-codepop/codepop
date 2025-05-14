import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';
import userDefaultImg from '../../assets/images/profile/defaultProfileImage.jpg';

interface AvatarProps {
  name: string;
  email: string;
  image: string;
  isOnline?: boolean;
  theme: Theme;
}

export default function Avatar({
  name,
  email,
  image,
  isOnline,
  theme,
}: AvatarProps) {
  return (
    <div className="avartar-box flex items-center gap-x-4 gap-y-1 p-4">
      <div className="relative shrink-0">
        <img
          src={image || userDefaultImg}
          alt="사용자"
          className="w-[50px] h-[50px] rounded-[50%] border border-[#ddd]"
        />
        {isOnline && (
          <span className="w-3 h-3 rounded-md bg-[#5FE3A4] absolute right-0 top-1"></span>
        )}
      </div>
      <div className="flex flex-col w-full pr-5 box-content">
        <span
          className={`text-sm font-semibold line-clamp-1 break-all ${
            dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
          }`}
        >
          {name ? name : '탈퇴한 회원'}
        </span>
        <span
          className={`text-xs opacity-60 break-all leading-[17px] line-clamp-2 ${
            dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
          }`}
        >
          {email}
        </span>
      </div>
    </div>
  );

  // return (
  //   <div className="flex  items-center gap-4 p-4 ">
  //     <img src={image ? image : userImg} alt="사용자" className="w-12 h-12" />

  //     <div className="flex flex-col">
  //       <span className="text-sm font-semibold">{name}</span>
  //       <span className="text-xs opacity-60">{email}</span>
  //     </div>
  //   </div>
  // );
}
