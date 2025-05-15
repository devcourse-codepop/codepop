import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/profile/defaultProfileImage.jpg';
import { useEffect, useState } from 'react';
import ChatModal from '../message/ChatModal';
import useChatClose from '../../utils/changeMessageIcon';
import { postFollow, postUnfollow } from '../../api/follow/follow';

export default function ProfileLeft({ userData, userId, refetchUserData }: UserInfo) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const onClose = useChatClose(setIsChatOpen);
  const navigate = useNavigate();

  const handleFollow = async () => {
    if (user && userId) {
      const updatedUserData = await postFollow(userId);
      const newFollowData: Follow = updatedUserData.data;
      const updatedFollowing = [...user.following, newFollowData];
      setUser({ ...user, following: updatedFollowing });
      setIsFollowed(true);
      await refetchUserData();
    }
  };
  const handleUnfollow = async () => {
    if (user && userId) {
      const followToRemove = user.following.find((follow) => follow.user === userId && follow.follower === user._id);
      if (!followToRemove) return;
      console.log(followToRemove._id);
      await postUnfollow(followToRemove._id);
      const updatedFollowing = user.following.filter((follow) => follow._id !== followToRemove._id);
      setUser({ ...user, following: updatedFollowing });
      setIsFollowed(false);
      await refetchUserData();
    }
  };

  useEffect(() => {
    if (user && userId) {
      const checkFollow = user.following.some((f) => f.user === userId);
      setIsFollowed(checkFollow);
    }
  }, [user, userId]);

  return (
    <>
      <div className='w-[291px] h-[633px] rounded-bl-[10px] px-[50px] border-r-2 border-gray-300 '>
        <img
          src={userData?.image || defaultProfileImage}
          alt='Profile'
          className='w-[196px] h-[196px] rounded-[5px] mt-[60px]  object-contain overflow-hidden'
        />
        <div className='pt-[0px]'>
          <p className='font-bold text-[20px] mt-[40px]'> {userData?.fullName}</p>
          <p className='font-normal text-[14px] mt-[3px] w-[200px] break-words'>{userData?.email}</p>
          <div className='flex gap-8.5 text-[16px] font-medium mt-[40px] '>
            <div className='flex  items-center cursor-pointer'>
              <span>팔로워</span>
              <span className='ml-[8px]'>{userData?.followers.length}</span>
            </div>
            <div className='flex  items-center cursor-pointer'>
              <span>팔로잉</span>
              <span className='ml-[8px]'>{userData?.following.length}</span>
            </div>
          </div>
          {user?._id === userId ? (
            <div className='mt-[25px] flex gap-6'>
              <Button value='프로필 수정' className='button-style3' onClick={() => navigate('/profile/edit')} />
              <Mail className='w-[30px] h-[30px] cursor-pointer' onClick={() => setIsChatOpen(true)} />
              <ChatModal isOpen={isChatOpen} onClose={onClose} />
            </div>
          ) : (
            <div className='mt-[25px]'>
              {userId &&
                (isFollowed ? (
                  <Button value='언팔로우' className='button-style3' onClick={handleUnfollow} />
                ) : (
                  <Button value='팔로우' className='button-style3' onClick={handleFollow} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
