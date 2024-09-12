import React from 'react';
import './index.css';

function LoginView() {

  return (
    <div className='Login-Container'>
      <h2>Login</h2>
      <form>
        <input
          type="email"
          placeholder=""
          value={email}
        />
        <input
          type="password"
          placeholder=""
          value={password}
        />
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginView;