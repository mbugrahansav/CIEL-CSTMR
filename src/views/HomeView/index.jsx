import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import icon from './ciel-cup-icon.png';
import iconFill from './ciel-cup-icon-fill.png';
import logo from './ciel-logo.png';
import './index.css';

import axios from 'axios'; // Axios importu

function Index() {
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [bountyCount, setBountyCount] = useState(0);
  const [entityCount, setEntityCount] = useState(0); // Entity count için state

  const userId = 1000; // Sabit kullanıcı ID'si

  useEffect(() => {
    // Sayfa yüklendiğinde/yenilendiğinde istek gönderme
    const fetchEntityCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user-loyalties/${userId}`);
        const data = response.data;
        const count = data.progressBar;
        setEntityCount(count);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchEntityCount();
  }, [userId]);

  const setCoffee = async () => {
    if (coffeeCount < 4) {
      setCoffeeCount(coffeeCount + 1);
      setEntityCount(entityCount + 1); // Her seferinde entityCount'u bir arttır
    } else if (coffeeCount === 4) {
      // 5'e ulaşıldığında tüm bardakları dolu göster
      setCoffeeCount(5);
      setEntityCount(entityCount + 1);
  
      // Tüm bardakları dolu olarak gösterdikten sonra sıfırlama için kısa bir gecikme
      setTimeout(() => {
        setCoffeeCount(0); // Kahve bardaklarını sıfırla
        setEntityCount(0); // ProgressBar sıfırlama
        setBountyCount(bountyCount + 1); // Kazanılan kahve sayısını arttır
      }, 500); // 500ms sonra sıfırla (görsel olarak dolduktan sonra sıfırlanması için)
    }

    const coffeeOptions = [1201, 1202, 1203];
    const brewOptions = [1101, 1102, 1103];

    const coffeeId = coffeeOptions[Math.floor(Math.random() * coffeeOptions.length)];
    const brewId = brewOptions[Math.floor(Math.random() * brewOptions.length)];

    // Güncelleme isteği gönderme
    try {
      const response = await axios.post(`http://localhost:8080/coffee-sales`, {
        user: { id: userId },
        coffee: { id: coffeeId },
        brew: { id: brewId },
      });

      console.log('Güncelleme başarılı:', response.data);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  const deleteCoffee = () => {
    setBountyCount(bountyCount - bountyCount);
  };

  const navigate = useNavigate();

  const goToStoryPage = () => {
    navigate('/story');
  };

  return (
    <div className='Home-Container'>
      <div className='Story-Box'>
        <div className='Story'>
          <button id='Story-Button-1' onClick={goToStoryPage}>
            <img src={logo} id='ciel-cup-icon' alt="logo" />
          </button>
        </div>
        <div className='Story'>
          <button id='Story-Button-2'></button>
        </div>
        <div className='Story'>
          <button id='Story-Button-3'></button>
        </div>
      </div>

      <div className='Loyalty-Box'>
        <div className='Circular-Progress-Bar'>
          <CircularProgressbar
            value={(entityCount / 5) * 100} // Entity count'un modunu gösterme
            text={(entityCount % 5).toString()} // Entity count'un modunu yazma
            styles={buildStyles({
              textColor: 'white',
              pathColor: 'white',
              trailColor: '#323235'
            })}
          />
        </div>
        {/* <img src={icon} id='ciel-cup-icon' alt="icon" />
        <img src={iconFill} id='ciel-cup-icon-fill' alt="icon-fill" /> */}
        <div className='Coffee-Icons'>
        {[...Array(5)].map((_, index) => (
          <img
          key={index}
          src={coffeeCount > index ? iconFill : icon} // coffeeCount'a göre dolu veya boş bardak göster
          className="coffee-icon"
          alt="coffee cup"
        />
        ))}
      </div>
      </div>

      

      <div className='Coffee-Details-Box'>
        <button onClick={setCoffee}>Set Coffee</button>
        <button onClick={deleteCoffee}>deleteCoffee</button>
        <span>Kazanılan Kahve Sayısı: {bountyCount}</span>
      </div>
    </div>
  );
};

export default Index;