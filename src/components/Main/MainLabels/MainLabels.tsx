import { Text, View } from 'react-native';
import { TText } from '@/components/atoms';
import { TArray } from '@/components/molecules';

import React from 'react';
import styles from './MainLabels.styles.js';

import { useAppSelector } from '@/store/store';
import { useCustomTranslation } from '@/hooks';

const MainLabels: React.FC = () => {
  const t = useCustomTranslation('Main.MainLabels');

  const isShown = useAppSelector(state => state.word.isShown);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const displayWordObject = useAppSelector(state => state.word.displayWordObject);

  const dynamicLabelStyle = [styles.dynamicLabel, isShown ? {} : styles.hidden];

  return (
    <View style={styles.mainGrid}>
      {displayWordObject?.difficulty === 'finish' ?
        <Text style={styles.wordLabel}>{t('finishText')} 🎉</Text>
        : displayWordObject?.id ?
          <TText 
            style={styles.wordLabel} 
            wordId={displayWordObject.id}
            dataKey="word"
          />
          : checkedLevels.length ?
            <Text style={styles.wordLabel}>
              {isRandom ? t("randomText") : t("practiceText")}
            </Text>
            :
            <Text style={styles.wordLabel}>{t('selectLevelText')}</Text>
      }
      
      <View style={styles.shownTextContainer}>
        <Text style={styles.headLabel}>{t('definitionText')}</Text>
        <View style={styles.dynamicLabelContainer}>
          {displayWordObject?.id &&
            <TText 
              style={dynamicLabelStyle} 
              wordId={displayWordObject.id}
              dataKey="meaning"
            />
          }
        </View>

        <Text style={styles.headLabel}>{t('exampleText')}</Text>
        <View style={styles.dynamicLabelContainer}>
          {displayWordObject?.id &&
            <TText 
              style={dynamicLabelStyle} 
              wordId={displayWordObject.id}
              dataKey="example"
            />
          }
        </View>

        <Text style={styles.headLabel}>{t('synonymsText')}</Text>
        <View style={styles.arrayTextContainer}>
          {displayWordObject?.id &&
            <TArray 
              wordId={displayWordObject.id} 
              arrayKey="synonyms"
              itemStyle={dynamicLabelStyle}
              dashStyle={dynamicLabelStyle}
            />
          }
        </View>

        <Text style={styles.headLabel}>{t('antonymsText')}</Text>
        <View style={styles.arrayTextContainer}>
          {displayWordObject?.id &&
            <TArray 
              wordId={displayWordObject.id} 
              arrayKey="antonyms"
              itemStyle={dynamicLabelStyle}
              dashStyle={dynamicLabelStyle}
            />
          }
        </View>
      </View>
    </View>
  )
}

export default MainLabels;