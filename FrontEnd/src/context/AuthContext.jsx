// AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState(() => {
    const storedFirstTime = localStorage.getItem('isFirstTime');
    return storedFirstTime === null ? true : storedFirstTime === 'true';
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userSignedUp = localStorage.getItem('userSignedUp');
    return !!userSignedUp; // Return true if the user is already signed up
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('userSignedUp', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userSignedUp');
  };

  useEffect(() => {
    const userSignedUp = localStorage.getItem('userSignedUp');
    setIsLoggedIn(!!userSignedUp); // Check if the user is already signed up or logged in
  }, []);

  return (
    <AuthContext.Provider
      value={{ isFirstTime, setIsFirstTime, isLoggedIn, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
