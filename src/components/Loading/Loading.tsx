import styles from './Loading.styles.js';
import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/store';
import { useCustomTranslation } from '@/hooks';

import { Text, View } from 'react-native';

const Loading: React.FC = () => {
  const t = useCustomTranslation('Loading');

  const isLoading = useAppSelector(state => state.loading.isLoading);
  const [animationIndex, setAnimationIndex] = useState(3);
  const animationIndexRef = useRef(animationIndex);

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout | null = null;

    if (isLoading) {
      loadingInterval = setInterval(() => {
        setAnimationIndex(prevIndex => {
          const nextIndex = prevIndex === 3 ? 0 : prevIndex + 1;
          animationIndexRef.current = nextIndex;
          return nextIndex;
        });
      }, 250);
    }

    return () => {
      if (loadingInterval) clearInterval(loadingInterval);
    };
  }, [isLoading]);


  return (
    <>
      {isLoading && 
        <View style={styles.container}>
          <Text style={styles.loadingText}>{t('loadingText')}{'.'.repeat(animationIndex)}</Text>
        </View>
      }
    </>    
  );
}

export default Loading;