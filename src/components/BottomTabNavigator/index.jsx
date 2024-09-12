import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import menuIcon from './menu-icon.png';
import homeIcon from './home-icon.png';
import settingsIcon from './settings-icon.png';
import qrIcon from './qr-icon.png';

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHomePage = () => {
    navigate('/');
  };

  const goToQrPage = () => {
    navigate('/qr');
  };

  const goToSettingsPage = () => {
    navigate('/settings');
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className='Bottom-Tab-Nav-Container'>

      <div className='Tab-Nav-Menu-Button-Box'>
        <button id='Button-1' onClick={() => window.location.href='https://coffeeciel.com/menu'}>
          <img src={menuIcon} id='menu-icon' alt='menu-icon'/>
        </button>
      </div>

      <div className='Tab-Nav-Home-Button-Box'>
        <div className={`flip-container ${isHomePage ? 'flip' : ''}`}>
          <div className='flipper'>
            {/* Ön Yüz (Home İcon) */}
            <div className='front'>
              <button id='Button-2' onClick={goToHomePage}>
                <img src={homeIcon} id='home-icon' alt='home-icon'/>
              </button>
            </div>
            {/* Arka Yüz (QR İcon) */}
            <div className='back'>
              <button id='Button-2' onClick={goToQrPage}>
                <img src={qrIcon} id='qr-icon' alt='qr-icon'/>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='Tab-Nav-Settings-Button-Box'>
        <button id='Button-3' onClick={goToSettingsPage}>
          <img src={settingsIcon} id='settings-icon' alt='settings-icon'/>
        </button>
      </div>

    </div>
  );
}

export default Index;