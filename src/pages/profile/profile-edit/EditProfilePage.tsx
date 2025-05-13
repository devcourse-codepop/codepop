import { useAuthStore } from '../../../stores/authStore';
import EditProfile from './EditProfile';

interface Theme {
  name: string;
}

export default function EditProfilePage({ theme }: { theme: Theme }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <EditProfile key={user?._id} userId={user?._id || ''} theme={theme} />
    </>
  );
}
