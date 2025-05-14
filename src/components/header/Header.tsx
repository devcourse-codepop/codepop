import { Link, useNavigate } from 'react-router-dom';
import Notification from '../notification/Notification';
import { useAuthStore } from '../../stores/authStore';
import moon from '../../assets/images/toggle/moon.svg';
import sun from '../../assets/images/toggle/sun.svg';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function Header({
  theme,
  nextTheme,
  nextThemeIndex,
}: {
  theme: Theme;
  nextTheme: () => void;
  nextThemeIndex: number;
}) {
  const { isLoggedIn, logout } = useAuthStore();
  const navigator = useNavigate();
  const user = useAuthStore((state) => state.user);

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
            <img src={theme.logo} />
          </Link>
        </h1>

        <div className="flex items-center gap-6">
          {!isLoggedIn && (
            <Link
              to="/login"
              className={`text-[20px] ${
                dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
              }`}
            >
              Login
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link
                to="/"
                onClick={logout}
                className={`text-[20px] ${
                  dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
                }`}
              >
                Logout
              </Link>
              <div className="notification-wrapper relative">
                <Notification theme={theme} />
              </div>
              <img
                src={imgSrc}
                className="w-10 h-10 rounded-3xl overflow-hidden cursor-pointer"
                onClick={() => navigator('/profile')}
              />
            </>
          )}

          {/* 다크모드 버튼 */}
          <div
            className={`w-10 h-10 rounded-full flex justify-center items-center transition-colors duration-300 ${
              nextThemeIndex === 1 ? 'bg-black' : 'bg-white'
            }`}
          >
            <button
              onClick={nextTheme}
              className="w-full h-full flex justify-center items-center"
            >
              <img
                src={nextThemeIndex === 1 ? moon : sun}
                alt="해, 달 이미지"
                className="w-6 h-6 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
