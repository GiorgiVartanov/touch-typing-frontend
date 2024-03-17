import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import geo from "./locales/geo.json"

import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "eng",
    fallbackLng: "eng",
    debug: import.meta.env.MODE === "development" ? true : false,

    resources: {
      eng: {
        translation: en,
      },
      geo: {
        translation: geo,
      },
    },

    interpolation: {
      escapeValue: false,
    },
  })
