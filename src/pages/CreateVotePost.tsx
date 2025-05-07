import ChannelName from "../components/channel/ChannelName";
import Button from "../components/common/Button";
import ImageIcon from "../components/icon/ImageIcon";
import VoteIcon from "../components/icon/VoteIcon";

export default function CreateVotePost() {
  return (
    <>
      <div className="justify-center mb-[60px]">
        <div className="ml-[384px] mt-[105px]">
          <ChannelName
            subtitle='"골라봐"'
            title="선택의 갈림길에서 함께 답을 찾는 채널"
          />
        </div>

        <div className="ml-[381px] w-[999px] h-[766px] bg-white p-5 relative">
          <p className="font-semibold text-[35px] ml-5">제목</p>
          <hr className="my-8 opacity-30" />

          <div className="flex items-center justify-between">
            <p className="text-3xl opacity-50 ml-5">내용</p>
            <div className="flex items-center">
              <button>
                <VoteIcon />
              </button>
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
