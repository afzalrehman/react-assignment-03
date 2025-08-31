export type User = {
    email: string;
    password: string;
    name: string;
};


export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}