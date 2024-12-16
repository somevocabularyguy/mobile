'use client';
import styles from './LanguageDropdown.styles.js';
import { useState } from 'react';

import { ArrowIcon } from '@/assets/icons';
import { Text, View, Pressable } from 'react-native';
import { OptionObject } from '@/types';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsLanguageDropdownActive } from '@/store/languageUiSlice';

import { useTranslation } from 'react-i18next';

const languageOptions: OptionObject[] = [
  { key: 'en', text: 'English' },
  { key: 'tr', text: 'Türkçe' }
]

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const handleLanguageChange = (optionObject: OptionObject) => {
    const newLocale = optionObject.key;

    i18n.changeLanguage(newLocale);
  };
  
  const dispatch = useAppDispatch();

  const isLanguageDropdownActive = useAppSelector(state => state.languageUi.isLanguageDropdownActive);


  const toggleLanguageDropdown = () => {
    dispatch(updateIsLanguageDropdownActive(!isLanguageDropdownActive));
  }

  const [currentSelection, setCurrentSelection] = useState<OptionObject>(() =>  
    languageOptions.filter(option => option.key === currentLocale)[0]
  ) 

  const dispatchHandler = (optionObject: OptionObject) => {
    handleLanguageChange(optionObject);
    setCurrentSelection(optionObject);
    toggleLanguageDropdown();
  }

  const dropdownButtonStyle = [styles.dropdownButton, isLanguageDropdownActive ? styles.dropdownButtonActive : {}];
  const dropdownArrowIconStyle = [styles.dropdownArrowIcon, isLanguageDropdownActive ? styles.dropdownArrowIconActive : {}];

  return (
    <View style={styles.container}>
      <Pressable style={dropdownButtonStyle} onPress={toggleLanguageDropdown}>
        <Text style={styles.dropdownButtonText}>{currentSelection.text}</Text>
        <ArrowIcon style={dropdownArrowIconStyle} fill="black" />
      </Pressable>

      {isLanguageDropdownActive &&
        <View style={styles.optionsContainer}>
          {languageOptions.map((optionObject, index) => {
            return (
              <Pressable 
                key={optionObject.key + index} 
                style={styles.option} 
                onPress={() => dispatchHandler(optionObject)}
              >
                <Text style={styles.optionText}>{optionObject.text}</Text>
              </Pressable>
            )
          })}      
        </View>
        }
    </View>
  );
}

export default LanguageDropdown;
