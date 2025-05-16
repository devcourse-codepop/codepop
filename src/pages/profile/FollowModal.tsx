// import MemberBox from '../../components/sidebar/MemberBox';

import FollowerMember from './FollowMember';

interface FollowModal {
  isOpen: boolean;
  onClose: () => void;
  followData: Follow[];
  followType: 'following' | 'follower';
  targetUserId?: string;
}

export default function ChatModal({ isOpen, onClose, followData, followType, targetUserId }: FollowModal) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={onClose}>
      <div className='w-[448px] h-[75vh] bg-white rounded-[5px] flex flex-col' onClick={(e) => e.stopPropagation()}>
        {/* <MemberBox followData={followData} /> */}
        <FollowerMember followData={followData} followType={followType} targetUserId={targetUserId} />
      </div>
    </div>
  );
}
