import { useState } from 'react';
import { User } from './ChatModal';
import ChatHeader from './ChatHeader';
import messageSendBtn from '../../assets/images/message-send-btn.svg';

interface ChatRoomProps {
  user: User;
  onBack: () => void;
  onClose: () => void;
}

export default function ChatRoom({ user, onBack, onClose }: ChatRoomProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, newMessage]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <ChatHeader userName={user.name} onBack={onBack} onClose={onClose} />

      {/* 대화 내용 */}
      <div className='flex-1 overflow-y-auto p-2 font-normal px-[30px] space-y-3'>
        <p className='text-center font-medium text-[13px] mt-[18px] '>2025.05.13 (화)</p>
        {messages.map((msg, idx) => (
          <div key={idx} className='flex justify-end'>
            {/* 읽음 표시 + 시간 */}
            <div className='flex flex-col justify-end items-end mr-2 text-xs font-normal'>
              <span className='text-[#1E293B]'>1</span>
              <span className='text-black/50'>11:11</span>
            </div>
            {/* 메시지 내용 */}
            <div className='bg-[#1E293B] text-white p-2.5 rounded-b-[10px] rounded-tl-[10px] max-w-[75%] break-words'>
              {msg}
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <div className='flex p-4 border-t border-t-[#DEDEDE] bg-white rounded-b-[5px]'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full h-[50px] p-1 pl-[18px] rounded-[5px] bg-[#ECECEC] font-normal placeholder-[#898FA3] outline-none text-[14px]'
          placeholder='메시지를 입력해주세요...'
        />
        <img
          src={messageSendBtn}
          className='ml-[12px] w-[50px] h-[50px] rounded-[5px] cursor-pointer'
          onClick={handleSend}
        />
      </div>
    </div>
  );
}
