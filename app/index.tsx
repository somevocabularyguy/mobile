// import styles from './index.styles.js';

import { useAppSelector } from '@/store/store';

import Main from '@/components/Main';
import Feedback from '@/components/Feedback';
import Levels from '@/components/Levels';

export default function Index() {

  const loading = useAppSelector(state => state.data.loading);

  // if (loading) return <Text>loading...</Text>

  return (
    <Main />

    // <Feedback /> 
    // <Levels />
  );
}
