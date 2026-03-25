// src/components/SoraMadoScene/ParticleLayer/effects/RainEffect.jsx
import React, { useState } from 'react';
import styles from './RainEffect.module.css';

// 1. 랜덤 값을 생성하는 함수를 아예 컴포넌트 '바깥'으로 빼냅니다.
// 이렇게 하면 React의 엄격한 렌더링 규칙(순수성)에서 완전히 자유로워집니다.
const generateDrops = () => {
  return new Array(50).fill(0).map(() => ({
    left: Math.random() * 100,
    duration: 0.5 + Math.random() * 0.5,
    delay: Math.random() * 2,
  }));
};

const RainEffect = () => {
  // 2. useState 안에 함수 실행 결과가 아닌, '함수 자체(generateDrops)'를 넘겨줍니다. (게으른 초기화)
  // 이렇게 하면 React가 "아, 이 함수는 처음에 컴포넌트가 화면에 나타날 때 딱 한 번만 실행하면 되는구나!" 
  // 하고 찰떡같이 알아듣고 불필요한 재렌더링을 막아줍니다.
  const [drops] = useState(generateDrops);

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