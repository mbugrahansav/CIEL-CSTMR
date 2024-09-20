// RegisterView/index.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import './index.css';

function RegisterView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // Context'ten login işlevini alın
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Kullanıcıyı kaydetme işlemi (örnek olarak)
      await axios.post('http://localhost:8080/users', { username, password });

      // Kayıt başarılı ise giriş yap ve ana sayfaya yönlendir
      login();
      navigate('/');
    } catch (error) {
      console.error('Register hatası:', error);
      setErrorMessage('Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin!');
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default RegisterView;
