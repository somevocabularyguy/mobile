import MainButtons from './MainButtons';
import MainLabels from './MainLabels';

import styles from './Main.styles.js';
import { View } from 'react-native';

const Main: React.FC = () => {

  return (
    <View style={styles.container}>
      <MainLabels />
      <MainButtons />
    </View>
  )
}

export default Main;