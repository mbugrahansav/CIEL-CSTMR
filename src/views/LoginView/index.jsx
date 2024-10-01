// LoginView/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import './index.css';
import logo from './ciel-logo.png';

function LoginView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const { login } = useContext(AuthContext); // Context'ten login işlevini alın
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Admin kullanıcı adı ve şifresiyle giriş kontrolü
    if (username === 'admin' && password === 'admin') {
      login();
      navigate('/');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/users');
      const user = response.data.find(user => user.username === username && user.password === password);

      if (user) {
        login();
        navigate('/');
      } else {
        setErrorMessage('Geçersiz kullanıcı adı veya şifre!');
      }
    } catch (error) {
      console.error('Login hatası:', error);
      setErrorMessage('Sunucu hatası, lütfen daha sonra tekrar deneyin!');
    }
  };

  const handleUsernameClick = () => {
    setIsFlipped(true);
    setTimeout(() => setIsFlipped(false), 1000); // Animasyon süresi
  };

  const handlePasswordClick = () => {
    setIsFlipped(true);
    setTimeout(() => setIsFlipped(false), 1000); // Animasyon süresi
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-logo'>
          <img 
            src={logo} 
            alt="logo" 
            className={isFlipped ? 'flip-animation' : ''}
            onClick={handleUsernameClick} 
          />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            onClick={handleUsernameClick}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            onClick={handlePasswordClick}
          />
          <div className="forgot-password">Forgot password?</div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginView;
