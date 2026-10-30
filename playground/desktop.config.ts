import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/theme-win95',
  apps: ['@owdproject/nuxt-app-terminal', '@owdproject/nuxt-app-atproto'],
  modules: ['@owdproject/nuxt-module-atproto'],
  systemBar: { enabled: true, startButton: true },
})
