import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, IUser } from './authTypes';
import api from '../../api/axios';

// --- Async thunk for login ---
export const signInUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email_id: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/sign-in', payload);
      return response.data as { user: IUser; token: string };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.msg || 'Signin failed!');
    }
  }
);

// --- Initial state ---
const storedAuth = localStorage.getItem('authUser');
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState: AuthState = {
  data: {
    user: parsedAuth?.user || null,
    token: parsedAuth?.token || null,
    isAuthenticated: !!parsedAuth,
  },
  loading: false,
  error: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.data.user = null;
      state.data.token = null;
      state.data.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('authUser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signInUser.fulfilled,
        (state, action: PayloadAction<{ user: IUser; token: string }>) => {
          state.data.user = action.payload.user;
          state.data.token = action.payload.token;
          state.data.isAuthenticated = true;
          state.loading = false;
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        }
      )
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
