import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ChannelBox from "../components/sidebar/ChannelBox";
import MemberBox from "../components/sidebar/MemberBox";
import { noAuthAxiosInstance } from "../api/axios-no-auth";
import { useState, useEffect } from "react";
import "../css/layout/layout.css";

export default function MainLayout() {
  const menuItems: ChannelItemType[] = [];
  const [channels, setChannels] = useState<ChannelType[]>([]);
  const fetchChannel = async () => {
    const result = await noAuthAxiosInstance.get("/channels");
    setChannels(result.data);
  };
  useEffect(() => {
    fetchChannel();
  }, []);
  channels.map((channel, index) => {
    let cName = "";
    let cColor = "";
    let cTo = "";
    switch (channel.name) {
      case "MysteryCode":
        cName = "이거 왜 되지?";
        cColor = "#10215C";
        cTo = "/channel/1";
        break;
      case "DeskSetup":
        cName = "이거 왜 안 쓰지?";
        cColor = "#3380DE";
        cTo = "/channel/2";
        break;
      case "Vote":
        cName = "골라봐";
        cColor = "#60A7F7";
        cTo = "/channel/3";
        break;
      default:
        cName = channel.name;
        cColor = "#10215C";
    }
    menuItems[index] = {
      id: channel._id,
      name: cName,
      to: cTo,
      color: cColor,
    };
  });
  return (
    <>
      <div className="max-w-[1500px] mx-auto">
        <Header></Header>

        <div className="flex px-[60px] h-[calc(100dvh-100px)]">
          <aside className="flex flex-col h-full mr-[50px] pb-[30px] box-border">
            <div className="mb-[30px]">
              <ChannelBox channelItem={menuItems}></ChannelBox>
            </div>
            <MemberBox></MemberBox>
          </aside>
          <main className="h-full overflow-x-auto w-full pr-2.5 scroll-custom pb-[30px]">
            {/* 컨텐츠 영역 */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
