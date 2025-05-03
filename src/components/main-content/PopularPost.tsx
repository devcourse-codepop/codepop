import PostList from "../post/PostList";

export default function PopularPost() {
  const tabs = ["이거 왜 되지?", "이거 왜 안 쓰지?", "골라봐"];
  const tabsColor = ["#10215C", "#3380DE", "#60A7F7"];
  return (
    <>
      <div className="bg-white w-full rounded-[10px] p-[30px]">
        <h3 className="font-semibold text-[#595956] text-[18px] mb-[25px]">
          Popular Posts
        </h3>
        <div className="flex relative gap-5">
          {tabs.map((tab, i) => (
            <div>
              <button
                className={`bg-[${tabsColor[i]}] text-white rounded-[10px] w-[123px] h-[40px] text-[12px] font-bold`}
              >
                {tab}
              </button>
              <div className="tab-content flex gap-x-[30px] w-full max-w-auto absolute left-0 top-[70px]">
                <PostList
                  title={{
                    title: "11111",
                    content: "222222222222",
                    tag: "$4444",
                  }}
                  updatedAt="2025.4.28"
                ></PostList>
                <PostList
                  title={{
                    title: "11111",
                    content: "222222222222",
                    tag: "$4444",
                  }}
                  updatedAt="2025.4.28"
                ></PostList>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
