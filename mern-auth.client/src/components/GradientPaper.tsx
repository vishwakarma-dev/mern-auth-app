import { Paper, styled } from '@mui/material';

const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.background.paper,
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  boxShadow: `
    0 0 10px rgba(255, 0, 102, 0.4),    /* Pink */
    0 0 20px rgba(255, 102, 0, 0.3),    /* Orange */
    0 0 30px rgba(255, 255, 0, 0.2),    /* Yellow */
    0 0 40px rgba(0, 255, 0, 0.2),      /* Green */
    0 0 50px rgba(0, 255, 255, 0.15),   /* Cyan */
    0 0 60px rgba(0, 102, 255, 0.1),    /* Blue */
    0 0 70px rgba(153, 51, 255, 0.1),   /* Purple */
    0 0 80px rgba(255, 51, 153, 0.1),   /* Rose */
    0 0 90px rgba(255, 0, 255, 0.08)    /* Magenta */
  `,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: `
      0 0 12px rgba(255, 0, 102, 0.6),
      0 0 24px rgba(255, 102, 0, 0.4),
      0 0 36px rgba(255, 255, 0, 0.3),
      0 0 48px rgba(0, 255, 0, 0.25),
      0 0 60px rgba(0, 255, 255, 0.2),
      0 0 72px rgba(0, 102, 255, 0.15),
      0 0 84px rgba(153, 51, 255, 0.15),
      0 0 96px rgba(255, 51, 153, 0.12),
      0 0 108px rgba(255, 0, 255, 0.1)
    `
  },
}));


export default GradientPaper ;