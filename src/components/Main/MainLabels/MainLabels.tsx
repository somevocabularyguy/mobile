import { Text, View } from 'react-native';

import React from 'react';
import styles from './MainLabels.styles.js';

import { useAppSelector } from '@/store/store';

const MainLabels: React.FC = () => {

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const isShown = useAppSelector(state => state.word.isShown);


  return (
    <View style={styles.mainGrid}>
      <Text style={styles.wordLabel}>
        {displayWordObject?.word || (isRandom ? 'Random' : 'Fundamentally')}
      </Text>
      
      <View style={styles.shownTextContainer}>
        <Text style={styles.headLabel}>Definition:</Text>
        <View style={styles.dynamicLabel}>
          <Text style={styles.dynamicLabelItem}>
            {isShown && displayWordObject?.definition || ''}
          </Text> 
        </View>

        <Text style={styles.headLabel}>Example:</Text>
        <View style={styles.dynamicLabel}>
          <Text style={styles.dynamicLabelItem}>
            {isShown && displayWordObject?.example || ''}
          </Text> 
        </View>

        <Text style={styles.headLabel}>Synonyms:</Text>
        <View style={styles.arrayTextContainer}>
          {(displayWordObject && isShown) && 
            displayWordObject.synonyms.map((synonym, index, array) => {
              return (
                <React.Fragment key={synonym + index}>
                  <Text style={styles.arrayText}>{synonym}</Text>
                  {(array.length !== index + 1) && 
                    <Text style={styles.arrayText}>-</Text>}
                </React.Fragment>
              )
            })
          }
        </View>

        <Text style={styles.headLabel}>Antonyms:</Text>
        <View style={styles.arrayTextContainer}>
          {(displayWordObject && isShown) && 
            displayWordObject.antonyms.map((antonym, index, array) => {
              return (
                <React.Fragment key={antonym + index}>
                  <Text style={styles.arrayText}>{antonym}</Text>
                  {(array.length !== index + 1) && 
                    <Text style={styles.arrayText}>-</Text>}
                </React.Fragment>
              )
            })
          }
        </View>
      </View>
    </View>
  )
}

export default MainLabels;