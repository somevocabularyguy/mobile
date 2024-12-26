import React, { useEffect } from 'react';
import styles from './SignOutPopup.styles.js';

import { Link } from 'expo-router';

import { logout } from '@/lib/api';
import { Text, Pressable, View } from 'react-native';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsSignOutPopupVisible } from '@/store/accountUiSlice';

const SignOutPopup: React.FC = () => {
  const t = useCustomTranslation("Popups.SignOutPopup");
  const dispatch = useAppDispatch();

  const isSignOutPopupVisible = useAppSelector(state => state.accountUi.isSignOutPopupVisible);

  useEffect(() => {
    return () => {
      dispatch(updateIsSignOutPopupVisible(false));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        // window.location.href = 'http://localhost:3000'; //* Will Change
      }
    } catch (error) {
      console.log(error);
    }
  }

  const closePopup = () => {
    if (isSignOutPopupVisible) {
      dispatch(updateIsSignOutPopupVisible(false));
    }
  }

  const signOutPopupStyle = [
    styles.popup, 
    styles.signOutPopup,
    isSignOutPopupVisible ? styles.popupVisible : {}
  ];

  return (
    <View style={signOutPopupStyle} pointerEvents={isSignOutPopupVisible ? 'auto' : 'none'}>
      <Text style={styles.popupText}>
        {t("text") + ' '}
        <Link href="/settings">
          <Text style={styles.progressLinkText}>{t("link")}</Text>
        </Link>
      </Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.blankButton} onPress={closePopup}>
          <Text style={styles.buttonText}>{t("backButton")}</Text>
        </Pressable>
        <Pressable style={[styles.blankButton, styles.signOutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>{t("signOutButton")}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignOutPopup;