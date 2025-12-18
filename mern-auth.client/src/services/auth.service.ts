import api from '../api/axios';

/* =========================
   Types
========================= */

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email_id: string;
  password: string;
  mobile_number: string;
}

export interface SignInPayload {
  email_id: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

/* =========================
   API Calls
========================= */

// SIGN UP
export const signUp = async (
  payload: SignUpPayload
): Promise<AuthResponse> => {
  const response = await api.post('/auth/sign-up', payload);
  return response.data;
};

// SIGN IN
export const signIn = async (
  payload: SignInPayload
): Promise<AuthResponse> => {
  const response = await api.post('/auth/sign-in', payload);
  return response.data;
};



