import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/nuxt-theme-paper',
  apps: ['@owdproject/nuxt-app-terminal', '@owdproject/nuxt-app-atproto'],
  modules: ['@owdproject/nuxt-module-atproto'],
  systemBar: { enabled: true, startButton: true },
})
