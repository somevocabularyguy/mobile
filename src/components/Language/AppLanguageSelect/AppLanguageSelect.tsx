import styles from './AppLanguageSelect.styles.js';
import React from 'react';
import { Text, Pressable, View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { OptionObject } from '@/types';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsAppLanguageSelectVisible } from '@/store/languageUiSlice'; 

import { useCustomTranslation } from '@/hooks';
import { LanguageIcon } from '@/assets/icons';

import { languageNames } from '@/i18nConfig';

import SectionLabel from '../SectionLabel';

const AppLanguageSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const t = useCustomTranslation('Language.AppLanguageSelect');

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const isAppLanguageSelectVisible = useAppSelector(state => state.languageUi.isAppLanguageSelectVisible);

  const handleToggleSection = () => {
    dispatch(updateIsAppLanguageSelectVisible(!isAppLanguageSelectVisible));
  }

  const mainSectionStyle = [styles.mainSection, 
    isAppLanguageSelectVisible ? styles.mainSectionVisible : {}]

  const options: OptionObject[] = Object.keys(languageNames).map(language => {
    return  { key: language, text: languageNames[language] };
  })

  const returnOptionStyle = (key: string) => {
    return [
      styles.languageOption, 
      key === currentLocale ? styles.languageOptionSelected : {}
    ];
  }

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t('label')} 
        isVisible ={isAppLanguageSelectVisible}
        AdditionalIcon={<LanguageIcon width={50} height={50} />}
      />
      <View style={mainSectionStyle}>
        <View style={styles.currentContainer}>
          <View style={styles.currentLanguage}>
            <Text 
              adjustsFontSizeToFit 
              style={styles.currentLanguageText}
            >{languageNames[currentLocale]}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.optionsContainerContent} style={styles.optionsContainer}>
          {options.map((optionObject, index) => (
            <Pressable
              key={optionObject.key + index}
              onPress={() => i18n.changeLanguage(optionObject.key)}
              style={returnOptionStyle(optionObject.key)}
            >
              <Text style={{ color: 'white' }}>{optionObject.text}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  )
}

export default AppLanguageSelect;