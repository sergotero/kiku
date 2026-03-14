import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem(CURRENT_KEY) ? localStorage.getItem(CURRENT_KEY): undefined);

  useEffect(() => {
    const login = () => {
      const user = UserService.login();
      setUser(user);
    }
    
    const logout = () => {
      localStorage.removeItem(CURRENT_KEY);
      setUser(undefined);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);