// src/components/SoraMadoScene/ParticleLayer/ParticleLayer.jsx
import React from 'react';
import styles from './ParticleLayer.module.css';
import RainEffect from './effects/RainEffect';
import SnowEffect from './effects/SnowEffect';
import FlowerEffect from './effects/FlowerEffect';
import StarEffect from './effects/StarEffect';

const ParticleLayer = ({ condition, intensity }) => {
  return (
    <div className={styles.windowMask}>
      {/* condition에 따라 렌더링 (OpenWeatherMap 기준 날씨 상태) */}
      {condition === 'Rain' && <RainEffect intensity={intensity} />}
      {condition === 'Snow' && <SnowEffect intensity={intensity} />}
      
      {/* 맑은 날이거나 구름 낀 날에는 벚꽃/빛망울 효과 */}
      {(condition === 'Clear' || condition === 'Clouds') && <FlowerEffect />}
      
      {/* (참고) 밤 시간대에만 별이 보이게 하려면 App.jsx에서 timeState를 같이 넘겨받아 조건부로 렌더링할 수도 있습니다! */}
      {/* 지금은 테스트를 위해 유지해둡니다. */}
    </div>
  );
};

export default ParticleLayer;