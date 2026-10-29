import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/theme-win95',
  apps: ['@owdproject/app-nuxt-terminal', '@owdproject/app-nuxt-atproto'],
  modules: ['@owdproject/module-nuxt-atproto'],
  systemBar: { enabled: true, startButton: true },
})
