import styles from './SectionLabel.styles.js';

import { ArrowIcon } from '@/assets/icons';
import { Text, Pressable, GestureResponderEvent } from 'react-native';

interface SectionLabelProps {
  handleToggleSection: (event?: GestureResponderEvent) => void;
  labelText: string;
  isVisible: boolean;
  AdditionalIcon?: React.JSX.Element
}

const SectionLabel: React.FC<SectionLabelProps> = ({ handleToggleSection, labelText, isVisible, AdditionalIcon }) => {

  const sectionToggleIconClassName = [styles.sectionToggleIcon, 
    isVisible ? styles.sectionToggleIconActive : {}];
  const labelTextStyle = [styles.sectionLabelText, AdditionalIcon ? { fontSize: 30 } : {}];
  return (
    <Pressable onPress={handleToggleSection} style={styles.sectionLabelContainer}>
      {AdditionalIcon ? AdditionalIcon : ''}
      <Text style={labelTextStyle}>{labelText}</Text>
      <ArrowIcon width={48} height={48} style={sectionToggleIconClassName}/>
    </Pressable>
  )
}

export default SectionLabel;