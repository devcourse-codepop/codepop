import Banner from "../components/main-content/Banner";
import PopularPost from "../components/main-content/PopularPost";

export default function MainContent() {
  return (
    <div className="w-full h-full overflow-y-auto scroll-custom">
      <Banner />
      <PopularPost />
    </div>
  );
}
