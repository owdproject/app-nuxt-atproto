import { defineNuxtPlugin } from 'nuxt/app'
import { defineDesktopApp } from '@owdproject/nuxt/kit/defineDesktopApp'
import configAppAtproto from './app.config'

export default defineNuxtPlugin({
  name: 'desktop-app-atproto-register',
  async setup() {
    if (import.meta.server) return
    await defineDesktopApp(configAppAtproto)
  },
})
