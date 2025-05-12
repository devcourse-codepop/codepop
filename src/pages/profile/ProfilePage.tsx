import Profile from './Profile';
import { useAuthStore } from '../../stores/authStore';
import { useLocation } from 'react-router-dom';

export default function ProfilePage() {
  const location = useLocation();
  const { userid } = location.state || {};
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Profile key={user?._id} userId={userid ? userid : user?._id || ''} />
    </>
  );
}
