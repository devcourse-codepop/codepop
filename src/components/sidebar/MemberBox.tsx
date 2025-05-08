import { Search } from 'lucide-react';
import Avatar from '../avatar/Avatar';
import profileImage from '../../assets/images/avatar.svg';

export default function MemberBox() {
  // h-[613px]
  return (
    <div className="w-[291px] max-h-[425px] bg-white rounded-[10px] shadow-md pl-[30px] pr-[26px]">
      <h2 className="text-[#595656] font-medium text-[18px] mb-[13px] pt-[20px]">
        Member
      </h2>
      <div className="flex items-center text-[#898FA3] bg-[#F6F8FA] px-3 py-2 rounded-[5.54px] text-[14px] gap-4">
        <Search className="w-[19.94px] h-[19.94px] text-[#86879C]" />
        <input
          type="text"
          placeholder="멤버를 검색해 보세요"
          className=" outline-none placeholder:text-[#898FA3] placeholder:text-[14px]w-full"
        />
      </div>
      <div className="max-h-[328px] overflow-auto">
        <Avatar name="사용자" email="user123@gmail.com" image={profileImage} />
        <Avatar name="사용자" email="user123@gmail.com" image={profileImage} />
        <Avatar name="사용자" email="user123@gmail.com" image={profileImage} />
        <Avatar name="사용자" email="user123@gmail.com" image={profileImage} />
        <Avatar name="사용자" email="user123@gmail.com" image={profileImage} />
      </div>
    </div>
  );
}
