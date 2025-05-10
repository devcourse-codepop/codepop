import { Search } from "lucide-react";
import Avatar from "../avatar/Avatar";
import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsersData } from "../../api/memberbox/member";

export default function MemberBox() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const fetchUsers = async () => {
    const result = await getAllUsersData();
    setUsers(result.data);
  };

  useLayoutEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-[291px] max-h-[calc(100%-240px)] h-[580px] bg-white rounded-[10px] shadow-md pl-[30px] pr-[26px]  relative overflow-hidden">
      <h2 className="text-[#595656] font-medium text-[18px] mb-[13px] pt-[20px]">
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
      <div className="member-list overflow-y-auto pr-3 h-[calc(100%-110px)]">
        {users.map((user) =>
          searchKeyword !== null ? (
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
          ) : (
            <Link
              to={`/profile/:${user._id}`}
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
