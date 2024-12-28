import storage from '@/storage';
import { useEffect } from 'react';

import { updateIsAppLoaded, updateIsLoading } from '@/store/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';

const useCheckAppLoaded = () => {
  const dispatch = useAppDispatch();

  const words = useAppSelector(state => state.word.words);
  const levels = useAppSelector(state => state.appState.levels);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const wordResources = useAppSelector(state => state.language.wordResources);

  const isAppLoaded = useAppSelector(state => state.loading.isAppLoaded);
  const isUserDataLoaded = useAppSelector(state => state.userData.isUserDataLoaded);

  useEffect(() => {
      const checkLoaded = async () => {
        const storedCheckedLevels = await storage.getItem('checkedLevels');

        const checkedLevelsBoolean = storedCheckedLevels?.length ?
          checkedLevels.length ? true : false
          : true;
        const arrayBoolean = words.length && levels.length; 
        const objectBoolean = Object.keys(wordResources).length;

        if (!isAppLoaded && checkedLevelsBoolean && arrayBoolean && objectBoolean && isUserDataLoaded) {
          dispatch(updateIsAppLoaded(true));
          dispatch(updateIsLoading(false));
        }
      }
      checkLoaded();
  }, [words, levels, checkedLevels, wordResources, isUserDataLoaded])
}

export default useCheckAppLoaded;