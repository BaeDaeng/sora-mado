import React from 'react';
import styles from './BackgroundLayer.module.css';

// 바뀐 파일명 임포트 (Rain 삭제, Dawn 추가)
import dawnBg from '../../../assets/images/backgrounds/Dawn.png';
import dayBg from '../../../assets/images/backgrounds/Day.png';
import sunsetBg from '../../../assets/images/backgrounds/Sunset.png';
import nightBg from '../../../assets/images/backgrounds/Night.png';

// 이제 weather가 아닌 timeState Props를 받습니다.
const BackgroundLayer = ({ timeState }) => {
  
  // 시간 상태 이름과 파일 변수 매핑
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
          alt={key}
          className={`${styles.backgroundImage} ${
            timeState === key ? styles.active : styles.inactive
          }`}
        />
      ))}
    </div>
  );
};

export default BackgroundLayer;