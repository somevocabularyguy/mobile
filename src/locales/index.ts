interface TranslationFilesType {
  [key: string]: () => any;
}

const appTranslations: TranslationFilesType = {
  en: () => require('./en.json'),
  tr: () => require('./tr.json'),
};

const loadTranslation = (language: string): any => {
  return appTranslations[language]()
};

export default loadTranslation;