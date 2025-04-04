import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ReactNode } from 'react';

interface IRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.data.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
