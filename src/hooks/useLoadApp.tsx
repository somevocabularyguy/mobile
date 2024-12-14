import { useEffect } from 'react';
import { UserData, Word } from '@/types';
import storage from '@/storage';
import { useSegments } from 'expo-router';


import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateLoadingState } from '@/store/dataSlice';
import { updateLevels, updateCheckedLevels, updateBatch } from '@/store/appStateSlice';
import { updateUserData } from '@/store/userDataSlice';
import { updateDisplayWordObject } from '@/store/wordSlice';
import { updateIsSidebarVisible } from '@/store/uiSlice';
// import { updateIsSignedIn } from '@/store/userSettingsSlice';

import { returnUserData } from '@/utils/userDataUtils';
import { useCreateLevels } from '@/hooks';

const useLoadApp = () => {
  const dispatch = useAppDispatch();
  const createLevels = useCreateLevels();
  const serverUserData = null; // Test
  const words = useAppSelector(state => state.data.words)
  const userData = useAppSelector(state => state.userData.userData);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const segments = useSegments();

  // const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);
  // if (isSignedIn !== signedInFlag) {
  //   dispatch(updateIsSignedIn(signedInFlag));
  // }

  useEffect(() => {
    const updateData = async () => {
      const storedUserData = await storage.getItem('userData') as UserData | null;
      const userData = returnUserData(storedUserData, serverUserData);
      dispatch(updateUserData(userData));

      const storedCheckedLevels = await storage.getItem('checkedLevels') as string[] | null;
      dispatch(updateCheckedLevels(storedCheckedLevels || []));

      dispatch(updateLoadingState(false));
    }

    updateData();
  }, [serverUserData, dispatch])

  useEffect(() => {
    const levels = createLevels();
    dispatch(updateLevels(levels));
  }, [userData.hiddenWordIds, userData.customWordIds, dispatch])

  useEffect(() => {
    dispatch(updateDisplayWordObject(null));
  }, [checkedLevels, isRandom, dispatch])

  useEffect(() => {
    const checkedLevelsSet = new Set(checkedLevels);
    const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
    dispatch(updateBatch(newBatch));
  }, [checkedLevels, words, dispatch])

  useEffect(() => {
    dispatch(updateIsSidebarVisible(false));
  }, [segments]);
}

export default useLoadApp;