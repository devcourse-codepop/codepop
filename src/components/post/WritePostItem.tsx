import { useState } from 'react';
import Button from '../common/Button';
import ImageIcon from '../icon/ImageIcon';
import CodeEditIcon from '../icon/CodeEditIcon';
import VoteIcon from '../icon/VoteIcon';

interface Theme {
  name: string;
}

export default function WritePostItem({
  channelId,
  theme,
}: {
  channelId: string;
  theme: Theme;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [tag, setTag] = useState("");

  // const titleRef = useRef<HTMLTextAreaElement | null>(null);
  // const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const changeTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  // const changeTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTag(e.target.value);
  // };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const json = {
    //   title: title,
    //   content: content,
    //   tag: tag,
    // };

    const json = {
      title: title,
      content: content,
    };

    const formData = new FormData();
    // formData.append(
    //   "request",
    //   new Blob(
    //     [
    //       JSON.stringify({
    //         title: JSON.stringify(json),
    //         image: null,
    //         channelId: channelId,
    //       }),
    //     ],
    //     { type: "application/json" }
    //   )
    // );
    formData.append(
      'title',
      new Blob([JSON.stringify(json)], { type: 'application/json' })
    );
    // formData.append("image", );
    formData.append('channelId', channelId);

    // axios
  };

  return (
    <>
      <div
        className={`w-full h-auto rounded-[5px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${
          theme.name === 'Dark' ? 'bg-[#2d2d2d]' : 'bg-[#ffffff]'
        }`}
      >
        <form onSubmit={(e) => submitHandler(e)}>
          <textarea
            id="title"
            name="title"
            // ref={titleRef}
            value={title}
            onChange={(e) => changeTitleHandler(e)}
            placeholder="제목"
            className="w-full h-[96px] text-[35px] px-[32px] py-[22px] resize-none outline-none"
          />
          <hr className="mx-[22px] text-[#b2b2b2]" />
          <div className="w-full h-[66px] flex justify-end items-center">
            <div className="pr-[25px]">
              {channelId === '1' && <CodeEditIcon />}
              {channelId === '3' && <VoteIcon />}
              <ImageIcon />
            </div>
          </div>
          <textarea
            id="content"
            name="content"
            // ref={contentRef}
            value={content}
            onChange={(e) => changeContentHandler(e)}
            placeholder="내용"
            className="w-full h-[520px] text-[30px] px-[38px] py-[7px] resize-none outline-none"
          />
          <hr className="mx-[22px] text-[#b2b2b2]" />
          <div className="w-full h-[84px] relative">
            <div className="inline-block absolute right-[20px] bottom-[15px]">
              <Button value="완료" className="button-style2" />
            </div>
          </div>
          {/* <div className="w-full h-[84px] relative">
            <div className="mx-[32px] mt-[26px] inline-block">
              <label htmlFor="tag" className="mx-1">
                #
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                value={tag}
                onChange={(e) => changeTagHandler(e)}
                placeholder="태그를 입력해 주세요"
                className="outline-none"
              />
            </div>
            <div className="h-[30px] inline-block absolute right-[20px] bottom-[15px]">
              button section
            </div>
          </div> */}
        </form>
      </div>
    </>
  );
}
