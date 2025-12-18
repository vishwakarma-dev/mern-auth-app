import {
  TextField,
  Button,
  Box,
  Paper,
  Link,
  Divider,
  Typography,
  Stack
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signInUser } from '../../app/features/authSlice';
import { useSnackbar } from '../../hooks/SnackbarProvider';

import ForgotPassword from '../../components/ForgetPassword';

import { FacebookIcon, GoogleIcon } from './CustomIcons';


export default function SignIn() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const { loading, error, data } = useAppSelector((state) => state.auth);

  // Email validation function
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSubmit = () => {
    setSubmitted(true);
    if (!email_id || !isValidEmail(email_id) || !password) return;
    dispatch(signInUser({ email_id, password }));
  };


  useEffect(() => {
    if (data.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [data.isAuthenticated]);

  useEffect(() => {
    if (error) {
      showMessage(error, 'error');
    }
  }, [error]);


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
    >
      <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
        <Stack alignItems="center" spacing={2} mb={2}>
          <Box
            component="img"
            alt="Company Logo"
            src="./vite.svg"
            height={40}
            width={40}
          />
          <Typography variant="h4" gutterBottom>
            Sign In
          </Typography>
        </Stack>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width={300}
        >
          <TextField
            label="Email"
            type="email"
            value={email_id}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled={loading}
            error={
              submitted && (!email_id || !isValidEmail(email_id))
            }
            helperText={
              submitted && !email_id
                ? 'Email is required'
                : submitted && !isValidEmail(email_id)
                ? 'Enter a valid email address'
                : ''
            }
          />


          <TextField
            label="Password"
            type="password"
            value={password}
            disabled={loading}
            size='small'
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            error={submitted && !password}
            helperText={submitted && !password ? 'Password is required' : ''}
          />

          <ForgotPassword open={open} handleClose={handleClose} />

          <Button
            size='small'
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Forgot your password?
          </Link>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => alert('Sign in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/sign-up"
                variant="body2"
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
