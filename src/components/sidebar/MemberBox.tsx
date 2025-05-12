import menuIcon from "../../assets/MenuIcon.svg";
import { Search } from "lucide-react";
import Avatar from "../avatar/Avatar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsersData } from "../../api/memberbox/member";
import { useAuthStore } from "../../stores/authStore";

export default function MemberBox() {
  const { isLoggedIn, user } = useAuthStore(); // 내 프로필
  const [searchKeyword, setSearchKeyword] = useState<string>(""); // 검색 키워드
  const [openUser, setOpenUser] = useState<string>(""); // 각 프로필 메뉴
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
      setOpenUser("");
    } else {
      setOpenUser(id);
    }
  };

  return (
    <div className="w-[291px] max-h-[calc(100%-240px)] h-[580px] bg-white rounded-[10px] shadow-md pl-[30px] pr-[26px]  pt-[20px]  relative overflow-hidden">
      <h2 className="text-[#595656] font-medium text-[18px] mb-[13px]">
        Member
      </h2>
      <div className="flex items-center text-[#898FA3] bg-[#F6F8FA] px-3 py-2 rounded-[5.54px] text-[14px] gap-4 mb-[13px]">
        <div>
          <Search className="w-[19.94px] h-[19.94px] text-[#86879C]" />
        </div>
        <input
          type="text"
          placeholder="멤버를 검색해 보세요"
          className=" outline-none placeholder:text-[#898FA3] placeholder:text-[14px]w-full"
          onChange={(e) => searchHandler(e)}
        />
      </div>
      {isLoggedIn && (
        <div className="myInfoCard">
          <Avatar
            name={`${user !== null ? user.fullName : ""} (나)`}
            email={user !== null ? user.email : ""}
            image={user !== null ? user.image : ""}
            isOnline={user !== null ? user.isOnline : false}
          ></Avatar>
        </div>
      )}
      <div
        className="member-list overflow-y-auto pt-2"
        style={{
          height: isLoggedIn ? `calc(100% - 161px)` : `calc(100% - 91px)`,
        }}
      >
        {filterUsers.map(
          (user) =>
            (user.fullName.includes(searchKeyword) ||
              user.email.includes(searchKeyword)) && (
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
                  ></Avatar>
                </div>
                <button
                  className="absolute right-0 top-4 cursor-pointer"
                  onClick={() => ToggleHandelr(user._id)}
                >
                  <img src={menuIcon} className="rotate-90" />
                  {openUser === user._id && (
                    <ul className="avatarMenu absolute text-xs w-27 right-5 top-0 bg-white rounded-[5px] border border-[#ddd] text-left z-2 py-1">
                      <li>
                        <Link
                          className="px-3 py-1 block opacity-70 hover:opacity-100"
                          state={{ userid: user._id }}
                          to={`/profile`}
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
            )
        )}
      </div>
    </div>
  );
}
