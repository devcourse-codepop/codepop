import { Search } from "lucide-react";
import Avatar from "../avatar/Avatar";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsersData } from "../../api/memberbox/member";
import { useAuthStore } from "../../stores/authStore";

export default function MemberBox() {
  const { isLoggedIn, user } = useAuthStore();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value.toUpperCase());
  };

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

  useLayoutEffect(() => {
    fetchUsers();

    const interval = setInterval(fetchUsers, 2000);

    return () => clearInterval(interval);
  }, []);

  const filterUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
            name={`${user.fullName} (나)`}
            email={user.email}
            image={user.image}
            isOnline={false}
          ></Avatar>
        </div>
      )}
      <div
        className="member-list overflow-y-auto pr-3 h-[calc(100%-110px)] pt-2"
        style={{ height: isLoggedIn && `calc(100% - 161px)` }}
      >
        {filterUsers.map(
          (user) =>
            (user.fullName.includes(searchKeyword) ||
              user.email.includes(searchKeyword)) && (
              <Link
                to={`/profile/${user._id}`}
                key={user._id}
                state={{ userid: user._id }}
              >
                <Avatar
                  name={user.fullName}
                  email={user.email}
                  image={user.image}
                  isOnline={user.isOnline}
                ></Avatar>
              </Link>
            )
        )}
        <span className="hidden-effect absolute left-0 bottom-0 w-full"></span>
      </div>
    </div>
  );
}
