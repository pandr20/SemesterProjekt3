import react, { createContext } from "react";

export type AuthContext = {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
} | null;

export const AuthContext = createContext<AuthContext>(null);
