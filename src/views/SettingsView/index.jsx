import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'; // Oluşturduğunuz context
import './index.css';

function SettingsView() {
  const { logout } = useContext(AuthContext); // Context'ten logout işlevini al

  return (
    <div className='Settings-Container'>
      {/* Diğer ayarlar burada */}
      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default SettingsView;
