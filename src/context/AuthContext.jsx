import React, { createContext, useContext, useState } from "react";

// Phase 1: fake session, no real auth yet. Gloria and Ellud both get full
// admin access for now (per the brainstorm). When Supabase Auth goes in,
// this becomes a real session listener instead of static state.

const AuthContext = createContext(null);

const FAKE_USER = {
  id: "demo-user",
  name: "Gloria",
  role: "admin", // admin | owner (Ellud) | staff (future)
};

export function AuthProvider({ children }) {
  const [user] = useState(FAKE_USER);

  const value = {
    user,
    isAuthenticated: true, // TODO: replace with real Supabase session check
    signIn: async () => {
      // TODO: supabase.auth.signInWithPassword(...)
    },
    signOut: async () => {
      // TODO: supabase.auth.signOut()
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
