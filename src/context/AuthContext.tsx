import { createContext, useContext, useEffect, useState } from "react";
import { CustomFetch } from "../api/customFetch";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await CustomFetch(`${import.meta.env.VITE_API_URL}/users/me`, "GET"); // https://anihub-server.onrender.com
      setUser(response);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await CustomFetch(`${import.meta.env.VITE_API_URL}/auth/logout`, "POST");
    } catch (error) {
      console.error('Error al hacer logout', error)
    } finally {
      setUser(null)
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
