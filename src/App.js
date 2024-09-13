import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomTabNavigator from './components/BottomTabNavigator';
import Story from './components/Story';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import SettingsView from './views/SettingsView';
import QRView from './views/QRView';
import LoginView from './views/LoginView';

// Protected Route Component
function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/story' && location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={<LoginView setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HomeView /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MenuView /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated}><SettingsView /></ProtectedRoute>} />
        <Route path="/story" element={<Story />} />
        <Route path="/qr" element={<ProtectedRoute isAuthenticated={isAuthenticated}><QRView /></ProtectedRoute>} />
      </Routes>
      {location.pathname !== '/story' && location.pathname !== '/login' && <BottomTabNavigator />}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kullanıcı giriş durumu

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </Router>
  );
}

export default App;
