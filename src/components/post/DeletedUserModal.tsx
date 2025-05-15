import Button from '../common/Button';
import close from '../../assets/images/close/close-btn.svg';

export default function DeletedUserModal({
  closeUserModalHanlder,
}: {
  closeUserModalHanlder: () => void;
}) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000]"
        onClick={closeUserModalHanlder}
      >
        <div className="bg-white p-5 rounded-[5px] text-center w-[300px] flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="opacity-70 text-[13px]">Notice</div>
              <img
                src={close}
                alt="close"
                className="w-4 h-4 cursor-pointer"
                onClick={closeUserModalHanlder}
              />
            </div>
            <hr className="opacity-30" />
          </div>
          <div className="opacity-80 text-[15px]">
            탈퇴한 회원의 게시글입니다!
          </div>
          <div className="flex justify-end mr-5">
            <Button
              className="button-style3 text-[12px]"
              value="확인"
              onClick={closeUserModalHanlder}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
