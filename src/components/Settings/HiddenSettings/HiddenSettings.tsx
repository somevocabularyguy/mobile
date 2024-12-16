import styles from './HiddenSettings.styles.js';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeHiddenWordId } from '@/store/userDataSlice';
import { updateIsHiddenSettingsVisible } from '@/store/settingsUiSlice';

import { Text, View, TextInput, FlatList } from 'react-native';
import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';
import { highlightSubtext } from '@/utils/tsxUtils';

const HiddenSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.HiddenCustomSettings.HiddenSettings");

  const dispatch = useAppDispatch();

  const words = useAppSelector(state => state.data.words);
  const userData = useAppSelector(state => state.userData.userData);

  const hiddenWordIdsSet = new Set(userData.hiddenWordIds);

  const [hiddenSearchValue, setHiddenSearchValue] = useState('');

  const hiddenWords = words.filter(wordObject => hiddenWordIdsSet.has(wordObject.id));

  const hiddenWordsFiltered = hiddenWords.filter(wordObject => wordObject.word.indexOf(hiddenSearchValue) !== -1)


  const handleRemoveHiddenWord = (wordId: string) => {
    dispatch(removeHiddenWordId(wordId));
  }

  const isHiddenSettingsVisible = useAppSelector(state => state.settingsUi.isHiddenSettingsVisible);

  const sectionStyle = [
    styles.section, 
    isHiddenSettingsVisible ? styles.sectionVisible : {}
  ];

  const handleToggleSection = () => {
    dispatch(updateIsHiddenSettingsVisible(!isHiddenSettingsVisible))
  }

  return (
    <View>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t("labelText")}
        isVisible={isHiddenSettingsVisible} 
      />
      
      <View style={sectionStyle}>

        <View style={styles.container}>
          <Text style={styles.label}>{t("removeHiddenLabel")}</Text>
          <TextInput 
            style={styles.search}
            placeholder={t("placeholder")}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={hiddenSearchValue}
            onChangeText={text => setHiddenSearchValue(text)}
          />
          <FlatList
            style={styles.wordsContainer}
            data={hiddenWordsFiltered}
            renderItem={({ item }) => {
              const highlightedWord = highlightSubtext(item.word, hiddenSearchValue)
              return (
                <View style={styles.wordContainer}>
                  <Text style={styles.wordText}>{highlightedWord}</Text>
                  <DeleteIcon onClick={() => handleRemoveHiddenWord(item.id)} style={styles.deleteIcon} />
                </View> 
              )
            }}
            keyExtractor={item => 'hidden' + item.id}
            numColumns={1}
            ListEmptyComponent={() => (
              hiddenWords.length ?
                <Text style={styles.notFoundText}>{t("noResultText")}</Text>
                : <Text style={styles.notFoundText}>{t("noHiddenWordsText")}</Text>
            )}
          />
        </View>

      </View>
    </View>
  )
}

export default HiddenSettings;