import { existsSync } from 'node:fs'
import type { NuxtModule } from '@nuxt/schema'
import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin,
} from '@nuxt/kit'
import { registerTailwindPath } from '@owdproject/kit-tailwind/kit/registerTailwindPath'

const module: NuxtModule<any> = defineNuxtModule({
  meta: {
    name: 'desktop-app-atproto',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    {
      // add components
      addComponentsDir({
        path: resolve('./runtime/components'),
      })
    }

    {
      // add plugins
      addPlugin(resolve('./runtime/plugin'))
    }

    {
      // configure tailwind
      registerTailwindPath(
        nuxt,
        resolve('./runtime/components/**/*.{vue,mjs,ts}'),
      )
    }

    {
      // import i18n
      const i18nDir = resolve('./runtime/i18n')
      const enFile = existsSync(resolve('./runtime/i18n/locales/en.js'))
        ? 'locales/en.js'
        : 'locales/en.ts'

      nuxt.hook('i18n:registerModule', (register) => {
        register({
          langDir: i18nDir,
          locales: [
            {
              code: 'en',
              file: enFile,
            },
          ],
        })
      })
    }
  },
})

export default module
