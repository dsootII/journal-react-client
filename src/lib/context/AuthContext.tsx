import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { AuthContextValueTypes } from '../types';

const AuthContext = createContext<AuthContextValueTypes>({
  isAuthenticated: false,
  accessToken: null,
  logout: () => {},
  userDetails: {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [accessToken, setAccessToken] = useState<string | null>((typeof window !== undefined) ? localStorage.getItem('accessToken') : null);
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // debugger;

  useEffect(() => {
    // debugger;
    const token = localStorage.getItem('accessToken');
    console.log('auth context useEffect entered.')
    if (token) {
      setAccessToken(token);
      setUserDetails(jwtDecode(token));
      setIsAuthenticated(true);
    } else {
      alert("you're not logged in");
      navigate('/login');
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');  
    }
    setAccessToken(null);
    navigate('/login');  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, logout, userDetails }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext);
