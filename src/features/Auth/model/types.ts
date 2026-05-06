import { User } from "@/entities/User/model/types";

export interface AuthStoreState {
  token: string | null;
  setToken: (token: string | null) => void;
  resetToken: () => void;
}

export interface SignInResponse {
  jwt: string;
  user: User;
}

export interface SignUpResponse {
  jwt: string;
  user: User;
}

export interface RefreshResponse {
  jwt: string;
}
