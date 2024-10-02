import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import './index.css';

function RegisterView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!username || !password) {
      setErrorMessage('Kullanıcı adı ve şifre alanları boş bırakılamaz!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/users', { username, password, fullname });

      // Successful registration
      login();
      navigate('/');
    } catch (error) {
      console.error('Register hatası:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin!');
      } else {
        setErrorMessage('Kayıt sırasında bir hata oluştu, lütfen tekrar deneyin!');
      }
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="register-input"
          />
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
