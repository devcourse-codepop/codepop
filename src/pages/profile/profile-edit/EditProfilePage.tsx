import { useAuthStore } from '../../../stores/authStore';
import EditProfile from './EditProfile';

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <EditProfile key={user?._id} userId={user?._id || ''} />
    </>
  );
}
