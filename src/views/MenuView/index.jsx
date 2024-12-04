import React from 'react';
import './index.css';

function MenuView() {
  return (
    <div className='Menu-Container'>
      <div className='a'>
        <iframe
          src="https://coffeeciel.com/menu"
          title="Coffeeciel Menu"
          className="iframe-content"
        ></iframe>
      </div>
    </div>
  );
}

export default MenuView;
