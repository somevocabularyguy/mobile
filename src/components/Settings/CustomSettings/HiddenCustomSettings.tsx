import styles from './CustomSettings.styles.js';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeCustomWordId } from '@/store/userDataSlice';
import { updateIsCustomSettingsVisible } from '@/store/settingsUiSlice';

import { Text, View, TextInput, FlatList } from 'react-native';
import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

const CustomSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.CustomSettings");

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

  const highlightSubtext = (text: string, subtext: string) => {
    const index = text.indexOf(subtext);

    const before = text.slice(0, index);
    const match = text.slice(index, index + subtext.length);
    const after = text.slice(index + subtext.length);

    return (
      <Text>
        {before}
        <Text style={styles.highlightedSubtext}>{match}</Text>
        {after}
      </Text>
    );
  }; 

  const isCustomSettingsVisible = useAppSelector(state => state.settingsUi.isCustomSettingsVisible);

  const hiddenCustomSectionClassName = [
    styles.hiddenCustomSection, 
    isCustomSettingsVisible ? styles.hiddenCustomSectionVisible : {}
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
      
      <View style={hiddenCustomSectionClassName}>

        <View style={styles.hiddenCustomContainer}>
          <Text style={styles.hiddenCustomLabel}>{t("removeCustomLabel")}</Text>
          <TextInput 
            style={styles.hiddenCustomSearch}
            placeholder={t("placeholder")}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={customSearchValue}
            onChangeText={text => setCustomSearchValue(text)}
          />
          <FlatList
            style={styles.hiddenCustomWordsContainer}
            data={customWordsFiltered}
            renderItem={({ item }) => {
              const highlightedWord = highlightSubtext(item.word, customSearchValue)
              return (
                <View style={styles.hiddenCustomWordContainer}>
                  <Text style={styles.hiddenCustomWordText}>{highlightedWord}</Text>
                  <DeleteIcon onClick={() => handleRemoveCustomWord(item.id)} style={styles.hiddenCustomDeleteIcon} />
                </View> 
              )
            }}
            keyExtractor={item => 'custom' + item.id}
            numColumns={1}
            ListEmptyComponent={() => (
              customWords.length ?
                <Text style={styles.notFoundText}>{t("noWordsText")}</Text>
                : <Text style={styles.notFoundText}>{t("noCustomWordsText")}</Text>
            )}
          />
        </View>

      </View>
    </View>
  )
}

export default CustomSettings;