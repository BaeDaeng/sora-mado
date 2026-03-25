import React, { useState } from 'react';
import styles from './RainEffect.module.css';

// Props로 intensity(0.1 ~ 1.0)를 받습니다.
const RainEffect = ({ intensity = 0.5 }) => {
  
  // ✨ 강도에 따라 빗방울 개수 조절 (최소 20개 ~ 최대 150개)
  const dropCount = Math.floor(20 + intensity * 130);

  // 게으른 초기화 함수 안에서 dropCount 사용
  const [drops] = useState(() => {
    return new Array(dropCount).fill(0).map(() => ({
      left: Math.random() * 100,
      // ✨ 강도가 강할수록 비가 더 빠르게 떨어짐 (속도 랜덤 범위를 조절)
      duration: (1.0 - intensity * 0.5) + Math.random() * 0.3, 
      delay: Math.random() * 2,
    }));
  });

  return (
    <div className={styles.rainContainer}>
      {drops.map((drop, i) => (
        <div
          key={i}
          className={styles.drop}
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;