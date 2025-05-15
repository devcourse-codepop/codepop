import Banner from '../components/main-content/Banner';
import PopularPost from '../components/main-content/PopularPost';
import { Theme } from '../types/ darkModeTypes';

export default function MainContent({ theme }: { theme: Theme }) {
  return (
    <div className="w-full h-full overflow-y-auto scroll-custom">
      <Banner />
      <PopularPost theme={theme} />
    </div>
  );
}
