import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import ChatUserList from './ChatUserList';
import { useMessageStore } from '../../stores/messageStore';
import MessageOpenIcon from '../../assets/images/message/message-open-icon.svg';
import { Theme } from '../../types/darkModeTypes';
import { dark } from '../../utils/darkModeUtils';
import { User } from '../../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUser?: User | null;
  theme: Theme;
}

export default function ChatModal({
  isOpen,
  onClose,
  initialUser,
  theme,
}: ChatModalProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const changeMessageIcon = useMessageStore((state) => state.setMessageIcon);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setSelectedUser(initialUser || null);
      setIsLoading(false);
      changeMessageIcon(dark(theme) ? MessageOpenIcon : MessageOpenIcon);
    }
  }, [isOpen, initialUser, changeMessageIcon, theme]);

  if (!isOpen) return null;

  return (
    !isLoading && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className={`w-[448px] h-[75vh] rounded-[5px] flex flex-col ${
            dark(theme) ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedUser ? (
            <ChatRoom
              user={selectedUser}
              onBack={() => setSelectedUser(null)}
              onClose={() => {
                setSelectedUser(null);
                onClose();
              }}
              theme={theme}
            /> // 채팅방
          ) : (
            <ChatUserList
              onSelectUser={setSelectedUser}
              onClose={onClose}
              theme={theme}
            /> // 대화했던 사람들 목록
          )}
        </div>
      </div>
    )
  );
}
