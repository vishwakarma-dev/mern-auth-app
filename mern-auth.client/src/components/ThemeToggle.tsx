import { Fab, Tooltip, useTheme } from '@mui/material';
import { useThemeContext } from '../theme/AppThemeProvider';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';

export default function ThemeToggleFab() {
  const { mode, setMode } = useThemeContext();
  const theme = useTheme();

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip 
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`} 
      arrow
      placement="left"
    >
      <Fab 
        size="small"
        variant="circular"
        onClick={handleToggle}
        sx={{
          fontSize : "1.4rem",
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1300,
        }}
      >
        {theme.palette.mode === 'dark' ? <MdOutlineLightMode  /> : <MdLightMode />}
      </Fab>
    </Tooltip>
  );
}
