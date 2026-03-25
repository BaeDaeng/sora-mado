import React, { createContext, useContext } from 'react';
import { useWeatherAPI } from '../hooks/useWeatherAPI';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { weatherData, isLoading } = useWeatherAPI();

  return (
    <WeatherContext.Provider value={{ weatherData, isLoading }}>
      {children}
    </WeatherContext.Provider>
  );
};

// 컴포넌트들에서 편하게 꺼내 쓸 수 있도록 Custom Hook 제공
// eslint-disable-next-line react-refresh/only-export-components
export const useWeather = () => useContext(WeatherContext);