// LandingPage/index.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Stil dosyası
import coffeeImage from './coffee_image.jpg';
import { AuthContext } from '../../contexts/AuthContext';

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, markFirstVisitDone } = useContext(AuthContext);

  useEffect(() => {
    // Eğer kullanıcı zaten oturum açmışsa, direkt ana sayfaya yönlendir
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const goToLogin = () => {
    markFirstVisitDone();
    navigate('/login');
  };

  const goToRegister = () => {
    markFirstVisitDone();
    navigate('/register'); // Kayıt sayfası rotası
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay"></div>
      <div className="landing-content">
        <h1 className="landing-title">Welcome to CoffeeApp</h1>
        <p className="landing-description">Your daily coffee fix, crafted with love.</p>

        <div className="campaign-box">
          <p className="campaign-text">Buy 5 coffees, get the 6th one free! Join our <strong>5+1 campaign</strong> today and enjoy a free cup of coffee!</p>
        </div>

        <div className="button-group">
          <button onClick={goToLogin} className="cta-button login-button">Login</button>
          <button onClick={goToRegister} className="cta-button register-button">Register</button>
        </div>
      </div>
      <img src={coffeeImage} alt="Delicious coffee" className="background-image" />
    </div>
  );
}

export default LandingPage;
