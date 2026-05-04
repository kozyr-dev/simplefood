export type User = {
  id: number;
  username: string;
  phone: string | null;
  email: string;
  address: string | null;
  confirmed: boolean;
  blocked: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type UserStoreState = {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};
