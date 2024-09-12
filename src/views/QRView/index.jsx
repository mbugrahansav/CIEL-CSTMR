import React from 'react';
import './index.css';
import QRComponent from '../../components/QRGenarator';

function Index() {
  return (
    <div className='QR-Container'>
      <div id='QRCode'>
        <QRComponent />
      </div>
    </div>
  );
}

export default Index;