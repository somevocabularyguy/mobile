import styles from './Shading.styles.js'; 
import { useEffect } from 'react';

import { Pressable, View } from 'react-native';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsShadingVisible, updateIsLevelsVisible, updateIsSidebarVisible } from '@/store/uiSlice';
import { updateIsSignInPopupVisible, updateIsDeletePopupVisible, updateIsSignOutPopupVisible } from '@/store/accountUiSlice';

const Shading: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShadingVisible = useAppSelector(state => state.ui.isShadingVisible);
  const isSidebarVisible = useAppSelector(state => state.ui.isSidebarVisible);
  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);
  const isSignInPopupVisible = useAppSelector(state => state.accountUi.isSignInPopupVisible);
  const isSignOutPopupVisible = useAppSelector(state => state.accountUi.isSignOutPopupVisible);
  const isDeletePopupVisible = useAppSelector(state => state.accountUi.isDeletePopupVisible);

  const closeShading = () => {
    if (isShadingVisible) dispatch(updateIsShadingVisible(false));

    if (isSidebarVisible) dispatch(updateIsSidebarVisible(false));
    if (isLevelsVisible) dispatch(updateIsLevelsVisible(false));
    if (isSignInPopupVisible) dispatch(updateIsSignInPopupVisible(false));
    if (isSignOutPopupVisible) dispatch(updateIsSignOutPopupVisible(false));
    if (isDeletePopupVisible) dispatch(updateIsDeletePopupVisible(false));
  }

  const changeAll = (key: string, boolean: boolean) => {
    if (boolean) {
      if (key !== 'sidebar' && isSidebarVisible) dispatch(updateIsSidebarVisible(false));
      if (key !== 'levels' && isLevelsVisible) dispatch(updateIsLevelsVisible(false));
      if (key !== 'signInPopup' && isSignInPopupVisible) dispatch(updateIsSignInPopupVisible(false));
      if (key !== 'signOutPopup' && isSignOutPopupVisible) dispatch(updateIsSignOutPopupVisible(false));
      if (key !== 'deletePopup' && isDeletePopupVisible) dispatch(updateIsDeletePopupVisible(false));

      if (!isShadingVisible) {
        dispatch(updateIsShadingVisible(true));
      }
    } else {
      if (!isSidebarVisible && !isLevelsVisible && !isSignInPopupVisible && !isSignOutPopupVisible && !isDeletePopupVisible) {
        dispatch(updateIsShadingVisible(false));
      }
    }
  };

  useEffect(() => {
    changeAll('sidebar', isSidebarVisible);
  }, [isSidebarVisible]);

  useEffect(() => {
    changeAll('levels', isLevelsVisible);
  }, [isLevelsVisible]);

  useEffect(() => {
    changeAll('signInPopup', isSignInPopupVisible);
  }, [isSignInPopupVisible]);

  useEffect(() => {
    changeAll('signOutPopup', isSignOutPopupVisible);
  }, [isSignOutPopupVisible]);

  useEffect(() => {
    changeAll('deletePopup', isDeletePopupVisible);
  }, [isDeletePopupVisible]);

  const shadingStyle = [
    styles.shading,
    isShadingVisible ? styles.shadingVisible : {},
  ];

  return (
    <View style={shadingStyle} pointerEvents={isShadingVisible ? 'auto' : 'none'}>
      <Pressable style={styles.shadingPressable} onPress={closeShading}></Pressable>
    </View>
  )
}

export default Shading