import styles from './OtherLanguagesSelect.styles.js';
import SectionLabel from '../SectionLabel';

import { OptionObject } from '@/types';
import React, { useState, useEffect } from 'react';

import { wordResourceKeys } from '@/i18nConfig';

import { Text, Pressable, View, ScrollView } from 'react-native';

import { areArraysEqual } from '@/utils/generalUtils';
import { loadWordResources } from '@/utils/dataUtils';

import { updateLanguageArray } from '@/store/userDataSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsLanguageVisible, updateIsOtherLanguagesSelectVisible } from '@/store/languageUiSlice'; 
import { addSingleWordResource, removeSingleWordResource } from '@/store/languageSlice'; 

import { useCustomTranslation } from '@/hooks';
import { InfoIcon, ResetIcon } from '@/assets/icons';

const OtherLanguagesSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const tL = useCustomTranslation('Language');
  const t = useCustomTranslation('Language.OtherLanguagesSelect');

  const languageArray = useAppSelector(state => state.userData.userData.languageArray);
  const isOtherLanguagesSelectVisible = useAppSelector(state => state.languageUi.isOtherLanguagesSelectVisible);

  const options: OptionObject[] = wordResourceKeys[languageArray[0]].map(language => {
    return { key: language, text: tL(language) }
  })

  const [isChanged, setIsChanged] = useState(false);

  const slicedLanguageArray = languageArray.slice(1)
  const [selectedObjectArray, setSelectedObjectArray] = useState(() => (
    slicedLanguageArray.map(language => (
      options.filter(optionObject => optionObject.key === language)[0]
    ))
  ));

  useEffect(() => {
    const slicedLanguageArray = languageArray.slice(1)
    setSelectedObjectArray(
      slicedLanguageArray.map(language => (
        options.filter(optionObject => optionObject.key === language)[0]
      ))
    );
  }, [languageArray])

  useEffect(() => {
    const objectKeys = selectedObjectArray.map(obj => obj.key);
    const newLanguageArray = [languageArray[0], ...objectKeys]
    setIsChanged(!areArraysEqual(languageArray, newLanguageArray));
  }, [selectedObjectArray])

  const handleToggleSection = () => {
    dispatch(updateIsOtherLanguagesSelectVisible(!isOtherLanguagesSelectVisible));
  }

  const mainSectionStyle = [styles.mainSection, 
    isOtherLanguagesSelectVisible ? styles.mainSectionVisible : {}];


  const handleReset = () => {
    const slicedLanguageArray = languageArray.slice(1)
    setSelectedObjectArray(
      slicedLanguageArray.map(language => (
        options.filter(optionObject => optionObject.key === language)[0]
      ))
    );
  }

  const handleApply = () => {
    const objectKeys = selectedObjectArray.map(obj => obj.key);
    const newLanguageArray = [languageArray[0], ...objectKeys]

    if (areArraysEqual(languageArray, newLanguageArray)) {
      return;
    }

    languageArray.forEach(language => {
      if (!newLanguageArray.includes(language)) {
        dispatch(removeSingleWordResource(language))
      }
    })

    const { requestedWordResources } = loadWordResources(languageArray, newLanguageArray)

    if (requestedWordResources) {
      Object.keys(requestedWordResources).forEach(language => {
        dispatch(addSingleWordResource({ language: language, wordResource: requestedWordResources[language] }))
      })
    }
    dispatch(updateLanguageArray(newLanguageArray))
    dispatch(updateIsLanguageVisible(false))
  }

  const returnOptionStyle = (optionKey: string) => {
    if (optionKey === languageArray[0]) {
      return [styles.languageOption, styles.wordsLanguage];
    }
    return [styles.languageOption, 
      selectedObjectArray.some(selected => selected.key === optionKey) 
        ? styles.languageOptionSelected : {}];
  };

  const handleSelect = (optionObject: OptionObject) => {
    if (optionObject.key === languageArray[0]) return;
    setSelectedObjectArray(prevArray => {
      if (prevArray.some(selected => selected.key === optionObject.key)) {
        return prevArray.filter(selected => selected.key !== optionObject.key);
      } else {
        return [...prevArray, optionObject];
      }
    });
  };

  const resetIconContainerStyle = [styles.resetIconContainer, isChanged ? styles.resetIconVisible : {}]
  const applyButtonStyle = [styles.applyButton, isChanged ? { backgroundColor: '#f2b500' } : {}];

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t('label')}
        isVisible={isOtherLanguagesSelectVisible}
      />
      <View style={mainSectionStyle}>
        <View style={styles.topContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.iconsContainer}>
              <Pressable style={styles.infoIconContainer}>
                <InfoIcon width={28} height={28} style={styles.infoIcon} /> 
              </Pressable>

              <Pressable style={resetIconContainerStyle} onPress={handleReset}>
                <ResetIcon width={28} height={28} fill="#e9e9ed" style={styles.resetIcon} /> 
              </Pressable>
            </View>


            <ScrollView style={styles.currentArrayContainer}>
              <Text style={styles.currentLanguage}>{tL(languageArray[0])}</Text>

              {selectedObjectArray.map((optionObject, index) => (
                <Pressable
                  key={optionObject.key + index}
                  style={styles.selectedLanguage}
                  onPress={() => handleSelect(optionObject)}
                >
                  <Text style={styles.selectedLanguageText}>
                    {optionObject.text}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
            
          <ScrollView contentContainerStyle={styles.optionsContainerContent} style={styles.optionsContainer}>
            {options.map((optionObject, index) => (
              <Pressable
                key={optionObject.key + index}
                style={returnOptionStyle(optionObject.key)}
                onPress={() => handleSelect(optionObject)}
              >
                <Text style={styles.optionText}>
                  {optionObject.text}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <Pressable style={applyButtonStyle} onPress={handleApply}>
          <Text style={styles.applyButtonText}>{t('button')}</Text>
        </Pressable>
      </View>
    </>
  )
}

export default OtherLanguagesSelect;