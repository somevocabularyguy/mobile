import styles from './AccountSettings.styles.js';
import React from 'react';

import { SectionLabel } from '../reuseable';
import { Text, Pressable, View } from 'react-native';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsAccountSettingsVisible } from '@/store/settingsUiSlice';
import { updateIsSignInPopupVisible, updateIsSignOutPopupVisible, updateIsDeletePopupVisible } from '@/store/accountUiSlice';

const AccountSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.AccountSettings");

  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);

  const isAccountSettingsVisible = useAppSelector(state => state.settingsUi.isAccountSettingsVisible);

  const handleToggleSection = () => {
    dispatch(updateIsAccountSettingsVisible(!isAccountSettingsVisible));
  }

  const openSignInPopup = () => {
    dispatch(updateIsSignInPopupVisible(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupVisible(true));
  }

  const openDeletePopup = () => {
    dispatch(updateIsDeletePopupVisible(true));
  }

  const accountSectionStyle = [
    styles.accountSection, 
    isAccountSettingsVisible ? styles.accountSectionVisible : {}
  ];

  return (
    <View>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t("labelText")} 
        isVisible={isAccountSettingsVisible}
      />
        <View style={accountSectionStyle}>
          {isSignedIn ?
            <>
              <Pressable style={styles.blankButton} onPress={openSignOutPopup}>
                <Text style={styles.blankButtonText}>{t("signOutButton")}</Text>
              </Pressable>
              <Pressable style={[styles.blankButton, styles.deleteButton]} onPress={openDeletePopup}>
                <Text style={styles.deleteButtonText}>{t("deleteButton")}</Text>
              </Pressable>
            </>
            :
            <>
              <Pressable style={styles.signInButton} onPress={openSignInPopup}>
                <Text style={styles.signInButtonText}>{t("signInButton")}</Text>
              </Pressable>
            </>
          }
        </View>
    </View>
  )
}

export default AccountSettings;