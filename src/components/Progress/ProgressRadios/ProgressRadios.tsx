import styles from './ProgressRadios.styles.js';
import { useState } from 'react';

import { WordData } from '@/types';
import { highlightSubtext } from '@/utils/tsxUtils';

import { useCustomTranslation } from '@/hooks';

import { Text, FlatList, Pressable, View, TextInput } from 'react-native'; 

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressRadios: React.FC<ProgressRadiosProps> = ({ selectedWordId, setSelectedWordId }) => {

  const t = useCustomTranslation("Progress.ProgressRadios");

  const [searchValue, setSearchValue] = useState('');
  const userData = useAppSelector(state => state.userData.userData); 
  const wordsData = userData.wordsData;

  const wordsLanguage = userData.languageArray[0];
  const wordResources = useAppSelector(state => state.language.wordResources); 

  const filteredWordsData = wordsData.filter(wordData => (
    wordResources[wordsLanguage][wordData.id].word.includes(searchValue)
  ));

  const radioTextButtonStyle = (wordId: string) => {
    return [
      styles.radioTextButton,
      wordId === selectedWordId ? styles.radioTextButtonActive : {}
    ];
  }

  return (
    <View style={styles.radioContainer}>
      <TextInput 
        // style={styles.search}
        placeholder={t("searchPlaceholder")}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
      />
      <FlatList
        data={filteredWordsData}
        renderItem={({ item }: { item: WordData }) => {
          const word = wordResources[wordsLanguage][item.id].word;

          const wordName = highlightSubtext(word, searchValue);
          if (!wordName) return null;

          return (
            <Pressable 
              style={radioTextButtonStyle(item.id)} 
              onPress={() => setSelectedWordId(item.id)}
            >
              <Text style={styles.radioText}>{wordName}</Text>
            </Pressable>
          )
        }}
        keyExtractor={(item: WordData) => `progressRadioText${item.id}`}
        numColumns={2}
        ListEmptyComponent={() => (
          wordsData.length ? 
            <Text style={styles.notFound}>{t("noProgress")}</Text>
            : <Text style={styles.notFound}>{t("noProgress")}</Text>
        )}
      />
    </View>
  )
}

export default ProgressRadios;