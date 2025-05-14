import menuIcon from '../../assets/MenuIcon.svg';
import menuIconWhite from '../../assets/MenuIconWhite.svg';

import { Search } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsersData } from '../../api/memberbox/member';
import { useAuthStore } from '../../stores/authStore';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function MemberBox({ theme }: { theme: Theme }) {
  const { isLoggedIn, user } = useAuthStore(); // 내 프로필
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 검색 키워드
  const [openUser, setOpenUser] = useState<string>(''); // 각 프로필 메뉴
  const [users, setUsers] = useState<User[]>([]); // 모든 사용자

  const fetchUsers = async () => {
    const result = await getAllUsersData();
    setUsers(
      result.data.sort((a, b) => {
        if (a.isOnline === b.isOnline) {
          return a.fullName.localeCompare(b.fullName);
        }
        return a.isOnline ? -1 : 1;
      })
    );
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(fetchUsers, 2000);

    return () => clearInterval(interval);
  }, []);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value.toUpperCase());
  };

  const filterUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const ToggleHandelr = (id: string) => {
    if (openUser === id) {
      setOpenUser('');
    } else {
      setOpenUser(id);
    }
  };

  return (
    <div
      className={`w-[291px] max-h-[calc(100%-240px)] h-[580px] rounded-[10px] shadow-md pl-[30px] pr-[26px]  pt-[20px]  relative overflow-hidden ${
        dark(theme) ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
      }`}
    >
      <h2
        className={`font-medium text-[18px] mb-[13px]  ${
          dark(theme) ? 'text-[#acacaa]' : 'text-[#595956]'
        }`}
      >
        Member
      </h2>
      <div className="flex items-center px-3 py-2 rounded-[5.54px] text-[14px] gap-4 mb-[13px] bg-[#F6F8FA] text-[#898FA3]">
        <div>
          <Search className="w-[19.94px] h-[19.94px] text-[#86879C]" />
        </div>
        <input
          type="text"
          placeholder="멤버를 검색해 보세요"
          className="outline-none  placeholder:text-[14px]w-full placeholder:text-[#898FA3]"
          onChange={(e) => searchHandler(e)}
        />
      </div>
      {isLoggedIn && (
        <div className="myInfoCard">
          <Link to={`/profile`} state={{ userid: user?._id }}>
            <Avatar
              name={`(나) ${user !== null ? user.fullName : ''}`}
              email={user !== null ? user.email : ''}
              image={user !== null ? user.image : ''}
              isOnline={user !== null ? user.isOnline : false}
              theme={theme}
            ></Avatar>
          </Link>
        </div>
      )}
      <div
        className="member-list overflow-y-auto pt-2"
        style={{
          height: isLoggedIn ? `calc(100% - 161px)` : `calc(100% - 91px)`,
        }}
      >
        {filterUsers.map((user) => (
          <div className="relative" key={user._id}>
            <div
              className="memberCard cursor-pointer"
              onClick={() => ToggleHandelr(user._id)}
            >
              <Avatar
                name={user.fullName}
                email={user.email}
                image={user.image}
                isOnline={user.isOnline}
                theme={theme}
              ></Avatar>
            </div>
            <button
              className="absolute right-0 top-4 cursor-pointer"
              onClick={() => ToggleHandelr(user._id)}
            >
              <img
                src={dark(theme) ? menuIconWhite : menuIcon}
                className="rotate-90"
              />
              {openUser === user._id && (
                <ul
                  className={`avatarMenu absolute text-xs w-27 right-5 top-0 rounded-[5px] text-left z-2 py-1 ${
                    dark(theme)
                      ? 'bg-[#2d2d2d] text-[#ffffff] border border-white/40'
                      : 'bg-[#ffffff] border border-[#ddd]'
                  }`}
                >
                  <li>
                    <Link
                      className="px-3 py-1 block opacity-70 hover:opacity-100"
                      to={`/profile`}
                      state={{ userid: user._id }}
                    >
                      프로필 보기
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-3 py-1 block  opacity-70 hover:opacity-100"
                      to={`/message/`}
                    >
                      메세지 보내기
                    </Link>
                  </li>
                </ul>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
