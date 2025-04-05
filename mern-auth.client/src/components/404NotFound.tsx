import { Box, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box
        minHeight="100vh"
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={3}
    >
        <Box
            display="flex"
            flexDirection="row"
            gap={1}
        >
        <Typography variant="h5">
            404
        </Typography>
        <Divider orientation='vertical' flexItem />
        <Typography variant="h5">
            Page Not Found
        </Typography>
        </Box>
        <Button variant='contained' onClick={() => navigate("/")}>
            Navigate to Home
        </Button>
    </Box>
  );
}

export default PageNotFound;
