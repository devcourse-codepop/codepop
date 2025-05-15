<<<<<<< HEAD
import { useCallback, useRef, useState } from "react";
import ChannelName from "../../components/channel/ChannelName";
import Button from "../../components/common/Button";
import Editor from "../../components/editor/Editor";
import { createCodePost } from "../../api/write/write";
import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../stores/postStore";

export default function CreateVotePost() {
  const params = useParams();
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Editor에서 본문 HTML을 받음
=======
import { useCallback, useRef, useState } from 'react';
import ChannelName from '../../components/channel/ChannelName';
import Button from '../../components/common/Button';
import Editor from '../../components/editor/Editor';
import { createCodePost } from '../../api/write/write';
import { useNavigate, useParams } from 'react-router-dom';
import { Theme } from '../../types/ darkModeTypes';
import { dark } from '../../utils/ darkModeUtils';

export default function CreateVotePost({ theme }: { theme: Theme }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState(''); // Editor에서 본문 HTML을 받음
>>>>>>> 82acb67fa7e21f75df69bbd3b1e8ec870dba89e4
  const [pollOptions, setPollOptions] = useState<
    { id: number; text: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { channelId } = useParams();
  const channel = params.channelId;
  const channelIdList = usePostStore((state) => state.channelIdList);

  const handlePollCreate = useCallback(
    (options: { id: number; text: string }[]) => {
      setPollOptions(options);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/channel/${channelId}`);
    const titleText = titleRef.current?.value || '';

    if (!channelId) {
      console.error('채널 ID가 없습니다.');
      return;
    }

    const formData = new FormData();

    formData.append(
      'title',
      JSON.stringify({
        title: titleText,
        content: content,
        pollOptions: pollOptions,
      })
    );
<<<<<<< HEAD
    formData.append("channelId", channelIdList[Number(channel) - 1]);
=======
    formData.append('channelId', '681b8570437f722b6908ab69');
>>>>>>> 82acb67fa7e21f75df69bbd3b1e8ec870dba89e4

    if (imageFile) {
      formData.append('image', imageFile); // 이미지 파일 추가
    }

    try {
      const res = await createCodePost(formData);
      console.log('작성 성공:', res.data);
      // 성공 시 이동 등 처리
    } catch (err) {
      console.error('작성 실패', err);
    }
  };

  const isSubmitDisabled = title.trim() === "" || content.trim() === "";
  return (
    <>
      <div className='w-full flex relative'>
        <div>
<<<<<<< HEAD
          <div className='pb-[30px]'>
            <ChannelName channelId={channelId ?? "3"} />
          </div>

          <div className=' bg-white shadow-md rounded-[10px] p-5 relative max-h-[697px] overflow-y-auto'>
=======
          <div className="pb-[30px]">
            <ChannelName channelId={channelId ?? '3'} theme={theme} />
          </div>

          <div
            className={`shadow-md rounded-[10px] p-5 relative max-h-[697px] overflow-y-auto ${
              dark(theme)
                ? 'bg-[#2d2d2d] text-[#ffffff]'
                : 'bg-[#ffffff] text-[#111111]'
            }`}
          >
>>>>>>> 82acb67fa7e21f75df69bbd3b1e8ec870dba89e4
            <input
              type='text'
              ref={titleRef}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력하세요'
              autoFocus
              className='w-[955px] font-semibold text-[25px] m-3 outline-none'
            />
<<<<<<< HEAD
            <hr className='mt-[15px] mb-[15px] opacity-30' />
=======
            <hr
              className={`mt-[15px] mb-[15px] opacity-30 ${
                dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
              }`}
            />
>>>>>>> 82acb67fa7e21f75df69bbd3b1e8ec870dba89e4
            <Editor
              onChange={setContent}
              onPollCreate={handlePollCreate}
              onImageSelect={(file) => setImageFile(file)} // 이미지 저장
              showPollButton={true}
              // disableMinHeight={true}
              initialContent={content}
              theme={theme}
            />
            <hr
              className={`mb-[60px] opacity-30 ${
                dark(theme) ? 'text-[#ffffff]' : 'text-[#111111]'
              }`}
            />
<<<<<<< HEAD
            <hr className='opacity-30' />
            <div className='flex justify-end mt-6'>
              <Button
                value='완료'
                className={`button-style2 ${
                  isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={(e) => {
                  if (isSubmitDisabled) {
                    e.preventDefault(); // 아무 동작도 하지 않음
                    return;
                  }
                  handleSubmit(e);
                }}
              />
            </div>
=======
            <Button
              value="완료"
              className={`button-style2 absolute bottom-[15px] right-[20px] ${
                dark(theme) ? 'bg-[#ffffff] text-[#111111]' : ''
              }`}
              onClick={handleSubmit} // 게시물 작성 완료 시 제출
            />
>>>>>>> 82acb67fa7e21f75df69bbd3b1e8ec870dba89e4
          </div>
        </div>
      </div>
    </>
  );
}
