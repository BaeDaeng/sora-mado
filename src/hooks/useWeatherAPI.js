import { useState, useEffect } from 'react';
import { mapWeatherData } from '../utils/weatherMapper';
import { getTimeState } from '../utils/timeMapper';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';

export const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState({
    temp: '--',
    city: '날씨 불러오는 중...', // 초기값을 바꿔두었습니다.
    description: '',
    timeState: getTimeState(),
    weatherCondition: 'Clear',
    weatherIntensity: 0.2,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      if (!API_KEY) {
        // 1. API 키가 아예 없을 때
        setWeatherData(prev => ({ ...prev, city: 'API 키가 없습니다 (설정 확인)' }));
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
        
        if (!res.ok) {
          // 2. API 키는 있는데 아직 활성화가 안 되었거나 틀렸을 때
          throw new Error(`API 요청 실패 (코드: ${res.status}). 키 활성화를 기다려주세요.`);
        }

        const data = await res.json();
        const timeState = getTimeState();
        const { condition, intensity } = mapWeatherData(data);

        setWeatherData({
          temp: Math.round(data.main.temp),
          city: data.name, // 성공하면 진짜 도시 이름(예: Seoul, Busan)이 들어갑니다.
          description: data.weather[0].description,
          timeState: timeState,
          weatherCondition: condition,
          weatherIntensity: intensity,
        });
      } catch (error) {
        console.error('날씨 오류:', error);
        setWeatherData(prev => ({ ...prev, city: '데이터 연결 실패' }));
      } finally {
        setIsLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
      (error) => {
        console.warn('위치 권한 거부됨. 서울 날씨를 가져옵니다.', error);
        fetchWeather(37.5665, 126.9780); // 서울 좌표
      }
    );
  }, []);

  return { weatherData, isLoading };
};