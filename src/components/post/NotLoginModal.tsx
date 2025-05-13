import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import close from '../../assets/images/closeBtn.svg';
import closeWhite from '../../assets/images/closeBtnWhite.svg';

interface Theme {
  name: string;
}

export default function NotLoginModal({
  closeModalHanlder,
  theme,
}: {
  closeModalHanlder: () => void;
  theme: Theme;
}) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000]">
        <div
          className={`p-5 rounded-[5px] text-center w-[300px] flex flex-col gap-10 ${
            theme.name === 'Dark'
              ? 'bg-[#2d2d2d] text-[#ffffff]'
              : 'bg-[#ffffff]'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="opacity-70 text-[13px]">Notice</div>
              <img
                src={`${theme.name === 'Dark' ? closeWhite : close}`}
                alt="close"
                className="w-4 h-4 cursor-pointer"
                onClick={closeModalHanlder}
              />
            </div>
            <hr className="opacity-30" />
          </div>
          <div className="opacity-80 text-[15px]">
            로그인한 사용자만 볼 수 있습니다!
          </div>
          <div className="flex justify-end mr-5">
            <Button
              className={`button-style3 text-[12px] ${
                theme.name === 'Dark' ? 'bg-[#ffffff] text-[#111111]' : ''
              }`}
              value="로그인 하러 가기"
              onClick={handleLoginClick}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
