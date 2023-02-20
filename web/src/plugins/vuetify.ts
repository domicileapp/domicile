/**
 * Vuetify3 Plugin
 */
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'

// For test use. Do not include createVuetify()
// see https://next.vuetifyjs.com/en/features/treeshaking/
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Translations provided by Vuetify
import { en } from 'vuetify/locale'

// Misc
import { loadFonts } from './webfontloader'
loadFonts()

// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en },
  },
  theme: {
    defaultTheme: 'light',
  },
})

// Export for test
export { components, directives }
