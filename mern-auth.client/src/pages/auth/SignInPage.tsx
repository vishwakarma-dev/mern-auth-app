import { TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSnackbar } from '../../hooks/SnackbarProvider';
import { signInUser } from '../../app/features/authSlice';

export default function SignIn() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const { loading, error, data } = useAppSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(signInUser({ email_id, password }));
  };

  // ✅ Only navigate once after successful login
  useEffect(() => {
    if (data.isAuthenticated) {
      showMessage('Sign in successful!', 'success');
      navigate('/dashboard'); // This should only run once
    }
  }, [data.isAuthenticated]); // Depend only on this

  // ✅ Show error once
  useEffect(() => {
    if (error) {
      showMessage(error, 'error');
    }
  }, [error]);

  return (
    <Box display="flex" flexDirection="column" gap={2} width={300} mx="auto" mt={10}>
      <TextField
        label="Email"
        value={email_id}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  );
}
