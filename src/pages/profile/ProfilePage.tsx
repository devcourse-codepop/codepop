import Profile from './Profile';
import { useAuthStore } from '../../stores/authStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Profile key={user?._id} userId={user?._id || ''} />
    </>
  );
}
