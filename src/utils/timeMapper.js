export const getTimeState = () => {
  const currentHour = new Date().getHours();
  
  if (currentHour >= 5 && currentHour < 7) return 'Dawn';    // 새벽 5시~7시
  if (currentHour >= 7 && currentHour < 17) return 'Day';     // 아침 7시~오후 5시
  if (currentHour >= 17 && currentHour < 20) return 'Sunset'; // 오후 5시~저녁 8시
  return 'Night'; // 그 외 (저녁 8시~새벽 5시)
};