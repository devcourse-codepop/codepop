import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import ChatUserList from './ChatUserList';
import { useMessageStore } from '../../stores/messageStore';
import MessageOpenIcon from '../../assets/images/message/messageOpenIcon.svg';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUser?: User1 | null;
}

export interface User1 {
  id?: string;
  name: string;
  content?: string;
  count?: number;
}

export default function ChatModal({
  isOpen,
  onClose,
  initialUser,
}: ChatModalProps) {
  const [selectedUser, setSelectedUser] = useState<User1 | null>(null);
  const changeMessageIcon = useMessageStore((state) => state.setMessageIcon);

  useEffect(() => {
    if (isOpen) {
      setSelectedUser(initialUser || null);
      changeMessageIcon(MessageOpenIcon);
    }
  }, [isOpen, initialUser]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-[448px] h-[75vh] bg-white rounded-[5px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {selectedUser ? (
          <ChatRoom
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
            onClose={onClose}
          /> // 채팅방
        ) : (
          <ChatUserList onSelectUser={setSelectedUser} onClose={onClose} /> // 대화했던 사람들 목록
        )}
      </div>
    </div>
  );
}
