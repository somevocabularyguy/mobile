import styles from './Progress.styles.js';

import { useState } from 'react';
import { WordData } from '@/types';
import { View } from 'react-native';

import ProgressRadios from './ProgressRadios';
import WordProgressDisplay from './WordProgressDisplay';
import GeneralProgress from './GeneralProgress';

import { useAppSelector } from '@/store/store';

const Progress: React.FC = () => {

  const [selectedWordId, setSelectedWordId] = useState('')

  const wordsData = useAppSelector(state => state.userData.userData.wordsData);
  const wordsDataMap = new Map<string, WordData>();
  for (let i = 0; i < wordsData.length; i++) {
    wordsDataMap.set(wordsData[i].id, wordsData[i]);
  }

  if (!selectedWordId && wordsData[0]) {
    setSelectedWordId(wordsData[0].id);
  }

  const selectedWordData = wordsDataMap.get(selectedWordId);
  
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <WordProgressDisplay 
          selectedWordData={selectedWordData} 
        />          
        <ProgressRadios  
          selectedWordId={selectedWordId} 
          setSelectedWordId={setSelectedWordId} 
        />        
        <GeneralProgress />
      </View>
    </View>
  )
}

export default Progress;