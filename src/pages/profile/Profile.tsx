import { useCallback, useEffect, useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import { getUserData } from '../../api/profileInfo/profile';
import defaultCover from '../../assets/images/profile/defaultCover.png';

export default function Profile({ userId }: { userId: string }) {
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
    <div className='w-full h-[calc(100vh-100px-30px)] bg-white rounded-[10px] shadow-md font-semibold overflow-hidden flex flex-col'>
      <div className='h-[223px] flex-shrink-0'>
        <img
          src={userData?.coverImage || defaultCover}
          className='w-full h-full rounded-t-[10px] object-fill'
          alt='BackgroundImage '
        />
      </div>
      <div className=' flex  overflow-hidden'>
        <ProfileLeft userData={userData} userId={userId} refetchUserData={fetchUserData} />
        <ProfileRight userData={userData} />
      </div>
    </div>
  );
}
