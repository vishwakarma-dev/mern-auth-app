import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ThemeToggleFab from '../components/ThemeToggle';

export default function AuthLayout() {
  return (
    <Box>
      <ThemeToggleFab />
      <Outlet />
    </Box>
  );
}
