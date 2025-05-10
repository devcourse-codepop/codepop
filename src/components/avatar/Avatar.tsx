//import userImg from '../../assets/images/header/userImg.svg';

interface AvatarProps {
  name: string;
  email: string;
  image: string;
  isOnline?: boolean;
}

export default function Avatar({ name, email, image, isOnline }: AvatarProps) {
  let imgSrc: string = '';
  if (image === undefined || image === '') {
    imgSrc =
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  } else {
    imgSrc = image;
  }
  return (
    <div className="flex  items-center gap-4 p-4 ">
      {/* <img src={image ? image : userImg} alt="사용자" className="w-12 h-12" /> */}
      <div className="relative shrink-0">
        <img
          src={imgSrc}
          alt="사용자"
          className="w-[50px] h-[50px] rounded-[50%] border border-[#ddd]"
        />
        {isOnline && (
          <span className="w-3 h-3 rounded-md bg-[#5FE3A4] absolute right-0 top-1"></span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs opacity-60">{email}</span>
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
