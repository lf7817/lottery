import * as path from 'node:path'
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { stylexPlugin } from 'vite-plugin-stylex-dev'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    cors: true,
    host: '127.0.0.1',
  },
  plugins: [react(), stylexPlugin()],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      // 兼容 css-loader 加载path alias格式 https://github.com/webpack-contrib/css-loader#url
      '~@': pathResolve('src'),
    },
  },
})

function pathResolve(...args: string[]) {
  return normalizePath(path.resolve(__dirname, ...args))
}
