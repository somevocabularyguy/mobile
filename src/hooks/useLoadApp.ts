import { useState, useEffect } from 'react';
import { Word } from '@/types';
import storage from '@/storage';
import { useSegments } from 'expo-router';

import { updateWordResources } from '@/store/languageSlice';
import { updateIsSidebarVisible } from '@/store/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateUserData, updateLanguageArray } from '@/store/userDataSlice';
import { updateDisplayWordObject, updateWords } from '@/store/wordSlice';
import { updateLevels, updateCheckedLevels, updateBatch, updateIteration } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { returnUserData } from '@/utils/userDataUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';
import { loadLanguageResources } from '@/utils/dataUtils';

import { getUserData } from '@/lib/api';

import useMainButtonsUtils from './useMainButtonsUtils';
import useCheckAppLoaded from './useCheckAppLoaded';

const useLoadApp = () => {
  useCheckAppLoaded();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let storedUserData;
    const loadData = async () => {
      const authToken = await storage.getItem('authToken');
      let serverUserData = null;
      if (authToken) {
        serverUserData = await getUserData(authToken);
      }
      storedUserData = await storage.getItem('userData');
      const updatedUserData = returnUserData(storedUserData, serverUserData);
      dispatch(updateUserData(updatedUserData));

      const languageArray = /* updatedUserData.languageArray || */ ['en', 'ja'];
      const { initialWords, wordResources } = loadLanguageResources(languageArray);

      const groupedWords = groupWordsByLevel(initialWords, updatedUserData.hiddenWordIds, updatedUserData.customWordIds);
      const levels = createLevels(groupedWords, updatedUserData.wordsData);

      const storedCheckedLevels = await storage.getItem('checkedLevels');
      const checkedLevelsSet = new Set(storedCheckedLevels);
      const newBatch: Word[] = groupedWords.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));

      dispatch(updateLevels(levels));
      dispatch(updateBatch(newBatch));
      dispatch(updateWords(groupedWords));
      dispatch(updateWordResources(wordResources));
      dispatch(updateLanguageArray(languageArray));
      dispatch(updateCheckedLevels(storedCheckedLevels));
    }
    loadData()
  }, [])

  /*-----------------------------------------------------------------------*/

  const { handleNext } = useMainButtonsUtils();

  const appIsLoaded = useAppSelector(state => state.loading.appIsLoaded);

  const words = useAppSelector(state => state.word.words);
  const batch = useAppSelector(state => state.appState.batch);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const userData = useAppSelector(state => state.userData.userData);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const [handleNextFlag, setHandleNextFlag] = useState(false);

  useEffect(() => {
    if (appIsLoaded) {
      const groupedWords = groupWordsByLevel(words, userData.hiddenWordIds, userData.customWordIds);
      const levels = createLevels(groupedWords, userData.wordsData);
      dispatch(updateWords(groupedWords));
      dispatch(updateLevels(levels));
      setHandleNextFlag(true);
    }
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  useEffect(() => {
    if (handleNextFlag) {
      handleNext(false);  
      setHandleNextFlag(false);
    }
  }, [batch])

  useEffect(() => {
    if (appIsLoaded) {
      dispatch(updateIteration(-1));
      dispatch(updateDisplayWordObject(null));
    }
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    if (appIsLoaded) {
      const checkedLevelsSet = new Set(checkedLevels);
      const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
      dispatch(updateBatch(newBatch));
    }
  }, [checkedLevels, words, dispatch])

  const segments = useSegments();
  useEffect(() => {
    dispatch(updateIsSidebarVisible(false));
  }, [segments]);
}

export default useLoadApp;