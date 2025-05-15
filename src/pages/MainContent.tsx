import Banner from '../components/main-content/Banner';
import PopularPost from '../components/main-content/PopularPost';
import './../css/main-content/main-content.css';

export default function MainContent() {
  return (
    <div className='w-full h-full overflow-y-auto scroll-custom'>
      <Banner />
      <PopularPost />
    </div>
  );
}
