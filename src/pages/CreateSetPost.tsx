import ChannelName from "../components/channel/ChannelName";
import Button from "../components/common/Button";
import ImageIcon from "../components/icon/ImageIcon";

export default function CreateSetPost() {
  return (
    <>
      <div className="justify-center mb-[60px]">
        <div className="ml-[384px] mt-[105px]">
          <ChannelName
            subtitle='"이거 왜 안 쓰지?"'
            title="데스크 셋업 공유 채널"
          />
        </div>

        <div className="ml-[381px] w-[999px] h-[766px] bg-white p-5 relative">
          <p className="font-semibold text-[35px] ml-5">제목</p>
          <hr className="my-8 opacity-30" />

          <div className="flex items-center justify-between">
            <p className="text-3xl opacity-50 ml-5">내용</p>
            <div className="flex items-center">
              <button>
                <ImageIcon />
              </button>
            </div>
          </div>

          <hr className="absolute bottom-[80px]  w-[955px] opacity-30" />
          <Button
            value="완료"
            className="button-style2 absolute bottom-[15px] right-[20px]"
          />
        </div>
      </div>
    </>
  );
}
