import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import close from '../../assets/images/closeBtn.svg';

export default function NotLoginModal({
  closeLoginModalHanlder,
}: {
  closeLoginModalHanlder: () => void;
}) {
  const navigate = useNavigate();

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000]"
        onClick={closeLoginModalHanlder}
      >
        <div
          className="bg-white p-5 rounded-[5px] text-center w-[300px] flex flex-col gap-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="opacity-70 text-[13px]">Notice</div>
              <img
                src={close}
                alt="close"
                className="w-4 h-4 cursor-pointer"
                onClick={closeLoginModalHanlder}
              />
            </div>
            <hr className="opacity-30" />
          </div>
          <div className="opacity-80 text-[15px]">
            로그인이 필요한 서비스입니다!
          </div>
          <div className="flex justify-end mr-5">
            <Button
              className="button-style3 text-[12px]"
              value="로그인 하러 가기"
              onClick={handleLoginClick}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
