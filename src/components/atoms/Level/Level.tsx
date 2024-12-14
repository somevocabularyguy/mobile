import styles from './Level.styles.js';
import { RGB } from '@/types';
import { Pressable, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { addCheckedLevel, removeCheckedLevel, updateLastSelectedLevel } from '@/store/appStateSlice';

import { extractParts } from '@/utils/generalUtils';

interface LevelProps {
  levelName: string;
  colorValue: RGB;
}

const Level: React.FC<LevelProps> = ({ levelName, colorValue }) => {
  const dispatch = useAppDispatch()

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const handleLevelChange = () => {
    dispatch(updateLastSelectedLevel(levelName))
    if (checkedLevels.includes(levelName)) {
      dispatch(removeCheckedLevel(levelName))
    } else {
      dispatch(addCheckedLevel(levelName))
    }
  }

  const levelStyle = [
    styles.level,
    checkedLevels.includes(levelName) ? styles.levelChecked : {}
  ];

  const innerSquareStyle = [
    styles.innerSquare,
    { backgroundColor: `rgb(${colorValue.r}, ${colorValue.g}, ${colorValue.b})` }
  ];

  const levelNumber = extractParts(levelName).number;

  return (
    <Pressable style={levelStyle} onPress={handleLevelChange}>
      <View style={innerSquareStyle}>
        <Text style={styles.innerSquareText}>{'lv' + levelNumber}</Text>
      </View>
    </Pressable>
  )
}

export default Level;