import { Link } from 'react-router-dom';
import logo from '../../assets/images/header/logo.svg';
import Notification from '../notification/Notification';
import { useAuthStore } from '../../stores/authStore';

export default function Header() {
  const { isLoggedIn, user, logout } = useAuthStore();
  console.log(user?.image);
  let imgSrc: string = '';
  if (user?.image === undefined || user?.image === '') {
    imgSrc =
      'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  } else {
    imgSrc = user?.image;
  }
  return (
    <>
      <header className="h-[100px] px-[60px] flex items-center justify-between">
        <h1>
          <Link to="/">
            <img src={logo} />
          </Link>
        </h1>
        <div>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && (
            <div className="flex items-center gap-6">
              <Link to="/" onClick={logout} className="text-[20px]">
                Logout
              </Link>
              <div className="notification-wrapper">
                <Notification />
              </div>
              <img
                src={imgSrc}
                className="w-10 h-10 rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => (window.location.href = '/profile')}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
