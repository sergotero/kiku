import { createContext, useState, useContext, useEffect } from "react";
import * as ApiService from "./../../../services/api-service.js";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const userLogin = async (data) => {
    const loggedUser = await ApiService.login(data.email, data.password);
    if (loggedUser) {
      setUser(loggedUser);
    }
  };

  const userLogout = async () => {
    await ApiService.logout();
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout }}>
      { children }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);