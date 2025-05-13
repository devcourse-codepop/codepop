import { useEffect, useState } from 'react';
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';
import { getUserData } from '../../api/profileInfo/profile';

interface Theme {
  name: string;
}

export default function Profile({
  userId,
  theme,
}: {
  userId: string;
  theme: Theme;
}) {
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    'posts' | 'likes' | 'comments'
  >('posts');

  const axiosList = async () => {
    try {
      const { data: userData } = await getUserData(userId);
      setUserData(userData);
      console.log('완료');
    } catch (error) {
      console.error('getUserData 오류:', error);
    }
  };

  useEffect(() => {
    setUserData(null);
    if (userId) {
      axiosList();
      setSelectedTab('posts');
    }
  }, [userId]);

  if (!userData) {
    return <div className="text-center py-10 text-gray-500">로딩 중...</div>;
  }

  return (
    <div
      className={`w-full h-[calc(100vh-100px-30px)] rounded-[10px] shadow-md font-semibold overflow-hidden flex flex-col ${
        theme.name === 'Dark' ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
      }`}
    >
      <div className="h-[223px] flex-shrink-0">
        <img
          src={userData?.coverImage}
          className="w-full h-full rounded-t-[10px] object-fill"
          alt="BackgroundImage "
        />
      </div>
      <div className=" flex  overflow-hidden">
        <ProfileLeft
          userData={userData}
          onSelectTab={setSelectedTab}
          userId={userId}
          theme={theme}
        />
        <ProfileRight
          userData={userData}
          selectedTab={selectedTab}
          theme={theme}
        />
      </div>
    </div>
  );
}
