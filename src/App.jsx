import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomTabNavigator from './components/BottomTabNavigator';
import Story from './components/Story';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import SettingsView from './views/SettingsView';
import QRView from './views/QRView';
import LoginView from './views/LoginView';
import { AuthContext } from './contexts/AuthContext';
import LandingPage from './views/LandingPage';
import RegisterView from './views/RegisterView';
import ForgotView from './views/ForgotView';

function ProtectedRoute({ children }) {
  const { isAuthenticated} = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isFirstVisit, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <>
      {location.pathname !== '/story' && location.pathname !== '/login' && location.pathname !== '/landing'&& location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/forgot' && <Header />}
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/forgot" element={<ForgotView/>}/>
        <Route path="/register" element={<RegisterView />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomeView />
          </ProtectedRoute>
        } />
        <Route path="/menu" element={<ProtectedRoute><MenuView /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsView /></ProtectedRoute>} />
        <Route path="/story" element={<Story />} />
        <Route path="/qr" element={<ProtectedRoute><QRView /></ProtectedRoute>} />
        
      </Routes>
      {location.pathname !== '/story' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/landing' && location.pathname !== '/forgot' && <BottomTabNavigator />}
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