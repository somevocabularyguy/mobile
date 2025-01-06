import styles from './Levels.styles.js';
import React from 'react';

import { View, Pressable, Text } from 'react-native';

import { updateIsRandom } from '@/store/wordSlice';
import { updateIsLevelsVisible } from '@/store/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { ArrowIcon, InfoIcon } from '@/assets/icons';

import LevelBox from './LevelBox';
import LevelWords from './LevelWords';

import { useCustomTranslation } from '@/hooks';

const Levels: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Levels');

  const isRandom = useAppSelector(state => state.word.isRandom);
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

  const practiceButtonStyle = [styles.randomToggle, isRandom ? {} : styles.randomToggleActive]; 
  const randomButtonStyle =  [styles.randomToggle, isRandom ? styles.randomToggleActive : {}];

  const handleToggleRandom = (key: 'practice' | 'random') => {
    if (key === 'practice' && isRandom) {
      dispatch(updateIsRandom(false));
    } else if (key === 'random' && !isRandom) {
      dispatch(updateIsRandom(true));
    }
  }

  return (
    <>
      <View style={levelsContainerStyle}>

        <LevelWords />

        <Text style={styles.checkedLevelAmountText}>{`${checkedLevelAmount} ${t('levelsSelectedText')}`}</Text>

        <LevelBox />

        <View style={styles.randomToggleContainer}>
          <Pressable style={styles.infoIconContainer}>
            <InfoIcon width={28} height={28} style={styles.infoIcon} /> 
          </Pressable>

          <Pressable style={practiceButtonStyle} onPress={() => handleToggleRandom('practice')}>
            <Text style={styles.randomnessButtonText}>{t('BottomStrip.practiceButtonText')}</Text>
          </Pressable>

          <Pressable style={randomButtonStyle} onPress={() => handleToggleRandom('random')}>
            <Text style={styles.randomnessButtonText}>{t('BottomStrip.randomButtonText')}</Text>
          </Pressable>
        </View>

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