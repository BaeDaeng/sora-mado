import React from 'react';
import './styles/global.css';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import BackgroundLayer from './components/SoraMadoScene/BackgroundLayer/BackgroundLayer';
import ParticleLayer from './components/SoraMadoScene/ParticleLayer/ParticleLayer';
import WeatherInfo from './components/SoraMadoScene/WeatherInfo/WeatherInfo';

const SoraMadoApp = () => {
  // 알아서 실시간 위치/시간 기반 상태를 뱉어줍니다.
  const { weatherData } = useWeather(); 

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      
      {/* 고정 비율 배경 컨테이너 */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100vw', height: 'calc(100vw * 9 / 16)', minHeight: '100vh', minWidth: 'calc(100vh * 16 / 9)'
      }}>
        {/* ✨ 배경은 오직 시간에만 반응합니다 (Dawn, Day, Sunset, Night) */}
        <BackgroundLayer timeState={weatherData.timeState} />
        
        {/* ✨ 파티클은 날씨 종류와 강도에 반응합니다 (0.1 ~ 1.0) */}
        <ParticleLayer 
          condition={weatherData.weatherCondition} 
          intensity={weatherData.weatherIntensity} 
        />
      </div>

      {/* 예쁜 감성 UI */}
      <WeatherInfo />
      
    </div>
  );
};

function App() {
  return (
    <WeatherProvider>
      <SoraMadoApp />
    </WeatherProvider>
  );
}

export default App;