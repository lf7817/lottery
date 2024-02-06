import * as path from 'node:path'
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { stylexPlugin } from 'vite-plugin-stylex-dev'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : '/lottery/screen/',
    server: {
      cors: true,
      host: '127.0.0.1',
      port: 4173,
      proxy: {
        '/lottery-api': {
          target: 'http://localhost:4000/lottery-api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/lottery-api/, ''),
        },
      },
    },
    plugins: [react(), stylexPlugin()],
    resolve: {
      alias: {
        '@': pathResolve('src'),
        // 兼容 css-loader 加载path alias格式 https://github.com/webpack-contrib/css-loader#url
        '~@': pathResolve('src'),
      },
    },
  }
})

function pathResolve(...args: string[]) {
  return normalizePath(path.resolve(__dirname, ...args))
}
