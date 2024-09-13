import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import logo from './ciel-logo.png'; // Logo importu

function LoginView({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.get('http://localhost:8080/users');
      const user = response.data.find(user => user.username === username && user.password === password);

      if (user) {
        setIsAuthenticated(true);
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
        <h2>Login</h2>
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
