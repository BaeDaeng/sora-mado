import React from 'react';
import styles from './ParticleLayer.module.css';
import RainEffect from './effects/RainEffect';
import SnowEffect from './effects/SnowEffect';
import FlowerEffect from './effects/FlowerEffect';
import StarEffect from './effects/StarEffect';

const ParticleLayer = ({ weather }) => {
  return (
    <div className={styles.windowMask}>
      {weather === 'Rainy' && <RainEffect />}
      {weather === 'Day' && <FlowerEffect />}
      {weather === 'Night' && <StarEffect />}
      {weather === 'Sunset' && <FlowerEffect />} {/* 노을 질 때도 벚꽃잎이 날리도록 해봤습니다! */}
    </div>
  );
};

export default ParticleLayer;