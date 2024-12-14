import styles from './Progress.styles.js';

import { useState } from 'react';
import { Word, WordData } from '@/types';
import { View } from 'react-native';

import { WordProgressDisplay, ProgressRadios, GeneralProgress } from './';

import { useAppSelector } from '@/store/store';

const Progress: React.FC = () => {

  const [selectedWordId, setSelectedWordId] = useState('')

  const userData = useAppSelector(state => state.userData.userData);
  const wordsData = userData.wordsData;
  const wordsDataMap = new Map<string, WordData>();
  for (let i = 0; i < wordsData.length; i++) {
    wordsDataMap.set(wordsData[i].id, wordsData[i]);
  }

  const words = useAppSelector(state => state.data.words);
  const wordsMap = new Map<string, Word>();

  for (let i = 0; i < words.length; i++) {
    wordsMap.set(words[i].id, words[i]);
  }

  if (!selectedWordId && wordsData[0]) {
    setSelectedWordId(wordsData[0].id);
  }

  const selectedWordData = wordsDataMap.get(selectedWordId);
  const selectedWordObject = wordsMap.get(selectedWordId);
  
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <WordProgressDisplay selectedWordData={selectedWordData} selectedWordObject={selectedWordObject} />
        <ProgressRadios wordsMap={wordsMap} selectedWordId={selectedWordId} setSelectedWordId={setSelectedWordId} />
        <GeneralProgress />
      </View>
    </View>
  )
}

export default Progress;