import React, { useEffect } from 'react';
import styles from './DeletePopup.styles.js';

import { deleteAccount } from '@/lib/api';
import { Text, Pressable, View } from 'react-native';
import { useCustomTranslation } from '@/hooks';

import { updateIsLoading } from '@/store/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsDeletePopupVisible } from '@/store/accountUiSlice';

const DeletePopup: React.FC = () => {
  const t = useCustomTranslation("Popups.DeletePopup");
  const dispatch = useAppDispatch();

  const isDeletePopupVisible = useAppSelector(state => state.accountUi.isDeletePopupVisible);

  useEffect(() => {
    return () => {
      dispatch(updateIsDeletePopupVisible(false));
    }
  }, []);

  const handleDeleteAccount = async () => {
    dispatch(updateIsLoading(true));
    try {
    const response = await deleteAccount();
      if (response.status === 202) {
        window.alert(t("deleteAlert"));
        // window.location.href = 'http://localhost:3000/settings'; //* Will Change
        dispatch(updateIsLoading(false));
      }
    } catch (error) {
      dispatch(updateIsLoading(false));
      window.alert(t("deleteAlert"));
    }
  }

  const closePopup = () => {
    if (isDeletePopupVisible) {
      dispatch(updateIsDeletePopupVisible(false));
    }
  }

  const deletePopupStyle = [
    styles.popup,
    isDeletePopupVisible ? styles.popupVisible : {}
  ] 

  return (
    <View style={deletePopupStyle} pointerEvents={isDeletePopupVisible ? 'auto' : 'none'}>
      <Text style={styles.popupText}>{t("text1")}</Text>
      <Text style={styles.popupText}>{t("text2")}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.blankButton} onPress={closePopup}>
          <Text style={styles.buttonText}>{t("backButton")}</Text>
        </Pressable>
        <Pressable style={[styles.blankButton, styles.deleteButton]} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>{t("deleteButton")}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default DeletePopup;