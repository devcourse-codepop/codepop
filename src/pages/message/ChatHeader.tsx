import backBtn from '../../assets/images/arrow-back-outline.svg';
import closeBtn from '../../assets/images/close-outline.svg';

interface ChatHeaderProps {
  userName?: string;
  onBack?: () => void;
  onClose: () => void;
}

export default function ChatHeader({ userName, onBack, onClose }: ChatHeaderProps) {
  return (
    <div className='flex items-center justify-between p-[20px] border-b border-b-[#DEDEDE] bg-white rounded-t-[5px]'>
      {onBack ? (
        <img src={backBtn} onClick={onBack} className=' w-[24px] h-[24px]  mr-2 cursor-pointer' />
      ) : (
        <div className='w-4' /> // 공간 맞춤용
      )}

      <p className='text-[20px] font-medium flex-1 text-center'>{userName || 'Message'}</p>

      <img src={closeBtn} onClick={onClose} className=' w-[24px] h-[24px] ml-2 cursor-pointer' />
    </div>
  );
}
