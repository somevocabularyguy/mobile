import styles from './ProgressRadios.styles.js';
import { useState } from 'react';

import { Word, WordData } from '@/types';
import { highlightSubtext } from '@/utils/tsxUtils';

import { Text, FlatList, Pressable, View, TextInput } from 'react-native'; 

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  wordsMap: Map<string, Word>;
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressRadios: React.FC<ProgressRadiosProps> = ({ wordsMap, selectedWordId, setSelectedWordId }) => {

  const wordsData = useAppSelector(state => state.userData.userData.wordsData);

  const radioTextButtonStyle = (wordId: string) => {
    return [
      styles.radioTextButton,
      wordId === selectedWordId ? styles.radioTextButtonActive : {}
    ];
  }

  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={styles.radioContainer}>
      <TextInput 
        // style={styles.search}
        placeholder="Search for word..."
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
      <FlatList
        data={wordsData}
        renderItem={({ item }: { item: WordData }) => {
          const wordObject = wordsMap.get(item.id);
          if (!wordObject?.id) return null;

          const wordName = highlightSubtext(wordObject.word, searchValue);
          if (!wordName) return null;

          return (
            <Pressable 
              style={radioTextButtonStyle(wordObject.id)} 
              onPress={() => setSelectedWordId(wordObject.id)}
            >
              <Text style={styles.radioText}>{wordName}</Text>
            </Pressable>
          )
        }}
        keyExtractor={(item: WordData) => `progressRadioText${item.id}`}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={styles.notFound}>No Progress Data Found!</Text>
        )}
      />
    </View>
  )
}

export default ProgressRadios;