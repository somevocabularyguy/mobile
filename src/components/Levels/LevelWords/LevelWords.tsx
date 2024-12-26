import React from 'react';
import styles from './LevelWords.styles.js';

import { Text, View } from 'react-native';
import { TText } from '@/components/atoms';

import { useCustomTranslation } from '@/hooks';
import { extractParts } from '@/utils/generalUtils';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {
 const t = useCustomTranslation('Levels.LevelWords');

  const words = useAppSelector(state => state.word.words);
  const lastSelectedLevel = useAppSelector(state => state.appState.lastSelectedLevel);

  let lastSelectedLevelIds: string[] = [];
  if (lastSelectedLevel) {
    const filteredWordObjects = words.filter(wordObject => wordObject.levelName === lastSelectedLevel)
    lastSelectedLevelIds = filteredWordObjects.map(wordObject => wordObject.id);
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
        {lastSelectedLevelIds.map((id, index) => {
          return (
            <View
              style={styles.levelWordContainer}
              key={id + index} 
            >
              <TText 
                wordId={id}
                dataKey="word"
                style={styles.levelWord}
                adjustsFontSizeToFitParam
                numberOfLinesNumber={1}
                minimumFontScaleNumber={0.5}
              />
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default LevelWords;