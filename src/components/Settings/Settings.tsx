import styles from './Settings.styles.js';

import { HiddenSettings, CustomSettings, AccountSettings } from './';
import { View } from 'react-native';

const Settings: React.FC = () => {
 
  return (
      <View style={styles.container}>

        <HiddenSettings />
        <CustomSettings />
        <AccountSettings />

      </View>
  )
}

export default Settings;