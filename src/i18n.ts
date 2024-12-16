import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import resources from '@/locales';
import storage from '@/storage';

const initI18n = async () => {
  let savedLanguage = await storage.getItem("language") as string | null;

  savedLanguage = savedLanguage || Localization.getLocales()[0].languageCode || 'en';

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;


