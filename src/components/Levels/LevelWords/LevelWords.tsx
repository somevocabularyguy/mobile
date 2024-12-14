import React from 'react';
import styles from './LevelWords.styles.js';

import { Text, View } from 'react-native';

import { useCustomTranslation } from '@/hooks';
import { extractParts } from '@/utils/generalUtils';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {
 const t = useCustomTranslation('Levels.LevelWords');

  const words = useAppSelector(state => state.data.words);
  const lastSelectedLevel = useAppSelector(state => state.appState.lastSelectedLevel);

  let lastSelectedLevelWords: string[] = [];
  if (lastSelectedLevel) {
    const filteredWordObjects = words.filter(wordObject => wordObject.levelName === lastSelectedLevel)
    lastSelectedLevelWords = filteredWordObjects.map(wordObject => wordObject.word);
  }

  const returnLastSelectedLevelText = () => {
    let lastSelectedLevelText = '';
    if (lastSelectedLevel) {
      const { string, number } = extractParts(lastSelectedLevel);
      if (string) {
        lastSelectedLevelText =  t(string) + number;
      }
    }
    return lastSelectedLevelText;
  }

  return (
    <View style={styles.levelWordsContainer}>
      <Text style={styles.levelWordsLabel}>{returnLastSelectedLevelText()}</Text>
      <View style={styles.levelWordsGrid}>
        {lastSelectedLevelWords.map((levelWord, index) => {
          return (
            <View
              style={styles.levelWordContainer}
              key={levelWord + index} 
            >
              <Text 
                style={styles.levelWord}
                adjustsFontSizeToFit
                numberOfLines={1}
                minimumFontScale={0.5}
              >{levelWord}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default LevelWords;