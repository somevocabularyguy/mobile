import { useState } from 'react';
import { TText } from '@/components/atoms';
import styles from './HiddenSettings.styles.js';
import { Text, View, TextInput, FlatList } from 'react-native';

import { removeHiddenWordId } from '@/store/userDataSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsHiddenSettingsVisible } from '@/store/settingsUiSlice';

import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

const HiddenSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.HiddenCustomSettings.HiddenSettings");

  const dispatch = useAppDispatch();

  const [hiddenSearchValue, setHiddenSearchValue] = useState('');

  const userData = useAppSelector(state => state.userData.userData);
  const wordResources = useAppSelector(state => state.language.wordResources);

  const hiddenWordIds = userData.hiddenWordIds;
  const wordsLanguage = userData.languageArray[0];
  if (!Object.keys(wordResources)) return;
  const filteredHiddenWordIds = hiddenWordIds.filter(wordId => 
    wordResources[wordsLanguage][wordId].word.includes(hiddenSearchValue))

  const handleRemoveHiddenWord = (wordId: string) => {
    if (wordId) dispatch(removeHiddenWordId(wordId));
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
            data={filteredHiddenWordIds}
            renderItem={({ item }) => (
              <View style={styles.wordContainer}>
                <TText 
                  wordId={item} 
                  dataKey="word" 
                  style={styles.wordText}
                  highlightKey={hiddenSearchValue}
                />
                <DeleteIcon onPress={() => handleRemoveHiddenWord(item)} style={styles.deleteIcon} />
              </View> 
            )}
            keyExtractor={item => 'hidden' + item}
            numColumns={1}
            ListEmptyComponent={() => (
              hiddenWordIds.length ?
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