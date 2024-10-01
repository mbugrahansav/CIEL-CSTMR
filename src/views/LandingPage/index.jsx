// LandingPage/index.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Stil dosyası
import { AuthContext } from '../../contexts/AuthContext';
import logo from './ciel-logo.png';

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
    <div className="landing-page">
      <div className="content">
        <img src={logo} alt="Ciel Logo" className="logo" />
        <h1>5 Kahve Alana 1 Bedava!</h1>
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
