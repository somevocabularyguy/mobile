import styles from './HiddenSettings.styles.js';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeHiddenWordId } from '@/store/userDataSlice';
import { updateIsHiddenSettingsVisible } from '@/store/settingsUiSlice';

import { Text, View, TextInput, FlatList } from 'react-native';
import { DeleteIcon } from '@/assets/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

const HiddenSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.HiddenSettings");

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

  const isHiddenSettingsVisible = useAppSelector(state => state.settingsUi.isHiddenSettingsVisible);

  const hiddenCustomSectionClassName = [
    styles.hiddenCustomSection, 
    isHiddenSettingsVisible ? styles.hiddenCustomSectionVisible : {}
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
      
      <View style={hiddenCustomSectionClassName}>

        <View style={styles.hiddenCustomContainer}>
          <Text style={styles.hiddenCustomLabel}>{t("removeHiddenLabel")}</Text>
          <TextInput 
            style={styles.hiddenCustomSearch}
            placeholder={t("placeholder")}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={hiddenSearchValue}
            onChangeText={text => setHiddenSearchValue(text)}
          />
          <FlatList
            style={styles.hiddenCustomWordsContainer}
            data={hiddenWordsFiltered}
            renderItem={({ item }) => {
              const highlightedWord = highlightSubtext(item.word, hiddenSearchValue)
              return (
                <View style={styles.hiddenCustomWordContainer}>
                  <Text style={styles.hiddenCustomWordText}>{highlightedWord}</Text>
                  <DeleteIcon onClick={() => handleRemoveHiddenWord(item.id)} style={styles.hiddenCustomDeleteIcon} />
                </View> 
              )
            }}
            keyExtractor={item => 'hidden' + item.id}
            numColumns={1}
            ListEmptyComponent={() => (
              hiddenWords.length ?
                <Text style={styles.notFoundText}>{t("noWordsText")}</Text>
                : <Text style={styles.notFoundText}>{t("noHiddenWordsText")}</Text>
            )}
          />
        </View>

      </View>
    </View>
  )
}

export default HiddenSettings;