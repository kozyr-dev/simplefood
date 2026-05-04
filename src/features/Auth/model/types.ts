import { User } from "@/entities/User/model/types";

export interface AuthStoreState {
  token: string | null;
  setToken: (token: string | null) => void;
  resetedToken: () => void;
}

export interface SignInResponse {
  jwt: string;
  user: User;
}

export interface SignUpResponse {
  jwt: string;
  user: User;
}
