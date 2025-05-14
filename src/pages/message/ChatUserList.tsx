import ChatHeader from './ChatHeader';
import { User1 } from './ChatModal';
import userImage from '../../assets/images/profile/defaultProfileImage.jpg';
interface ChatUserListProps {
  onSelectUser: (user: User1) => void;
  onClose: () => void;
}

const mockUsers: User1[] = [
  { id: '1', name: '박서영', content: '안녕' },
  { id: '2', name: '김태연', content: '안녕', count: 1 },
  { id: '3', name: '유강민', content: '안녕', count: 12 },
  {
    id: '4',
    name: '조소정',
    content: '안녕ddddddddddddddddddddddddddddddddddd',
    count: 120,
  },
  { id: '5', name: '한유빈', content: '안녕ddddddd', count: 1200 },
  { id: '1', name: '박서영', content: '안녕' },
  { id: '2', name: '김태연', content: '안녕', count: 1 },
  { id: '3', name: '유강민', content: '안녕', count: 12 },
  {
    id: '4',
    name: '조소정',
    content: '안녕ddddddddddddddddddddddddddddddddddd',
    count: 120,
  },
  { id: '5', name: '한유빈', content: '안녕ddddddd', count: 1200 },
  { id: '1', name: '박서영', content: '안녕' },
  { id: '2', name: '김태연', content: '안녕', count: 1 },
  { id: '3', name: '유강민', content: '안녕', count: 12 },
  {
    id: '4',
    name: '조소정',
    content: '안녕ddddddddddddddddddddddddddddddddddd',
    count: 120,
  },
  { id: '5', name: '한유빈', content: '안녕ddddddd', count: 1200 },
];

export default function ChatUserList({
  onSelectUser,
  onClose,
}: ChatUserListProps) {
  return (
    <div className="h-[75vh] flex-1 flex flex-col">
      <ChatHeader onClose={onClose} />
      <div className="flex-1 overflow-y-auto messageBox">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="w-full text-left flex py-[18px] px-[30px] bg-white border-b border-b-[#DEDEDE] rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            {/* 상대 프로필, 이름, 마지막 대화 */}
            <img
              src={userImage}
              alt="상대 프로필"
              className="w-[50px] h-[50px] rounded-[50%] border border-[#ddd]"
            />
            <div className="ml-[20px] pt-1.5">
              <p className="font-bold text-[14px]">{user.name}</p>
              <p className="font-normal text-[#000000]/60 text-[12px] truncate w-[258px]">
                {user.content}
              </p>
            </div>
            <div className="ml-[15px] pt-1 flex flex-col items-center w-[60px] shrink-0">
              {/* 보낸 시간  */}
              <p className="font-medium text-[12px] text-black/40">14분 전</p>
              {/* 메시지 온 표시 */}
              {user.count !== undefined && (
                <p
                  className={`bg-[#E07070] mt-2 rounded-full inline-flex items-center justify-center h-[20px] font-normal text-[10px] text-white ${
                    String(user.count).length === 1
                      ? 'w-[20px]'
                      : String(user.count).length === 2
                      ? 'w-[26px]'
                      : 'w-[32px]'
                  }`}
                >
                  {Number(user.count) > 999 ? '999+' : user.count}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
