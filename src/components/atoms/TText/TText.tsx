import { Text, StyleProp, TextStyle } from 'react-native';
import { useAppSelector } from '@/store/store';
import { TranslationsProvider } from '@/components/wrappers';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface TTextProps {
  translateKey: string;
  style: StyleProp<TextStyle>
}

const TText: React.FC<TTextProps> = ({ translateKey, style }) => {
  const namespaceArray = useAppSelector(state => state.userSettings.namespaceArray)
  const [currentNamespaceIndex, setCurrentNamespaceIndex] = useState(0);
  

  return (
    <TranslationsProvider locale={namespaceArray[0]} namespaces={[namespaceArray[currentNamespaceIndex]]} isWords={true}>
      <InnerTText style={style} translateKey={translateKey} setCurrentNamespaceIndex={setCurrentNamespaceIndex}/>
    </TranslationsProvider>
  );
};

interface InnerTTextProps {
  translateKey: string;
  style: StyleProp<TextStyle>;
  setCurrentNamespaceIndex: React.Dispatch<React.SetStateAction<number>>;
}

const InnerTText: React.FC<InnerTTextProps> = ({ translateKey, style, setCurrentNamespaceIndex }) => {
  const { t } = useTranslation();

  const namespaceArray = useAppSelector(state => state.userSettings.namespaceArray)
  const handleLanguageChange = () => {
    setCurrentNamespaceIndex(prev => prev === namespaceArray.length - 1 ? 0 : prev + 1);
  };

  return (
    <Text
      style={style}
      onPress={handleLanguageChange}
    >{t(translateKey)}</Text>
  );
};

export default TText;
