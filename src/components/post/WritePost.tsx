export default function WritePost() {
  return (
    <>
      <div className="w-[999px] h-[766px] rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <form>
          <textarea
            id="title"
            name="title"
            placeholder="제목"
            className="w-full h-[96px] text-[35px] px-[32px] py-[22px] resize-none outline-none"
          />
          <hr className="w-[955px] mx-[22px] text-[#b2b2b2]" />
          <div className="h-[26px]">icon section</div>
          <textarea
            id="content"
            name="content"
            placeholder="내용"
            className="w-full h-[560px] text-[30px] px-[38px] py-[7px] resize-none outline-none"
          />
          <hr className="w-[955px] mx-[22px] text-[#b2b2b2]" />
          <div className="w-full h-[84px] relative">
            <div className="mx-[32px] mt-[26px] inline-block">
              <label htmlFor="tag" className="mx-1">
                #
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                placeholder="태그를 입력해 주세요"
                className="outline-none"
              />
            </div>
            <div className="h-[30px] inline-block absolute right-[20px] bottom-[15px]">
              button section
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
