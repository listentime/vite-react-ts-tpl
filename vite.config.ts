import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import postcss from 'rollup-plugin-postcss'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()]
// })
export default {
  base: '/microActivity/xx',
  build: {
    target: 'esnext',
    outDir: 'xx',
    // sourcemap: true,
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCase'
    },

  }
}
