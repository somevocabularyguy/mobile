import styles from './GeneralProgress.styles.js';

import { useAppSelector } from '@/store/store';

import { Text, View } from 'react-native';

const GeneralProgress: React.FC = () => {

  const userData = useAppSelector(state => state.userData.userData);

  const totalTimeSpentText = `${userData.totalUseTime} milliseconds`

  return (
    <View style={styles.container}>
      <Text>Total time spent to learn: {totalTimeSpentText}</Text>
    </View>
  )
}

export default GeneralProgress;