import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import ChatUserList from './ChatUserList';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface User {
  id: string;
  name: string;
  content?: string;
  count?: number;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedUser(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={onClose}>
      <div className='w-[448px] h-[75vh] bg-white rounded-[5px] flex flex-col' onClick={(e) => e.stopPropagation()}>
        {selectedUser ? (
          <ChatRoom user={selectedUser} onBack={() => setSelectedUser(null)} onClose={onClose} />
        ) : (
          <ChatUserList onSelectUser={setSelectedUser} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
