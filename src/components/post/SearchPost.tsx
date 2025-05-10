import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchPost() {
  const [input, setInput] = useState('');
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="w-[205px] h-[31px]  flex items-center bg-white rounded-[5px] px-2.5 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => changeHandler(e)}
          placeholder="검색"
          className="flex-grow text-[11px] outline-none placeholder-[#989898]"
        />
        <Search className="w-[19.94px] h-[19.94px] text-[#86879C]" />
      </div>
    </>
  );
}
