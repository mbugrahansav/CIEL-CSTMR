import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomTabNavigator from './components/BottomTabNavigator';
import Story from './components/Story';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import SettingsView from './views/SettingsView';
import QRView from './views/QRView';
import LoginView from './views/LoginView';
import { AuthContext } from './contexts/AuthContext'; // Context'i import edin

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext); // Context'ten isAuthenticated'i alın
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/story' && location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><MenuView /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsView /></ProtectedRoute>} />
        <Route path="/story" element={<Story />} />
        <Route path="/qr" element={<ProtectedRoute><QRView /></ProtectedRoute>} />
      </Routes>
      {location.pathname !== '/story' && location.pathname !== '/login' && <BottomTabNavigator />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;