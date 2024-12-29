import storage from '@/storage';
import { Word, UserData } from '@/types';
import { defaultUserData } from '@/constants';
import { useEffect } from 'react';

import { updateWords } from '@/store/wordSlice';
import { useAppDispatch } from '@/store/store';
import { updateIsSignedIn } from '@/store/userSettingsSlice';
import { updateWordResources } from '@/store/languageSlice';
import { updateIsWaitingVerify } from '@/store/accountUiSlice';
import { updateUserData, updateLanguageArray } from '@/store/userDataSlice';
import { updateLevels, updateCheckedLevels, updateBatch } from '@/store/appStateSlice';

import { createLevels } from '@/utils/levelUtils';
import { groupWordsByLevel } from '@/utils/wordUtils';
import { loadWordResourcesInitial } from '@/utils/dataUtils';

import { verifySignIn, syncUserData } from '@/lib/api';

const useLoadApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      const tempVerifyToken = await storage.getItem('tempVerifyToken');
      if (tempVerifyToken) {
        dispatch(updateIsWaitingVerify(true))

        const response = await verifySignIn(tempVerifyToken);
        if (response.message === 'expired') {

          storage.removeItem('tempVerifyToken');
          dispatch(updateIsWaitingVerify(false));

        } else if (response.message === 'not-verified') {

          console.log(response)

        } else if (response.message === 'verified') {

          storage.removeItem('tempVerifyToken');
          storage.setItem('authToken', response.authToken);

          dispatch(updateIsWaitingVerify(false));
          dispatch(updateIsSignedIn(true));
        }
      }
      const storedUserData = await storage.getItem('userData') || defaultUserData;
      let updatedUserData: UserData = storedUserData; 
      const authToken = await storage.getItem('authToken');
      console.log("🚀 ~ file: useLoadApp.ts:51 ~ authToken:", authToken);
      if (authToken) {
        const response = await syncUserData(storedUserData, authToken);
        if (response) {
          updatedUserData = response.serverUserData;
        }
        dispatch(updateIsSignedIn(true));
      }

      const languageArray = updatedUserData?.languageArray;
      const { initialWords, initialWordResources } = loadWordResourcesInitial(languageArray);

      const groupedWords = groupWordsByLevel(initialWords, updatedUserData.hiddenWordIds, updatedUserData.customWordIds);
      const levels = createLevels(groupedWords, updatedUserData.wordsData);

      const storedCheckedLevels = await storage.getItem('checkedLevels');
      const checkedLevelsSet = new Set(storedCheckedLevels);
      const newBatch: Word[] = groupedWords.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));

      dispatch(updateLevels(levels));
      dispatch(updateBatch(newBatch));
      dispatch(updateWords(groupedWords));
      dispatch(updateUserData(updatedUserData));
      dispatch(updateWordResources(initialWordResources));
      dispatch(updateLanguageArray(languageArray));
      dispatch(updateCheckedLevels(storedCheckedLevels));
    }
    loadData()
  }, [])
}

export default useLoadApp;