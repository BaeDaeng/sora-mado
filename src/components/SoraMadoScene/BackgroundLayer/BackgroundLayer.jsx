// src/components/SoraMadoScene/BackgroundLayer/BackgroundLayer.jsx
import React from 'react';
import styles from './BackgroundLayer.module.css';

import dawnBg from '../../../assets/images/backgrounds/Dawn.png';
import dayBg from '../../../assets/images/backgrounds/Day.png';
import sunsetBg from '../../../assets/images/backgrounds/Sunset.png';
import nightBg from '../../../assets/images/backgrounds/Night.png';

const BackgroundLayer = ({ timeState }) => {
  // 시간 상태(timeState)와 이미지 파일 매핑
  const images = {
    Dawn: dawnBg,
    Day: dayBg,
    Sunset: sunsetBg,
    Night: nightBg,
  };

  return (
    <div className={styles.container}>
      {Object.entries(images).map(([key, src]) => (
        <img
          key={key}
          src={src}
          alt={`${key} background`}
          className={`${styles.backgroundImage} ${
            timeState === key ? styles.active : styles.inactive
          }`}
        />
      ))}
    </div>
  );
};

export default BackgroundLayer;