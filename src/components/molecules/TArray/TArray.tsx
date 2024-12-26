import React from 'react';
import { TText } from '@/components/atoms';
import { useAppSelector } from '@/store/store';
import { Text, StyleProp, TextStyle, View } from 'react-native';

interface TArrayProps {
  wordId: string;
  arrayKey: 'synonyms' | 'antonyms';
  itemStyle?: StyleProp<TextStyle>;
  dashStyle?: StyleProp<TextStyle>;
}

const TArray: React.FC<TArrayProps> = ({ wordId, arrayKey, itemStyle, dashStyle }) => {

  if (!wordId) return null;

  const wordResources = useAppSelector(state => state.language.wordResources);
  const languageArray = useAppSelector(state => state.userData.userData.languageArray);
  const array = wordResources[languageArray[0]][wordId][arrayKey];

  return (
    <>
      {array.map((string, index) => {

        return (
        <React.Fragment  key={string + index}>
        <View style={{ flexDirection: 'row'}}>
          <TText 
            wordId={wordId} 
            arrayKey={arrayKey} 
            arrayIndex={index} 
            style={itemStyle} 
          />
        </View>
        <Text style={dashStyle}>{index !== array.length - 1 && '-'}</Text>
        </React.Fragment>
        )
})}
    </>
  )
}

export default TArray;