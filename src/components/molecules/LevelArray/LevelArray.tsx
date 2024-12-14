import styles from './LevelArray.styles.js';
import { FlatList, View, Text } from 'react-native';
import { LevelKey } from '@/types';

import { Level } from '@/components/atoms';

import { useAppSelector } from '@/store/store';


interface LevelArrayProps {
  levelKey: LevelKey;
}

const LevelArray: React.FC<LevelArrayProps> = ({ levelKey }) => {
  const levels = useAppSelector(state => state.appState.levels);
  const visibleLevelSectionKey = useAppSelector(state => state.ui.visibleLevelSectionKey);

  const filteredLevels = levels.filter(levelObject => levelObject.levelName.startsWith(levelKey));

  const levelArrayStyle = [
    styles.levelArray,
    visibleLevelSectionKey === levelKey ? {} : styles.hidden
  ];

  return (
    <FlatList
      style={levelArrayStyle}
      data={filteredLevels}
      renderItem={({ item }) => (
        <Level 
          levelName={item.levelName} 
          colorValue={item.colorValue} 
        />
      )}
      keyExtractor={item => item.levelName}
      numColumns={6}
      ListEmptyComponent={() => {
        if (levelKey === 'custom') {
          return (
            <View style={styles.customEmptyContainer}>
              <Text style={styles.customEmptyText}>No Custom Words Selected</Text>
            </View>
          )
        }
      }}
    />
  )
}

export default LevelArray;