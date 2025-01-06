import { useState } from 'react';
import styles from './CustomSettings.styles.js';
import { TText } from '@/components/atoms';
import { Text, View, TextInput, FlatList } from 'react-native';


import { removeCustomWordId } from '@/store/userDataSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsCustomSettingsVisible } from '@/store/settingsUiSlice';

import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

const CustomSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.HiddenCustomSettings.CustomSettings");

  const dispatch = useAppDispatch();
  const [customSearchValue, setCustomSearchValue] = useState('');

  const userData = useAppSelector(state => state.userData.userData);
  const wordResources = useAppSelector(state => state.language.wordResources);
  const customWordIds = userData.customWordIds;
  const wordsLanguage = userData.languageArray[0];

  const customWordIdsFiltered = customWordIds.filter(wordId => 
    wordResources[wordsLanguage][wordId].word.includes(customSearchValue))


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
            data={customWordIdsFiltered}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <View style={styles.wordContainer}>
                <TText 
                  wordId={item} 
                  dataKey="word" 
                  style={styles.wordText}
                  highlightKey={customSearchValue}
                />
                <DeleteIcon onPress={() => handleRemoveCustomWord(item)} style={styles.deleteIcon} />
              </View> 
            )}
            keyExtractor={item => 'custom' + item}
            numColumns={1}
            ListEmptyComponent={() => (
              customWordIds.length ?
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