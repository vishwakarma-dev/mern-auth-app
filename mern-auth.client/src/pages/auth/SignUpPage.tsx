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
  import  { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAppSelector } from '../../app/hooks';
  import { useSnackbar } from '../../hooks/SnackbarProvider';
import { FacebookIcon, GoogleIcon } from './CustomIcons';
import { signUp } from '../../services/auth.service';
  
  export default function SignUp() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email_id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
  
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { showMessage } = useSnackbar();
    const { loading, error, data } = useAppSelector((state) => state.auth);
  
    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    const passwordsMatch = password === confirmPassword;
  
    const handleSubmit = async () => {
      setSubmitted(true);
    
      if (
        !first_name ||
        !last_name ||
        !email_id ||
        !isValidEmail(email_id) ||
        !password ||
        !confirmPassword ||
        !passwordsMatch
      ) {
        return;
      }
    
      try {
        const res = await signUp({
          first_name,
          last_name,
          email_id,
          password,
          mobile_number: '+91 xxxxx xxxxx' // Dummy mobile number
        });
    
        showMessage(res.message || 'Sign up successful!', 'success');
        navigate('/sign-in');
      } catch (err: any) {
        showMessage(
          err?.response?.data?.message || 'Sign up failed',
          'error'
        );
      }
    };
  
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
              Sign Up
            </Typography>
          </Stack>
  
          <Box display="flex" flexDirection="column" gap={2} width={350}>
            <Box display={"flex"} gap={2}>
              <TextField
                label="First Name"
                value={first_name}
                size="small"
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
                error={submitted && !first_name}
                helperText={submitted && !first_name ? 'First name is required' : ''}
              />

              <TextField
                label="Last Name"
                value={last_name}
                size="small"
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
                error={submitted && !last_name}
                helperText={submitted && !last_name ? 'Last name is required' : ''}
              />
            </Box>
  
  
            <TextField
              label="Email"
              type="email"
              value={email_id}
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              error={submitted && (!email_id || !isValidEmail(email_id))}
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
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              error={submitted && !password}
              helperText={submitted && !password ? 'Password is required' : ''}
            />
  
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              size="small"
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              error={submitted && (!confirmPassword || !passwordsMatch)}
              helperText={
                submitted && !confirmPassword
                  ? 'Please confirm your password'
                  : submitted && !passwordsMatch
                  ? 'Passwords do not match'
                  : ''
              }
            />
  
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
  
            <Divider>or</Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => alert('Sign up with Google')}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google
              </Button>

              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => alert('Sign in with Facebook')}
                startIcon={<FacebookIcon />}
              >
                Sign up with Facebook
              </Button>
  
              
              <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link href="/sign-in" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
  