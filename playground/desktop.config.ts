import { defineDesktopConfig } from '@owdproject/core'

export default defineDesktopConfig({
  theme: '@owdproject/theme-win95',
  apps: ['@owdproject/app-terminal', '@owdproject/app-atproto'],
  modules: ['@owdproject/nuxt-atproto'],
  systemBar: { enabled: true, startButton: true },
})
