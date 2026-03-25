import React, { useState } from 'react';
import styles from './FlowerEffect.module.css';

// 벚꽃잎 25개 생성
const generatePetals = () => {
  return new Array(25).fill(0).map(() => ({
    left: Math.random() * 100,
    duration: 4 + Math.random() * 6, // 4~10초 동안 천천히 흩날림
    delay: Math.random() * 7,
  }));
};

// 빛망울 10개 생성 (화면 전역에 배치)
const generateBokeh = () => {
  return new Array(10).fill(0).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 20 + Math.random() * 50, // 20px ~ 70px 크기
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
};

const FlowerEffect = () => {
  const [petals] = useState(generatePetals);
  const [bokehs] = useState(generateBokeh);

  return (
    <div className={styles.flowerContainer}>
      {/* 빛망울 렌더링 */}
      {bokehs.map((bokeh, i) => (
        <div
          key={`bokeh-${i}`}
          className={styles.bokeh}
          style={{
            left: `${bokeh.left}%`,
            top: `${bokeh.top}%`,
            width: `${bokeh.size}px`,
            height: `${bokeh.size}px`,
            animationDuration: `${bokeh.duration}s`,
            animationDelay: `${bokeh.delay}s`,
          }}
        />
      ))}
      {/* 벚꽃잎 렌더링 */}
      {petals.map((petal, i) => (
        <div
          key={`petal-${i}`}
          className={styles.petal}
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FlowerEffect;