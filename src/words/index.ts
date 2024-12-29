import { Word, WordsObject } from '@/types';
 
interface AllWordResourcesMap {
  [key: string]: {
    [key: string]: WordsObject;
  }
}

const allWordResourcesMap: AllWordResourcesMap = {
  en: {
    en: require('./en/en.json'),
    ja: require('./en/ja.json'),
    ru: require('./en/ru.json'),
    tr: require('./en/tr.json'),
    zh: require('./en/zh.json'),
  }
}

interface AllWordsMap {
  [key: string]: Word[];
}

const allWordsMap: AllWordsMap = {
  en: require('./en/en-words')
}

export { allWordResourcesMap, allWordsMap };