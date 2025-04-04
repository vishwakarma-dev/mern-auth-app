import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import ThemeToggle from '../components/ThemeToggle';

export default function Dashboard() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth.data);

  if (!isAuthenticated) return <Navigate to="/sign-in" />;

  return (
    <div>
      Welcome, {user?.first_name}!
        <ThemeToggle />
      </div>
  )
}
