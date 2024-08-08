import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEN from '../src/locales/en/commonEN.json'
import commonVI from '../src/locales/vi/commonVI.json'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: { translation: commonEN },
  vi: { translation: commonVI }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    }
  })

export default i18n
