import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppSelector } from '@/store/store';
import { useState, useEffect } from 'react';
import { highlightSubtext } from '@/utils/tsxUtils';

interface TTextProps {
  wordId: string;
  dataKey?: 'word' | 'meaning' | 'example';
  arrayKey?: 'synonyms' | 'antonyms';
  arrayIndex?: number;
  style?: StyleProp<TextStyle>;
  highlightKey?: string; 
  numberOfLinesNumber?: number;
  minimumFontScaleNumber?: number;
  adjustsFontSizeToFitParam?: boolean;
}
const TText: React.FC<TTextProps> = ({ wordId, dataKey, arrayKey, arrayIndex, style, highlightKey, adjustsFontSizeToFitParam, minimumFontScaleNumber, numberOfLinesNumber }) => {
  const languageArray = useAppSelector(state => state.userData.userData.languageArray)
  const wordResources = useAppSelector(state => state.language.wordResources)

  const [dataIndex, setDataIndex] = useState(0);
  const [dataArray, setDataArray] = useState<string[]>(() => {
    let array: string[] = [];
    if (dataKey) {
      array = languageArray.map(language => wordResources[language][wordId][dataKey]);
    } else if (arrayKey && arrayIndex) {
      array = languageArray.map(language => wordResources[language][wordId][arrayKey][arrayIndex]);
    }
    return array;
  });

  useEffect(() => {
    setDataIndex(0);
  }, [wordId])

  useEffect(() => {
    let array: string[] = [];
    if (dataKey) {
      array = languageArray.map(language => wordResources[language][wordId][dataKey]);
    } else if (arrayKey &&  arrayIndex !== undefined) {
      array = languageArray.map(language => wordResources[language][wordId][arrayKey][arrayIndex]);
    }
    setDataArray(array);
  }, [languageArray, wordId, dataKey, arrayKey, arrayIndex])

  const handleClick = () => {
    setDataIndex(prev => prev === dataArray.length - 1 ? 0 : prev + 1);
  }

  let word: string | React.JSX.Element = dataArray[dataIndex];

  if (highlightKey && dataIndex === 0) {
    word = highlightSubtext(word, highlightKey);
  }

  return (
    <Text 
      onPress={handleClick}
      style={style}
      adjustsFontSizeToFit={adjustsFontSizeToFitParam}
      numberOfLines={numberOfLinesNumber}
      minimumFontScale={minimumFontScaleNumber}
    >{word}</Text>
  );
};

export default TText;
