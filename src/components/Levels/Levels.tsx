import styles from './Levels.styles.js';
import React from 'react';

import { View, Pressable, Text } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateIsLevelsVisible } from '@/store/uiSlice';

import { ArrowIcon } from '@/assets/icons';

import LevelBox from './LevelBox';
import LevelWords from './LevelWords';

import { useCustomTranslation } from '@/hooks';

const Levels: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Levels');

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

        <Text style={styles.checkedLevelAmountText}>{`${checkedLevelAmount} ${t('levelsSelectedText')}`}</Text>

        <LevelBox />

      </View>

      <Pressable style={levelsToggleStyle} onPress={toggleLevels}>
        {isLevelsVisible ? (
          <View style={styles.levelsActiveIconContainer}>
            <ArrowIcon width={64} height={64} />
            <ArrowIcon width={64} height={64} />
            <ArrowIcon width={64} height={64} />
          </View>
        ) : (
          <>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#e8eaed', textAlign: 'center' }}>LV</Text>
          </>
        )}
      </Pressable>
    </>
  )
}

export default Levels;