export default function ChannelBox() {
  return (
    <>
      <div className='w-[291px] h-[211px] bg-white rounded-[10px] shadow-md font-semibold mb-[30px]'>
        <h2 className='text-[20px] font-medium text-[#595956] ml-7 pt-5 mb-[14px]'>Channel</h2>
        <ul className='space-y-[13px]'>
          <li className='flex items-start ml-[29px]'>
            <span className='w-1 h-8 bg-[#10215C] rounded-sm mr-[7px]'></span>
            <span className='font-noto font-[18px] pt-1'>이거 왜 되지?</span>
          </li>
          <li className='flex items-start ml-[29px]'>
            <span className='w-1 h-8 bg-[#3380DE] rounded-sm mr-[7px]'></span>
            <span className='font-[18px] pt-1'>이거 왜 안 쓰지?</span>
          </li>
          <li className='flex items-start ml-[29px] '>
            <span className='w-1 h-8 bg-[#60A7F7] rounded-sm mr-[7px]'></span>
            <span className='font-[18px] pt-1'>골라봐</span>
          </li>
        </ul>
      </div>
    </>
  );
}
