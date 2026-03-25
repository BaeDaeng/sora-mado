// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/global.css';
import BackgroundLayer from './components/SoraMadoScene/BackgroundLayer/BackgroundLayer';
import ParticleLayer from './components/SoraMadoScene/ParticleLayer/ParticleLayer';

function App() {
  const [weatherState, setWeatherState] = useState('Day');

  // ✨ 실제 시간을 받아와서 상태를 변경하는 로직
  useEffect(() => {
    const updateTimeBasedWeather = () => {
      const currentHour = new Date().getHours(); // 0 ~ 23
      
      // 시간에 따라 낮, 노을, 밤으로 설정
      if (currentHour >= 7 && currentHour < 16) {
        setWeatherState('Day');     // 아침 7시 ~ 오후 4시: 낮
      } else if (currentHour >= 16 && currentHour < 19) {
        setWeatherState('Sunset');  // 오후 4시 ~ 저녁 7시: 노을
      } else {
        setWeatherState('Night');   // 저녁 7시 ~ 아침 7시: 밤
      }
    };

    updateTimeBasedWeather(); // 컴포넌트가 처음 켜질 때 한 번 실행

    // 1분마다 시간이 바뀌었는지 체크 (시간이 애매할 때 넘어가는 순간을 잡기 위해)
    const intervalId = setInterval(updateTimeBasedWeather, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    // 1. 전체 화면 래퍼 (넘치는 부분은 안 보이게 hidden 처리)
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      
      {/* 2. ✨ 화면이 잘리더라도 이미지와 창문 비율을 완벽하게 하나로 묶어주는 마법의 컨테이너 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: 'calc(100vw * 9 / 16)', /* 16:9 비율 고정 */
        minHeight: '100vh',
        minWidth: 'calc(100vh * 16 / 9)' /* 화면이 좁아져도 최소 비율 보장 */
      }}>
        <BackgroundLayer weather={weatherState} />
        <ParticleLayer weather={weatherState} />
      </div>

      {/* UI: 현재 상태 확인 및 강제 테스트 버튼 (배경 위에 떠 있음) */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '1.5rem', textShadow: '0 0 5px rgba(0,0,0,0.8)', margin: 0 }}>
          현재 상태: {weatherState}
        </h1>
        <div style={{ display: 'flex', gap: '5px' }}>
          {/* 지금 당장 시간이 안 바뀔 테니, 클릭해서 크로스페이드를 테스트할 수 있는 버튼들 */}
          <button onClick={() => setWeatherState('Day')}>낮</button>
          <button onClick={() => setWeatherState('Sunset')}>노을</button>
          <button onClick={() => setWeatherState('Night')}>밤</button>
          <button onClick={() => setWeatherState('Rainy')}>비</button>
        </div>
      </div>
    </div>
  );
}

export default App;