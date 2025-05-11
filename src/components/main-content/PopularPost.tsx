import { useEffect, useState } from "react";
import { useChannelItemStore } from "../../stores/channelStore";
import { getPopularPostData } from "../../api/post/post";
import { Post } from "../../types";
import PostListItem from "../post/PostListItem";

export default function PopularPost() {
  const { channels, fetchChannels } = useChannelItemStore();
  const [activeTab, setActiveTab] = useState(0);
  const [sortPopulars, setSortPopulars] = useState<Post[]>([]);

  const tabClickHandler = async (channelId: string, index: number) => {
    const data = await getPopularPostData(channelId);
    setActiveTab(index);
    setSortPopulars(data);
  };

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  useEffect(() => {
    if (channels.length > 0) {
      tabClickHandler(channels[0].id, 0);
    }
  }, [channels]);

  const parseHandler = (str: string | object | null) => {
    if (typeof str === "string") {
      try {
        JSON.parse(str);
        return str;
      } catch {
        return `{"title":"${str}", "content":""}`;
      }
    }
    return `{"title":"${str}", "content":""}`;
  };

  return (
    <>
      <div className="bg-white w-full rounded-[10px] px-[30px] py-[25px] pt-[20px] shadow-md">
        <h3 className="font-semibold text-[#595956] text-[18px] mb-[15px]">
          Popular Posts
        </h3>
        <ul className="flex relative gap-x-5 gap-y-2.5 mb-4.5 flex-wrap">
          {channels.map((channel, index) => (
            <li
              key={`tab-${index}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
            >
              <button
                className={`bg-[#E3E3E3] text-white rounded-[10px] w-[123px] h-[40px] text-[12px] cursor-pointer duration-300`}
                onClick={() => {
                  tabClickHandler(channel.id, index);
                }}
                style={{
                  backgroundColor:
                    activeTab === index ? channel.color : "#E3E3E3",
                  color: activeTab === index ? "#fff" : "#6A6A6A",
                  fontWeight: activeTab === index ? "bold" : "normal",
                  boxShadow:
                    activeTab === index ? "0px 2px 3px rgba(0, 0, 0, 0.2)" : "",
                }}
              >
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
        <div>
          {channels.map((_, cIndex) => (
            <div
              className="tab-content flex gap-x-7 gap-y-5 flex-wrap min-h-[260px] relative"
              key={`panel-${cIndex}`}
              role="tabpanel"
              hidden={!(activeTab === cIndex)}
              aria-labelledby={`tab-${cIndex}`}
              id={`panel-${cIndex}`}
            >
              {sortPopulars.length == 0 ? (
                <p className="absolute left-1/2 bottom-4/7 -translate-x-1/2 text-sm text-[#5c5c5c]">
                  해당 채널에 게시글이 없습니다.
                </p>
              ) : (
                sortPopulars.slice(0, 2).map((popular, pIndex) => {
                  const parsePopular: Post = {
                    ...popular,
                    title: parseHandler(popular.title),
                  };
                  console.log(parsePopular);
                  return (
                    <div
                      key={`popular-${pIndex}`}
                      className="tabConstentItem basis-[calc(50%-0.875rem)]  max-w-full"
                    >
                      <PostListItem {...parsePopular} />
                      {/* <PostList
                        title={{
                          title: `${postTitle}`,
                          content: `${postContent}`,
                          tag: `아마 태그 없앴던거 같음`,
                        }}
                        updatedAt={popular.createdAt.split("T")[0]}
                      /> */}
                    </div>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
