import styles from './CustomSettings.styles.js';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeCustomWordId } from '@/store/userDataSlice';
import { updateIsCustomSettingsVisible } from '@/store/settingsUiSlice';

import { Text, View, TextInput, FlatList } from 'react-native';
import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';
import { highlightSubtext } from '@/utils/tsxUtils';

const CustomSettings: React.FC = () => {
  const { t } = useCustomTranslation("Settings.HiddenCustomSettings.CustomSettings");

  const dispatch = useAppDispatch();

  const words = useAppSelector(state => state.data.words);
  const userData = useAppSelector(state => state.userData.userData);

  const customWordIdsSet = new Set(userData.customWordIds);

  const [customSearchValue, setCustomSearchValue] = useState('');

  const customWords = words.filter(wordObject => customWordIdsSet.has(wordObject.id));

  const customWordsFiltered = customWords.filter(wordObject => wordObject.word.indexOf(customSearchValue) !== -1)

  const handleRemoveCustomWord = (wordId: string) => {
    dispatch(removeCustomWordId(wordId));
  }

  const isCustomSettingsVisible = useAppSelector(state => state.settingsUi.isCustomSettingsVisible);

  const customSectionStyle = [
    styles.section, 
    isCustomSettingsVisible ? styles.sectionVisible : {}
  ];

  const handleToggleSection = () => {
    dispatch(updateIsCustomSettingsVisible(!isCustomSettingsVisible))
  }

  return (
    <View>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t("labelText")}
        isVisible={isCustomSettingsVisible} 
      />
      
      <View style={customSectionStyle}>

        <View style={styles.container}>
          <Text style={styles.label}>{t("removeCustomLabel")}</Text>
          <TextInput 
            style={styles.search}
            placeholder={t("placeholder")}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={customSearchValue}
            onChangeText={text => setCustomSearchValue(text)}
          />
          <FlatList
            style={styles.wordsContainer}
            data={customWordsFiltered}
            renderItem={({ item }) => {
              const highlightedWord = highlightSubtext(item.word, customSearchValue)
              return (
                <View style={styles.wordContainer}>
                  <Text style={styles.wordText}>{highlightedWord}</Text>
                  <DeleteIcon onClick={() => handleRemoveCustomWord(item.id)} style={styles.deleteIcon} />
                </View> 
              )
            }}
            keyExtractor={item => 'custom' + item.id}
            numColumns={1}
            ListEmptyComponent={() => (
              customWords.length ?
                <Text style={styles.notFoundText}>{t("noResultText")}</Text>
                : <Text style={styles.notFoundText}>{t("noCustomWordsText")}</Text>
            )}
          />
        </View>

      </View>
    </View>
  )
}

export default CustomSettings;