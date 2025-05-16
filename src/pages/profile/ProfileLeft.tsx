import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/profile/default-profile-img.jpg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';
import { useEffect, useState } from 'react';
import ChatModal from '../message/ChatModal';
import useChatClose from '../../utils/changeMessageIcon';
import FollowModal from './FollowModal';
import followIcon from '../../assets/images/profile/follow-icon.svg';
import followIconBlack from '../../assets/images/profile/follow-icon-black.svg';
import { handleFollow, handleUnfollow } from '../../utils/followHandlers';

interface ProfileLeftProps extends UserInfo {
  theme: Theme;
}

export default function ProfileLeft({
  userData,
  theme,
  userId,
  refetchUserData,
}: ProfileLeftProps) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followData, setFollowData] = useState<Follow[]>([]);
  const [followType, setFollowType] = useState<'follower' | 'following'>(
    'follower'
  );
  const onClose = useChatClose(setIsChatOpen);
  const navigate = useNavigate();

  const openModalWithData = (data: Follow[] | undefined) => {
    if (!data) return;
    setFollowData(data);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user && userId) {
      const checkFollow = user.following.some((f) => f.user === userId);
      setIsFollowed(checkFollow);
    }
  }, [user, userId]);

  return (
    <>
      <div
        className={`w-[291px] h-[633px] rounded-bl-[10px] px-[50px] border-r-2 border-gray-300
    ${dark(theme) ? 'text-[#ffffff]' : ''}
  `}
      >
        <img
          src={userData?.image || defaultProfileImage}
          alt="Profile"
          className="w-[196px] h-[196px] rounded-[5px] mt-[60px]  object-contain overflow-hidden"
        />
        <div className="pt-[0px]">
          <p className="font-bold text-[20px] mt-[40px]">
            {' '}
            {userData?.fullName}
          </p>
          <p className="font-normal text-[14px] mt-[3px] w-[200px] break-words">
            {userData?.email}
          </p>
          <div className="flex gap-8.5 text-[16px] font-medium mt-[40px] ">
            <div
              className="flex  items-center cursor-pointer"
              onClick={() => {
                console.log('팔로워 리스트:', userData?.followers);
                openModalWithData(userData?.followers);
                setFollowType('follower');
              }}
            >
              <span>팔로워</span>
              <span className="ml-[8px]">{userData?.followers.length}</span>
            </div>
            <div
              className="flex  items-center cursor-pointer"
              onClick={() => {
                console.log('팔로잉 리스트:', userData?.following);
                openModalWithData(userData?.following);
                setFollowType('following');
              }}
            >
              <span>팔로잉</span>
              <span className="ml-[8px]">{userData?.following.length}</span>
            </div>
          </div>
          {user?._id === userId ? (
            <div className="mt-[25px] flex gap-6">
              <Button
                value="프로필 수정"
                className={`button-style3 ${
                  dark(theme) ? 'bg-[#ffffff] text-[#111111]' : ''
                }`}
                onClick={() => navigate('/profile/edit')}
              />
              <Mail
                className={`w-[30px] h-[30px] cursor-pointer ${
                  dark(theme) ? 'text-[#ffffff] opacity-80' : 'text-[#111111]'
                }`}
                onClick={() => setIsChatOpen(true)}
              />

              <ChatModal isOpen={isChatOpen} onClose={onClose} theme={theme} />
            </div>
          ) : (
            <div className="mt-[25px]">
              {userId &&
                (isFollowed ? (
                  <Button
                    value="팔로우 취소"
                    className={`button-style3 ${
                      dark(theme) ? 'bg-[#ffffff] text-[#111111]' : ''
                    }`}
                    onClick={() => {
                      if (!user) return;
                      handleUnfollow(user, userId, setUser, refetchUserData);
                    }}
                  />
                ) : (
                  <Button
                    value="팔로우"
                    className={`button-style3 ${
                      dark(theme) ? 'bg-[#ffffff] text-[#111111]' : ''
                    }`}
                    onClick={() => {
                      if (!user) return;
                      handleFollow(user, userId, setUser, refetchUserData);
                    }}
                    imageSrc={dark(theme) ? followIconBlack : followIcon}
                    imageAlt="팔로우 아이콘"
                  />
                ))}
            </div>
          )}
        </div>
        {isModalOpen && (
          <FollowModal
            isOpen={isModalOpen}
            onClose={async () => {
              setIsModalOpen(false);
              refetchUserData();
            }}
            followData={followData}
            followType={followType}
            targetUserId={userId}
            theme={theme}
          />
        )}
      </div>
    </>
  );
}
