import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOutUser } from '../app/features/authSlice';

export default function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <Box
      textAlign="center"
      mt={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h4">Welcome to the Auth App</Typography>

      {isAuthenticated ? (
        <>
          <Typography variant="h6">Hello, {user?.first_name}!</Typography>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={() => navigate('/sign-in')}>
            Sign In
          </Button>
          <Button variant="outlined" onClick={() => navigate('/sign-up')}>
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );
}
