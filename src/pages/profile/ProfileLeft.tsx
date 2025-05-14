import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/profile/defaultProfileImage.jpg';
import { useState } from 'react';
import ChatModal from '../message/ChatModal';

export default function ProfileLeft({ userData, onSelectTab, userId }: UserInfo) {
  const user = useAuthStore((state) => state.user);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className='w-[291px] h-[633px] rounded-bl-[10px] px-[50px] border-r-2 border-gray-300 '>
        <img
          src={userData?.image || defaultProfileImage}
          alt='Profile'
          className='w-[196px] h-[196px] rounded-[5px] mt-[60px]  object-contain overflow-hidden'
        />
        <div className='pt-[0px]'>
          <p className='font-bold text-[20px] mt-[42px]'> {userData?.fullName}</p>
          <p className='font-normal text-[14px] mt-[11px] w-[200px] break-words'>{userData?.email}</p>
          <div className='flex gap-8.5 text-[16px] font-semibold mt-[38px] '>
            <div className='flex flex-col items-center cursor-pointer' onClick={() => onSelectTab('posts')}>
              <span>포스트</span>
              <span className=' mt-1'>{userData?.posts.length}</span>
            </div>
            <div className='flex flex-col items-center cursor-pointer' onClick={() => onSelectTab('likes')}>
              <span>좋아요</span>
              <span className=' mt-1'>{userData?.likes.length}</span>
            </div>
            <div className='flex flex-col items-center cursor-pointer' onClick={() => onSelectTab('comments')}>
              <span>댓글</span>
              <span className=' mt-1'>{userData?.comments.length}</span>
            </div>
          </div>
          {user?._id === userId && (
            <div className='mt-[25px] flex gap-6'>
              <Button value='프로필 수정' className='button-style3' onClick={() => navigate('/profile/edit')} />
              <Mail className='w-[30px] h-[30px] cursor-pointer' onClick={() => setIsChatOpen(true)} />
              <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
