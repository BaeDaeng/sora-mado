import React, { useState } from 'react';
import styles from './SnowEffect.module.css';

const generateSnow = () => {
  return new Array(50).fill(0).map(() => ({
    left: Math.random() * 100,
    size: 2 + Math.random() * 4, // 2px ~ 6px 눈송이 크기
    duration: 3 + Math.random() * 5, // 비보다 천천히 떨어짐 (3~8초)
    delay: Math.random() * 5,
  }));
};

const SnowEffect = () => {
  const [snowflakes] = useState(generateSnow);

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