import { useRef, useState } from "react";

import ChannelName from "../../components/channel/ChannelName";
import Button from "../../components/common/Button";

import Editor from "../../components/editor/Editor";
import { createCodePost } from "../../api/write/write";
import { useParams } from "react-router-dom";

export default function CreateCodePost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(""); // Editor에서 본문 HTML을 받음
  // const imageRef = useRef<File | null>(null); // 추후 이미지 구현용
  const { channelId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleText = titleRef.current?.value || "";

    if (!channelId) {
      console.error("채널 ID가 없습니다.");
      return;
    }

    try {
      const res = await createCodePost({
        title: JSON.stringify({
          title: titleText,
          content: content,
        }),
        image: null,
        channelId: channelId,
      });

      console.log("작성 성공:", res.data);
      // 성공 시 이동 등 처리
    } catch (err) {
      console.error("작성 실패", err);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto min-h-screen h-auto flex items-start justify-center relative">
        {/* <div className="fixed bottom-[30px] left-[60px] flex flex-col space-y-[30px]">
          <ChannelBox />
          <MemberBox />
        </div> */}

        <div className="justify-center mb-[60px]">
          <div className="ml-[384px] mt-[30px]">
            <ChannelName
              subtitle='"골라봐"'
              title="선택의 갈림길에서 함께 답을 찾는 채널"
            />
          </div>

          <div className="ml-[381px] w-[999px] min-h-[766px] h-auto bg-white shadow-md rounded-[5px] p-5 relative">
            <input
              type="text"
              ref={titleRef}
              placeholder="제목을 입력하세요"
              className="w-[955px] font-semibold text-[25px] m-3 outline-none"
            />
            <hr className="mt-[14px] mb-[15px] opacity-30" />
            <Editor onChange={setContent} />

            <hr className="absolute bottom-[80px]  w-[955px] opacity-30" />

            {/* <button className="absolute bottom-[15px] right-[200px]">
              <CodeEditIcon />
            </button>
            <button className="absolute bottom-[12px] right-[150px]">
              <ImageIcon />
            </button> */}

            <Button
              value="완료"
              className="button-style2 absolute bottom-[15px] right-[20px]"
              onClick={handleSubmit} // onClick 이벤트 핸들러 연결
            />
          </div>
        </div>
      </div>
    </>
  );
}
