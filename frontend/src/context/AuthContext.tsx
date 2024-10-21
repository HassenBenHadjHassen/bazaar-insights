import { useState, useEffect, ReactNode, createContext } from "react";
import {
  login,
  logout,
  getTokenFromLocalStorage,
  register,
} from "../services/authService";
import { AuthContextType, JwtPayload } from "../types/authTypes";
import { jwtDecode } from "jwt-decode";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  const handleRegistration = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      return await register(fullName, email, password);
    } catch (error) {
      console.error("Error during Registration:", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.success) {
      const token = getTokenFromLocalStorage();
      if (token) {
        const parsedToken: string = JSON.parse(token);
        const decodedUser: JwtPayload = jwtDecode(parsedToken);

        setUser(decodedUser);
      }
    }
    return response;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const parsedToken: string = JSON.parse(token);
      const decodedUser: JwtPayload = jwtDecode(parsedToken);

      setUser(decodedUser);
    }
  }, []);

  const value: AuthContextType = {
    user,
    register: handleRegistration,
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
