import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import axios from 'axios';
import './index.css';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext); // AuthContext for authentication state
  const navigate = useNavigate();

  // Google Sign-In Provider
  const googleProvider = new GoogleAuthProvider();

  // Microsoft Sign-In Provider
  const microsoftProvider = new OAuthProvider('microsoft.com');

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Admin login logic
    if (email === 'admin@admin' && password === 'admin') {
      login(); // Assuming login context will handle user state
      navigate('/');
      return; // Stop further execution
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (user.emailVerified) {
        // If the email is verified, proceed with login
        login(); // Call login context to handle user state
        navigate('/');
      } else {
        // If the email is not verified, log out the user and show a message
        await auth.signOut();
        setErrorMessage('Your email is not verified. Please check your inbox and verify your email.');
      }
    } catch (error) {
      console.error('Login error:', error);

      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email format.');
          break;
        default:
          setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      if (user) {
        // Extract user details
        const userData = {
          fullname: user.displayName, // or userName, depending on your naming convention
          email: user.email,
          provider: 'Google'
        };
  
        // Send user details to your database
        await axios.post('http://localhost:8080/users', userData); // Replace with your API endpoint
  
        login(); // Call login context to handle user state
        navigate('/');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setErrorMessage('Google Sign-In failed. Please try again.');
    }
  };
  
  const handleMicrosoftSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      const user = result.user;
  
      if (user) {
        // Extract user details
        const userData = {
          fullname: user.displayName, // or userName, depending on your naming convention
          email: user.email,
          provider: 'Microsoft'
        };
  
        // Send user details to your database
        await axios.post('http://localhost:8080/users', userData); // Replace with your API endpoint
  
        login(); // Call login context to handle user state
        navigate('/');
      }
    } catch (error) {
      console.error('Microsoft Sign-In error:', error);
      setErrorMessage('Microsoft Sign-In failed. Please try again.');
    }
  };
  

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn} className="google-signin-button">
          Sign in with Google
        </button>

        {/* Microsoft Sign-In Button */}
        <button onClick={handleMicrosoftSignIn} className="microsoft-signin-button">
          Sign in with Microsoft
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginView;