"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AccountContextType = {
  account: string | null;
  setAccount: (account: React.SetStateAction<string | null>) => void;
};

const AuthContext = createContext<AccountContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setAccount(user);
  }, [account]);

  return (
    <AuthContext.Provider value={{ account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AccountContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
