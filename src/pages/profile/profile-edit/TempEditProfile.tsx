import Header from '../../../components/header/Header';
import ChannelBox from '../../../components/sidebar/ChannelBox';
import MemberBox from '../../../components/sidebar/MemberBox';
import { useAuthStore } from '../../../stores/authStore';
import EditProfile from './EditProfile';

export default function TempProfile() {
  const user = useAuthStore((state) => state.user);
  console.log(user?._id);
  return (
    <>
      <div className='w-[1500px] h-full ml-[200px] '>
        <Header />
        <div className='w-full flex justify-center align-middle gap-[30px]  px-[60px] pb-[30px]'>
          <div>
            <ChannelBox />
            <MemberBox />
          </div>
          <EditProfile key={user?._id} userId={user?._id || ''} />
        </div>
      </div>
    </>
  );
}
