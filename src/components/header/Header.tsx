import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/header/logo.svg';
import Notification from '../notification/Notification';
import { useAuthStore } from '../../stores/authStore';
import ChatModal from '../../pages/message/ChatModal';
import { useState } from 'react';
import { useMessageStore } from '../../stores/messageStore';
import useChatClose from '../../utils/changeMessageIcon';

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  const navigator = useNavigate();
  const user = useAuthStore((state) => state.user);
  const messageIcon = useMessageStore((state) => state.messageIcon);
  const [isChatOpen, setIsChatOpen] = useState(false);

  let imgSrc: string = '';
  if (user?.image === undefined || user?.image === '') {
    imgSrc =
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  } else {
    imgSrc = user?.image;
  }

  const handleMessageClick = () => {
    setIsChatOpen(true);
  };

  const onClose = useChatClose(setIsChatOpen);
  return (
    <>
      <header className='h-[100px] px-[60px] flex items-center justify-between'>
        <h1>
          <Link to='/'>
            <img src={logo} />
          </Link>
        </h1>
        <div>
          {!isLoggedIn && (
            <Link to='/login' className='text-[20px]'>
              Login
            </Link>
          )}
          {isLoggedIn && (
            <div className='flex items-center gap-6'>
              <Link to='/' onClick={logout} className='text-[20px]'>
                Logout
              </Link>
              <div className='notification-wrapper relative'>
                <Notification />
              </div>
              <img src={messageIcon} onClick={handleMessageClick} className='cursor-pointer w-[28px] h-[28px]' />
              <img
                src={imgSrc}
                className='w-10 h-10 rounded-3xl overflow-hidden cursor-pointer'
                onClick={() => navigator('/profile')}
              />
            </div>
          )}
        </div>
      </header>

      <ChatModal isOpen={isChatOpen} onClose={onClose} />
    </>
  );
}
