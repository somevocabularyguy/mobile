import styles from './WordsLanguageSelect.styles.js';
import { OptionObject } from '@/types';
import React, { useState, useEffect } from 'react';

import { updateWords } from '@/store/wordSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsWordsLanguageSelectVisible } from '@/store/languageUiSlice'; 

import { wordResourceKeys } from '@/i18nConfig';

import { useCustomTranslation } from '@/hooks';

import { loadWordResources } from '@/utils/dataUtils';

import SectionLabel from '../SectionLabel';
import { Text, Pressable, View, ScrollView } from 'react-native';

import { InfoIcon, ResetIcon } from '@/assets/icons';

const WordsLanguageSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const tL = useCustomTranslation('Language');
  const t = useCustomTranslation('Language.WordsLanguageSelect');

  const isWordsLanguageSelectVisible = useAppSelector(state => state.languageUi.isWordsLanguageSelectVisible);
  const languageArray = useAppSelector(state => state.userData.userData.languageArray);

  const handleToggleSection = () => {
    dispatch(updateIsWordsLanguageSelectVisible(!isWordsLanguageSelectVisible));
  }

  const mainSectionStyle = [styles.mainSection, 
    isWordsLanguageSelectVisible ? styles.mainSectionVisible : {}]

  const options: OptionObject[] = Object.keys(wordResourceKeys).map(language => {
    return  { key: language, text: tL(language) };
  })

  const [isChanged, setIsChanged] = useState(false);

  const [currentSelection, setCurrentSelection] = useState<OptionObject>(() =>  
    options.filter(option => option.key === languageArray[0])[0]
  )

  useEffect(() => {
    setCurrentSelection(options.filter(option => option.key === languageArray[0])[0])
  }, [languageArray])

  const returnOptionStyle = (key: string) => {
    return [
      styles.languageOption, 
      key === currentSelection.key ? styles.languageOptionSelected : {}
    ];
  }

  const handleReset = () => {
    setCurrentSelection(options.filter(option => option.key === languageArray[0])[0])
  }

  const handleApply = async () => {
    if (currentSelection.key === languageArray[0]) return;

    const { requestedWords } = loadWordResources(languageArray, languageArray, currentSelection.key)

    if (requestedWords) {
      dispatch(updateWords(requestedWords))
    }
  }

  useEffect(() => {
    if (currentSelection.key !== languageArray[0]) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [currentSelection])

  const resetIconContainerStyle = [styles.resetIconContainer, isChanged ? styles.resetIconVisible : {}];
  const applyButtonStyle = [styles.applyButton, isChanged ? { backgroundColor: '#f2b500' } : {}];

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t('label')} 
        isVisible={isWordsLanguageSelectVisible}
      />
      <View style={mainSectionStyle}>
        <View style={styles.currentContainer}>
          <Pressable style={styles.infoIconContainer}>
            <InfoIcon width={28} height={28} style={styles.infoIcon} /> 
          </Pressable>
          <View style={styles.currentLanguage}>
            <Text 
              adjustsFontSizeToFit 
              style={styles.currentLanguageText}
            >{currentSelection.text}</Text>
          </View>

          <Pressable style={styles.resetIconContainer} onPress={handleReset}>
            <ResetIcon fill="#e8eaed" width={28} height={28} style={resetIconContainerStyle} /> 
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.optionsContainerContent} style={styles.optionsContainer}>
          {options.map((optionObject, index) => (
            <Pressable
              key={optionObject.key + index}
              onPress={() => setCurrentSelection(optionObject)}
              style={returnOptionStyle(optionObject.key)}
            >
              <Text style={{ color: 'white' }}>{optionObject.text}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable style={applyButtonStyle} onPress={handleApply}>
          <Text style={styles.applyButtonText}>{t('button')}</Text>
        </Pressable>
      </View>
    </>
  )
}

export default WordsLanguageSelect;