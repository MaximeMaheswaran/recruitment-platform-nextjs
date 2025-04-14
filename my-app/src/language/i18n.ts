import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationFR from '../../public/locales/fr/common.json';
import translationEN from '../../public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationFR },
      en: { translation: translationEN },
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

