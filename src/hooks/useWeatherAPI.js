import { useState, useEffect } from 'react';
import { mapWeatherData } from '../utils/weatherMapper';
import { getTimeState } from '../utils/timeMapper';

// ✨ .env 파일에 공백이 섞여 들어와도 자동으로 제거(.trim())하도록 수정했습니다!
const API_KEY = (import.meta.env.VITE_WEATHER_API_KEY || '').trim();

export const useWeatherAPI = () => {
  const [weatherData, setWeatherData] = useState({
    temp: '--',
    city: '날씨 불러오는 중...',
    description: '',
    timeState: getTimeState(),
    weatherCondition: 'Clear',
    weatherIntensity: 0.2,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      if (!API_KEY) {
        setWeatherData(prev => ({ ...prev, city: 'API 키가 없습니다 (설정 확인)' }));
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`API 요청 실패 (코드: ${res.status}, 메시지: ${errorData.message})`);
        }

        const data = await res.json();
        const timeState = getTimeState();
        const { condition, intensity } = mapWeatherData(data);

        setWeatherData({
          temp: Math.round(data.main.temp),
          city: data.name,
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

    // 위치를 가져오고 날씨를 세팅하는 함수 (재사용을 위해 분리)
    const updateWeather = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.warn('위치 권한 거부됨. 서울 날씨를 가져옵니다.', error);
          fetchWeather(37.5665, 126.9780); // 서울 좌표
        }
      );
    };

    // 1. 처음 화면이 켜질 때 즉시 날씨 업데이트
    updateWeather();

    // 2. ✨ 5분(5 * 60 * 1000 밀리초)마다 주기적으로 날씨 업데이트
    const intervalId = setInterval(updateWeather, 5 * 60 * 1000);

    // 3. 컴포넌트가 꺼질 때 타이머가 계속 돌아가지 않도록 정리(Cleanup)
    return () => clearInterval(intervalId);
  }, []);

  return { weatherData, isLoading };
};