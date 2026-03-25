import React, { useState } from 'react';
import styles from './SnowEffect.module.css';

const SnowEffect = ({ intensity = 0.5 }) => {
  
  // ✨ 강도에 따라 눈송이 개수 조절 (최소 20개 ~ 최대 120개)
  const snowCount = Math.floor(20 + intensity * 100);

  const [snowflakes] = useState(() => {
    return new Array(snowCount).fill(0).map(() => ({
      left: Math.random() * 100,
      size: 1 + Math.random() * 4, 
      duration: 3 + Math.random() * 5, 
      delay: Math.random() * 5,
    }));
  });

  return (
    <div className={styles.snowContainer}>
      {snowflakes.map((snow, i) => (
        <div
          key={i}
          className={styles.snowflake}
          style={{
            left: `${snow.left}%`,
            width: `${snow.size}px`,
            height: `${snow.size}px`,
            animationDuration: `${snow.duration}s`,
            animationDelay: `${snow.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;