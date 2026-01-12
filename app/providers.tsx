"use client";

import { WishlistProvider } from "@/components/home/wishlist-context";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // Load token & get user info
  // --------------------------
  const loadUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Khi mở trang → load user từ token
  useEffect(() => {
    loadUser();
  }, []);

  // Khi login hoặc logout → reload user
  useEffect(() => {
    const handleAuthChange = () => loadUser();
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  // --------------------------
  // LOGIN
  // --------------------------
  const login = async (data: any) => {

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("token", data.accessToken);

  setUser(data); 

  window.dispatchEvent(new Event("auth-change"));
};
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải nằm trong AuthProvider");
  return ctx;
};
