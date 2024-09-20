// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Geliştirme aşamasında her başlatmada localStorage'ı temizlemek için
    // if (process.env.NODE_ENV === 'development') {
    //   localStorage.removeItem('isAuthenticated');
    //   localStorage.removeItem('isFirstVisit');
    //   console.log('Development: isAuthenticated ve isFirstVisit temizlendi.');
    // }
    // Kullanıcının oturum durumu
    const storedAuth = localStorage.getItem('isAuthenticated');
    console.log('Stored Auth:', storedAuth);

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    // Kullanıcının ilk ziyaret durumu
    const storedFirstVisit = localStorage.getItem('isFirstVisit');
    console.log('Stored First Visit:', storedFirstVisit);

    if (storedFirstVisit === null) {
      setIsFirstVisit(true);
      console.log('First visit detected');
    } else {
      setIsFirstVisit(false);
      console.log('Not the first visit');
    }

    setLoading(false);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    console.log('User logged in successfully');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    console.log('User logged out successfully');
  };

  const markFirstVisitDone = () => {
    setIsFirstVisit(false);
    localStorage.setItem('isFirstVisit', 'false');
    console.log('First visit marked as done');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isFirstVisit, loading, markFirstVisitDone }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
