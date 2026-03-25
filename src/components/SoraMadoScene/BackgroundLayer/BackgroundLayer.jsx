// src/components/SoraMadoScene/BackgroundLayer/BackgroundLayer.jsx
import React from 'react';
import styles from './BackgroundLayer.module.css';

// 바뀐 파일명으로 임포트
import dayBg from '../../../assets/images/backgrounds/Day.png';
import nightBg from '../../../assets/images/backgrounds/Night.png';
import sunsetBg from '../../../assets/images/backgrounds/Sunset.png';
import rainBg from '../../../assets/images/backgrounds/Rain.png';

const BackgroundLayer = ({ weather }) => {
  // 상태 이름과 파일 변수 매핑
  const images = {
    Day: dayBg,
    Night: nightBg,
    Sunset: sunsetBg,
    Rainy: rainBg,
  };

  return (
    <div className={styles.container}>
      {Object.entries(images).map(([key, src]) => (
        <img
          key={key}
          src={src}
          alt={key}
          className={`${styles.backgroundImage} ${
            weather === key ? styles.active : styles.inactive
          }`}
        />
      ))}
    </div>
  );
};

export default BackgroundLayer;