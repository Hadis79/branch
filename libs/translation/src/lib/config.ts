import i18n from 'i18next';
import { initReactI18next, useTranslation, Trans } from 'react-i18next';

import en from './locales/en';
import fa from './locales/fa';

export const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
} as const;

// const deepResources = JSON.parse(JSON.stringify(resources));

i18n.use(initReactI18next).init({
  resources,
  lng: 'fa',
  fallbackLng: 'fa',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // debug: true,
});

export function changeLanguage(locale: string) {
  i18n.changeLanguage(locale);
}

export function loadTr(params: any) {
  // console.log('params', deepResources.fa.translation);
  i18n.removeResourceBundle('en', 'translation');
  i18n.removeResourceBundle('fa', 'translation');
  // i18n.addResourceBundle('en', 'translation', deepResources.en.translation);
  // i18n.addResourceBundle('fa', 'translation', deepResources.fa.translation);
  i18n.addResourceBundle('en', 'translation', en);
  i18n.addResourceBundle('fa', 'translation', fa);
  i18n.addResourceBundle('en', 'translation', params.en, true);
  i18n.addResourceBundle('fa', 'translation', params.fa, true);
  i18n.loadResources();
  // console.log('i18n en', i18n.getResourceBundle('en', 'translation'));
  // console.log('i18n fa', i18n.getResourceBundle('fa', 'translation'));
}

export { useTranslation as useTr, Trans as Tr, i18n as i18nBase };
