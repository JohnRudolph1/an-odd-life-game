import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider } from '@/lib/firebase';

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  loginEmail: (email: string, pass: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }), []);

  const value = useMemo(() => ({
    user,
    loading,
    loginEmail: async (email: string, pass: string) => { await signInWithEmailAndPassword(auth, email, pass); },
    loginGoogle: async () => { await signInWithPopup(auth, googleProvider); },
    logout: async () => signOut(auth)
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('Auth context missing');
  return ctx;
};
