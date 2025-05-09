import { useState } from "react";
import PostList from "../post/PostList";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function PopularPost() {
  const tabs = [
    { id: "tab1", label: "이거 왜 되지?", color: "#10215C" },
    { id: "tab2", label: "이거 왜 안 쓰지?", color: "#3380DE" },
    { id: "tab3", label: "골라봐", color: "#60A7F7" },
  ];

  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      <div className="bg-white w-full rounded-[10px] px-[30px] py-[25px]  h-[420px] shadow-md">
        <h3 className="font-semibold text-[#595956] text-[18px] mb-[25px]">
          Popular Posts
        </h3>
        <div className="flex relative gap-5">
          {tabs.map((tab) => (
            <div key={tab.id}>
              <button
                className={`bg-[#E3E3E3] text-white rounded-[10px] w-[123px] h-[40px] text-[12px] cursor-pointer duration-300`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? tab.color : "#E3E3E3",
                  color: activeTab === tab.id ? "#fff" : "#6A6A6A",
                  fontWeight: activeTab === tab.id ? "bold" : "normal",
                  boxShadow:
                    activeTab === tab.id
                      ? "0px 2px 3px rgba(0, 0, 0, 0.2)"
                      : "",
                }}
              >
                {tab.label}
              </button>
              <div
                className={twMerge(
                  "tab-content flex gap-x-[30px] w-full max-w-auto absolute left-0 top-[60px]",
                  activeTab === tab.id ? "visible" : "hidden"
                )}
              >
                <Link to="/post/id">
                  <PostList
                    title={{
                      title: `${tab.label}11111`,
                      content: `${tab.label}222222222222`,
                      tag: `${tab.label}4444`,
                    }}
                    updatedAt="2025.4.28"
                  ></PostList>
                </Link>
                <Link to="/post/id">
                  <PostList
                    title={{
                      title: `${tab.label} 질문있습니다`,
                      content: `${tab.label}이거 왜 안 될까요?`,
                      tag: `${tab.label}`,
                    }}
                    updatedAt="2025.4.28"
                  ></PostList>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
