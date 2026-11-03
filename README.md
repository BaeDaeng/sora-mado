# sora-mado

현재 위치의 날씨와 기기 시간에 맞춰 창밖 풍경이 달라지는 React 웹 애플리케이션입니다. 시간대별 배경 이미지 위에 비·눈·꽃잎 효과를 겹치고, 현재 기온·지역·날씨 설명을 표시합니다.

## 주요 기능

- 브라우저 위치 정보로 현재 위치의 날씨 조회
- 위치 권한 거부 또는 위치 조회 실패 시 서울 좌표로 대체
- OpenWeatherMap 현재 날씨 API 연동 및 5분 간격 갱신
- 새벽·낮·노을·밤의 네 가지 배경
- 날씨 코드에 따른 비·눈·꽃잎 효과
- 강수·적설 정보에 따른 파티클 강도 조절
- 섭씨 기온, 지역명, 한국어 날씨 설명 표시
- 화면을 채우는 16:9 배경 구성

## 화면 미리보기

아래 이미지는 앱에서 사용하는 낮 배경 원본입니다. 실행 화면에서는 날씨 효과와 정보 UI가 함께 표시됩니다.

![낮 시간대 배경](src/assets/images/backgrounds/Day.png)

## 기술 스택

- React 19, JavaScript
- Vite 7, ESLint 9
- React Context와 사용자 정의 훅
- CSS Modules
- 브라우저 Geolocation API, Fetch API
- OpenWeatherMap Current Weather API

## 로컬 실행

Node.js, npm, OpenWeatherMap API 키가 필요합니다.

```bash
git clone https://github.com/BaeDaeng/sora-mado.git
cd sora-mado
npm ci
```

루트에 `.env.local` 파일을 만들고 자신의 키를 설정합니다.

```dotenv
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

```bash
npm run dev
```

터미널에 표시된 주소로 접속한 뒤 위치 접근을 허용하면 현재 위치의 날씨가 표시됩니다. 환경 변수를 변경했다면 개발 서버를 다시 시작합니다.

`VITE_WEATHER_API_KEY`는 브라우저에서 API를 호출할 때 사용하므로 빌드 결과와 네트워크 요청에서 확인할 수 있습니다. 서버 전용 비밀키를 넣는 용도로 사용하면 안 됩니다.

## 동작 방식

```text
브라우저 위치 조회
  ├─ 성공: 현재 위도·경도
  └─ 실패: 서울(37.5665, 126.9780)
          ↓
OpenWeatherMap 현재 날씨 조회
          ↓
useWeatherAPI → WeatherContext
          ├─ timeMapper → BackgroundLayer
          ├─ weatherMapper → ParticleLayer
          └─ 기온·지역·설명 → WeatherInfo
```

### 시간대별 배경

[getTimeState](src/utils/timeMapper.js)는 실행 중인 기기의 로컬 시간을 사용합니다.

| 시간 | 상태 | 배경 |
| --- | --- | --- |
| 05:00 이상 ~ 07:00 미만 | `Dawn` | 새벽 |
| 07:00 이상 ~ 17:00 미만 | `Day` | 낮 |
| 17:00 이상 ~ 20:00 미만 | `Sunset` | 노을 |
| 20:00 이상 ~ 다음 날 05:00 미만 | `Night` | 밤 |

위치별 일출·일몰 시각이나 해당 도시의 시간대를 계산하는 구조는 아닙니다. 초기 상태와 날씨 조회 성공 시 시간대를 계산하므로, 시간대 변경이 초 단위로 즉시 반영되는 것은 아닙니다.

### 날씨 효과

[weatherMapper.js](src/utils/weatherMapper.js)는 OpenWeatherMap 날씨 코드 `200~599`를 비, `600~699`를 눈, 나머지를 `Clear`로 매핑합니다. 현재 흐림도 별도 상태로 구분하지 않으며, `Clear` 상태에는 꽃잎 효과가 표시됩니다.

비·눈은 시간당 강수·적설량을 우선 사용하고, 데이터가 없으면 날씨 코드로 효과 강도를 추정합니다. 별 효과 컴포넌트는 현재 `ParticleLayer`에서 렌더링하지 않습니다.

## 프로젝트 구조

```text
src/
├── App.jsx
├── main.jsx
├── assets/images/backgrounds/  # Dawn, Day, Sunset, Night 배경
├── components/SoraMadoScene/
│   ├── BackgroundLayer/       # 시간대별 배경
│   ├── ParticleLayer/         # 날씨별 시각 효과
│   └── WeatherInfo/           # 기온·지역·설명
├── context/WeatherContext.jsx # 날씨 상태 공유
├── hooks/useWeatherAPI.js     # 위치 조회, API 요청, 갱신 주기
├── styles/                   # 전역 스타일
└── utils/                    # 시간·날씨 데이터 매핑
```

## 개발 명령어와 배포

| 명령어 | 용도 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | `dist/`에 정적 파일 빌드 |
| `npm run preview` | 빌드 결과 로컬 확인 |
| `npm run lint` | ESLint 검사 |

배포 환경에도 `VITE_WEATHER_API_KEY`를 설정하고 빌드 명령 `npm run build`, 출력 디렉터리 `dist`를 사용합니다. 위치 조회를 위해 운영 서비스는 HTTPS로 제공합니다. 환경 변수 변경 후에는 새 빌드가 필요합니다.

## 문제 해결 및 현재 범위

| 현상 | 확인할 내용 |
| --- | --- |
| API 키가 없다는 메시지 | `.env.local`의 변수 이름·값과 개발 서버 재시작 여부 |
| 데이터 연결 실패 | API 응답 상태, 키의 사용 가능 여부, 네트워크 연결 |
| 서울 날씨가 표시됨 | 브라우저 위치 권한과 위치 조회 성공 여부 |
| 배경 일부가 화면 밖으로 잘림 | 16:9 비율을 유지하면서 화면 전체를 채우는 현재 레이아웃의 동작 |

현재는 도시 직접 검색, 시간별·주간 예보, 계정 기능을 제공하지 않습니다. 별도 자동 테스트 스크립트와 라이선스 파일은 저장소에 없습니다.
