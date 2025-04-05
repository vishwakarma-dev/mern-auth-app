import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import AppNavbar from '../components/header/AppNavbar';
import Header from '../components/header/Header';
import SideMenu from '../components/header/SideMenu';

export default function MainLayout() {
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto'
          }}
        >
          <Stack
            spacing={2}
            sx={{
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },

            }}
          >
            <Header />
            <Box
              sx={(theme)=>({
                height : "500px",
                padding : 2,
                border : `1px solid ${theme.palette.divider}`,
                borderRadius : 2
              })}
            >
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
