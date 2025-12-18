export interface IUser {
  first_name: string;
  last_name: string;
  email_id: string;
  mobile_number: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface AuthState {
  data : {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
  } | any;
  loading: boolean;
  error: string | null;
}
