import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import eng from "./locales/eng.json"
import geo from "./locales/geo.json"

import LanguageDetector from "i18next-browser-languagedetector"

interface Translations {
  [page: string]: {
    [key: string]: string
  }
}

// flattens translation json, so it will be easier to use it
// example:
// settings page.theme // without it
// theme // with it
// may be removed letter to prevent conflicts
const flattenTranslations = (translations: Translations) => {
  const flattened: Record<string, string> = {}

  Object.keys(translations).forEach((page) => {
    Object.keys(translations[page]).forEach((key) => {
      flattened[key] = translations[page][key]
    })
  })

  return flattened
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "eng",
    fallbackLng: "eng",
    debug: true, // change to false

    resources: {
      eng: {
        translation: flattenTranslations(eng),
      },
      geo: {
        translation: flattenTranslations(geo),
      },
    },

    interpolation: {
      escapeValue: false,
    },
  })
