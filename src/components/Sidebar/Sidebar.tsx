import styles from './Sidebar.styles.js';
import React from 'react';

import { View, Text, TextStyle, Pressable } from 'react-native';
import { Line } from '@/components/atoms';

import { Link } from 'expo-router';
import { usePathname } from 'expo-router';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsSidebarVisible, updateIsLevelsVisible } from '@/store/uiSlice';
import { updateIsSignInPopupVisible, updateIsSignOutPopupVisible } from '@/store/accountUiSlice';

import { PracticeIcon, MainIcon, FeedbackIcon, ProfileIcon, InfoIcon, SettingsIcon, GuideIcon, ArrowIcon, MenuIcon } from '@/assets/icons';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Sidebar');

  const currentPath = usePathname();

  const isSidebarVisible = useAppSelector(state => state.ui.isSidebarVisible);
  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn)

  const returnLinkStyle = (linkPath: string) => {
    let linkStyle: TextStyle[] = [styles.sidebarLink as TextStyle];
    if (linkPath === currentPath) {
      linkStyle.push(styles.sidebarLinkActive as TextStyle);
    }
    return linkStyle; 
  }

  const sidebarStyleName = [
    styles.sidebarContainer,
    isSidebarVisible ? styles.sidebarVisible : {}
  ];

  const sidebarToggleStyle = [
    styles.sidebarToggle,
    isSidebarVisible ? styles.sidebarToggleActive : {}
  ];

  const toggleSidebar = () => {
    if (isLevelsVisible) {
      dispatch(updateIsLevelsVisible(false));
    }
    dispatch(updateIsSidebarVisible(!isSidebarVisible));
  } 

  const openSignInPopup = () => {
    dispatch(updateIsSignInPopupVisible(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupVisible(true));
  }

  return (
    <>
      <View style={sidebarStyleName}>
        <Link href="/" style={styles.mainLink}>
          <View style={styles.mainLinkInnerContainer}>
            <MainIcon height={100} width={180} />
          </View>
        </Link>

        <Line width={190} height={2} style={styles.linkDividerLine}/>

        <Link href="/" style={returnLinkStyle('/')}>
          <View style={styles.sidebarLinkContainer}>
            <PracticeIcon style={{ marginRight: 2, marginLeft: 4 }} width={30} height={30} />
            <Text style={styles.sidebarLinkText}>{t('practice')}</Text>
          </View>
        </Link>
        <Link href="/settings" style={returnLinkStyle('/settings')}>
          <View style={styles.sidebarLinkContainer}>
            <SettingsIcon width={36} height={36} />
            <Text style={styles.sidebarLinkText}>{t('settings')}</Text>
          </View>
        </Link>
        <Link href="/progress" style={returnLinkStyle('/progress')}>
          <View style={styles.sidebarLinkContainer}>
            <ProfileIcon width={36} height={36} />
            <Text style={styles.sidebarLinkText}>{t('progress')}</Text>
          </View>
        </Link>

        <Line width={190} height={2} style={styles.linkDividerLine}/>

        <Link href="/user-guide" style={returnLinkStyle('/user-guide')}>
          <View style={styles.sidebarLinkContainer}>
            <GuideIcon height={32} width={36} />
            <Text style={styles.sidebarLinkText}>{t('guide')}</Text>
          </View>
        </Link>
        <Link href="/feedback" style={returnLinkStyle('/feedback')}>
          <View style={styles.sidebarLinkContainer}>
            <FeedbackIcon height={36} width={36} />
            <Text style={styles.sidebarLinkText}>{t('feedback')}</Text>
          </View>
        </Link>
        <Link href="/about" style={returnLinkStyle('/about')}>
          <View style={styles.sidebarLinkContainer}>
            <InfoIcon fill="#e8eaed" width={36} height={36} />
            <Text style={styles.sidebarLinkText}>{t('about')}</Text>
          </View>
        </Link>

        <Line width={190} height={2} style={styles.linkDividerLine}/>

        {isSignedIn ? 
          <Pressable style={styles.signOutButton} onPress={openSignOutPopup}>
            {/* <ExitIcon /> */}
            <Text style={styles.signOutButtonText}>{t("signOut")}</Text>
          </Pressable>
          :
          <Pressable style={styles.signInButton} onPress={openSignInPopup}>
            <Text style={styles.signInButtonText}>{t("signIn")}</Text>
          </Pressable>
        }
      </View>

      <Pressable style={sidebarToggleStyle} onPress={toggleSidebar}>
        {isSidebarVisible ? (
          <View style={styles.sidebarActiveIconContainer}>
            <ArrowIcon style={styles.activeArrow} width={64} height={64} />
            <ArrowIcon style={styles.activeArrow} width={64} height={64} />
          </View>
        ) : (
          <MenuIcon width={52} height={52} />
        )}
      </Pressable>
    </>
  )
}

export default Sidebar;