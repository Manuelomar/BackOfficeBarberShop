import i18next from 'i18next'
import enTranslation from 'zod-i18n-map/locales/en/zod.json'
import { makeZodI18nMap } from 'zod-i18n-map'
import { z } from 'zod'
import { getLocale } from '@/locales/dictionary'



const en = i18next.createInstance()
en.init({
  lng: 'en',
  resources: {
    en: { zod: enTranslation },
  },
})
const es = i18next.createInstance()
en.init({
  lng: 'es',
  resources: {
    es: { zod: enTranslation },
  },
})


const zodMap = {
  en: makeZodI18nMap({ t: en.t }),
  es: makeZodI18nMap({ t: es.t }),
  
}

// Set zod error map by user's locale.
// The error message should be translated based on user's locale.
z.setErrorMap((err, ctx) => zodMap[getLocale()](err, ctx))

export { z }
