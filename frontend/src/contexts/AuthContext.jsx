import {
  React, createContext, useContext, useState,
} from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const userLoggin = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userLoggin ? { username: userLoggin.username } : null);
  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };
  const getUsername = () => {
    if (userLoggin) {
      return userLoggin.username;
    }
    return null;
  };
  const getAuthHeader = () => {
    if (userLoggin && userLoggin.token) {
      return { Authorization: `Bearer ${userLoggin.token}` };
    }
    return {};
  };
  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUsername, getAuthHeader, userLoggin,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
