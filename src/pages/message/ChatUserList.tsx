import ChatHeader from './ChatHeader';
import { getMessageList, getMessages } from '../../api/message/message';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '../../stores/authStore';
// import userImage from '../../assets/images/profile/default-profile-img.jpg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';

interface ChatUserListProps {
  onSelectUser?: (user: User) => void;
  onClose: () => void;
  theme: Theme;
}

export default function ChatUserList({ onSelectUser, onClose, theme }: ChatUserListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notSeenCounts, setNotSeenCounts] = useState<{
    [userId: string]: number;
  }>({});

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [isCountLoading, setIsCountLoading] = useState(true);

  // 로그인한 사용자 정보 받아오기
  const user = useAuthStore((state) => state.user);

  // 메시지 전송 시간 포맷 설정
  const getElapsedTime = (createdAt: string) => {
    const now = dayjs().add(9, 'hour');
    const writeTime = dayjs(createdAt).add(9, 'hour');

    const gap = now.diff(writeTime, 's');
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    return writeTime.format('YYYY.MM.DD');
  };

  // 상대방 id 가져오기
  const getOpponentId = (idArr: string[]): string => {
    return idArr.find((id) => id !== user?._id) || '';
  };

  // 상대방 User 객체 가져오기
  const getOpponentUser = (con: Conversation, id: string): User => {
    return con.receiver._id === id ? con.receiver : con.sender;
  };

  // 전체 메시지 목록 가져오기
  const getMyMessageList = async () => {
    try {
      const { data } = await getMessageList();
      // console.log(data);

      setConversations(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e instanceof Error && e.message);
    }
  };

  // 각 대화 상대별 안 읽은 메시지 수 계산
  useEffect(() => {
    const getNotSeenCounts = async () => {
      const newCounts: { [userId: string]: number } = {};

      await Promise.all(
        conversations.map(async (con) => {
          const opponentId = getOpponentId(con._id);
          try {
            const { data } = await getMessages(opponentId);
            const count = data.filter((msg: Message) => msg.sender._id === opponentId && !msg.seen).length;
            newCounts[opponentId] = count;
          } catch (e) {
            console.log(e instanceof Error && e.message);
          }
        })
      );

      setNotSeenCounts(newCounts);
      setIsCountLoading(false);
    };

    if (conversations.length > 0) {
      getNotSeenCounts();
    }
  }, [conversations]);

  useEffect(() => {
    getMyMessageList();
  }, []);

  return (
    <div className='h-[75vh] flex-1 flex flex-col'>
      <ChatHeader onClose={onClose} theme={theme} />
      {isLoading || isCountLoading ? (
        <></>
      ) : (
        <div className={`flex-1 overflow-y-auto messageBox ${dark(theme) ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'}`}>
          {conversations.map((con) => {
            const opponentId = getOpponentId(con._id);
            const opponentUser = getOpponentUser(con, opponentId);
            const count = notSeenCounts[opponentId] || 0;

            return (
              <div
                //key={con._id}
                className={`w-full text-left flex py-[18px] px-[30px] rounded cursor-pointer ${
                  dark(theme)
                    ? 'bg-[#2d2d2d]  border-b border-b-white/40 text-[#ffffff] hover:bg-[#3b3b3b]'
                    : 'bg-[#ffffff] border-b border-b-[#DEDEDE] hover:bg-gray-200'
                }`}
                onClick={() => onSelectUser?.(opponentUser)}
              >
                {/* 상대 프로필, 이름, 마지막 대화 */}
                <img
                  src={opponentUser.image}
                  alt='상대 프로필'
                  className='w-[50px] h-[50px] rounded-[50%] border border-[#ddd]'
                />
                <div className='ml-[20px] pt-1.5'>
                  <p className='font-bold text-[14px]'>{opponentUser.fullName}</p>
                  <p
                    className={`font-normal  text-[12px] truncate w-[258px] ${
                      dark(theme) ? 'text-[#ffffff]/60' : 'text-[#000000]/60'
                    }`}
                  >
                    {con.message}
                  </p>
                </div>
                <div className='ml-[15px] pt-1 flex flex-col items-center w-[60px] shrink-0'>
                  {/* 보낸 시간  */}
                  <p className={`font-medium text-[12px] ${dark(theme) ? 'text-[#ffffff]/40' : 'text-[#000000]/40'}`}>
                    {getElapsedTime(con.createdAt)}
                  </p>
                  {/* 메시지 온 표시 */}
                  {count !== 0 && (
                    <p
                      className={twMerge(
                        'bg-[#E07070] mt-2 rounded-full inline-flex items-center justify-center h-[20px] font-normal text-[10px] text-white',
                        String(count).length === 1 ? 'w-[20px]' : String(count).length === 2 ? 'w-[26px]' : 'w-[32px]'
                      )}
                    >
                      {count > 999 ? '999+' : count}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
