"use client";

import React, { createContext, ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { destroyCookie, parseCookies, setCookie } from "nookies";

import { setupAPIClient } from "@/services/api";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: signInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  email: string;
};

type signInProps = {
  email: string;
  password: string;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const api = setupAPIClient(undefined);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/profile")
        .then((response) => {
          const { email, id } = response.data;
          setUser({
            email,
            id,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const router = useRouter();

  const signIn = async ({ email, password }: signInProps) => {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, token } = response.data;

      setUser({ id, email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setCookie(null, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      router.push("/dashboard");
    } catch (error) {
      throw new Error("Credential error!");
    }
  };

  const signOut = async () => {
    try {
      destroyCookie(null, "@nextauth.token");
      router.push("/login");
    } catch {
      console.log("Erro ao deslogar");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
