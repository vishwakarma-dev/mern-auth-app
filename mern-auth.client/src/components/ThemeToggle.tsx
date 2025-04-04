import { IconButton, useTheme } from '@mui/material';
import { useThemeContext } from '../theme/AppThemeProvider';
import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';

export default function ThemeToggle() {
  const { mode, setMode } = useThemeContext();
  const theme = useTheme();

  const handleToggle = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={handleToggle} color="inherit">
      {theme.palette.mode === 'dark' ? <MdOutlineLightMode /> : <MdLightMode />}
    </IconButton>
  );
}
