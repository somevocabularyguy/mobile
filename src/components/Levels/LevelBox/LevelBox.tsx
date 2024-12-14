import styles from './LevelBox.styles.js';
import React from 'react';

import { View, Pressable, Text } from 'react-native';
import { LevelArray } from '@/components/molecules';

import { useAppDispatch } from '@/store/store';
import { updateVisibleLevelSectionKey } from '@/store/uiSlice';

import { LevelKey } from '@/types';

const LevelBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const levelKeys: LevelKey[] = ['easy', 'medium', 'hard', 'expert', 'custom']; 

  const handleLevelSectionSelect = (levelKey: LevelKey) => {
    dispatch(updateVisibleLevelSectionKey(levelKey))
  }

  return (
    <View style={styles.levelMap}>
      {levelKeys.map(levelKey => {
        return (
          <React.Fragment key={levelKey}>
            <Pressable 
              style={styles.levelButton}
              onPress={() => handleLevelSectionSelect(levelKey)}
            >
              <Text style={styles.levelButtonText}>{levelKey}</Text>
            </Pressable>
            <LevelArray levelKey={levelKey} />
          </React.Fragment>
        )
      })}
    </View>
  )
}

export default LevelBox;