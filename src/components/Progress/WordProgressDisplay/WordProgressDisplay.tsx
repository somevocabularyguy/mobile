import styles from './WordProgressDisplay.styles.js';

import { WordData } from '@/types';
import { Text, View } from 'react-native';
import { TText } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';


interface SelectedWordDisplayProps {
  selectedWordData: WordData | undefined;
}

const WordProgressDisplay: React.FC<SelectedWordDisplayProps> = ({ selectedWordData }) => {

  const t = useCustomTranslation();

  if (!selectedWordData) {
    return (
      <View style={styles.container}>
        <Text style={styles.notSelectedText}>{t('noWordSelected')}</Text>
      </View>
    );
  }

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
      <TText style={styles.dataText} wordId={selectedWordData.id} dataKey="word" />
      <Text style={styles.dataText}>Times Seen: {notShownSeen}</Text>
      <Text style={styles.dataText}>Times Details Shown: {shownSeen}</Text>
      <Text style={styles.dataText}>Total Time Spent On Word: {timeSpentText}</Text>
    </View>
  )
}

export default WordProgressDisplay;