import { useAuthContext } from '@/context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuthContext();

  return <div>{JSON.stringify(user, null, 2)}</div>;
};
