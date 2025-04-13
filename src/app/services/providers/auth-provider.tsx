"use client";
import { createContext, useContext, useEffect, useState } from "react";
import loginData from "./../../api/loginData.json";

type User = {
  id: number;
  username: string;
  password: string;
};

type AuthContextType = {
  user: Omit<User, "password"> | null;
  isAuth: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    const foundUser = loginData.find(
      (u) => u.username === username.trim() && u.password === password.trim()
    );

    if (foundUser) {
      const { password, ...safeUser } = foundUser;
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuth = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

