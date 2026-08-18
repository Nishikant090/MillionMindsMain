"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "@/lib/api";

const TOKEN_STORAGE_KEY = "mm_token";

interface AuthContextValue {
  user: api.AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<api.AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await Promise.resolve(); // ensure every setState below happens asynchronously
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        try {
          const me = await api.getMe(token);
          if (!cancelled) setUser(me);
        } catch {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await api.login(email, password);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { token, user } = await api.signup(name, email, password);
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
