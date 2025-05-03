import Header from "../components/header/Header";
import Banner from "../components/main-content/Banner";
import PopularPost from "../components/main-content/PopularPost";
import ChannelBox from "../components/sidebar/ChannelBox";
import MemberBox from "../components/sidebar/MemberBox";

export default function MainLayout() {
  return (
    <>
      <div className="max-w-[1500px] mx-auto">
        <Header></Header>
        <div className="flex px-[60px] h-[calc(100dvh-100px)]">
          <aside className="flex flex-col h-full mr-[50px] pb-[30px] box-border">
            <div className="mb-[30px]">
              <ChannelBox></ChannelBox>
            </div>
            <MemberBox></MemberBox>
          </aside>
          <main className="h-full overflow-x-auto w-full">
            <Banner></Banner>
            <PopularPost></PopularPost>
            {/* 컨텐츠 영역 */}
          </main>
        </div>
      </div>
    </>
  );
}
