import { useEffect } from "react";
import { useState } from "react";
import { useContext, createContext } from "react";
import { getMe } from "../lib/api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateUser = async () => {
    try {
      const res = await getMe();
      setUser(res.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    const loadUser = async () => {
      await updateUser();
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
