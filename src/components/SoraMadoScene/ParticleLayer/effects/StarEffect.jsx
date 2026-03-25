import React, { useState } from 'react';
import styles from './StarEffect.module.css';

// 반짝이는 별 25개 생성 (상단 하늘 영역 위주로 배치)
const generateStars = () => {
  return new Array(25).fill(0).map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 80, // 하늘 쪽에 주로 배치 (0~80%)
    size: 1 + Math.random() * 2, // 1~3px 크기
    duration: 1.5 + Math.random() * 3, // 깜빡이는 주기
    delay: Math.random() * 5,
  }));
};

// 유성 10개 생성 (너무 자주 떨어지면 정신없으므로 딜레이를 길게 줌)
const generateMeteors = () => {
  return new Array(10).fill(0).map(() => ({
    left: Math.random() * 100,
    top: -10 + Math.random() * 30, // 화면 약간 위나 상단에서 시작
    duration: 3 + Math.random() * 2, // 떨어지는 속도 자체는 빠르지만 주기(반복)는 길게
    delay: Math.random() * 15, // 0~15초 사이 랜덤으로 한 번씩 떨어짐
  }));
};

const StarEffect = () => {
  const [stars] = useState(generateStars);
  const [meteors] = useState(generateMeteors);

  return (
    <div className={styles.starContainer}>
      {/* 반짝이는 별 */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className={styles.twinkleStar}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      {/* 유성 */}
      {meteors.map((meteor, i) => (
        <div
          key={`meteor-${i}`}
          className={styles.meteor}
          style={{
            left: `${meteor.left}%`,
            top: `${meteor.top}%`,
            animationDuration: `${meteor.duration}s`,
            animationDelay: `${meteor.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarEffect;