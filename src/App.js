import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomTabNavigator from './components/BottomTabNavigator';
import Story from './components/Story';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import SettingsView from './views/SettingsView';
import QRView from './views/QRView';

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/story' && <Header />}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/menu" element={<MenuView />} /> 
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/story" element={<Story />} /> 
        <Route path="/qr" element={<QRView />} />
      </Routes>
      {location.pathname !== '/story' && <BottomTabNavigator />}
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