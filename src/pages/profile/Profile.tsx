import { useCallback, useEffect, useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import { getUserData } from '../../api/profileInfo/profile';
import defaultCover from '../../assets/images/profile/default-cover.png';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';

export default function Profile({
  userId,
  theme,
}: {
  userId: string;
  theme: Theme;
}) {
  const [userData, setUserData] = useState<User | null>(null);

  const fetchUserData = useCallback(async () => {
    try {
      const { data: userData } = await getUserData(userId);
      setUserData(userData);
    } catch (error) {
      console.error('getUserData 오류:', error);
    }
  }, [userId]);

  useEffect(() => {
    setUserData(null);
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  if (!userData) {
    return <div className='text-center py-10 text-gray-500'>로딩 중...</div>;
  }

  return (
    <div
      className={`w-full h-full rounded-[10px] shadow-md font-semibold overflow-auto ${
        dark(theme) ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
      }`}
    >
      <div className='h-[223px] flex-shrink-0'>
        <img
          src={userData?.coverImage || defaultCover}
          className='w-full h-full rounded-t-[10px] object-fill'
          alt='BackgroundImage '
        />
      </div>
      <div className=' flex  min-h-[calc(100% - 223px)]'>
        <ProfileLeft
          userData={userData}
          userId={userId}
          refetchUserData={fetchUserData}
          theme={theme}
        />
        <ProfileRight userData={userData} theme={theme} />
      </div>
    </div>
  );
}
