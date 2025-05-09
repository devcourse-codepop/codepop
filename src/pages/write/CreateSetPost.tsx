import { useCallback, useRef, useState } from "react";
import ChannelName from "../../components/channel/ChannelName";
import Button from "../../components/common/Button";
import Editor from "../../components/editor/Editor";
import { createCodePost } from "../../api/write/write";
import { useParams } from "react-router-dom";

export default function CreateSetPost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(""); // Editor에서 본문 HTML을 받음
  const [pollOptions, setPollOptions] = useState<
    { id: number; text: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { channelId } = useParams();

  const handlePollCreate = useCallback(
    (options: { id: number; text: string }[]) => {
      setPollOptions(options);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleText = titleRef.current?.value || "";

    if (!channelId) {
      console.error("채널 ID가 없습니다.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "title",
      JSON.stringify({
        title: titleText,
        content: content,
        pollOptions: pollOptions,
      })
    );
    formData.append("channelId", channelId);

    if (imageFile) {
      formData.append("image", imageFile); // 이미지 파일 추가
    }

    try {
      const res = await createCodePost(formData);
      console.log("작성 성공:", res.data);
      // 성공 시 이동 등 처리
    } catch (err) {
      console.error("작성 실패", err);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto min-h-screen h-auto flex items-start justify-center relative">
        <div className="justify-center mb-[60px]">
          <div className="ml-[384px] mt-[30px]">
            <ChannelName
              subtitle='"이거 왜 안 쓰지?"'
              title="데스크 셋업 공유 채널"
            />
          </div>

          <div className="ml-[381px] w-[999px] min-h-[766px] h-auto bg-white shadow-md rounded-[5px] p-5 relative">
            <input
              type="text"
              ref={titleRef}
              placeholder="제목을 입력하세요"
              autoFocus
              className="w-[955px] font-semibold text-[25px] m-3 outline-none"
            />
            <hr className="mt-[14px] mb-[15px] opacity-30" />
            <Editor
              onChange={setContent}
              onPollCreate={handlePollCreate}
              onImageSelect={(file) => setImageFile(file)} // 이미지 저장
            />
            <hr className="absolute bottom-[80px]  w-[955px] opacity-30" />
            <Button
              value="완료"
              className="button-style2 absolute bottom-[15px] right-[20px]"
              onClick={handleSubmit} // 게시물 작성 완료 시 제출
            />
          </div>
        </div>
      </div>
    </>
  );
}
