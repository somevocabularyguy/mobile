import { WordResources, Word } from '@/types';
import { allWordResourcesMap, allWordsMap } from '@/words'

const loadWordResources = (oldLanguageArray: string[], newLanguageArray: string[]) => {

  let wordsLanguage: string = newLanguageArray[0];
  let newWordsLanguage: string | null = null;
  let languageDifferenceArray: string[] = [];

  if (newLanguageArray[0] !== oldLanguageArray[0]) {
    newWordsLanguage = newLanguageArray[0];
  }

  newLanguageArray.forEach(language => {
    if (!oldLanguageArray.includes(language)) {
      languageDifferenceArray.push(language);
    }
  })

  let requestedWords: Word[] | null = null;
  if (newWordsLanguage) {
    requestedWords = allWordsMap[newWordsLanguage]
  }

  let requestedWordResources: WordResources | null = {};
  if (languageDifferenceArray?.length) {
    languageDifferenceArray.forEach(language => {
      if (requestedWordResources) {
        requestedWordResources[language] = allWordResourcesMap[wordsLanguage][language];
      }
    })
  } else {
    requestedWordResources = null;
  }

  return { requestedWords, requestedWordResources }
}

const loadWordResourcesInitial = (languageArray: string[]) => {
  const wordsLanguage = languageArray[0];

  const initialWords = allWordsMap[wordsLanguage];

  let initialWordResources: WordResources = {};
  languageArray.forEach(language => {
    if (initialWordResources) {
      initialWordResources[language] = allWordResourcesMap[wordsLanguage][language];
    }
  })

  return { initialWords, initialWordResources };
}

export { loadWordResources, loadWordResourcesInitial };