import { usePathname, Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import storage from '@/storage';
import * as Localization from "expo-localization";
import { Link } from 'expo-router';
import { useEffect } from 'react';

import { ReduxProvider, RootLayoutChildWrapper, TranslationsProvider } from '@/components/wrappers';
import { SignInPopup, SignOutPopup, DeletePopup } from '@/components/Popups';
import { Shading } from '@/components/overlays';
import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';
import Levels from '@/components/Levels';
import Language from '@/components/Language';

import { PracticeIcon } from '@/assets/icons';

import '@/i18n';

export default function RootLayout() {
  const currentPath = usePathname();

  let savedLanguage;
  useEffect(() => {
    const getLanguage = async () => {
      savedLanguage = await storage.getItem("language") as string | null;
    }
    getLanguage();
  }, [])
  savedLanguage = savedLanguage || Localization.getLocales()[0].languageCode || 'en';

  return (
    <TranslationsProvider locale={savedLanguage}>
      <ReduxProvider>
        <RootLayoutChildWrapper>
          <View style={styles.container}>
            <Loading />
            <SignInPopup />
            <SignOutPopup />
            <DeletePopup />
            <Sidebar />
            <Shading /> 
            {currentPath === '/' && <Levels />}
            {currentPath === '/' && <Language />}
            {currentPath !== '/' && 
              <Link href="/" style={styles.practiceNavContainer}>
                <View style={styles.practiceNav}>
                  <PracticeIcon style={{ zIndex: 30 }} width={50} height={50} />
                </View>
              </Link>
            }
            <Slot />
          </View>
        </RootLayoutChildWrapper>
      </ReduxProvider>
    </TranslationsProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#404040',
  },
  practiceNavContainer: {
    position: 'absolute',
    zIndex: 30,
    bottom: 4,
    right: 4,
    backgroundColor: 'green',
  },
  practiceNav: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center'
  }
})