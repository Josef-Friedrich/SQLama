import * as fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

function readPackageJson(name: string) {
  return JSON.parse(
    fs.readFileSync(
      new URL(`./node_modules/${name}/package.json`, import.meta.url),
      { encoding: 'utf-8' }
    )
  )
}

function getVersion(name: string): string {
  return readPackageJson(name).version
}

function getStringifiedVersion(name: string): string {
  return JSON.stringify(getVersion(name))
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  define: {
    __VERSION_MONACO__: getStringifiedVersion('monaco-editor'),
    __VERSION_SQLJS__: getStringifiedVersion('sql.js')
  },
  base: '/SQLama/'
})
