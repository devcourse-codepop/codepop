import { Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/profile/defaultProfileImage.jpg';

interface Theme {
  name: string;
}

interface ProfileLeftProps extends UserInfo {
  theme: Theme;
}

export default function ProfileLeft({
  userData,
  onSelectTab,
  userId,
  theme,
}: ProfileLeftProps) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`w-[291px] h-[633px] rounded-bl-[10px] px-[50px] border-r-2 border-gray-300 ${
          theme.name === 'Dark' ? '' : ''
        }`}
      >
        <img
          src={userData?.image || defaultProfileImage}
          className="w-[196px] h-[196px] rounded-[5px] mt-[60px]  object-contain overflow-hidden"
        />
        <div className="pt-[0px]">
          <p
            className={`font-bold text-[20px] mt-[42px] ${
              theme.name === 'Dark'
                ? 'text-[#ffffff] opacity-80'
                : 'text-[#111111]'
            }`}
          >
            {' '}
            {userData?.fullName}
          </p>
          <p
            className={`font-normal text-[14px] mt-[11px] ${
              theme.name === 'Dark'
                ? 'text-[#ffffff] opacity-80'
                : 'text-[#111111]'
            }`}
          >
            {userData?.email}
          </p>
          <div className="flex gap-4 text-[16px] font-semibold mt-[38px]">
            <p
              className={`cursor-pointer ${
                theme.name === 'Dark'
                  ? 'text-[#ffffff] opacity-80'
                  : 'text-[#111111]'
              }`}
              onClick={() => onSelectTab('posts')}
            >
              포스트 {userData?.posts.length}
            </p>
            <p
              className={`cursor-pointer ${
                theme.name === 'Dark'
                  ? 'text-[#ffffff] opacity-80'
                  : 'text-[#111111]'
              }`}
              onClick={() => onSelectTab('likes')}
            >
              좋아요 {userData?.likes.length}
            </p>
            <p
              className={`cursor-pointer ${
                theme.name === 'Dark'
                  ? 'text-[#ffffff] opacity-80'
                  : 'text-[#111111]'
              }`}
              onClick={() => onSelectTab('comments')}
            >
              댓글 {userData?.comments.length}
            </p>
          </div>
          {user?._id === userId && (
            <div className="mt-[25px] flex gap-6">
              <Button
                value="프로필 수정"
                className={`button-style3 ${
                  theme.name === 'Dark' ? 'bg-[#ffffff] text-[#111111]' : ''
                }`}
                onClick={() => navigate('/profile/edit')}
              />
              <Mail
                className={`w-[30px] h-[30px] cursor-pointer ${
                  theme.name === 'Dark'
                    ? 'text-[#ffffff] opacity-80'
                    : 'text-[#111111]'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
