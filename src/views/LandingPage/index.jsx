// LandingPage/index.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './index.css';
import logo from './ciel-logo.png';

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, markFirstVisitDone } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing-page">
      <div className="content">
        <img src={logo} alt="Ciel Logo" className="logo" />
        <h1>Her 5 Kahveden Sonra İstediğiniz İçecek Bedava</h1>
        <p>Kampanyamızı kaçırma, hemen favori kahveni al!</p>
        <div className="buttons">
          <button onClick={goToLogin} className="btn">Login</button>
          <button onClick={goToRegister} className="btn">Register</button>
        </div>
      </div>
      {/* <img src={coffeeImage} alt="Delicious coffee" className="background-image" /> */}
    </div>
  );
}

export default LandingPage;
