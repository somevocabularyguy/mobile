import { WordResources } from '@/types';
import { allWordResourcesMap, allWordsMap } from '@/words'

const loadLanguageResources = (languageArray: string[]) => {
  const wordLanguage = languageArray[0];
  const initialWords = allWordsMap[wordLanguage];
  const wordResources: WordResources = {};
  languageArray.forEach(language => {
   wordResources[language] = allWordResourcesMap[wordLanguage][language]
  })
  return { initialWords, wordResources }
}

export { loadLanguageResources };