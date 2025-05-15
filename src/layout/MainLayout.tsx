import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import ChannelBox from '../components/sidebar/ChannelBox';
import MemberBox from '../components/sidebar/MemberBox';
import '../css/layout/layout.css';
import { Theme } from '../types/darkModeTypes';

export default function MainLayout({
  theme,
  nextTheme,
  nextThemeIndex,
}: {
  theme: Theme;
  nextTheme: () => void;
  nextThemeIndex: number;
}) {
  return (
    <>
      <div className="max-w-[1500px] mx-auto">
        <Header
          theme={theme}
          nextTheme={nextTheme}
          nextThemeIndex={nextThemeIndex}
        />
        <div className="flex px-[60px] h-[calc(100dvh-100px)]">
          <aside className="flex flex-col h-full mr-[50px] box-border  pb-[20px]">
            <div className="mb-[30px]">
              <ChannelBox theme={theme} />
            </div>
            <MemberBox theme={theme} />
          </aside>
          <main className="h-full w-full min-w-0 max-w-full pb-[20px]">
            {/* 컨텐츠 영역 */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
