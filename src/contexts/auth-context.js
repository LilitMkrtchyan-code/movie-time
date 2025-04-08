import { createContext, useContext, useState, useEffect } from "react";
import { Storage } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Storage.getItem("token");
    const userData = Storage.getItem("user");

    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, userData) => {
    Storage.setItem("token", token);
    Storage.setItem("user", userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Storage.removeItem("token");
    Storage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
