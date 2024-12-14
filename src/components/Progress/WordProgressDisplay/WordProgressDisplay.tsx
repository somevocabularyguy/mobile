import styles from './WordProgressDisplay.styles.js';

import { Word, WordData } from '@/types';
import { Text, View } from 'react-native';

interface SelectedWordDisplayProps {
  selectedWordData: WordData | undefined;
  selectedWordObject: Word | undefined;
}

const WordProgressDisplay: React.FC<SelectedWordDisplayProps> = ({ selectedWordData, selectedWordObject }) => {

  if (!selectedWordData || !selectedWordObject) {
    return (
      <View style={styles.container}>
        <Text style={styles.notSelectedText}>No Word Is Selected!</Text>
      </View>
    );
  }

  const { word } = selectedWordObject;

  const { notShownTimeSpent, shownTimeSpent, notShownSeen, shownSeen } = selectedWordData;

  const timeSpent = shownTimeSpent + notShownTimeSpent;
  const minutes = Math.floor(timeSpent / 1000 * 60);
  const seconds = Math.floor(timeSpent / 1000) % 60;

  let timeSpentText = '';

  if (minutes) {
    timeSpentText += `${minutes} minutes`
  }
  if (seconds && minutes) {
    timeSpentText += ` and ${seconds} seconds`
  } else {
    timeSpentText += `${seconds} seconds`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dataText}>{word}</Text>
      <Text style={styles.dataText}>Times Seen: {notShownSeen}</Text>
      <Text style={styles.dataText}>Times Details Shown: {shownSeen}</Text>
      <Text style={styles.dataText}>Total Time Spent On Word: {timeSpentText}</Text>
    </View>
  )
}

export default WordProgressDisplay;