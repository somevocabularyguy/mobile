import styles from './Language.styles.js';
import React, { useEffect } from 'react';
import { View, Pressable } from 'react-native'; 

 import { ArrowIcon, LanguageIcon } from '@/assets/icons';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { 
  updateIsAppLanguageSelectVisible, 
  updateIsWordsLanguageSelectVisible, 
  updateIsOtherLanguagesSelectVisible, 
  updateIsLanguageVisible 
} from '@/store/languageUiSlice';

import AppLanguageSelect from './AppLanguageSelect';
import WordsLanguageSelect from './WordsLanguageSelect';
import OtherLanguagesSelect from './OtherLanguagesSelect';

const Language: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLanguageVisible = useAppSelector(state => state.languageUi.isLanguageVisible);
  const isAppLanguageSelectVisible = useAppSelector(state => state.languageUi.isAppLanguageSelectVisible);
  const isWordsLanguageSelectVisible = useAppSelector(state => state.languageUi.isWordsLanguageSelectVisible);
  const isOtherLanguagesSelectVisible = useAppSelector(state => state.languageUi.isOtherLanguagesSelectVisible);

  const changeAll = (key: string, boolean: boolean) => {
    if (boolean) {
      if (key !== 'wordsLanguageSelect' && isWordsLanguageSelectVisible) {
        dispatch(updateIsWordsLanguageSelectVisible(false));
      }
      if (key !== 'otherLanguagesSelect' && isOtherLanguagesSelectVisible) {
        dispatch(updateIsOtherLanguagesSelectVisible(false));
      }
      if (key !== 'appLanguagesSelect' && isAppLanguageSelectVisible) {
        dispatch(updateIsAppLanguageSelectVisible(false));
      }
    }
  };

  useEffect(() => {
    changeAll('wordsLanguageSelect', isWordsLanguageSelectVisible);
  }, [isWordsLanguageSelectVisible]);

  useEffect(() => {
    changeAll('otherLanguagesSelect', isOtherLanguagesSelectVisible);
  }, [isOtherLanguagesSelectVisible]);

  useEffect(() => {
    changeAll('appLanguagesSelect', isAppLanguageSelectVisible);
  }, [isAppLanguageSelectVisible]);

  const mainContainerClassName = [styles.mainContainer, isLanguageVisible ? styles.mainContainerVisible : {}];
  const languageToggleStyle = [styles.languageToggle, isLanguageVisible ? styles.languageToggleActive : {}];

  const toggleLanguages = () => {
    dispatch(updateIsLanguageVisible(!isLanguageVisible))
  }

  return (
    <>
      <View style={mainContainerClassName}>
        <AppLanguageSelect />
        <WordsLanguageSelect />
        <OtherLanguagesSelect />
      </View>

      <Pressable style={languageToggleStyle} onPress={toggleLanguages}>
        {isLanguageVisible ? (
          <View style={styles.languageActiveIconContainer}>
            <LanguageIcon width={64} height="100%" />
            <ArrowIcon width={64} height={64} />
            <ArrowIcon width={64} height={64} />
          </View>
        ) : (
          <LanguageIcon width="100%" height="100%" />
        )}
      </Pressable>
    </>
  )
}

export default Language;