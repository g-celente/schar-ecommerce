export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: import("@/types").User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
