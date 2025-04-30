import ChannelBox from "./components/ChannelBox";
import DropSort from "./components/DropSort";
import MembeerBox from "./components/MemberBox";
import SearchPost from "./components/SearchPost";

export default function App() {
  return (
    <div className="flex bg-black h-[100vh] justify-center align-middle gap-3 pt-16">
      <MembeerBox />
      <ChannelBox />
      <DropSort />
      <SearchPost />
    </div>
  );
}
