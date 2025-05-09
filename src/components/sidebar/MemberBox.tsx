import { Search } from 'lucide-react';

export default function MemberBox() {
  return (
    <div className='w-[291px] h-[calc(100vh-100px-211px-30px-30px)] bg-white rounded-[10px] shadow-md pl-[30px] pr-[26px]'>
      <h2 className='text-[#595656] font-medium text-[18px] mb-[13px] pt-[20px]'>Member</h2>
      <div className='flex items-center text-[#898FA3] bg-[#F6F8FA] py-2 rounded-[5.54px] text-[14px] gap-4'>
        <Search className='w-[19.94px] h-[19.94px] text-[#86879C] ml-[9px]' />
        <input
          type='text'
          placeholder='멤버를 검색해 보세요'
          className=' outline-none placeholder:text-[#898FA3] placeholder:text-[14px]w-full'
        />
      </div>
    </div>
  );
}
