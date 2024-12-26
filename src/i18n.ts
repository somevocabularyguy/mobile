import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import resourcesToBackend from 'i18next-resources-to-backend';

import loadTranslation from '@/locales';

export default async function initTranslations(
  locale: string,
  i18nInstance?: ReturnType<typeof createInstance>,
) {

  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  i18nInstance.use(
    resourcesToBackend(
      async (language: string) => (        
        loadTranslation(language)
      )
    )
  );

  await i18nInstance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
