export const mapWeatherData = (data) => {
  if (!data) return { condition: 'Clear', intensity: 0 };

  const weatherId = data.weather[0].id;
  
  // 1. 날씨 상태(Condition) 결정
  let condition = 'Clear';
  if (weatherId >= 200 && weatherId < 600) condition = 'Rain';
  else if (weatherId >= 600 && weatherId < 700) condition = 'Snow';

  // 2. 날씨 강도(Intensity) 결정 (파티클 개수 조절용)
  // 비/눈의 시간당 강도(mm) 데이터를 사용하거나 없으면 ID 코드로 대략 추측
  let intensity = 0.5; // 기본 중간 강도

  // 비 강도 측정 (rain.1h 또는 rain.3h 데이터가 있으면 사용)
  if (condition === 'Rain' && data.rain) {
    const rainAmount = data.rain['1h'] || (data.rain['3h'] / 3) || 0;
    // 0mm~10mm+ 범위를 0.1~1.0 강도로 변환
    intensity = Math.min(Math.max(rainAmount / 10, 0.2), 1.0);
  } 
  // 눈 강도 측정
  else if (condition === 'Snow' && data.snow) {
    const snowAmount = data.snow['1h'] || (data.snow['3h'] / 3) || 0;
    intensity = Math.min(Math.max(snowAmount / 5, 0.2), 1.0); // 눈은 좀 더 민감하게
  }
  // 데이터가 없을 때 ID 코드로 추측 (예: 500은 약한 비, 502는 강한 비)
  else {
    const lastDigit = weatherId % 10;
    if (lastDigit <= 1) intensity = 0.3; // 약함
    else if (lastDigit >= 3) intensity = 0.9; // 강함
    else intensity = 0.6; // 보통
  }

  return { condition, intensity };
};