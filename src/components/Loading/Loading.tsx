import styles from './Loading.styles.js';
import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/store';

import { Text, View } from 'react-native';

const Loading: React.FC = () => {
  const loading = useAppSelector(state => state.data.loading);
  const [animationIndex, setAnimationIndex] = useState(3);
  const animationIndexRef = useRef(animationIndex);

  useEffect(() => {
    let loadingInterval: NodeJS.Timeout | null = null;

    if (loading) {
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
  }, [loading]);


  return (
    <>
      {loading && 
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading{'.'.repeat(animationIndex)}</Text>
        </View>
      }
    </>    
  );
}

export default Loading;