import menuIcon from '../../assets/images/menu/menu-icon.svg';
import { Search } from 'lucide-react';
import Avatar from '../../components/avatar/Avatar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsersData } from '../../api/memberbox/member';
import { useAuthStore } from '../../stores/authStore';
import ChatModal from '../../pages/message/ChatModal';
// import { User1 } from '../../pages/message/ChatModal';
import useChatClose from '../../utils/changeMessageIcon';
import { handleFollow, handleUnfollow } from '../../utils/followHandlers';
import { Theme } from '../../types/darkModeTypes';

export default function FollowerMember({
  followData,
  followType,
  targetUserId,
  theme,
}: {
  followData: Follow[];
  followType: 'following' | 'follower';
  targetUserId?: string;
  theme: Theme;
}) {
  const { user, setUser } = useAuthStore();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [openUser, setOpenUser] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTargetUser, setChatTargetUser] = useState<User1 | null>(null);
  const [activeTab, setActiveTab] = useState<'following' | 'follower'>(followType);
  const onClose = useChatClose(setIsChatOpen);
  const modalRef = useRef<HTMLUListElement>(null);
  const isMyProfile = user?._id === targetUserId;

  useEffect(() => {
    setActiveTab(followType);
  }, [followType]);

  const isFollowingUser = (targetUserId: string) => {
    return user?.following?.some((follow) => follow.user === targetUserId);
  };

  const fetchUsers = useCallback(async () => {
    const { data } = await getAllUsersData();
    let fetchedUsers = data;

    if (user && !fetchedUsers.find((u: User) => u._id === user._id)) {
      fetchedUsers = [...fetchedUsers, user];
    }

    setUsers(
      fetchedUsers.sort((a, b) => {
        if (a.isOnline === b.isOnline) {
          return a.fullName.localeCompare(b.fullName);
        }
        return a.isOnline ? -1 : 1;
      })
    );
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value.toUpperCase());
  };

  const filterUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const followingMembers = filterUsers.filter((targetUser) =>
    isMyProfile
      ? user?.following?.some((follow) => follow.user === targetUser._id)
      : followData?.some((follow) => follow.user === targetUser._id)
  );

  const followerMembers = filterUsers.filter((targetUser) =>
    isMyProfile
      ? user?.followers?.some((follow) => follow.follower === targetUser._id)
      : followData?.some((follow) => follow.follower === targetUser._id)
  );

  const ToggleHandelr = (id: string) => {
    setOpenUser(openUser === id ? '' : id);
  };

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenUser('');
      }
    };
    window.addEventListener('mousedown', clickHandler);
    return () => window.removeEventListener('mousedown', clickHandler);
  }, []);

  return (
    <div className='w-[448px] h-[75vh] bg-white rounded-[10px] shadow-md pl-[30px] pr-[26px] pt-[20px] relative overflow-hidden'>
      {/* 탭 버튼 영역 */}
      <div className='flex justify-around mb-[13px]'>
        <button
          onClick={() => setActiveTab('follower')}
          className={`w-1/2 py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'follower' ? 'border-black text-black' : 'border-gray-300 text-gray-400'
          }`}
        >
          Follower
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`w-1/2 py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'following' ? 'border-black text-black' : 'border-gray-300 text-gray-400'
          }`}
        >
          Following
        </button>
      </div>

      {/* 검색창 */}
      <div className='flex items-center text-[#898FA3] bg-[#F6F8FA] px-3 py-2 rounded-[5.54px] text-[14px] gap-4 mb-[13px]'>
        <Search className='w-[19.94px] h-[19.94px] text-[#86879C]' />
        <input
          type='text'
          placeholder='Search'
          className='outline-none placeholder:text-[#898FA3] placeholder:text-[14px] w-full'
          onChange={searchHandler}
        />
      </div>

      {/* 유저 리스트 */}
      <div className='member-list overflow-y-auto pt-2 pb-2 h-[calc(75vh-140px)]'>
        {activeTab === 'follower' && followerMembers.length === 0 && (
          <div className='h-[50vh] flex items-center justify-center text-[20px] text-gray-600'>
            표시할 사용자가 없습니다.
          </div>
        )}
        {activeTab === 'follower' &&
          followerMembers.map((listedUser) => (
            <div className='relative' key={listedUser._id} id={listedUser._id}>
              <div className='memberCard cursor-pointer' onClick={() => ToggleHandelr(listedUser._id)}>
                <Avatar name={listedUser.fullName} email={listedUser.email} image={listedUser.image} theme={theme} />
              </div>
              <button className='absolute right-0 top-4 cursor-pointer' onClick={() => ToggleHandelr(listedUser._id)}>
                <img src={menuIcon} className='rotate-90' />
                {openUser === listedUser._id && (
                  <ul
                    ref={modalRef}
                    className='avatarMenu absolute text-xs w-27 right-5 top-0 bg-white rounded-[5px] border border-[#ddd] text-left z-2 py-1'
                  >
                    <li>
                      <Link
                        className='px-3 py-1 block opacity-70 hover:opacity-100'
                        to={`/profile`}
                        state={{ userid: listedUser._id }}
                      >
                        프로필 보기
                      </Link>
                    </li>
                    <li
                      className='px-3 py-1 block  opacity-70 hover:opacity-100'
                      onClick={() => {
                        setChatTargetUser({ id: listedUser._id, name: listedUser.fullName });
                        setIsChatOpen(true);
                      }}
                    >
                      메세지 보내기
                    </li>
                    {user?._id !== listedUser._id &&
                      (isFollowingUser(listedUser._id) ? (
                        <li
                          className='px-3 py-1 block  opacity-70 hover:opacity-100'
                          onClick={() => user && handleUnfollow(user, listedUser._id, setUser)}
                        >
                          팔로우 취소
                        </li>
                      ) : (
                        <li
                          className='px-3 py-1 block  opacity-70 hover:opacity-100'
                          onClick={() => user && handleFollow(user, listedUser._id, setUser)}
                        >
                          팔로우
                        </li>
                      ))}
                  </ul>
                )}
              </button>
            </div>
          ))}

        {activeTab === 'following' && followingMembers.length === 0 && (
          <div className='h-[50vh] flex items-center justify-center text-[20px] text-gray-600'>
            표시할 사용자가 없습니다.
          </div>
        )}
        {activeTab === 'following' &&
          followingMembers.map((listedUser) => (
            <div className='relative' key={listedUser._id} id={listedUser._id}>
              <div className='memberCard cursor-pointer' onClick={() => ToggleHandelr(listedUser._id)}>
                <Avatar name={listedUser.fullName} email={listedUser.email} image={listedUser.image} theme={theme} />
              </div>
              <button className='absolute right-0 top-4 cursor-pointer' onClick={() => ToggleHandelr(listedUser._id)}>
                <img src={menuIcon} className='rotate-90' />
                {openUser === listedUser._id && (
                  <ul
                    ref={modalRef}
                    className='avatarMenu absolute text-xs w-27 right-5 top-0 bg-white rounded-[5px] border border-[#ddd] text-left z-2 py-1'
                  >
                    <li>
                      <Link
                        className='px-3 py-1 block opacity-70 hover:opacity-100'
                        to={`/profile`}
                        state={{ userid: listedUser._id }}
                      >
                        프로필 보기
                      </Link>
                    </li>
                    <li
                      className='px-3 py-1 block  opacity-70 hover:opacity-100'
                      onClick={() => {
                        setChatTargetUser({ id: listedUser._id, name: listedUser.fullName });
                        setIsChatOpen(true);
                      }}
                    >
                      메세지 보내기
                    </li>
                    {user?._id !== listedUser._id &&
                      (isFollowingUser(listedUser._id) ? (
                        <li
                          className='px-3 py-1 block  opacity-70 hover:opacity-100'
                          onClick={() => user && handleUnfollow(user, listedUser._id, setUser)}
                        >
                          팔로우 취소
                        </li>
                      ) : (
                        <li
                          className='px-3 py-1 block  opacity-70 hover:opacity-100'
                          onClick={() => user && handleFollow(user, listedUser._id, setUser)}
                        >
                          팔로우
                        </li>
                      ))}
                  </ul>
                )}
              </button>
            </div>
          ))}
        <div className='h-4' />
      </div>

      <ChatModal initialUser={chatTargetUser} isOpen={isChatOpen} onClose={onClose} theme={theme} />
    </div>
  );
}
