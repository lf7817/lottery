import path from 'node:path'
import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 75,
          propList: ['*'],
        }),
      ],
    },
  },
  base: './',
  server: {
    proxy: {
      '/lottery-api': {
        target: 'http://localhost:4000/lottery-api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/lottery-api/, ''),
      },
    },
  },
  plugins: [react()],
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
