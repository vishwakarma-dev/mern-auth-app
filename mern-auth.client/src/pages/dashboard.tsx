import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Typography } from '@mui/material';

export default function Dashboard() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth.data);

  if (!isAuthenticated) return <Navigate to="/sign-in" />;

  return (
    <div style={{display : 'flex', flexDirection : "column", alignItems:"center", justifyContent:"center", gap:4}}>
          <Typography variant='h3'>
            Welcome, {`${user?.first_name} ${user?.last_name}`}
          </Typography>
      </div>
  )
}
