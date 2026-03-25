import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // true로 설정하면 localtunnel의 임시 주소가 매번 바뀌어도 계속 접속을 허용해 줍니다!
    allowedHosts: true,
  }
})
