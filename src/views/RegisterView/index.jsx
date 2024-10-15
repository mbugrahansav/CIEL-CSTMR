import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './index.css';

function RegisterView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Register new user and send email verification
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      try {
        await sendEmailVerification(user);
        console.log('Verification email sent successfully.');
        setErrorMessage('A verification email has been sent. Please check your inbox and verify your email.');
      } catch (emailError) {
        console.error('Error sending verification email:', emailError);
        setErrorMessage('Failed to send verification email. Please try again later.');
      }

      // Send user details to your backend
      try {
        await axios.post('http://localhost:8080/users', {
          uid: user.uid,
          email: user.email,
          displayname: `${firstName} ${lastName}`,
          provider: 'Email/Password',
        });
      } catch (axiosError) {
        console.error('Error saving to the database:', axiosError);
        setErrorMessage('An error occurred while saving to the database. Please try again.');
        return;
      }

      // Log out the user after registration to ensure they verify their email
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password is too weak.');
      } else {
        setErrorMessage('An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="register-input"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default RegisterView;
