import styles from './Levels.styles.js';
import React from 'react';

import { View, Pressable, Text } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateIsLevelsVisible } from '@/store/uiSlice';

import { ArrowIcon } from '@/assets/icons';

import { LevelWords, LevelBox } from './';

const Levels: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);

  const toggleLevels = () => {
    dispatch(updateIsLevelsVisible(!isLevelsVisible))
  }

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const checkedLevelAmount = checkedLevels.length;

  const levelsContainerStyle = [
    styles.levelsContainer,
    isLevelsVisible ? styles.levelsContainerVisible : {}
  ]

  const levelsToggleStyle = [
    styles.levelsToggle,
    isLevelsVisible ? styles.levelsToggleActive : {}
  ]

  return (
    <>
      <View style={levelsContainerStyle}>

        <LevelWords />

        <Text style={styles.checkedLevelAmountText}>{checkedLevelAmount + ' Levels Selected'}</Text>

        <LevelBox />

      </View>

      <Pressable style={levelsToggleStyle} onPress={toggleLevels}>
        {isLevelsVisible ? (
          <View style={styles.levelsActiveIconContainer}>
            <ArrowIcon width={84} height={84} />
            <ArrowIcon width={84} height={84} />
            <ArrowIcon width={84} height={84} />
          </View>
        ) : (
          <>
            <ArrowIcon style={styles.levelsSingleIcon} width={84} height={84} />
          </>
        )}
      </Pressable>
    </>
  )
}

export default Levels;