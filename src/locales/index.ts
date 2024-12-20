interface TranslationFilesType {
  [key: string]: {
    [key: string]: () => any;
  }
}

const appTranslations: TranslationFilesType = { // static translations like button, label
  en: {
    app: () => require('./en/app.json'),
  },
  tr: {
    app: () => require('./tr/app.json'),
  },
};

const wordTranslations: TranslationFilesType = { // translations of content, vocabulary words
  en: {
    en: () => require('./words/en/en.json'),
    tr: () => require('./words/en/tr.json'),
    ru: () => require('./words/en/ru.json'),
  }
}

const loadTranslation = (language: string, namespace: string, isWords?: boolean): any => {
  if (isWords) {
    return wordTranslations[language][namespace]()
  } else {
    return appTranslations[language][namespace]()
  }
};

export default loadTranslation;