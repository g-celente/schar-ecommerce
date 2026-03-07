import { api } from "./api";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      "/auth/login",
      payload
    ),

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      "/auth/register",
      payload
    ),

  logout: () => api.post<ApiResponse<null>>("/auth/logout", {}),

  me: () => api.get<ApiResponse<User>>("/auth/me"),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<AuthTokens>>("/auth/refresh", { refreshToken }),
};
