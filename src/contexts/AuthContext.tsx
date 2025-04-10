import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setIsAuthenticated(false);

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return setIsAuthenticated(false);
      }
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
