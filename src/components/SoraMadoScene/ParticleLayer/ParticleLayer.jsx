import React from 'react';
import styles from './ParticleLayer.module.css';
import RainEffect from './effects/RainEffect';
import SnowEffect from './effects/SnowEffect';
import FlowerEffect from './effects/FlowerEffect';
import StarEffect from './effects/StarEffect';

// 부모로부터 조건(condition)과 강도(intensity)를 따로 받습니다.
const ParticleLayer = ({ condition, intensity }) => {
  return (
    <div className={styles.windowMask}>
      {/* ✨ 강도 Props를 넘겨줍니다 */}
      {condition === 'Rain' && <RainEffect intensity={intensity} />}
      {condition === 'Snow' && <SnowEffect intensity={intensity} />}
      
      {/* 맑을 때는 기존 벚꽃/별 효과 (나중에 맑은 날 강도 조절도 해보세요!) */}
      {condition === 'Clear' && <FlowerEffect />} 
    </div>
  );
};

export default ParticleLayer;