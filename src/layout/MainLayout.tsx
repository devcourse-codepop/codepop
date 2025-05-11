import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ChannelBox from "../components/sidebar/ChannelBox";
import MemberBox from "../components/sidebar/MemberBox";
import "../css/layout/layout.css";

export default function MainLayout() {
  return (
    <>
      <div className="max-w-[1500px] mx-auto">
        <Header />
        <div className="flex px-[60px] h-[calc(100dvh-100px)]">
          <aside className="flex flex-col h-full mr-[50px] box-border  pb-[20px]">
            <div className="mb-[30px]">
              <ChannelBox />
            </div>
            <MemberBox />
          </aside>
          <main className="h-full overflow-x-auto w-full pr-2.5 pb-[20px] scroll-custom">
            {/* 컨텐츠 영역 */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
