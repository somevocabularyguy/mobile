import styles from './Settings.styles.js';

import HiddenSettings from './HiddenSettings';
import CustomSettings from './CustomSettings';
import AccountSettings from './AccountSettings';

import { View, FlatList } from 'react-native';

const Settings: React.FC = () => {

  const sections = [
    { id: '1', title: 'Hidden Settings', component: <HiddenSettings /> },
    { id: '2', title: 'Custom Settings', component: <CustomSettings /> },
    { id: '3', title: 'Account Settings', component: <AccountSettings /> },
  ];
 
  return (
      <View style={styles.container}>

        <FlatList
          data={sections}
          renderItem={({ item }) => (
            item.component
          )}
          keyExtractor={item => item.id + item.title}
         />

      </View>
  )
}

export default Settings;