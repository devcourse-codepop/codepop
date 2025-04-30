export default function WriteComment() {
  return (
    <>
      <div className="w-[999px] h-[133px] rounded-[5px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <div className="h-[26px]">icon section</div>
        <form>
          <textarea
            id="comment"
            name="comment"
            placeholder="댓글을 작성해 주세요"
            className="w-full h-[77px] text-xl p-[22px] resize-none outline-none"
          />
        </form>
        <div className="h-[30px]">button section</div>
      </div>
    </>
  );
}
