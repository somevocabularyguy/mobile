import { usePathname, Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { ReduxProvider, RootLayoutChildWrapper } from '@/components/wrappers';
import { SignInPopup, SignOutPopup, DeletePopup } from '@/components/Popups';
import { Shading } from '@/components/overlays';
import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';
import Levels from '@/components/Levels';

import '@/i18n';

export default function RootLayout() {
  const currentPath = usePathname();

  return (
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
          <Slot />
        </View>
      </RootLayoutChildWrapper>
    </ReduxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#404040',
  },
})