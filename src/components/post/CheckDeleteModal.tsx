import Button from '../common/Button';
import close from '../../assets/images/closeBtn.svg';
import { deleteComments, deletePosts } from '../../api/post/post';
import { useNavigate } from 'react-router-dom';

export default function CheckDeleteModal({
  type,
  channel,
  _id,
  closeDeleteModalHanlder,
  updateReloadTrigger,
}: {
  type: string;
  channel: string;
  _id: string;
  closeDeleteModalHanlder: () => void;
  updateReloadTrigger: () => void;
}) {
  const navigate = useNavigate();

  // 게시글이나 댓글 삭제하기
  const clickDeleteHandler = async () => {
    if (type === 'POST') {
      try {
        const { data } = await deletePosts(_id);
        console.log(data);
        closeDeleteModalHanlder();
        navigate(`/channel/${channel}`);
      } catch (e) {
        console.log(e instanceof Error && e.message);
      }
    } else if (type === 'COMMENT') {
      try {
        const { data } = await deleteComments(_id);
        console.log(data);
        updateReloadTrigger();
        closeDeleteModalHanlder();
      } catch (e) {
        console.log(e instanceof Error && e.message);
      }
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000]"
        onClick={closeDeleteModalHanlder}
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
                onClick={closeDeleteModalHanlder}
              />
            </div>
            <hr className="opacity-30" />
          </div>
          <div className="opacity-80 text-[15px]">삭제하시겠습니까?</div>
          <div className="flex justify-center gap-8">
            <Button
              className="button-style3 w-[80px] text-[12px]"
              value="취소"
              onClick={closeDeleteModalHanlder}
            ></Button>
            <Button
              className="button-style3 w-[80px] text-[12px] bg-[#FF0404]"
              value="삭제"
              onClick={clickDeleteHandler}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
