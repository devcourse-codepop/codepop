import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export default function ProfileLeft({ userData, onSelectTab }: UserInfo) {
  const navigate = useNavigate();
  return (
    <>
      <div className='w-[291px] h-[633px] rounded-bl-[10px] px-[50px] border-r-2 border-gray-300 '>
        <img
          src={userData?.image}
          className='w-[196px] h-[196px] rounded-[5px] mt-[60px]  object-contain overflow-hidden'
        />
        <div className='pt-[0px]'>
          <p className='font-bold text-[20px] mt-[42px]'> {userData?.fullName}</p>
          <p className='font-normal text-[14px] mt-[11px]'>{userData?.email}</p>
          <div className='flex gap-4 text-[16px] font-semibold mt-[38px]'>
            <p className='cursor-pointer' onClick={() => onSelectTab('posts')}>
              포스트 {userData?.posts.length}
            </p>
            <p className='cursor-pointer' onClick={() => onSelectTab('likes')}>
              좋아요 {userData?.likes.length}
            </p>
            <p className='cursor-pointer' onClick={() => onSelectTab('comments')}>
              댓글 {userData?.comments.length}
            </p>
          </div>
          <div className='mt-[25px] flex gap-6'>
            <Button value='프로필 수정' className='button-style3' onClick={() => navigate('/profileEdit')} />
            <Mail className='w-[30px] h-[30px] cursor-pointer' />
          </div>
        </div>
      </div>
    </>
  );
}
