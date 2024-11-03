import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userSignedUp = localStorage.getItem('userSignedUp');
    return userSignedUp; // Return true if the user is already signed up
  });

  const [isFirstTime, setIsFirstTime] = useState(() => {
    const storedFirstTime = sessionStorage.getItem('isFirstTime');
    return storedFirstTime === null ? true : storedFirstTime === 'true';
  })

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn
    localStorage.removeItem('token'); // Remove token for security
    // Remove other necessary items if needed
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('userSignedUp', 'true');
    localStorage.setItem('token', token);
  };
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true'); // Ensure isLoggedIn state reflects local storage
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogin, handleLogout, isFirstTime, setIsFirstTime, backendUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};
