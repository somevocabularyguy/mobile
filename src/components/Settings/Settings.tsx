import styles from './Settings.styles.js';

import HiddenSettings from './HiddenSettings';
import CustomSettings from './CustomSettings';
import AccountSettings from './AccountSettings';

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