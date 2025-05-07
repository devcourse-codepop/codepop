import { useEffect, useRef } from "react";

import ChannelName from "../components/channel/ChannelName";
import Button from "../components/common/Button";
// import CodeEditIcon from "../components/icon/CodeEditIcon";
// import ImageIcon from "../components/icon/ImageIcon";
import Editor from "../components/editor/Editor";
import ChannelBox from "../components/sidebar/ChannelBox";
import MemberBox from "../components/sidebar/MemberBox";

export default function CreateCodePost() {
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = editableRef.current;
    if (!div) return;

    const handleInput = () => {
      // <br>만 남아 있다면 강제로 비우기
      if (div.innerHTML === "<br>") {
        div.innerHTML = "";
      }
    };

    div.addEventListener("input", handleInput);
    return () => div.removeEventListener("input", handleInput);
  }, []);
  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto min-h-screen h-auto flex items-start justify-center relative">
        <div className="fixed bottom-[30px] left-[60px] flex flex-col space-y-[30px]">
          <ChannelBox />
          <MemberBox />
        </div>

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
              placeholder="제목을 입력하세요"
              className="w-[955px] font-semibold text-[35px] m-3 outline-none"
            />
            <hr className="mt-[14px] mb-[15px] opacity-30" />
            <Editor />

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
            />
          </div>
        </div>
      </div>
    </>
  );
}
