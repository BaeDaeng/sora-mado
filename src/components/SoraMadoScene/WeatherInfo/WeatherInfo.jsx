import React from 'react';
import styles from './WeatherInfo.module.css';
import { useWeather } from '../../../context/WeatherContext';

const WeatherInfo = () => {
  const { weatherData, isLoading } = useWeather();

  if (isLoading) return null; // 로딩 중에는 숨김

  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.temperature}>{weatherData.temp}°</h1>
      <div className={styles.details}>
        <span>📍 {weatherData.city}</span>
      </div>
      <div className={styles.description}>
        {weatherData.description}
      </div>
    </div>
  );
};

export default WeatherInfo;