import * as path from 'node:path'
import * as process from 'node:process'
import { defineConfig, loadEnv, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { stylexPlugin } from 'vite-plugin-stylex-dev'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.PUBLIC_PATH,
    server: {
      cors: true,
      host: '127.0.0.1',
      port: 4173,
      proxy: {
        '/lottery/lottery-api': {
          target: 'http://localhost:4000/lottery-api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/lottery\/lottery-api/, ''),
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
