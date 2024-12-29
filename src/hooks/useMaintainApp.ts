import { Word } from '@/types';
import { useSegments } from 'expo-router';
import { useState, useEffect } from 'react';

import { updateIsSidebarVisible } from '@/store/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateDisplayWordObject, updateWords } from '@/store/wordSlice';
import { updateLevels, updateBatch, updateIteration } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';

import useMainButtonsUtils from './useMainButtonsUtils';


const useMaintainApp = () => {
  const dispatch = useAppDispatch();

  const { handleNext } = useMainButtonsUtils();

  const isAppLoaded = useAppSelector(state => state.loading.isAppLoaded);

  const words = useAppSelector(state => state.word.words);
  const batch = useAppSelector(state => state.appState.batch);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const userData = useAppSelector(state => state.userData.userData);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const [handleNextFlag, setHandleNextFlag] = useState(false);

  useEffect(() => {
    if (isAppLoaded) {
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
    if (isAppLoaded) {
      dispatch(updateIteration(-1));
      dispatch(updateDisplayWordObject(null));
    }
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    if (isAppLoaded) {
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

export default useMaintainApp;