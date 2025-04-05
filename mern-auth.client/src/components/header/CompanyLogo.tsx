import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Styled avatar and avatar container
const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

// Example single company data
const company = {
  name: 'Kh Infinite Possibili...',
  subtext: 'Web app',
  logo: './vite.svg', // Replace with your actual logo path
};

export default function CompanyLogo() {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        px: 1,
        py: 1,
        borderRadius: 1,
        borderColor: 'divider',
        width: 215,
        bgcolor: 'background.paper',
      }}
    >
      <ListItemAvatar>
        <Avatar alt={company.name} src={company.logo} />
      </ListItemAvatar>
      <ListItemText
        primary={company.name}
        secondary={company.subtext}
      />
    </Box>
  );
}
